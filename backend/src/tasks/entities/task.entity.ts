import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/user.entity';
import { Category } from '../../member3/entities/category.entity';


export enum TaskStatus {

  TODO = 'TODO',

  DOING = 'DOING',

  DONE = 'DONE',

}


export enum TaskPriority {

  LOW = 'LOW',

  MEDIUM = 'MEDIUM',

  HIGH = 'HIGH',

}


@Entity('tasks')
export class Task {


  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  title: string;


  @Column({
    nullable: true,
  })
  description: string;


  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;


  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;


  @Column({
    type: 'datetime',
    nullable: true,
  })
  deadline: Date;


  // Quan hệ với User
  @ManyToOne(
    () => User,
    user => user.tasks,
    {
      nullable: true,
    }
  )
  user: User;


  // Quan hệ với Category
  @ManyToOne(
    () => Category,
    category => category.tasks,
    {
      nullable: true,
      onDelete: 'SET NULL',
    }
  )
  @JoinColumn({
    name: 'categoryId',
  })
category: Category | null;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;

}