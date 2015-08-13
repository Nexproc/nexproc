class Api::MembershipsController < ApplicationController
  def destroy
    @membership = Membership.find(params[:id]).includes(:team)
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
