import PalmaresWidget from "./palmaresWidget.js";
export default class PalmaresView {
    constructor() {
        this.palmaresList = [];
    }
    render(container) {
        container.empty();
        for (let palmares of this.palmaresList) {
            palmares.render(container);
        }
    }
    kendoRender(container) {
        container.empty();
        let grid = $("<div id='grid'></div>")
        grid.kendoGrid({
            dataSource: {
                data: this.palmaresList,
                schema: {
                    model: {
                        fields: {
                            id: { type: "number" },
                            turneu: { type: "string" },
                            an: { type: "number" },
                            record: { type: "string" }
                        }
                    }
                },
                pageSize: 20
            },
            height: 550,
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [{
                field: "turneu",
                title: "Turneu",
                width: 120
            }, {
                field: "an",
                title: "An",
                width: 120
            }, {
                field: "record",
                title: "Record",
                width: 120
            }, {
                template: function (dataItem) {
                    console.log("dataitem", dataItem);
                    let buttons = `<div class="d-flex align-items-center justify-content-center">
                    <button id="editButton${dataItem.id}" class='btn btn-success btn-sm m-2' onclick="router.navigate('/palmares/${dataItem.id}')">Edit</button>
                    <button id="deleteButton${dataItem.id}" class='btn btn-warning btn-sm m-2' onclick="if (confirm('siguri stergeti?')) {router.navigate('/palmares/delete/${dataItem.id}');}">Delete</button>                                    
                                   </div>`;
                    return buttons;
                },
                width: 180
            }
            ]
        });
        container.append(`<div class="mt-2"> <h1 class="d-inline-block">Palmares</h1> <button id="addEventButton" class="btn btn-success float-right m-1"><span class='font-weight-bold'>+</span> Add palmares</button></div > `);
        $("#addEventButton").on('click', () => { router.navigate('/palmares/add') });
        container.append(grid);
    }

    load(container) {
        if (this.palmaresList) {
            this.palmaresList.length = 0;
        }
        $.ajax('http://localhost:8080/palmares/',
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let results = data.data;
                    console.log(results);
                    for (let result of results) {
                        let palmares = new PalmaresWidget(result);
                        this.palmaresList.push(palmares);
                    }
                    console.log(this.palmaresList);
                    this.kendoRender(container);
                }
            }
        );
    }

}