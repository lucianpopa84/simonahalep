class Comment {

    constructor(userId, content) {
        this.id = 0;
        this.userId = userId;
        this.content = content;
    }

    getAddSQL() {
        let { userId, content } = this;
        let sql = `INSERT INTO COMMENTS (user_id, content) 
                       VALUES('${userId}','${content}')`;
        return sql;
    }

    static getByIdSQL(id) {
        let sql = `SELECT c.*, u.id as userId FROM COMMENTS as c, users as u WHERE ID = ${id} and c.user_id=u.id`;
        return sql;
    }

    static deleteByIdSQL(id) {
        let sql = `DELETE FROM COMMENTS WHERE ID = ${id}`;
        console.log('query', sql);
        return sql;
    }

    static updateByDataSQL(data) {
        let { id, content } = data;
        let sql = `update COMMENTS set content='${content}' WHERE ID = ${id}`;
        return sql;
    }

    static getAllSQL() {
        let sql = `SELECT c.*, u.nickname as user FROM comments as c, users as u where u.id=c.user_id order by time desc limit 20`;
        console.log(sql);
        return sql;
    }
}

module.exports = Comment;

