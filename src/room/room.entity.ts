import { BaseUuidModel } from "../base-uuid.entity";
import {   Entity, Column, Index } from "typeorm";


@Entity({ name: "tbl_rooms" })
export class Room extends BaseUuidModel {
  
  @Index({ unique: true })
  @Column({nullable: false})
  users?: string;
  
  @Index({ unique: true })
  @Column({nullable: false})
  name?: string;
  
  @Column({ type: "text", nullable: false})
  messages?: string;

}
