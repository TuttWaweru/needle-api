import {   Entity, Column, OneToMany, Index } from "typeorm";
import { MediaItem } from "../mediaitem/mediaitem.entity";
import { BaseModel } from "../base.entity";

@Entity({ name: "tbl_media" })
export class Media extends BaseModel{
  
  @Column({nullable: false})
  @Index("type-idx",{unique: true})
  type?: string;

  @OneToMany(type => MediaItem, mediaItem => mediaItem.media)
  mediaItems: MediaItem[];
}
