import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board.model";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @Column()
  disc:string;

  @Column()
  status:BoardStatus;
}