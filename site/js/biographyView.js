import Biography from "./biography.js";
export default class BiographyView {
    constructor() {
        this.biographies = [];
    }
    render(container) {
        container.empty();
        let sectionTitle = "<h1>Biografie</h1>";
        let ul = $(`<ul class="timeline"></ul>`);
        container.append(sectionTitle);
        for (let biography of this.biographies) {
            biography.render(ul);
        }
        container.append(ul);
    }


    load(container) {
        if (this.biographies) {
            this.biographies.length = 0;
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
                        this.biographies.push(biography);
                    }
                    this.render(container);
                }
            }
        );
    }

}