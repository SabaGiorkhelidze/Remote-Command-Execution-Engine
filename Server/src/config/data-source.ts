import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
    entities: ['src/entity/**/*.ts'],
    synchronize: true,
    logging: false, // true if neccessery
});
//put this data into env

