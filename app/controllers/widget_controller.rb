class WidgetController < ApplicationController
  def index
    @logged = session[:auth_token].present?
  end
end
