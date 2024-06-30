-- inserts test users with the password 'password'
INSERT INTO users (username, password, first_name, last_name, email, avatar, num_pomodoros, is_admin)
VALUES ('testuser', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'testuser@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE);

-- inserts test admin with the password 'password'
INSERT INTO users (username, password, first_name, last_name, email, avatar, num_pomodoros, is_admin)
VALUES('testadmin',
       '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
       'Test',
       'Admin',
       'testadmin@email.com',
       'assets/default_pfp.jpg',
       0,
       TRUE);

-- inserts test friends
INSERT INTO friends (sender, receiver, request_status)
VALUES ('testuser', 'testadmin', TRUE);

-- inserts test lists
INSERT INTO lists (username, list_type)
VALUES ('testuser', TRUE),
       ('testuser', FALSE);

-- inserts test tasks
INSERT INTO tasks (title, list_id, expected_pomodoros, completed_cycles)
VALUES ('Test Task 1', 1, 1, 0),
       ('Test Task 2', 1, 1, 0),
       ('Test Task 3', 2, 1, 0),
       ('Test Task 4', 2, 1, 0);