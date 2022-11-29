import InventoryAPI from "../../../model/InventoryAPI.js";
import loadSelect from "./load_select.mjs";

function formListRecords(){
    window.addEventListener("load", async () => {
        const records = await InventoryAPI.listRecords();
        loadSelect(records, 'description');

        const buttSelect = document.querySelector("#list_records #select");
        buttSelect.addEventListener("click", clickSelect);

        const buttDelete = document.querySelector("#list_records #delete");
        buttDelete.addEventListener("click", clickDelete);     

        document.querySelectorAll("#list_records [data-field]").forEach(element =>{
            element.addEventListener("click", clickUpdate);     
        });
    });
};

function getID(){
    const selectElement = document.querySelector("#record-list");
    const index = selectElement.selectedIndex;
    const optionElement = selectElement.childNodes[index];
    return optionElement.getAttribute("data-id");    
}

async function clickSelect(event) {
    const records = await InventoryAPI.retrieveRecord(getID());

    if (records.length < 1) return;
    console.log(records);
    document.querySelector("#info #id").innerHTML = records[0].id;
    document.querySelector("#info #description").innerHTML = records[0].description;
    document.querySelector("#info #quantity").innerHTML = records[0].quantity;
    document.querySelector("#info #price").innerHTML = records[0].price;
}

async function clickDelete(event) {
    await InventoryAPI.deleteRecord(getID());
    const records = await InventoryAPI.listRecords();
    loadSelect(records, 'description');    
}

async function clickUpdate(event){
    console.log("Click Update");
    const field = event.target.getAttribute("data-field");
    const value = document.querySelector(`#${field}`).innerHTML;
    await InventoryAPI.updateRecord(getID(), field, value);
    const records = await InventoryAPI.listRecords();
    console.log(records);
    loadSelect(records, 'description');
}

export default formListRecords;