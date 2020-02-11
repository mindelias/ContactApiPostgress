import joi from "@hapi/joi";
import { db, sql } from "../model/contact-postgres";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/helper";
type Users = {
  id: string;
  fullname: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

type createUsers = Pick<Users, "fullname" | "email" | "password">;
type loginUsers = Pick<Users, "email" | "password">;

const createUsersSchema = joi.object<createUsers>({
  fullname: joi
    .string()
    .trim()
    .required(),

  email: joi
    .string()
    .trim()
    .email()
    .required(),

  password: joi
    .string()
    .trim()
    .required()
    .min(6)
});

const createLoginSchema = joi.object<loginUsers>({
  email: joi
    .string()
    .trim()
    .email()
    .required(),

  password: joi
    .string()
    .trim()
    .required()
    .min(6)
});
// get all Users
export async function getUsers() {
  return db.query(sql`SELECT * FROM  users;`);
}
// Add new Users
export async function AddNewUsers(users: createUsers) {
  const { error, value } = createUsersSchema.validate(users, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw error.details[0].message;
  }

  // check if user already  exist in the database
  const [User] = await db.query(
    sql`SELECT * FROM users WHERE email = ${value.email}`
  );

  if (User) {
    return [];
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  value.password = await bcrypt.hash(value.password, salt);
  if (!value.password) {
    return [];
  }
  const [newUser] = await db.query(
    sql`INSERT INTO users(fullname, email, password) VALUES(${value.fullname}, ${value.email}, ${value.password})
    RETURNING *
    `
  );
  const token = generateToken(newUser.id, value.email);
  const newObj = [
    {
      id: newUser.id,
      email: newUser.email,
      token
    }
  ];

  return newObj;
}
// Get Validated Users
export async function getLoggedUsers(decoded: any) {
  return db.query(sql`SELECT * FROM  users WHERE id=${decoded.id};`);
}

// Login users Validation
export async function Login(data: createUsers) {
  const { error, value } = createLoginSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw error.details[0].message;
  }
  // check if user exist in the database
  const [User] = await db.query(
    sql`SELECT * FROM users WHERE email = ${value.email}`
  );

  if (!User) {
    return [];
  }

  //  check if password matches
  const isMatch = await bcrypt.compare(value.password, User.password);

  if (!isMatch) {
    return [];
  }

  const token = generateToken(User.id, value.email);
  const newObj = [
    {
      id: User.id,
      email: User.email,
      token
    }
  ];
  return newObj;
}
