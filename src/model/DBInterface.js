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
            database: process.env["SQL_DB"],
            user: process.env["SQL_USER"],
            password: process.env["SQL_PW"]
        });
    }

    close(){
        this.connection.close();
    }

    async createRecord(description, quantity, price){
        const q = `INSERT INTO ${DBInterface.TABLE_NAME} (description, quantity, price) VALUES (?, ?, ?)`;
        const [res, fields] = await this.connection.execute(q, [description, quantity, price]);
        return res.insertId;
    }

    async listRecords(){
        const [rows, fields] = await this.connection.execute(`SELECT * from ${DBInterface.TABLE_NAME}`);       
        return rows;
    }

    async retrieveRecord(id){
        const q = `SELECT * from ${DBInterface.TABLE_NAME} where id=?`;
        const [res, fields] = await this.connection.execute(q, [id]);  
        return res;
    }

    async setDescription(id, value){
        const q = `UPDATE ${DBInterface.TABLE_NAME} SET description=? WHERE id=?`;
        await this.connection.execute(q, [value, id]);  
    }

    async setQuantity(id, value){
        const q = `UPDATE ${DBInterface.TABLE_NAME} SET quantity=? WHERE id=?`;
        await this.connection.execute(q, [value, id]);  
    }

    async setPrice(id, value){
        const q = `UPDATE ${DBInterface.TABLE_NAME} SET price=? WHERE id=?`;
        await this.connection.execute(q, [value, id]);  
    }

    async deleteRecord(id){        
        const q = `DELETE from ${DBInterface.TABLE_NAME} where id=?`;
        const [res, fields] = await this.connection.execute(q, [id]);
        return res.affectedRows;            
    }

    async clearTable(){
        const q = `DELETE from ${DBInterface.TABLE_NAME}`;
        await this.connection.execute(q);               
    }
}

export default DBInterface;
