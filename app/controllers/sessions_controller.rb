class SessionsController < ApplicationController
  before_action :active_user, only: [:new, :create]
  before_action :no_active_user, only: [:destroy]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      login!(@user)
    else
      flash.now[:errors] = "Invalid Username or Password"
      @user = User.new(username: params[:username])
      render :new
    end
  end

  def destroy
    current_user.reset_session!
    session[:session_token] = nil;
    redirect_to static_page_url
  end
end
