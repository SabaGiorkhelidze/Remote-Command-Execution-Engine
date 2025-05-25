// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

// @Entity({ name: "Command_Execution_LOGS" })
// export class CommandExecutionLog {
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     user!: string;

//     @Column()
//     host!: string;

//     @Column()
//     command!: string;

//     @Column()
//     output!: string;
    
//     @CreateDateColumn({ type: "timestamp" })
//     timestamp!: Date;

//     @Column()
//     success!: boolean;
// } 

// <--- testing this approach, might need more relationships or to update the db columns --->

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "Command_Execution_LOGS" })
export class CommandExecutionLog {
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne(() => User, (user) => user.logs, { eager: true })
  @JoinColumn({ name: "userID" }) 
  userRef!: User;

  @Column()
  host!: string;

  @Column()
  command!: string;

  @Column()
  output!: string;

  @CreateDateColumn({ type: "timestamp" })
  timestamp!: Date;

  @Column()
  success!: boolean;
}
