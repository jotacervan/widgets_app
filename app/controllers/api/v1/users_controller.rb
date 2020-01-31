class Api::V1::UsersController < ApplicationController
  before_action :init_service
  skip_before_action :verify_authenticity_token

  # //MARK: User Create
  def create
    begin
      payload = { 
        user: user_params.as_json
      }.merge(client_id_secret)
      response = @service.users.post(payload)

      data = check_response_and_refresh_token(response)

      render json: data
    rescue Exception => e
      exception_handler_func(e,true)
    end
  end

  # //MARK: User Update
  def update
    begin
      payload = { 
        user: user_params.as_json 
      }
      response = @service.users["/me"].put(payload)

      data = check_response(response)

      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  # //MARK: User Show Me
  def show_me
    begin
      response = @service.users["/me"].get

      data = check_response(response)

      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  # //MARK: User Show (ID)
  def show
    begin
      response = @service.users["/#{params[:id]}"].get

      data = check_response(response)

      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  # //MARK: User Change Password
  def change_password
    begin
      payload = { 
        user: user_params.as_json 
      }
      response = @service.users["/me/password"].post(payload)

      data = check_response_and_refresh_token(response)

      render json: data
    rescue Exception => e
      exception_handler_func(e,true)
    end
  end

  # //MARK: User Check Email
  def check_email
    begin
      payload = { 
        email: user_params['email']
      }.merge(client_id_secret)
      response = @service.users["/email"].get({params: payload })

      data = check_response(response)

      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  # //MARK: User Reset Password
  def reset_password
    begin
      payload = { 
        user: user_params.as_json 
      }.merge(client_id_secret)
      response = @service.users["/reset_password"].post(payload)

      data = check_response(response)

      render json: data
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :password, :current_password, :new_password, :email, :image_url)
    end
end
