import mysql = require("mysql");
import appsettings = require("../appsettings");

export = class SqlPool {
	// https://www.npmjs.com/package/mysql
	public static readonly pool = mysql.createPool(appsettings.sqlPool);
}
