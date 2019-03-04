import Comment from "./comment.js";
export default class CommentsView {
    constructor() {
        this.comments = [];
        this.rightCol = "";
    }
    render(container) {
        container.empty();
        container.append("<h2>Comentarii:</h2>");
        let row = $(`<div class='row'></div>`);
        let leftCol = $(`<div class="col-md-8"></col>`)
        this.rightCol = $(`<div class="col-md-4"></col>`)
        let video = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/1JtpmTmC9Kg?start=100&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        leftCol.append(video);
        this.showAddCommentForm(leftCol);
        container.append("<p></p>");
        for (let comment of this.comments) {
            comment.render(this.rightCol);
        }
        row.append(leftCol);
        row.append(this.rightCol);
        container.append(row);

    }
    renderRightCol(container) {
        this.rightCol.empty();
        for (let comment of this.comments) {
            comment.render(this.rightCol);
        }
    }
    showAddCommentForm(container) {
        if (!auth.localToken) {
            return;
        }
        let form = $(`
<form>
      <div class="form-group">
    <label for="content">Comentariu:</label>
    <textarea class="form-control" id="content" name="content" rows="3" required></textarea>
  </div>
  <button type="submit" class="btn btn-primary">adauga comentariu</button>
</form>
        `);
        container.append(form);
        form.on('submit', (e) => { e.preventDefault(); this.addComment(form, container); })
    }
    addComment(formular, container) {
        let inputs = formular.serializeArray();
        let values = {}
        for (let input of inputs) {
            let { name, value } = input;
            values[name] = value;
        }
        formular[0].reset();
        $.ajax('http://localhost:8080/comments/',
            {
                method: "POST",
                dataType: "json",
                data: values,
                content: "application/json",
                context: this,
                success: function (data) {
                    values["time"] = new Date().toLocaleString();
                    values["user"] = auth.userProfile.nickname;
                    let comment = new Comment(values);
                    this.comments.unshift(comment);
                    this.renderRightCol();
                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }
    load(container) {
        this.container = container;
        if (this.comments) {
            this.comments.length = 0;
        }
        console.log("load comments");
        $.ajax('http://localhost:8080/comments/',
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let results = data.data;
                    for (let result of results) {
                        let comment = new Comment(result);
                        this.comments.push(comment);
                    }
                    this.render(container);
                }
            }
        );
    }
}