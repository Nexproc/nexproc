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
    redirect_to root
  end

  private
  def active_user
    redirect_to static_page_url if current_user
  end

  def no_active_user
    redirect_to new_sessions_url unless current_user
  end
end
