import Event from "./event.js";
export default class EventsView {
    constructor() {
        this.events = [];
    }
    render(container) {
        container.empty();
        container.append("<h2>Competitii viitoare:</h2>");
        for (let event of this.events) {
            event.render(container);
        }
    }

    renderPast(container) {
        container.empty();
        container.append("<h2>Competitii trecute:</h2>");
        let years = [];
        for (let event of this.events) {
            event["year"] = event.endDate.split("-")[0];
            if (years.indexOf(event.year) < 0) {
                years.push(event.year);
            }
        }
        for (let year of years) {
            console.log('year', year);
            let yearEvents = this.events.filter((event) => { return event.year == year; });
            let yearEventsListEl = $(`<div class="container"></div>`);
            for (let event of yearEvents) {
                event.renderList(yearEventsListEl);
            }
            let acordeon = $(`
            <div class= "accordion" id="accordion_${year}" >
                <div class="card">
                    <div class="card-header" id="headingFour">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                data-target="#collapseFor_${year}" aria-expanded="true" aria-controls="collapseOne">
                                ${year}
                            </button>
                        </h5>
                    </div>
                    <div id="collapseFor_${year}" class="collapse" aria-labelledby="headingFour"
                        data-parent="#accordion_${year}">
                        <div class="card-body">
                            ${yearEventsListEl.html()}
                        </div>
                    </div>
                </div>
            </div>
                `);
            acordeon.appendTo(container);
        }
    }

    load(container) {
        this.container = container;
        if (this.events) {
            this.events.length = 0;
        }
        $.ajax('http://localhost:8080/competitions/future',
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let results = data.data;
                    for (let result of results) {
                        let event = new Event(result);
                        this.events.push(event);
                    }
                    this.render(container);
                }
            }
        );
    }

    loadPast(container) {
        this.container = container;
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
                    for (let result of results) {
                        let event = new Event(result);
                        this.events.push(event);
                    }
                    this.renderPast(container);
                }
            }
        );
    }
}