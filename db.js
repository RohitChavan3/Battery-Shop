const sql = require("mssql");

const config = {
    user: "sa2",
    password: "Rohit@6598",
    server: "DESKTOP-RA4UQQC",
    database: "BatteryShopDB",
    options: {
        trustServerCertificate: true
    }
};

module.exports = config;
