import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import joi from "@hapi/joi";

export default function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.header("token");
  if (!token) {
    return res.status(401 ).json({
      error: "Access denied, provide token"
    });
  }
  

  jwt.verify(token, "jwtSecret", (error: any) => {
    if (error) {
      res.status(400).json({
        error: "Access denied, token is invalid"
      });
    }
  });
  return next();
}
