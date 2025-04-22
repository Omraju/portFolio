import express from 'express';
const router = express.Router();
import portFolioServices from '../services/portFolio.js';
import appLogger from '../logging/appLogger.js';

router.post("/", async function (req, res) {
    try {
        let details = req.body
        if (!details) {
            throw new Error("Mandatory fields Missing !")
        }
        let response = await portFolioServices.add(details)
        res.send(response)
    } catch (err) {
        appLogger.error("Error In adding Education", err.message)
        res.status(500).send({ name: err.name, message: err.message });
    }
})

export default router;