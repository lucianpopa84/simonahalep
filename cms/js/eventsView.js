import EventWidget from "./eventWidget.js";
export default class EventsView {
    constructor() {
        this.events = [];
    }
    render(container) {
        container.empty();
        for (let event of this.events) {
            event.render(container);
        }
    }
    kendoRender(container) {
        container.empty();
        let grid = $("<div id='grid'></div>")
        grid.kendoGrid({
            dataSource: {
                data: this.events,
                schema: {
                    model: {
                        fields: {
                            id: { type: "number" },
                            name: { type: "string" },
                            location: { type: "string" },
                            description: { type: "string" },
                            startDate: { type: "string" },
                            endDate: { type: "string" }
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
                field: "name",
                title: "Name",
                width: 120
            }, {
                field: "startDate",
                title: "Start",
                width: 120
            }, {
                field: "endDate",
                title: "End",
                width: 120
            }, {
                field: "location",
                title: "Location",
                width: 160
            }, {
                field: "description",
                title: "Description"

            }, {
                template: function (dataItem) {
                    console.log("dataitem", dataItem);
                    let buttons = `<div class="d-flex align-items-center justify-content-center">
                    <button id="editButton${dataItem.id}" class='btn btn-success btn-sm m-2' onclick="router.navigate('/events/${dataItem.id}')">Edit</button>
                    <button id="deleteButton${dataItem.id}" class='btn btn-warning btn-sm m-2' onclick="if (confirm('siguri stergeti?')) {router.navigate('/events/delete/${dataItem.id}');}">Delete</button>                                    
                                   </div>`;
                    return buttons;
                },
                width: 180
            }
            ]
        });
        container.append(`<div class="mt-2"> <h1 class="d-inline-block">Events</h1> <button id="addEventButton" class="btn btn-success float-right m-1"><span class='font-weight-bold'>+</span> Add event</button></div > `);
        $("#addEventButton").on('click', () => { router.navigate('/events/add') });
        container.append(grid);
    }

    load(container) {
        if (this.events) {
            this.events.length = 0;
        }
        $.ajax('http://localhost:8080/competitions/',
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let results = data.data;
                    console.log(results);
                    for (let result of results) {
                        let event = new EventWidget(result);
                        this.events.push(event);
                    }
                    console.log(this.events);
                    this.kendoRender(container);
                }
            }
        );
    }

}