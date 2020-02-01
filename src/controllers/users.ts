import joi from "@hapi/joi";

// import { db, sql } from "../model/contact-postgres";

type Users = {
    id:string,
    fullname:string,
    email:string,
    password:string,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date

}

type createUsers =  Pick<Users, "fullname" | "email" | "password">;

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

  export function AddNewUsers(users: createUsers) {
    const { error, value } = createUsersSchema.validate(users, {
      abortEarly: false,
      stripUnknown: true
    });
  
    if (error) {
      throw error;
    }
    return value
  
    // return db.query(sql`INSERT INTO users(fullname, email, phone, email, company) VALUES(${value.firstName}, ${value.lastName}, ${value.phone}, ${value.email}, ${value.company})
    // RETURNING *
    // `);
  }