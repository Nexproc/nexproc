class Api::TeamsController < ApplicationController
  def index
    @teams = current_user.teams
    render json: @teams
  end

  def show
    #TODO: Include Projects Once Created
    @team = Team.includes(:members).find(params[:id])

    if @team && @team.members.include?(current_user)
      render :show
    else
      render json: ["This is not the team you are looking for."], status: 403
    end
  end

  def create
    @team = Team.new(team_params)
    if @team.save
      @membership = Membership.create(team_id: @team.id, user_id: current_user.id)
      render json: @team
    else
      unprocessable(@team)
    end
  end

  def update
    @team = Team.find(params[:id])
    if @team.save
      render json: @team
    else
      unprocessable(@team)
    end
  end

  def destroy
    @team = Team.find(params[:id])
    @team.destroy!
    render json: {}
  end

  private
  def team_params
    params.require(:team).permit(:name)
  end
end
