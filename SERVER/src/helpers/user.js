import db from '../models/index';

const { pool } = db;

class UserHelpers {
  static async findUser(value, type) {
    const client = await pool.connect();
    let queryText;
    if (type === 'email') {
      queryText = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [value],
      };
    } else {
      queryText = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [value],
      };
    }
    try {
      const user = await client.query(queryText);
      if (user.rows.length === 0) {
        return { exist: false, data: null };
      }
      return { exist: true, data: user.rows[0] };
    } catch (err) {
      return { error: err.message };
    } finally {
      await client.release();
    }
  }

  static async createUser({
    firstname, lastname, email, phone, password, isAdmin,
  }) {
    const client = await pool.connect();
    const query = {
      text: 'INSERT INTO users (firstname, lastname, email, phone, password, isAdmin ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [firstname, lastname, email, phone, password, isAdmin],
    };
    try {
      const userData = await client.query(query);
      return { exist: false, data: userData.rows[0] };
    } catch (err) {
      return { exist: true, data: null, msg: err.message };
    } finally {
      await client.release();
    }
  }
}

export default UserHelpers;
