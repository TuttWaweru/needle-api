import {   Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { Media } from "../media/media.entity";
import { User } from "../user/user.entity";
import { BaseUuidModel } from "../base-uuid.entity";
import { Product } from "../product/product.entity";

@Entity({ name: "tbl_media_items" })
export class MediaItem extends BaseUuidModel{

  @Column({ nullable: false })
  @Index("mediaitem-idx",{unique: true})
  name?: string;

  @Column({ nullable: false })
  path?: string;

  @Column()
  extension?: string;

  @Column()
  encoding?: string;

  @Column()
  size?: string;

  @ManyToOne(type => Media, media => media.mediaItems)
  @JoinColumn({ name: "media_id" })
  media?: Media;

  @ManyToOne(type => User, user => user.assets, { nullable: true })
  @JoinColumn({ name: "user_id" })
  user?: User;

  @ManyToOne(type => Product, product => product.assets, { nullable: true })
  @JoinColumn({ name: "product_id" })
  product?: Product;
}
