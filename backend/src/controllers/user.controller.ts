import { Request, Response } from 'express';
import { pool } from '../db.js';

// GET /api/users — список всех пользователей (для сайдбара)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, username, avatar_url FROM users ORDER BY username'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET /api/users/:id — один пользователь
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, username, avatar_url FROM users WHERE id = $1',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
