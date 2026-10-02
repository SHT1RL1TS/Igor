CREATE TABLE IF NOT EXISTS users (
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(50) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
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
INSERT INTO users (username, password, avatar_url) VALUES
    ('SHT1RL1TS', 'password1', '/avatars/SHT1RL1TS.png'),
    ('roton4ik',  'password2', '/avatars/roton4ik.png'),
    ('Nastya',    'password3', '/avatars/Nastya.png')
ON CONFLICT (username) DO NOTHING;

-- Демо-чаты соответствуют пользователям в списке слева.
INSERT INTO chats (id) VALUES (2), (3)
ON CONFLICT (id) DO NOTHING;

SELECT setval(
    pg_get_serial_sequence('chats', 'id'),
    GREATEST((SELECT MAX(id) FROM chats), (SELECT last_value FROM chats_id_seq))
);
