/**
 * Populate a the record-list dropdown with values from data.
 * data : data source object
 * field : the field that contains the displayed value
 */
 function loadSelect(data, field) {
    const selectElement = document.querySelector("#record-list");
    selectElement.replaceChildren();

    for (const record of data) {
        const element = document.createElement("option");
        element.setAttribute("data-id", record.id);
        element.innerHTML = record[field];
        selectElement.append(element);
    }
}

export default loadSelect;