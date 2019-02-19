export default class Biography {
    constructor({ id = "", date = "", status = "", title = "", description = "" } = {}) {
        this.date = date;
        this.status = status;
        this.title = title;
        this.description = description;
        this.id = id;
    }
    render(container) {
        if (this.status != 'visible') {
            return;
        }
        let html = $(`
        <li>
        <strong>${this.title}</strong>
        <span class="float-right">${this.date.split('-')[0]}</span>
        <p style="display:none;" class="myTimeline" id="timeline${this.id}">${this.description}</p>
    </li>
        `);
        html.on('click', () => {
            let sel = $(`.myTimeline`).not(`#timeline${this.id}`);
            sel.slideUp();
            $(`#timeline${this.id}`).slideToggle();
        });

        html.appendTo(container);
    }
}