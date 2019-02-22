import CommentWidget from "./commentWidget.js";
export default class CommentsView {
    constructor() {
        this.comments = [];
    }
    render(container) {
        container.empty();
        for (let comment of this.comments) {
            comment.render(container);
        }
    }
    kendoRender(container) {
        container.empty();
        let grid = $("<div id='grid'></div>")
        grid.kendoGrid({
            dataSource: {
                data: this.comments,
                schema: {
                    model: {
                        fields: {
                            id: { type: "number" },
                            time: { type: "string" },
                            user: { type: "string" },
                            banned: { type: "boolean" },
                            content: { type: "string" }
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
                field: "time",
                title: "Posting time",
                width: 120
            }, {
                field: "user",
                title: "Author",
                width: 160
            }, {
                field: "content",
                title: "Content"

            }, {
                template: function (dataItem) {
                    console.log("dataitem", dataItem);
                    let banText = dataItem.banned ? 'unban' : 'ban';
                    let buttons = `<div class="d-flex align-items-center justify-content-center">
                                    <button id="editButton${dataItem.id}" class='btn btn-success btn-sm m-2' onclick="router.navigate('/comments/${banText}/${dataItem.userId}')">${banText} user</button>
                                    <button id="deleteButton${dataItem.id}" class='btn btn-warning btn-sm m-2' onclick="if (confirm('siguri stergeti?')) {router.navigate('/comments/delete/${dataItem.id}');}">Delete</button>
                                   </div>`;
                    return buttons;
                },
                width: 180
            }
            ]
        });
        container.append(`<div class="mt-2"> <h1 class="d-inline-block">Comments</h1> </div > `);
        container.append(grid);
    }

    load(container) {
        if (this.comments) {
            this.comments.length = 0;
        }
        $.ajax('http://localhost:8080/comments/',
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let results = data.data;
                    for (let result of results) {
                        let comment = new CommentWidget(result);
                        this.comments.push(comment);
                    }
                    this.kendoRender(container);
                }
            }
        );
    }

}