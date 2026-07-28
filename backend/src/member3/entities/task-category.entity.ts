import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('task_categories')
@Unique(['taskId', 'categoryId'])
export class TaskCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  taskId!: number;

  @Column()
  categoryId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}