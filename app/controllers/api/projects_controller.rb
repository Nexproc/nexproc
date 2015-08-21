class Api::ProjectsController < ApplicationController
  before_action :no_active_user

  def index
    @projects = current_user.projects
    render json: @projects
  end

  def show
    @project = Project.find(params[:id])
    if @project && current_user.projects.include?(@project)
      render :show
    else
      error404("project")
    end
  end

  def create
    @project = Project.new(project_params);
    if @project.save
      render json: @project
    else
      unprocessable(@project)
    end
  end

  def update
    @project = Project.find(params[:id])
    if @project && @project.update(team_params)
      render json: @project
    elsif @project
      unprocessable(@project)
    else
      error404('project')
    end
  end

  def destroy
    proj = Project.find(params[:id])
    if proj
      proj.destroy!
      render json: {}
    else
      error404('project')
    end
  end

  private
  def project_params
    params.require(:project).permit(:name, :description, :team_id);
  end
end
