class Api::V1::UsersController < ApplicationController
  before_action :init_service

  def create
    payload = { client_id: ENV['CLIENT_ID'], client_secret: ENV['CLIENT_SECRET'], user_params }
    render json: @service.users.get(payload)
  end

  def update
  end

  def show
  end

  def change_password
  end

  def check_email
  end

  def reset_password
  end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :password, :email, :image_url)
    end

    def init_service
      @service = WidgetApiService.new
    end
end
