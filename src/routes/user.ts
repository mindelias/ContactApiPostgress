import { Router } from "express";
import { AddNewUsers } from "../controllers/users";
import { db, sql } from "../model/contact-postgres";
import bcrypt from "bcryptjs";
// import joi from "@hapi/joi";

const router = Router();

router.get("/users", async (_req, res) => {
  res.send("register a user");
});

router.post("/users", async (req, res) => {
  const usersData = req.body;
  // const email = req.body.email

  try {
    const data = AddNewUsers(usersData);
    const [User] = await db.query(
      sql`SELECT * FROM users WHERE email = ${data.email}`
    );
    console.log(User);

    if (User) {
      res.status(400).json("user with the email already exist");
    }
    // Hash Password
    bcrypt.genSalt(10, (_err, salt) =>
      bcrypt.hash(data.password, salt, (err, hash) => {
        if (err) {
            res.status(500).send('server error')
        }
        data.password = hash;
        db.query(
          sql`INSERT INTO users(fullname, email, password) VALUES(${data.fullname}, ${data.email}, ${data.password})
          RETURNING *
          `
        )
          .then(result => res.status(201).json({ result }))
          .catch(err => res.status(409).json(err));
      })
    );
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default router;
