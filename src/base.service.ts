import {Repository, EntityManager, InsertResult, UpdateResult, SelectQueryBuilder} from 'typeorm'
import { FindArguments, JoinTypeEnum, UniversalArgs } from './find-options/dto/find-args.input'
import { FindOptionsService } from './find-options/find-options.service'

export interface BaseServiceInterface<U, T> {
  readonly repository: Repository<T>
  readonly entityManager: EntityManager
  findAll: (args: UniversalArgs) => Promise<T[]>
  findOne: (args: UniversalArgs) => Promise<T>
  create: (inputs: U[]) => Promise<T[]>
  createAndSelect: (inputs: U[]) => Promise<T[]>
  updateAndSelect: (inputs: U[]) => Promise<T[]>
  update: (inputs: U[]) => Promise<T[]>
  delete: (inputs: U[]) => Promise<number[]>
}

export class BaseService<U, T> implements BaseServiceInterface<U,T> {
    private readonly findOptionsService: FindOptionsService;
    public readonly entityManager: EntityManager;
    constructor (
        public readonly repository: Repository<T>
    ) {
        this.entityManager = this.repository.manager
        this.findOptionsService = new FindOptionsService();
    }

    public async findAll(args: UniversalArgs): Promise<T[]> {
        try {
            return await this.repository.find(this.findOptionsService.generate(args))
        } catch (error) {
            throw error;
        }
    }

    public async findOne(args: UniversalArgs): Promise<T> {
        try {
            return await this.repository.findOne(this.findOptionsService.generate1(args))
        } catch (error) {
            throw error;
        }
    }

    public async create(transactions: U[]): Promise<T[]> {
        try {
            return Promise.all(await (transactions as any).reduce(async (previousPromise, val) => {
            // return [...(await previousPromise), this.entityManager.save(this.entity, val)]
            return [...(await previousPromise), this.repository.save(val)]
            }, Promise.resolve([])));
        } catch (error) {
            throw error;
        }
    }

    async createAndSelect(transactions: U[]): Promise<T[]> {
        try {
                return await this.entityManager.createQueryBuilder()
                    .insert()
                    .into(this.repository.target)
                    .values(transactions as any[])
                    .execute().then(async (result: InsertResult) => await this.findAll({ where: { in: [{ key: "id", value: result.identifiers.map(({id}) => id ) }] } }) );
        } catch (error) {
            throw error;
        }
    }

    public async update(transactions: U[]): Promise<T[]> {
        try {
            return Promise.all(await (transactions as any).reduce(async (previousPromise, val) => {
            // return [...(await previousPromise), this.entityManager.save(this.entity, val)]
            return [...(await previousPromise), this.repository.save(val)]
            }, Promise.resolve([])));
        } catch (error) {
            throw error;
        }
    }

    async updateAndSelect(transactions: U[]): Promise<T[]> {
        try {
            return Promise.all(await (transactions as any).reduce(async (previousPromise, val) => {
                return await this.entityManager.createQueryBuilder()
                    .update(this.repository.target)
                    .set(JSON.parse(JSON.stringify(val)))
                    .where("id = :id",{ id: val.id })
                    .execute().then(async (result: UpdateResult) => (result?.affected > 0) 
                        ? [ ...(await previousPromise), await this.findOne({ where: { in: [{ key: "id", value: [val?.id] }] } }) ] 
                        : previousPromise
                    );
            }, Promise.resolve([])));
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(transactions: U[]): Promise<number[]> {
        try {
            return Promise.all(await (transactions.map((transaction) => transaction['id']) as any).reduce(async (previousPromise, val) => {
                return [...(await previousPromise), this.repository.softDelete(val)]
            }, Promise.resolve([])));
            // return await this.repository.softDelete(transactions.map((transaction) => transaction['id']))
        } catch (error) {
            throw error;
        }
    }
    

    buildQuery (entity: any, key: string, statement: FindArguments): SelectQueryBuilder<unknown> {
        try {
            
            let query = this.entityManager.createQueryBuilder(entity, key)
            
            // if (statement?.joins?.length > 0) {
            //     query = statement?.joins?.reduce((result, val) => result.leftJoinAndSelect(val.relationship, val.value), query)
            // }
            
            if (statement?.joins) {
                query = Object.entries(statement?.joins)?.reduce(
                    (result, [key, val]) => val.reduce((r, v) =>  (v?.table) 
                        ? (v?.relationship) 
                            ? r[JoinTypeEnum[key]](v.table, v.alias, v.relationship)
                            : r[JoinTypeEnum[key]](v.table, v.alias) 
                        : r[JoinTypeEnum[key]](v.relationship, v.alias), result),
                    // (result, [key, val]) => val.reduce((r, v) =>  (v?.relationship) ? r[JoinTypeEnum[key]](v.table, v.alias, v.relationship) : r[JoinTypeEnum[key]](v.table, v.alias), result),
                    query
                )
            }


            if (statement?.selects?.length > 0) {
                query = statement?.selects?.reduce(
                    (result, val, index) => (index === 0) 
                        ? result.select(val.property, val.value)
                        : result.addSelect(val.property, val.value),
                    query
                )
            }
            if (statement?.wheres?.length > 0) {
                query = statement?.wheres?.reduce(
                    (result, val, index) => (index === 0) 
                        ? result.where(val.value)
                        : (val.type === 'and')
                            ? result.andWhere(val.value)
                            : result.orWhere(val.value),
                    query
                )
            }
            if (statement?.groups?.length > 0) {
                query = statement?.groups?.reduce(
                    (result, val, index) => (index === 0) 
                        ? result.groupBy(val)
                        : result.addGroupBy(val),
                    query
                )
            }
            if (statement?.orderBys?.length > 0) {
                query = statement?.orderBys?.reduce(
                    (result, val, index) => (index === 0) 
                        ? (val?.type) ? result.orderBy(val.value, val.type) : result.orderBy(val.value)
                        : (val?.type) ? result.addOrderBy(val.value, val.type) : result.addOrderBy(val.value),
                    query
                )
            }
            if (statement?.limit) {
                query.limit(statement.limit)
            }
            if (statement?.offset) {
                query.take(statement.offset)
            }
            return query;
        } catch (error) {
            throw error;
        }
    }

    async getQueryResult (entity: any, key: string, statement: FindArguments): Promise<any> {
        try {
            return this.buildQuery(entity,key,statement)[statement.execute]();
        } catch (error) {
            throw error;
        }
    }

    generateSubquery (entity: any, key: string, statement: FindArguments): string {
        try {
            return this.buildQuery(entity,key, statement).getQuery();
        } catch (error) {
            throw error;
        }
    }

    formatTimeToAmPmOr24Hour(date, isAmPm: boolean = true) {
        // Alternative method but for 24 hour system
        if (isAmPm) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        } else {
            return date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
        }
    }
}