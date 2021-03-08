"use strict";
const SqlPool = require("./sqlPool");
module.exports = class Sql {
    static async conectar(callback) {
        return new Promise((resolve, reject) => {
            SqlPool.pool.getConnection((error, connection) => {
                if (error) {
                    reject(error);
                    return;
                }
                let sql = new Sql();
                sql.connection = connection;
                sql.transacaoAberta = false;
                sql.linhasAfetadas = 0;
                try {
                    callback(sql)
                        .then(() => {
                        if (sql.transacaoAberta) {
                            sql.transacaoAberta = false;
                            connection.rollback(error => {
                                connection.release();
                                if (error)
                                    reject(error);
                                else
                                    resolve();
                            });
                        }
                        else {
                            connection.release();
                            resolve();
                        }
                    }, reason => {
                        if (sql.transacaoAberta) {
                            sql.transacaoAberta = false;
                            connection.rollback(error => {
                                connection.release();
                                if (error)
                                    reject(error);
                                else
                                    reject(reason);
                            });
                        }
                        else {
                            connection.release();
                            reject(reason);
                        }
                    });
                }
                catch (e) {
                    if (sql.transacaoAberta) {
                        sql.transacaoAberta = false;
                        connection.rollback(error => {
                            connection.release();
                            if (error)
                                reject(error);
                            else
                                reject(e);
                        });
                    }
                    else {
                        connection.release();
                        reject(e);
                    }
                }
            });
        });
    }
    async query(queryStr, valores = null) {
        return new Promise((resolve, reject) => {
            let terminar = (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                this.linhasAfetadas = parseInt(results.affectedRows);
                resolve(results);
            };
            if (valores)
                this.connection.query(queryStr, valores, terminar);
            else
                this.connection.query(queryStr, terminar);
        });
    }
    async scalar(queryStr, valores = null) {
        return new Promise((resolve, reject) => {
            let terminar = (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                this.linhasAfetadas = parseInt(results.affectedRows);
                let r;
                if (!results || !(r = results[0]))
                    resolve(null);
                for (let i in r) {
                    resolve(r[i]);
                    return;
                }
                resolve(null);
            };
            if (valores)
                this.connection.query(queryStr, valores, terminar);
            else
                this.connection.query(queryStr, terminar);
        });
    }
    async beginTransaction() {
        return new Promise((resolve, reject) => {
            if (this.transacaoAberta) {
                reject(new Error("Já existe uma transação aberta"));
                return;
            }
            this.connection.beginTransaction(error => {
                if (error) {
                    reject(error);
                    return;
                }
                this.transacaoAberta = true;
                resolve();
            });
        });
    }
    async commit() {
        return new Promise((resolve, reject) => {
            if (!this.transacaoAberta) {
                resolve();
                return;
            }
            this.connection.commit(error => {
                if (error) {
                    reject(error);
                    return;
                }
                this.transacaoAberta = false;
                resolve();
            });
        });
    }
    async rollback() {
        return new Promise((resolve, reject) => {
            if (!this.transacaoAberta) {
                resolve();
                return;
            }
            this.connection.rollback(error => {
                if (error) {
                    reject(error);
                    return;
                }
                this.transacaoAberta = false;
                resolve();
            });
        });
    }
};
//# sourceMappingURL=sql.js.map