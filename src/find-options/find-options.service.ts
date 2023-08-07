import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, In, Like, Between, LessThan, MoreThan, Not, IsNull, Equal, Raw } from "typeorm";

@Injectable()
export class FindOptionsService {
    generate(args): FindManyOptions {
        return this.buildQuery(args, true);
    }
    
    generate1(args): FindOneOptions {
        return this.buildQuery(args, false);
    }
    
    buildQuery (args, isMany:boolean) {
        if (isMany) {
            
            let findOptions: FindManyOptions = {};
            if (args.limit) { findOptions.take = args.limit; }
            
            if (args.offset) { findOptions.skip = args.offset; }
            
            this.buildCommonComparison(args, findOptions);
            return findOptions;
        } else {

            let findOptions: FindOneOptions = {};
            this.buildCommonComparison(args, findOptions);
            return findOptions;
        }
    }
    
    buildCommonComparison (args, findOptions) {
        if (args.ids) { findOptions["id"] = In(args.ids); }

        if(args.search) {
            for(let searchInput of args.search) {
            findOptions[searchInput.key] = Like("%" + searchInput.value + "%");
            }
        }

        if(args.where) { findOptions.where = this.processWhere(args); }

        if (args.or) {
            findOptions.where = [];
            for(let orBit of args.or) {
            findOptions.where.push(this.processWhere({ where: orBit }));
            }
        }

        if (args.links) { findOptions.relations = args.links; }
        if (args.sortBy) {
            findOptions.order = {};
            for (let sortByBit of args.sortBy) {
            (sortByBit.value === 'high')
                ? findOptions.order[sortByBit.key] = "DESC"
                : findOptions.order[sortByBit.key] = "ASC";
            }
        }
    }
    
    processWhere({ where }) {
        let result = {};
        if (where.and) {
            for(let andInput of where.and) {
                result[andInput.key] = andInput.value;
            }
        }
        if(where.between) {
            for(let { property, from, to } of where.between) {
                result[property] = Between(from, to);
            }
        }
        if (where.in) {
            for(let searchInput of where.in) {
                result[searchInput.key] = In(searchInput.value);
            }
        }
        if(where.search) {
            for(let searchInput of where.search) {
                result[searchInput.key] = Like("%" + searchInput.value + "%");
            }
        }
        if(where.operators) {
            for(let operator of where.operators) {
                switch (operator.operator) {
                    case "less":
                        result[operator.key] = LessThan(parseFloat(operator.value));
                        break;
                    case "notLess":
                        result[operator.key] = Not(LessThan(parseFloat(operator.value)));
                        break;
                    case "more":
                        result[operator.key] = MoreThan(parseFloat(operator.value));
                        break;
                    case "notMore":
                        result[operator.key] = Not(MoreThan(parseFloat(operator.value)));
                        break;
                    case "not":
                        result[operator.key] = Not(operator.value);
                        break;
                    case "equal":
                        result[operator.key] = Equal(operator.value);
                        break;
                    case "notEqual":
                        result[operator.key] = Not(Equal(operator.value));
                        break;
                    case "in":
                        result[operator.key] = In(operator.value.split(","));
                        break;
                    case "notIn":
                        result[operator.key] = Not(In(operator.value.split(",")));
                        break;
                    case "isNull":
                        result[operator.key] = IsNull();
                        break;
                    case "isNotNull":
                        result[operator.key] = Not(IsNull());
                        break;
                }
            }
        }
        if(where.raw) {
            for(let rawInput of where.raw) {
                result[rawInput.key] = Raw(rawInput.value());
            }
        }
        return result;
    }
    
}
