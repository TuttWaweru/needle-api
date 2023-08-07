import { BaseUuidModel } from "../base-uuid.entity";
import {   Entity, Column } from "typeorm";


@Entity({ name: "tbl_recommendations" })
export class Recommendation extends BaseUuidModel {
  
  @Column({ nullable: false })
  user?: string;
  
  @Column({ type: "varchar", nullable: false })
  title?: string;
  
  @Column({ type: "text", nullable: false })
  recommendation?: string;

}
