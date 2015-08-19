class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  helper_method :current_user
  protect_from_forgery with: :exception

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    user.reset_session!
    session[:session_token] = user.session_token
    redirect_to root_url
  end

  private
  def active_user
    redirect_to root_url if current_user
  end

  def no_active_user
    redirect_to new_sessions_url unless current_user
  end

  def unprocessable(entity)
    render json: entity.errors.full_messages, status: 422
  end

  def error404(object)
    errstring = "This is not the " + object + "you were looking for."
    render json: errstring, status: 404
  end
end
