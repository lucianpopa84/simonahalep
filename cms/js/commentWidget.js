import Comment from "./comment.js";
export default class CommentWidget extends Comment {
  constructor(data) {
    super(data);
  }
  render(container) {
    let { id, time, user, content } = this;
    let div = $(`
        <div class="card border mb-3">
        <div class="card-header">${time}</div>
        <div class="card-body">
          <h5 class="card-title">${user}</h5>
          <p class="card-text">${content}</p>
        </div>
      </div>
      `);
    container.append(div);
  }
  static delete(id) {
    $.ajax('http://localhost:8080/comments/' + id,
      {
        method: "DELETE",
        dataType: "json",
        data: { id },
        content: "application/json",
        context: this,
        success: function (data) {
          router.navigate("/comments");
        },
        error: function (err) {
          console.log(err);
        }
      }
    );
  }
  static updateUserBan(userId, banned) {
    let values = { id: userId, banned: banned };
    $.ajax('http://localhost:8080/users/',
      {
        method: "PUT",
        dataType: "json",
        data: values,
        content: "application/json",
        context: this,
        success: function (data) {
          router.navigate("/comments");
        },
        error: function (err) {
          console.log(err);
        }
      }
    );
  }
}