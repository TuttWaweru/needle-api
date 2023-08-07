import { UserInput } from "src/user/dto/user.input";
import {   Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MediaInput } from "../../media/dto/media.input";
import { BaseUuidModelInput } from "../../base.input";
export interface MediaItemInput extends BaseUuidModelInput {
    name?: string;
    path?: string;
    extension?: string;
    encoding?: string;
    size?: string;
    media?: MediaInput;
    by?: UserInput;
}
