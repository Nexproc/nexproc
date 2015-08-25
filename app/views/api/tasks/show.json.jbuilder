json.extract! @task, :id, :project_id, :name, :body, :user_id, :parent_task_id, :completed, :due_date, :start_date

json.sub_tasks @task.tasks do |sub_task|
  json.extract! sub_task, :id, :project_id, :name, :body, :user_id, :parent_task_id, :completed, :due_date, :start_date
end

json.members @task.project.team.members do |member|
  json.extract! member, :id, :username
end
