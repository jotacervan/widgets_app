class ApplicationController < ActionController::Base
  # //MARK: Init Service
  def init_service
    @service = WidgetApiService.new(authentication_token)
  end

  # //MARK: Get Authentication Token
  def authentication_token
    if session[:authentication_token]
      if DateTime.now >= session[:expires_at]
        refresh_token
      else
        session[:authentication_token]
      end
    else
      nil
    end
  end

  # //MARK: Refresh Token
  def refresh_token
    @service = WidgetApiService.new(session[:authentication_token])    
    payload = {
      grant_type: "refresh_token",
      refresh_token: session[:refresh_token]
    }.merge(client_id_secret)
    response = @service.oauth['/token'].post(payload)
    set_auth_sessions(data)
    session[:authentication_token]
  end

  # //MARK: Set Auth Sessions
  def set_auth_sessions(data)
    session[:authentication_token] = data["data"]["token"]["access_token"]
    session[:refresh_token] = data["data"]["token"]["refresh_token"]
    session[:expires_at] = DateTime.now + data["data"]["token"]["expires_in"].to_i.seconds
  end

  # //MARK: Client Id and Secret
  def client_id_secret
    {
      client_id: ENV['CLIENT_ID'], 
      client_secret: ENV['CLIENT_SECRET'], 
    }
  end

  # //MARK: Exception Handler and logout
  def exception_handler_func(e)
    session[:authentication_token] = nil
    render json: e, status: 401
  end

  # //MARK: Check Response
  def check_response(response)
    if response.code == 200
      JSON.parse(response.body)
    else
      { error_message: "Some error occured please contact the administrator" }
    end
  end

  # //MARK: Check and refresh token
  def check_response_and_refresh_token(response)
    if response.code == 200
      data = JSON.parse(response.body)
      set_auth_sessions(data)
      data
    else
      { error_message: "Some error occured please contact the administrator" }
    end
  end

end
