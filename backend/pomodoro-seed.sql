-- inserts test user with the password 'password'
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
VALUES ('testadmin', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin',
        'testadmin@email.com',
        'assets/default_pfp.jpg',
        0,
        TRUE);

-- inserts additional users for example data
INSERT INTO users (username, password, first_name, last_name, email, avatar, num_pomodoros, is_admin)
VALUES ('testuser2', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User2',
        'testuser2@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE),
        ('testuser3', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User3',
        'testuser3@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE),
        ('testuser4', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User4',
        'testuser4@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE),
        ('testuser5', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User5',
        'testuser5@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE),
        ('testuser6', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User6',
        'testuser6@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE),
        ('testuser7', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User7',
        'testuser7@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE),
        ('testuser8', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User8',
        'testuser8@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE),
        ('testuser9', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User9',
        'testuser9@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE),
        ('testuser10', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User10',
        'testuser10@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE);

-- inserts test friend requests from testuser to testadmin
INSERT INTO friends (sender, receiver, request_status)
VALUES ('testadmin', 'testuser', FALSE),
        ('testuser2', 'testuser', FALSE),
        ('testuser3', 'testuser', FALSE),
        ('testuser4', 'testuser', FALSE),
        ('testuser8', 'testuser', TRUE),
        ('testuser9', 'testuser', TRUE),
        ('testuser10', 'testuser', TRUE);

-- inserts test list for testuser
INSERT INTO lists (username)
VALUES ('testuser'),
        ('testuser2'),
        ('testuser3'),
        ('testuser4');

-- inserts test list for testadmin
INSERT INTO lists (username)
VALUES ('testadmin');

-- inserts test task for testuser
INSERT INTO tasks (title, list_id)
VALUES ('Test Task', 1),
        ('Test Task 2', 1),
        ('Test Task 3', 1),
        ('Test Task 4', 1),
        ('Test Task 5', 1),
        ('Test Task 6', 1),
        ('Test Task 7', 1),
        ('Test Task 8', 1),
        ('Test Task 9', 1),
        ('Test Task 10', 1),
        ('Test Task', 2),
        ('Test Task 2', 2),
        ('Test Task 3', 2),
        ('Test Task', 3),
        ('Test Task 2', 3),
        ('Test Task 3', 3);