import { Router } from "express";
import {AddNewUsers} from '../controllers/users'
// import joi from "@hapi/joi";


const router = Router();

router.get('/users', async(_req, res) => {
    res.send('register a user')

})

router.post('/users', async(req, res) => {
    const users = req.body;

    try {
      const data = await AddNewUsers(users);
  
      res.status(201).json({ data });
  
      return;
    } catch (err) {
      res.status(400).json({ error: err });
    }

})

export default router