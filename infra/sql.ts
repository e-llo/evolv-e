import mysql = require("mysql");
import SqlPool = require("./sqlPool");

export = class Sql {
	// https://www.npmjs.com/package/mysql

	private connection;
	private transacaoAberta: boolean;
	public linhasAfetadas: number;

	public static async conectar(callback: (sql: Sql) => Promise<void>): Promise<void> {
		return new Promise<void>((resolve, reject) => {
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
							} else {
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
							} else {
								connection.release();
								reject(reason);
							}
						});
				} catch (e) {
					if (sql.transacaoAberta) {
						sql.transacaoAberta = false;
						connection.rollback(error => {
							connection.release();
							if (error)
								reject(error);
							else
								reject(e);
						});
					} else {
						connection.release();
						reject(e);
					}
				}
			});
		});
	}

	public async query(queryStr: string, valores: any[] = null): Promise<any[]> {
		return new Promise<any[]>((resolve, reject) => {
			let terminar = (error, results, fields) => {
				if (error) {
					reject(error);
					return;
				}

				this.linhasAfetadas = parseInt(results.affectedRows);

				resolve(results as any[]);
			};

			if (valores)
				this.connection.query(queryStr, valores, terminar);
			else
				this.connection.query(queryStr, terminar);
		});
	}

	public async scalar(queryStr: string, valores: any[] = null): Promise<any> {
		return new Promise<any>((resolve, reject) => {
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

	public async beginTransaction(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
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

	public async commit(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
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

	public async rollback(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
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
}
