export default class Comment {
  constructor({ id = "", time = "", user = "", content = "" } = {}) {
    this.time = time;
    this.user = user;
    this.content = content;
    this.id = id;
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
}