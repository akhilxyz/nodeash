import { Sequelize } from 'sequelize';
import { CreateDataBase } from '.';
import createDb from './database.create';

export interface DatabaseConfig {
    username: string;
    password: string;
    hostName: string;
    name: string;
}

class Database {
    public write: any;
    public read: any;

    constructor(DB: DatabaseConfig, logging: boolean) {
        try {
            this.write = new Sequelize(DB.name, DB.username, DB.password, {
                host: DB.hostName,
                dialect: 'mysql', // Specify the database dialect (e.g., "mysql")
                logging,
                define: {
                    charset: 'utf8',
                    collate: 'utf8_general_ci',
                    underscored: true,
                    timestamps: true,
                    createdAt: true,
                    updatedAt: true,
                },
                pool: {
                    max: 5,
                    min: 0,
                    idle: 20000,
                    acquire: 20000,
                },
            })

            this.read = new Sequelize(DB.name, DB.username, DB.password, {
                host: DB.hostName,
                dialect: 'mysql', // Specify the database dialect (e.g., "mysql")
                logging,
                define: {
                    charset: 'utf8',
                    collate: 'utf8_general_ci',
                    underscored: true,
                    timestamps: true,
                    createdAt: true,
                    updatedAt: false,
                },
                pool: {
                    max: 5,
                    min: 0,
                    idle: 20000,
                    acquire: 20000,
                },
            })

            this.syncTables();
        } catch (error: any) {
            console.log("error", error.message ?? error)
        }

    }


    async syncTables(): Promise<void> {
        await this.write.sync({ alter: true });
    }

    async checkDatabaseConnection(): Promise<boolean> {
        try {
            await this.write.authenticate();
            await this.read.authenticate();
            console.log('Database connection established successfully. 🚀🚀🚀');
            return true;
        } catch (error) {
            console.log('Error connecting to the database:', error);
            return false;
        }
    }
}



const SQLClient =  (DB: DatabaseConfig, logging: boolean = false) => {
    const database = new Database(DB, logging);

    return {
        DBWrite: database.write,
        DBRead: database.read,
        checkDatabaseConnection: database.checkDatabaseConnection.bind(database),
    };
};



export default SQLClient;
