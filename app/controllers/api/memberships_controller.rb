class Api::MembershipsController < ApplicationController
  def destroy
    team = Team.includes(:members).find(params[:id])
    team.members.delete(current_user)
    team.destroy! if team.members.size == 0;
    render json: "destructificated"
  end

  def create
    @member = User.find_by(username: params[:user][:name])
    if !@member
      error404("user")
    else
      team = Team.find(params[:team_id])
      team.members << @member
      if team.save
        render json: @member
      else
        unprocessable(@member)
      end
    end
  end

  def index
    @memberships = Membership.includes(:user).where(team_id: params[:team_id]);
    render :index
  end
end
