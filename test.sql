SELECT  u.username, 
        g.id AS goal_id,
        g.goal_name,
        g.created_at AS goal_created_at,
        g.completed AS goal_completed,
        m.milestone_name,
        m.id AS milestone_id,
        m.sequence AS milestone_sequence,
        m.completed AS milestone_completed,
        t.id AS task_id,
        t.sequence AS task_sequence,
        t.task_name,
        t.completed AS task_completed
FROM users AS u
    LEFT JOIN goals AS g ON u.username = g.username
    LEFT JOIN milestones AS m ON g.id = m.goal_id
    LEFT JOIN tasks AS t ON m.id = t.milestone_id
WHERE u.username = 'Sean';


SELECT  m.milestone_name,
        m.id AS milestone_id,
        m.sequence AS milestone_sequence,
        m.completed AS milestone_completed,
        g.id AS goal_id
FROM milestones AS m
    LEFT JOIN goals g ON g.id = m.goal_id
WHERE username = 'Sean';

SELECT  t.id AS task_id,
        t.sequence AS task_sequence,
        t.task_name,
        t.completed AS task_completed

SELECT  t.id AS task_id,
        t.sequence AS task_sequence,
        t.task_name,
        t.completed AS task_completed,
        t.milestone_id
FROM tasks AS t 
    JOIN milestones AS m ON t.milestone_id = m.id
WHERE m.goal_id = 6;
