

// Formats raw sql data into a clean and easy to navigate javascript object
function formatGoalObject(goalData, milestoneData, taskData) {
    const formattedObject = {
        goalId: goalData.goal_id,
        goalName: goalData.goal_name,
        goalOwner: goalData.username,
        goalCreatedAt: goalData.goal_created_at,
        goalCompleted: goalData.goal_completed
    }
    
    // Inserting milestones
    for (const milestone of milestoneData) {
        if (formattedObject.milestones) {
            formattedObject.milestones.push({
                milestoneId: milestone.milestone_id,
                milestoneName: milestone.milestone_name,
                milestoneSequence: milestone.milestone_sequence,
                milestoneCompleted: milestone.milestone_completed
            });
        } else {
            formattedObject.milestones = [{
                milestoneId: milestone.milestone_id,
                milestoneName: milestone.milestone_name,
                milestoneSequence: milestone.milestone_sequence,
                milestoneCompleted: milestone.milestone_completed
            }]
        }
    }

    for (const milestone of formattedObject.milestones) {
        for (task of taskData) {
            console.log(milestone.tasks);
            if (milestone.tasks && task.milestone_id === milestone.milestoneId) {
                milestone.tasks.push({
                    taskId: task.task_id,
                    taskName: task.task_name,
                    taskSequence: task.task_sequence,
                    taskCompleted: task.task_completed
                });
            } else if (task.milestone_id === milestone.milestoneId) {
                milestone.tasks = [{
                    taskId: task.task_id,
                    taskName: task.task_name,
                    taskSequence: task.task_sequence,
                    taskCompleted: task.task_completed
                }]
            }
        }
    }

    return formattedObject;
}

module.exports = formatGoalObject;