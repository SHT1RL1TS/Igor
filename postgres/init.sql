CREATE TABLE IF NOT EXISTS users (
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(50) UNIQUE NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    user_key VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS chats (
    id         SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);

-- участники чатов (связь many-to-many)
-- CREATE TABLE IF NOT EXISTS chat_members (
--     chat_id INT REFERENCES chats(id) ON DELETE CASCADE,
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     PRIMARY KEY (chat_id, user_id)
-- );

CREATE TABLE IF NOT EXISTS messages (
    id         SERIAL PRIMARY KEY,
    chat_id    INT REFERENCES chats(id) ON DELETE CASCADE,
    sender_id  INT REFERENCES users(id) ON DELETE CASCADE,
    text       TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- тестовые данные
INSERT INTO users (username, avatar_url, user_key) VALUES
    ('SHT1RL1TS', '/avatars/SHT1RL1TS.png', ''),
    ('roton4ik',  '/avatars/roton4ik.png', ''),
    ('Nastya',    '/avatars/Nastya.png', '')
ON CONFLICT (username) DO NOTHING;
