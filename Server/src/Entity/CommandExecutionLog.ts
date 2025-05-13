import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "Command_Execution_LOGS" })
export class CommandExecutionLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user!: string;

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