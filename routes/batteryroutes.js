const express = require("express");
const router = express.Router();
const sql = require("mssql");
const dbConfig = require("../db");

router.get("/companies", async (req, res) => {
    await sql.connect(dbConfig);
    const result = await sql.query("SELECT company_id, company_name FROM companies");
    res.json(result.recordset);
});

router.get("/models/:companyId", async (req, res) => {
    await sql.connect(dbConfig);
    const result = await sql.query(`
        SELECT model_id, model_name 
        FROM models 
        WHERE company_id = ${req.params.companyId}
    `);
    res.json(result.recordset);
});

router.get("/batteries/:modelId", async (req, res) => {
    await sql.connect(dbConfig);
    const result = await sql.query(`
        SELECT * FROM batteries WHERE model_id = ${req.params.modelId}
    `);
    res.json(result.recordset);
});

module.exports = router;
