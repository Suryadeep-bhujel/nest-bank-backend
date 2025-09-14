import { DataSource } from "typeorm";
import { config } from 'dotenv';
type EntityClass = new (...args: any[]) => any;
export class BaseSeeder {
    protected entities: EntityClass[] = []
    constructor(entities: EntityClass[]) {
        this.entities = entities;
    }
    startDBServer() {
        config();
        // You can import AppDataSource from your data source config if you have one
        console.log("Starting Seeder DB Connection")
        return new DataSource({
            type: process.env.DB_TYPE as any,
            host: process.env.DB_HOST as any,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            schema: process.env.DB_SCHEMA,
            entities: [...this.entities],
            synchronize: false,
        });
    }

}