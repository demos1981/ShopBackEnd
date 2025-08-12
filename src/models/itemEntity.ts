import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ItemStatusEnum, ItemSexEnum } from "../types/enums";

@Entity({ name: "item" })
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: true })
  articles: string;

  @Column({ type: "varchar", nullable: true })
  brand: string;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @Column({ type: "integer", nullable: false, default: 0 })
  quantity: number;

  @Column("numeric", { precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: "varchar", nullable: true })
  barcode: string;

  @Column({ type: "varchar", nullable: true })
  color: string;

  @Column({ type: "varchar", nullable: true })
  size: string;

  @Column({
    type: "enum",
    enum: ItemStatusEnum,
    default: ItemStatusEnum.NEW,
  })
  role: ItemStatusEnum;

  @Column({
    type: "enum",
    enum: ItemSexEnum,
    default: ItemSexEnum.UNISEX,
  })
  sex: ItemSexEnum;

  @Column({ type: "varchar", nullable: true })
  category: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @Column({ nullable: true })
  videoUrl?: string;

  @Column({ nullable: true })
  documentUrl?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
