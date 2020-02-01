import { Router } from "express";
// import joi from "@hapi/joi";


const router = Router();

router.get('/users', async(_req, res) => {
    res.send('register a user')

})

export default router