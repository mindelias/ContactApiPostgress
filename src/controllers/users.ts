import joi from "@hapi/joi";
import { db, sql } from "../model/contact-postgres";

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

export async function AddNewUsers(users: createUsers) {
  const { error, value } = createUsersSchema.validate(users, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw error.details[0].message;
  }

  const [checkEmail] = await db.query(
    sql`SELECT 1 FROM users WHERE email = ${value.email}`
  );
  if (checkEmail != 0) {
    return 
  }

  return db.query(sql`INSERT INTO users(fullname, email, password) VALUES(${value.fullname}, ${value.email}, ${value.password})
    RETURNING *
    `);
}
