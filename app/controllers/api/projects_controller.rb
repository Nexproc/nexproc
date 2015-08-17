class Api::ProjectsController < ApplicationController
  before_action :no_active_user

  def index
    @projects = current_user.projects
    render json: @projects
  end

  def show
    #TODO: include tasks once they are created
    @project = Project.find(params[:id])
    render json: :show
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
    if @project.update(team_params)
      render json: @project
    else
      unprocessable(@project)
    end
  end

  def destroy
    Project.find(params[:id]).destroy!
    render json: {}
  end

  private
  def project_params
    params.require(:project).permit(:name, :description, :team_id);
  end
end
