/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      nonNull: true,
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
      comment: "This is the id field"
    },

    fullname: {
      type: "VARCHAR(100)",
      nonNull: true
    },

    email: {
      type: "VARCHAR(100)",
      nonNull: true,
      unique: true
    },

    password: {
      type: "TEXT"
    },

    created_at: {
      type: "timestamptz",
      nonNull: true,
      default: pgm.func("current_timestamp")
    },

    updated_at: {
      type: "timestamptz",
      nonNull: true,
      default: pgm.func("current_timestamp")
    },

    deleted_at: {
      type: "timestamptz",
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("users");
};
