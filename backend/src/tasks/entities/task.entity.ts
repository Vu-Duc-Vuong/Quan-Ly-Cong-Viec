import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('tasks')
export class Task {


  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  title: string;


  @Column({ nullable: true })
  description: string;


  @Column({
    default: 'TODO'
  })
  status: string;


  @Column({
    default: 'MEDIUM'
  })
  priority: string;


  @Column({
    type: 'datetime',
    nullable: true
  })
  deadline: Date;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;


}