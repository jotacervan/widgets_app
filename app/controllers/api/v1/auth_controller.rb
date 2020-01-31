class Api::V1::AuthController < ApplicationController
  before_action :init_service

  # //MARK: Auth Create
  def create
    begin
      payload = {
        "grant_type": "password",
        "username": params[:username],
        "password": params[:password]
      }.merge(client_id_secret)

      response = @service.oauth['/token'].post(payload)
      
      data = check_response_and_refresh_token(response)

      render json: data
    rescue => e
      exception_handler_func(e)
    end
  end

  # //MARK: Auth Revoke
  def revoke
    begin
      payload = {
        token: authentication_token
      }
      response = @service.oauth['/revoke'].post(payload)
      
      data = check_response(response)
      session.clear

      render json: data
    rescue => e
      exception_handler_func(e)
    end
  end
end