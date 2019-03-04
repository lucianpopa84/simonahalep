import Career from "./career.js";
export default class CareerView {

    /////////////   WORK IN PROGRESS   ///////////
    
    constructor() {
        this.statistics = [];
    }
    render(container) {
        container.empty();
        let sectionTitle = "<h1>Palmares</h1>";
        let ul = $(`<ul> </ul>`);
        container.append(sectionTitle);
        for (let statistic of this.statistics) {
            statistic.render(ul);
        }
        container.append(ul);
    }

    load(container) {
        if (this.statistics) {
            this.statistics.length = 0;
        }
        $.ajax('http://localhost:8080/career/',
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let id = 0;
                    let results = data.data;
                    for (let result of results) {
                        let statistic = new Career(result);
                        this.statistics.push(statistic);
                    }
                    this.render(container);
                }
            }
        );
    }

}