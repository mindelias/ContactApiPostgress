import jwt from "jsonwebtoken";
import decode from 'jwt-decode';
// import decode from "jsonwebtoken-decode";

export function generateToken(id: string, email: string) {
  const token = jwt.sign(
     {
      id,
      email
    },
    "jwtSecret",
    {
      expiresIn: 3600000
    } 
  );
  return token;
}

export function decodeToken(token:any){
  const decoded = decode(token)
  return decoded
}
