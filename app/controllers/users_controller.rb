class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end

  #chalk up for removal
  def show
    @user = current_user
    render :show
  end
end
