import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from  '../base.entity'
import { MediaItem } from "../mediaitem/mediaitem.entity";
import { User } from "../user/user.entity";

@Entity({ name: "tbl_products" })
export class Product extends BaseModel {
  
  @Column({ name: "product_name", nullable: false})
  productName?: string;

  @Column({ name: "price", nullable: false })
  price?: string;

  @Column({ name: "description", type: "text", nullable: true })
  description?: string;

  @Column({ type: "json", nullable: true })
  details?: any;

  @ManyToOne(type => User, user => user.products)
  @JoinColumn({ name: "user_id" })
  user?: User;
  
  @OneToMany(type => MediaItem, item => item.product)
  assets?: MediaItem[];

}
