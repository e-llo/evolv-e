
import app = require("teem");

app.run({
	sqlConfig: {
		connectionLimit: 30,
		charset: "utf8mb4",
		host: "localhost",
		port: 1337,
		user: "root",
		password: "root",
		database: "evolve"
	}
});