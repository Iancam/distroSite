class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  protected
  def logged_in?
  	current_user != nil
  end

  def authorize
  	unless logged_in?
  		flash[:error] = "unauthorized access"
  		redirect_to log_in_path
  		false
  	end
  	true
  end

  private
  def current_user
  	session[:user]
  end
end
