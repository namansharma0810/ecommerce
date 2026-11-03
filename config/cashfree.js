const {Cashfree} = require("cashfree-pg");

var cashfree = new Cashfree(Cashfree.SANDBOX, process.env.CASHFREE_APP_ID, process.env.CASHFREE_SECRET_KEY)

module.exports = cashfree;