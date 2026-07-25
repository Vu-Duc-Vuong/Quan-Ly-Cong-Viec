import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';



export enum TaskStatus {

  TODO = 'TODO',

  DOING = 'DOING',

  DONE = 'DONE'

}



export enum TaskPriority {

  LOW = 'LOW',

  MEDIUM = 'MEDIUM',

  HIGH = 'HIGH'

}



@Entity('tasks')
export class Task {


  @PrimaryGeneratedColumn()
  id: number;



  @Column()
  title: string;



  @Column({
    nullable:true
  })
  description:string;



  @Column({

    type:'enum',

    enum:TaskStatus,

    default:TaskStatus.TODO

  })
  status:TaskStatus;




  @Column({

    type:'enum',

    enum:TaskPriority,

    default:TaskPriority.MEDIUM

  })
  priority:TaskPriority;




  @Column({

    type:'datetime',

    nullable:true

  })
  deadline:Date;




  @CreateDateColumn()
  createdAt:Date;




  @UpdateDateColumn()
  updatedAt:Date;


}