import db from './appsettings.js'

export default {
	client: 'mysql',
	connection: db,
	pool: {
		min: 2,
		max: 30
	}
};