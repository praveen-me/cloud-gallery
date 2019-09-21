const { dbuser } = process.env;
const { dbpassword } = process.env;

const { MONGOB_URI } = process.env;

module.exports = MONGOB_URI;
