class Api::V1::UsersController < ApplicationController
  before_action :init_service

  # //MARK: User Create
  def create
    begin
      payload = { 
        user: user_params.as_json
      }.merge(client_id_secret)
      @service.users.post(payload) { |response| 
        data = check_response_and_refresh_token(response) if response.code == 200
        render json: data || response, status: response.code
      }
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
      @service.users["/me"].put(payload) { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  # //MARK: User me widget
  def get_widgets
    begin
      payload = client_id_secret
      payload[:term] = params[:term] if params[:term]
      @service.users["/#{params[:id]}/widgets"].get({params: payload}) { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
    rescue => e
      exception_handler_func(e)
    end
  end

  # //MARK: User Show Me
  def show_me
    begin
      @service.users["/me"].get { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  # //MARK: User Show (ID)
  def show
    begin
      @service.users["/#{params[:id]}"].get { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
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
      @service.users["/me/password"].post(payload) { |response| 
        data = check_response_and_refresh_token(response) if response.code == 200
        render json: data || response, status: response.code
      }
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
      @service.users["/email"].get({params: payload }) { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
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
      @service.users["/reset_password"].post(payload) { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
    rescue Exception => e
      exception_handler_func(e)
    end
  end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :password, :current_password, :new_password, :email, :image_url)
    end
end
