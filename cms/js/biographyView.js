import Biography from "./biography.js";
import BiographyWidget from "./biographyWidget.js";
export default class BiographyView {
    constructor() {
        this.widgets = [];
    }
    render(container) {
        container.empty();
        for (let wi of this.widgets) {
            wi.render(container);
        }
    }
    kendoRender(container) {
        container.empty();
        let grid = $("<div id='grid'></div>")
        grid.kendoGrid({
            dataSource: {
                data: this.widgets,
                schema: {
                    model: {
                        fields: {
                            id: { type: "number" },
                            date: { type: "string" },
                            title: { type: "string" },
                            state: { type: "boolean" },
                            description: { type: "string" }
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
                field: "date",
                title: "Biography Date",
                width: 150
            }, {
                field: "title",
                title: "Biography title"
            }, {
                field: "status",
                title: "Status",
                width: 100
            }, {
                template: function (dataItem) {
                    let buttons = `<div class="d-flex align-items-center justify-content-center">
                                    <button id="editButton${dataItem.id}" class='btn btn-success btn-sm m-2' onclick="router.navigate('/biography/${dataItem.id}')">Edit</button>
                                    <button id="deleteButton${dataItem.id}" class='btn btn-warning btn-sm m-2' onclick="if (confirm('siguri stergeti?')) {router.navigate('/biography/delete/${dataItem.id}');}">Delete</button>
                                   </div>`;
                    return buttons;
                },
                width: 150
            }
            ]
        });
        container.append(`<div class="mt-2"> <h1 class="d-inline-block">Biography</h1> <button id="addBiographyButton" class="btn btn-success float-right m-1"><span class='font-weight-bold'>+</span> Add biography</button></div > `);
        $("#addBiographyButton").on('click', () => { router.navigate('/biography/add') });
        container.append(grid);
    }

    load(container) {
        if (this.widgets) {
            this.widgets.length = 0;
        }
        $.ajax('http://localhost:8080/biography/',
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let id = 0;
                    let results = data.data;
                    for (let result of results) {
                        let biography = new Biography(result);
                        let widget = new BiographyWidget(biography);
                        this.widgets.push(widget);
                    }
                    this.kendoRender(container);
                }
            }
        );
    }

}