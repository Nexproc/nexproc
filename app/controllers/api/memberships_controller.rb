class Api::MembershipsController < ApplicationController
  def destroy
    team = Team.find(params[:team_id]).members.delete(current_user)
    team.destroy! if team.memberships.size = 0;
    render json: {}
  end

  def create
    @member = User.find_by(username: params[:user][:name])
    if !@member
      render json: ["This is not the user you are looking for"], status: 404;
    else
      team = Team.find(params[:team_id])
      if team.save
        render json: @member
      else
        unprocessable(@member)
      end
    end
  end
end
