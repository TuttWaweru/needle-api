export interface BaseUuidModelInput {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BaseModelInput {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface RawDeletedModel {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    info?: string;
    serverStatus?: number;
    warningStatus?: number;
    changedRows?: number;
}
export interface DeletedModel {
    generatedMaps?: string[];
    raw?: RawDeletedModel
}