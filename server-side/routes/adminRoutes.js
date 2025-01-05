const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get("/admin/:table_name", async (req, res)=>{
    const table_name = req.params.table_name;
    try {
        const result = await pool.query(`SELECT * FROM ${table_name}`);
        const response = result.rowCount;
        if(response){
            const data = result.rows;
            res.status(200).json(data)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

router.delete("/admin/:table_name/:id", async (req, res)=>{
    const {table_name, id} = req.params;
    try {
        const result = await pool.query(`DELETE FROM ${table_name} WHERE id = ${id}`);
        res.status(200).json({message: "Deleted successfully!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

module.exports = router;