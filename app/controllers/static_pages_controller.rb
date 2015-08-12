class StaticPagesController < ApplicationController
  before_action :no_active_user

  def show
  end

  private
  def be_logged_in
    redirect_to new_sessions_url unless current_user
  end
end
