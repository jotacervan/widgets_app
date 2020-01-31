class WidgetController < ApplicationController
  def index
    @logged = session[:authentication_token].present?
  end
end
