DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS goals CASCADE;
DROP TABLE IF EXISTS milestones CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE users
(
    username text PRIMARY KEY NOT NULL,
    email text,
    password text NOT NULL,
    created_at timestamp without time zone default CURRENT_TIMESTAMP,
    goals_set integer,
    goals_completed integer
);

CREATE TABLE goals
(
    id SERIAL PRIMARY KEY,
    username text NOT NULL REFERENCES users,
    goal_name text,
    created_at timestamp without time zone default CURRENT_TIMESTAMP,
    completed boolean default FALSE,
    percentage integer
);

CREATE TABLE milestones
(
    id SERIAL PRIMARY KEY,
    goal_id integer REFERENCES goals,
    completed boolean default FALSE,
    tags text,
    milestone_name text NOT NULL
);

CREATE TABLE tasks
(
    id SERIAL PRIMARY KEY,
    milestone_id integer REFERENCES milestones,
    task_name text NOT NULL,
    completed boolean default FALSE
);
