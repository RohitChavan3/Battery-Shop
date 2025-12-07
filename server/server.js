const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const dbConfig = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

sql.connect(dbConfig).catch(err => console.log(err));

app.get("/api/companies", async (req, res) => {
    try {
        let result = await sql.query("SELECT company_id, company_name FROM companies ORDER BY company_name");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/api/models/:companyId", async (req, res) => {
    try {
        let result = await sql.query(`
            SELECT model_id, model_name 
            FROM models WHERE company_id = ${req.params.companyId} 
            ORDER BY model_name
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
