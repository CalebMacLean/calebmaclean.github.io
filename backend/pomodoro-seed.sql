-- inserts two test users with the password 'password'
INSERT INTO users (username, password, first_name, last_name, email, avatar, num_pomodoros, is_admin)
VALUES ('testuser', 
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q'
        'Test',
        'User',
        'testuser@email.com',
        'assets/default_pfp.jpg',
        0,
        FALSE);