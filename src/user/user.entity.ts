import { Entity, Column, Index, OneToMany } from "typeorm";
import { BaseModel } from  '../base.entity'
import { MediaItem } from "../mediaitem/mediaitem.entity";
import { Product } from "../product/product.entity";

@Entity({ name: "tbl_users" })
export class User extends BaseModel {
  
  @Column({ name: "first_name", nullable: true})
  firstName?: string;

  @Column({ name: "middle_name", nullable: true })
  middleName?: string;

  @Column({ name: "last_name", nullable: true })
  lastName?: string;

  @Column({ name: "username", nullable: true })
  username?: string;

  @Column({ name: "email_address", nullable: true })
  @Index("email-idx",{ unique: true })
  email?: string;

  @Column({ name: "phone_number", nullable: true })
  @Index("phone-idx", { unique: true })
  phone?: string;

  @Column({ select: true })
  password?: string;

  @Column({default: () => "1"})
  active?: number;

  @Column({ type: "tinyint", name: "is_phone_verified", default: () => "0"})
  isPhoneVerified?: number;

  @Column({ type: "tinyint", name: "is_email_verified", default: () => "0"})
  isEmailVerified?: number;

  @Column({ nullable: true })
  credits?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ name: "is_verified", default: () => false})
  isVerified?: boolean;

  @Column({ type: "json", nullable: true })
  details?: any;

  @OneToMany(type => MediaItem, item => item.user)
  assets?: MediaItem[];

  @OneToMany(type => Product, product => product.user)
  products?: Product[];

}
