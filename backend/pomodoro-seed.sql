-- inserts test user with the password 'password'
INSERT INTO users (username, password, first_name, last_name, email, avatar, num_pomodoros, is_admin)
VALUES ('testuser', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q'
        'Test',
        'User',
        'testuser@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE);

-- inserts test admin with the password 'password'
INSERT INTO users (username, password, first_name, last_name, email, avatar, num_pomodoros, is_admin)
VALUES ('testadmin', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q'
        'Test',
        'Admin',
        'testadmin@email.com',
        'assets/default_pfp.jpg',
        0,
        TRUE);

-- inserts test friend request from testuser to testadmin
INSERT INTO friends (sender, receiver, status)
VALUES ('testuser', 'testadmin', FALSE);

-- inserts test list for testuser
INSERT INTO lists (username, expires_at)
VALUES ('testuser', NULL);

-- inserts test list for testadmin
INSERT INTO lists (username, expires_at)
VALUES ('testadmin', NULL)

-- inserts test task for testuser
INSERT INTO tasks (title, list_id, expected_pomodoros,)
VALUES ('Test Task',
        'testuser',
        1, 
        1, 
        0, 
        CURRENT_TIMESTAMP);