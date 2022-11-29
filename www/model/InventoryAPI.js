
class InventoryAPI {
    static async listRecords() {
        const response = await fetch("/api/inventory", {
            method: "GET",
            enctype: "application/form-data"
        });

        return await response.json();
    }

    static async retrieveRecord(id) {
        const response = await fetch(
            `/api/inventory/${id}`,
            {
                method: "GET"
            }
        );
        console.log(response);
        return await response.json();
    }

    static async deleteRecord(id) {
        const response = await fetch(
            `/api/inventory/${id}`,
            {
                method: "DELETE"
            }
        );
        return await response.json();
    }

    static async updateRecord(id, field, value) {
        const data = {
            "field": field,
            "value": value
        }

        const response = await fetch(
            `/api/inventory/${id}`,
            {
                headers: new Headers({'content-type': 'application/json'}),
                method: "PUT",
                body: JSON.stringify(data)
            }
        );
    }
}

export default InventoryAPI;