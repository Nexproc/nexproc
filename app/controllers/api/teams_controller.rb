class Api::TeamsController < ApplicationController
  before_action :no_active_user
  def index
    @teams = current_user.teams
    render json: @teams
  end

  def show
    @team = Team.includes(:members, :projects).find(params[:id])

    if @team && @team.members.include?(current_user)
      render :show
    else
      render json: "This is not the team you are looking for.", status: 403
    end
  end

  def create
    @team = Team.new(team_params)
    @team.members << current_user
    if @team.save
      render json: @team
    else
      unprocessable(@team)
    end
  end

  def update
    @team = Team.find(params[:team][:id])
    if @team.update(team_params)
      render json: @team
    else
      unprocessable(@team)
    end
  end

  private
  def team_params
    params.require(:team).permit(:name)
  end
end
