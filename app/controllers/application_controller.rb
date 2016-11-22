class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameter, if: :devise_controller?

  def configure_permitted_parameter
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
