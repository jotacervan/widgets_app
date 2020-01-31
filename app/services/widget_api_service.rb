class WidgetApiService
  attr_reader :authentication_token, :base_url

  def initialize(authentication_token = nil)
    @authentication_token = authentication_token
    @base_url = 'https://showoff-rails-react-production.herokuapp.com/api/v1'
  end

  def headers
    {
      'Content-type': 'application/json',
      'Authorization': "Bearer #{@authentication_token}"
    }
  end

  def users
    url = @base_url + '/users'
    RestClient::Resource.new(url, { headers: headers } )
  end

  def oauth
    url = @base_url + '/oauth'
    RestClient::Resource.new(url, { headers: headers } )
  end

  def widgets
    url = @base_url + '/widgets'
    RestClient::Resource.new(url, { headers: headers } )
  end

end
