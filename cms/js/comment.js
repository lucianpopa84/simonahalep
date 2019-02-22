export default class Comment {
    constructor({ id = "", time = "", userId = "", banned = "", user = "", content = "" } = {}) {
        this.time = time;
        this.user = user;
        this.userId = userId;
        this.banned = banned;
        this.content = content;
        this.id = id;
    }
}