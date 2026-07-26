import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Task } from '../tasks/entities/task.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @OneToMany(
    () => Task,
    task => task.user,
  )
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}