/* eslint-disable @typescript-eslint/no-explicit-any */
import * as  mysql from 'mysql2/promise'
import { DatabaseConfig } from './database.connection';

 const createDb = async (DB : DatabaseConfig ) => {
    try {
        console.log("Creating MySQL connection....")
        if(!DB.hostName) {
            console.log("No Database Config found please check databse configuration")
        }
        const connection = await mysql.createConnection({
            host: DB.hostName,
            user: DB.username,
            password: DB.password,
        });

        console.log("Checking if Database 🛠️  Exist....")
        // Check if the database already exists
        const [rows] :any = await connection.execute(`SHOW DATABASES LIKE '${DB.name}'`);
        
        if (rows.length > 0) {
            console.log(`Database 🛠️  "${DB.name}" exists.`);
            console.log(`Happy Hacking ฅ^•ﻌ•^ฅ 🚀🚀🚀`);

        } else {
            console.log("Creating Database 🛠️ ....")
            await connection.execute(`CREATE DATABASE ${DB.name}`);
            console.log(`Database "${DB.name}" created. 🚀🚀🚀`);
        }

        // Close the connection
        await connection.end();
        return true;
    } catch (error) {
        console.log(`Error creating or checking the database "${DB.name}"`);
        console.log(error);
        console.log(`Please create Database manually or check createDb function in mysql.connection`);
        return false;
    }
}

export default createDb