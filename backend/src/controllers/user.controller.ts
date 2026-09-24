import { Request, Response } from 'express';
import { CreateUserDTO, User } from '../types/user.js';

// Временное хранилище (вместо БД)
const users: User[] = [];

export const getUsers = (req: Request, res: Response) => {
  res.json({ success: true, data: users });
};

export const createUser = (req: Request<{}, {}, CreateUserDTO>, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ success: false, message: 'Name and email are required' });
    return;
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
};
