json.extract! @project, :id, :team_id, :name, :description
json.tasks @project.tasks do |task|
  if task.parent_task_id.nil?
    json.extract! task, :id, :project_id, :name, :body, :user_id, :parent_task_id, :completed, :due_date, :start_date
  end
end
