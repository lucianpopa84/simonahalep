import Palmares from "./palmares.js";
export default class palmaresView {
    constructor() {
        this.palmaresList = [];
    }
    render(container) {
        container.empty();
        container.append("<h2>Palmares:</h2>");
        for (let palmares of this.palmaresList) {
            palmares.render(container);
        }
    }

    renderPalmares(container) {
        container.empty();
        container.append("<h2>Palmares:</h2>");
        let years = [];
        for (let palmares of this.palmaresList) {
            if (years.indexOf(palmares.an) < 0) {
                years.push(palmares.an);
            }
        }
        years.sort();
        for (let year of years) {
            let yearPalmares = this.palmaresList.filter((palmares) => { return palmares.an == year; });
            let yearPalmaresListEl = $(`<div class="container"></div>`);
            for (let palmares of yearPalmares) {
                palmares.renderList(yearPalmaresListEl);
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
                            ${yearPalmaresListEl.html()}
                        </div>
                    </div>
                </div>
            </div>
                `);
            acordeon.appendTo(container);
        }
    }


    loadPalmares(container) {
        this.container = container;
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
                    for (let result of results) {
                        let palmares = new Palmares(result);
                        this.palmaresList.push(palmares);
                    }
                    this.renderPalmares(container);
                }
            }
        );
    }
}