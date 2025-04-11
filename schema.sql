CREATE TABLE toDoItems(
    id int auto_increment,
    title text,
    description text,
    done boolean, 
    isOverdue boolean,
    dueDate datetime,
    primary key(id)
);

-- Some test cases if you want them.
INSERT INTO toDoItems(title, description, done, isOverdue, dueDate) VALUES(
    'Make some bread', 
    'Let''s get that dough.',
    0,
    0,
    '2025-01-01 00:00:00'),
    (
        'Change that light bulb',
        'Jerry said the lights went out in his bathroom. Gotta get those changed.',
        1,
        0,
        '2024-12-29 15:00:00'
    ),
    (
        'Paint MG Wing Zero Custom Ver.ka',
        'Test out that brand new airbrush on that brand new kit.',
        0,
        1,
        '2024-07-15 12:00:00'
    ),
    (
        'Create a playlist', 
        'Put some songs together for the bake-off.',
        0,
        1,
        '2024-12-06 10:00:00'
    );