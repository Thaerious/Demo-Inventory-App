import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

class DBInterface{
    static get TABLE_NAME(){
        return "inventory";
    }

    async connect(){
        this.connection = await mysql.createConnection({
            host: "localhost",
            database: "inventory_app",
            user: process.env["SQL_USER"],
            password: process.env["SQL_PW"]
        });
    }

    close(){
        this.connection.close();
    }

    async createRecord(description, quantity, price){}
    async listRecords(){}
    async retrieveRecord(id){}
    async setDescription(id, value){}
    async setQuantity(id, value){}
    async setPrice(id, value){}
    async deleteRecord(id){}
    async clearTable(){}
}

export default DBInterface;
