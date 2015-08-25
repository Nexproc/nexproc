class Api::TasksController < ApplicationController
  before_action :no_active_user
  before_action :can_access?

  def show
    @task = current_user.tasks.includes(project: {team: :members}).find(params[:id])
    if @task
      render :show
    else
      error404("task")
    end
  end

  def index
    render json: current_user.assigned_tasks
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      unprocessable(@task)
    end
  end

  def update
    @task = current_user.tasks.find(params[:id])
    if @task
      params[:task][:user_id] = current_user.id if task_params[:user_id] == -1
      if @task.update(task_params)
        render json: @task
      else
        unprocessable(@task)
      end
     else
      error404("task")
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    if @task
      if @task.destroy
        render json: {}
      else
        unprocessable(@task)
      end
    else
      error404("task")
    end
  end

  private
  def task_params
    params.require(:task).permit(
        :project_id,
        :name,
        :body,
        :user_id,
        :parent_task_id,
        :completed,
        :due_date,
        :start_date
      )
  end

  def can_access?
    #TODO: Authorize user access
  end
end
