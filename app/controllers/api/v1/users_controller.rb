class Api::V1::UsersController < ApplicationController
  before_action :init_service
  skip_before_action :verify_authenticity_token

  def create
    begin
      # //NOTE: Create: Payload
      payload = { 
        user: user_params.as_json
      }.merge(client_id_secret)
      # //NOTE: Create: Request
      response = @service.users.post(payload)

      # //NOTE: Create: Check Reponse And RefreshToken
      data = check_response_and_refresh_token(response)

      # //NOTE: Create: Render
      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  def update
    begin
      # //NOTE: Create: Payload
      payload = { 
        user: user_params.as_json 
      }
      # //NOTE: Create: Request
      response = @service.users["/me"].put(payload)

      # //NOTE: Create: Check Reponse
      data = check_response(response)

      # //NOTE: Create: Render
      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  def show_me
    begin
      # //NOTE: Show Me: Request
      response = @service.users["/me"].get

      # //NOTE: Show Me: Check Reponse
      data = check_response(response)

      # //NOTE: Show Me: Render
      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  def show
    begin
      # //NOTE: Show: Request
      response = @service.users["/#{params[:id]}"].get

      # //NOTE: Show: Check Reponse
      data = check_response(response)

      # //NOTE: Show: Render
      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  def change_password
    begin
      # //NOTE: Create: Payload
      payload = { 
        user: user_params.as_json 
      }
      # //NOTE: Create: Request
      response = @service.users["/me/password"].post(payload)

      # //NOTE: Create: Check Reponse
      data = check_response_and_refresh_token(response)

      # //NOTE: Create: Render
      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  def check_email
    begin
      # //NOTE: Create: Payload
      payload = { 
        email: user_params['email']
      }.merge(client_id_secret)
      # //NOTE: Create: Request
      response = @service.users["/email"].get({params: payload })

      # //NOTE: Create: Check Reponse
      data = check_response(response)

      # //NOTE: Create: Render
      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  def reset_password
    begin
      # //NOTE: Create: Payload
      payload = { 
        user: user_params.as_json 
      }.merge(client_id_secret)
      # //NOTE: Create: Request
      response = @service.users["/reset_password"].post(payload)

      # //NOTE: Create: Check Reponse
      data = check_response(response)

      # //NOTE: Create: Render
      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  private
    def check_response(response)
      if response.code == 200
        JSON.parse(response.body)
      else
        { error_message: "Some error occured please contact the administrator" }
      end
    end

    def check_response_and_refresh_token(response)
      if response.code == 200
        data = JSON.parse(response.body)
        set_auth_sessions(data)
        data
      else
        { error_message: "Some error occured please contact the administrator" }
      end
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :password, :current_password, :new_password, :email, :image_url)
    end

    def init_service
      @service = WidgetApiService.new(authentication_token)
    end
end
