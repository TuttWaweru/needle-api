interface SearchArgs {
  key: string;
  value: string | number | string[] | number[];
}

interface SortArgs {
  key: string;
  value: SortOptions;
}
interface OperatorArgs {
  key: string;
  operator: OperationOptions;
  value: string;
}
export interface WhereArgs {
  and?: SearchArgs[];
  in?: SearchArgs[];
  search?: SearchArgs[];
  operators?: OperatorArgs[];
  between?: BetweenArgs[];
  raw?: RawArgs[];
}
interface RawArgs {
  key: string;
  value: () => {};
}
interface BetweenArgs {
  property: string;
  from: string;
  to: string;
}

export enum OperationOptions {
  less = "less",
  notLess = "notLess",
  more = "more",
  notMore = "notMore",
  not = "not",
  equal = "equal",
  notEqual = "notEqual",
  in = "in",
  notIn = "notIn",
  isNull = "isNull",
  isNotNull = "isNotNull"
}

enum SortOptions {
  high = "high",
  low = "low"
}

export interface UniversalArgs {
  ids?: number[];
  limit?: number;
  offset?: number;
  search?: SearchArgs[];
  where?: WhereArgs;
  or?: WhereArgs[];
  links?: string[];
  sortBy?: SortArgs[];
}


export class JoinType {
  left?: JoinEntity[];
  leftSelect?: JoinEntity[];
  inner?: JoinEntity[];
  innerSelect?: JoinEntity[];
};
export enum JoinTypeEnum {
  left = 'leftJoin',
  leftSelect = 'leftJoinAndSelect',
  inner = 'innerJoin',
  innerSelect = 'innerJoinAndSelect'
};
export class JoinEntity {
  relationship?: string;
  alias: string;
  table?: string;
};
export class SelectEntity {
  property: string;
  value: string;
};
export class WhereEntity {
  type: string;
  value: string;
};
export enum OrderByEnum {
  ASC = "ASC",
  DESC = "DESC"
}
export class OrderByEntity {
  type?: OrderByEnum;
  value: string;
};

export enum FindExecuteOptions {
  one = 'getOne',
  many = 'getMany',
  rawOone = 'getRawOne',
  rawMany = 'getRawMany',
  manyCount = 'getManyAndCount',
  oneOrFail = 'getOneOrFail'
}
export class FindArguments {
  joins?: JoinType;
  selects?: SelectEntity[];
  wheres?: WhereEntity[];
  execute?: FindExecuteOptions;
  orderBys?: OrderByEntity[];
  groups?: string[];
  limit?: number;
  offset?: number;
};

