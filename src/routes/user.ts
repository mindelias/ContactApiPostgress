import { Router } from "express";
import { getUsers,AddNewUsers, Login } from "../controllers/users";
 

const router = Router();

router.get("/users/register", async (_req, res) => {
  const data = await getUsers();

  if (data.length === 0) {
    res.status(204).json({ data });

    return;
  }

  res.status(200).json({ data });
});

router.post("/users/register", async (req, res) => {
  const usersData = req.body;
  // const email = req.body.email

  try {
    const data = await AddNewUsers(usersData);
     
    if (!data.length) {
      res.status(400).json("user with the email already exist");
    }
    res.status(200).json({ data });
    
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/users/login", async (req, res) => {
  const loginData = req.body;
    try{
    const data = await Login(loginData);
    if(!data.length){
      res.status(400).json({msg: 'users does not exist or invalid credential'})
    }
    res.status(200).json({ data });
  }catch(err){
    res.status(400).json({error:err})
  }
    
});

export default router;
