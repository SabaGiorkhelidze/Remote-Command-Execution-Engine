import { DataSource } from 'typeorm';
import { CommandExecutionLog } from '../Entity/CommandExecutionLog';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
    entities: [CommandExecutionLog],
    synchronize: true,
    logging: false, // true if neccessery
});
//put this data into env

