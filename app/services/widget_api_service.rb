class WidgetApiService
  attr_reader :authentication_token, :client_id, :client_secret, :base_url

  def initialize()
    @authentication_token = session[:authentication_token]
    @client_id = ENV['CLIENT_ID']
    @client_secret = ENV['CLIENT_SECRET']
    @base_url = 'https://showoff-rails-react-production.herokuapp.com/api/v1'
  end

  def headers
    {
      'Content-type': 'application/json'
    }
  end

  def headers_auth
    {
      'Content-type': 'application/json',
      'Authorization': "Bearer #{authentication_token}"
    }
  end

  def users
    url = @base_url + '/users'
    RestClient::Resource.new(url, { headers: headers } )
  end

  def widgets
    url = @base_url + '/widgets'
    RestClient::Resource.new(url, { headers: headers } )
  end

end
