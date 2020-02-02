/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('contacts', {
        user_id: {
            type: 'VARCHAR(100)'
        }
    })
};

exports.down = pgm => {};
