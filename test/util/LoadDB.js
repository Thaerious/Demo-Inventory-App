import DBInterface from "../../src/model/DBInterface.js";

const dbi = new DBInterface();
await dbi.connect();
await dbi.createRecord("apple", 4, 3.50);
await dbi.createRecord("pear", 6, 4.75);
await dbi.createRecord("banana", 14, 0.50);
await dbi.createRecord("avacado", 0, 7.99);
dbi.close();
