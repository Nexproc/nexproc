class SessionsController < ApplicationController
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
    redirect_to new_sessions_url
  end
end
