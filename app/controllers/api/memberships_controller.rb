class Api::MembershipsController < ApplicationController
  def destroy
    options = { user_id: current_user.id, team_id: params[:team_id] }
    @membership = Membership.find_by(options)
    team = @membership.team
    @membership.destroy!
    team.destroy! if team.memberships.size = 0;
    render json: {}
  end

  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      render json: @membership
    else
      unprocessable(@membership)
    end
  end

  private
  def membership_params
    params.require(:membership).permit(:user_id, :team_id)
  end
end
