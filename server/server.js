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

app.get("/api/batteries", async (req, res) => {
    const { companyId, modelId } = req.query;

    if (!companyId || !modelId) {
        return res.status(400).json({ message: "companyId and modelId required" });
    }

    try {
        const result = await sql.query`
            SELECT 
                BatteryId,
                Brand,
                BatteryName,
                CapacityAh,
                WarrantyMonths,
                Price,
                ImageUrl,
                Specs
            FROM Batteries
            WHERE Company_Id = ${companyId}
              AND Model_Id = ${modelId}
              AND IsActive = 1
            ORDER BY Price ASC
        `;

        res.json(result.recordset);
    } catch (err) {
        console.error("Battery API error:", err);
        res.status(500).json({ error: "Failed to fetch batteries" });
    }
});




app.listen(5000, () => console.log("Server running on port 5000"));
