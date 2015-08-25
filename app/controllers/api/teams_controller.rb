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
      error404("team")
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

  def destroy
    team = current_user.teams.find(params[:id])
    current_user.teams.delete(team)
    current_user.save
    team.destroy! if team.members.empty?
    render json: {}
  end

  private
  def team_params
    params.require(:team).permit(:name)
  end
end
