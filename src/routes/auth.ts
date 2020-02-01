import { Router } from "express";
// import joi from "@hapi/joi";


const router = Router();

router.get('/auth', async(_req, res) => {
    res.send('i get aithetication')

})

router.post('/auth', async(_req, res) => {
    res.send('this ia post auth')

})

export default router