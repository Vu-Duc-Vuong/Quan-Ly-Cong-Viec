import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';


@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn()
  id!: number;


  @Column()
  name!: string;


  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  description!: string | null;


  @Column()
  userId!: number;


  // Một category có nhiều task
  @OneToMany(
    () => Task,
    task => task.category
  )
  tasks!: Task[];


  @CreateDateColumn()
  createdAt!: Date;


  @UpdateDateColumn()
  updatedAt!: Date;

}