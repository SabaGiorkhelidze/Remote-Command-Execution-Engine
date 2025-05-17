import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CommandExecutionLog } from "./CommandExecutionLog";

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

//   @Column() //testing needs link up to other db(for analytics in the future)
//   departament!: string;

  @OneToMany(() => CommandExecutionLog, (log) => log.userRef)
  logs!: CommandExecutionLog[];
}