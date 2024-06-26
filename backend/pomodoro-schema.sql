CREATE TABLE users (
    -- The username of the user acts as the primary key
    username VARCHAR(25) PRIMARY KEY,
    -- The password of the user will be hashed, so no need to limit the length
    password TEXT NOT NULL,
    -- Personal Information
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    -- Email must contain an @ and a . after the @
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1 AND position('.' IN email) > position('@' IN email) + 1),
    -- User Profile Information
    avatar TEXT DEFAULT 'assets/default_pfp.jpg',
    -- User Statistics
    num_pomodoros INT DEFAULT 0,
    -- User Settings
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE friends (
    -- The username of the user who sent the friend request
    sender VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    -- The username of the user who received the friend request
    receiver VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    -- The status of the friend request
    status BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (sender, receiver)
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    -- Used in title cards
    title VARCHAR(25) DEFAULT 'To-Do List',
    -- Reference to the users who have created or saved this list
    username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    -- The list type can either be 'focus' time or 'break' time, 
    list_type BOOLEAN DEFAULT TRUE,
    -- List Statistics
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expired_at TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    -- Used in task list cards
    title VARCHAR(30) NOT NULL,
    -- Reference to the list that the task belongs to
    list_id INT REFERENCES lists(id) ON DELETE CASCADE,
    -- Task Statistics
    expected_pomodoros INT DEFAULT 1,
    completed_cycles INT DEFAULT 0,
     BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)