import Comment from "./comment.js";
import Auth from "./auth.js";
export default class CommentsView {
    constructor() {
        this.comments = [];
    }
    render(container) {
        console.log("render function");
        container.empty();
        container.append("<h2>Comentarii:</h2>");
        this.showAddCommentForm(container);
        container.append("<p></p>");
        for (let comment of this.comments) {
            comment.render(container);
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
        form.on('submit', (e) => { alert('intra'); e.preventDefault(); this.addComment(form, container); })
    }
    addComment(formular, container) {
        let inputs = formular.serializeArray();
        let values = {}
        for (let input of inputs) {
            let { name, value } = input;
            values[name] = value;
        }
        $.ajax('http://localhost:8080/comments/',
            {
                method: "POST",
                dataType: "json",
                data: values,
                content: "application/json",
                context: this,
                success: function (data) {
                    this.load(container);
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
                    let id = 0;
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