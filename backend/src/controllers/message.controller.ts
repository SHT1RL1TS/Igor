import { Request, Response } from 'express';
import { pool } from '../db.js';

// GET /api/chats/:chatId/messages — история сообщений чата
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      `SELECT m.id, m.text, m.created_at, m.sender_id, u.username AS sender_name
       FROM messages m
       JOIN users u ON u.id = m.sender_id
       WHERE m.chat_id = $1
       ORDER BY m.created_at ASC`,
      [req.params.chatId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// POST /api/chats/:chatId/messages — отправить сообщение
export const sendMessage = async (req: Request, res: Response) => {
  const { text, sender_id } = req.body;
  if (!text?.trim() || !sender_id) {
    return res.status(400).json({ error: 'text and sender_id are required' });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO messages (chat_id, sender_id, text)
       VALUES ($1, $2, $3)
       RETURNING id, text, created_at, sender_id`,
      [req.params.chatId, sender_id, text.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
