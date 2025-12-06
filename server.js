const express = require("express");
const sql = require("mssql");
const config = require("./db");

const app = express();
app.use(express.static("public")); // important

// Get companies
app.get("/companies", async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query("SELECT * FROM companies ORDER BY company_name");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get models by company
app.get("/models", async (req, res) => {
    const company_id = req.query.company_id;

    try {
        await sql.connect(config);
        const result = await sql.query(`
            SELECT * FROM models 
            WHERE company_id = ${company_id}
            ORDER BY model_name
        `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get batteries by model
app.get("/batteries", async (req, res) => {
    const model_id = req.query.model_id;

    try {
        await sql.connect(config);
        const result = await sql.query(`
            SELECT * FROM batteries 
            WHERE model_id = ${model_id}
        `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
