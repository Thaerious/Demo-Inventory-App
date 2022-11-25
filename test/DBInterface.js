import DBInterface from "../src/model/DBInterface.js";
import assert from "assert";

describe(`Database Interface test`, function () {
    it(`sanity test`, async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        dbi.close();
    });

    it(`create a record`, async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        const id = await dbi.createRecord("apple", 4, 3.50);
        assert.ok(id != null);
        dbi.close();
    });    
});