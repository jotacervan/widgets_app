class Api::V1::WidgetsController < ApplicationController
  before_action :init_service
  skip_before_action :verify_authenticity_token

  # //MARK: Widget Create
  def index
    begin
      response = @service.widgets.get
      
      data = check_response(response)

      render json: data
    rescue => e
      exception_handler_func(e)
    end
  end

  # //MARK: Widget Visible
  def visible
    begin
      payload = client_id_secret
      payload[:term] = params[:term] if params[:term]
      response = @service.widgets["/visible"].get({params: payload})
      
      data = check_response(response)

      render json: data
    rescue => e
      exception_handler_func(e)
    end
  end

  # //MARK: Widget Create
  def create
    begin
      payload = {
        widget: widget_params.as_json
      }

      response = @service.widgets.post(payload)
      
      data = check_response(response)

      render json: data
    rescue => e
      exception_handler_func(e)
    end
  end

  # //MARK: Widget Update
  def update
    begin
      payload = {
        widget: widget_params.as_json
      }

      response = @service.widgets["/#{params[:id]}"].put(payload)
      
      data = check_response(response)

      render json: data
    rescue => e
      exception_handler_func(e)
    end
  end

  # //MARK: Widget Destroy
  def destroy
    begin
      response = @service.widgets["/#{params[:id]}"].delete
      
      data = check_response(response)

      render json: data
    rescue => e
      exception_handler_func(e)
    end
  end

  private
    def widget_params
      params.require(:widget).permit(:name, :description, :kind)
    end

end