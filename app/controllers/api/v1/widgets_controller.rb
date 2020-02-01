class Api::V1::WidgetsController < ApplicationController
  before_action :init_service

  # //MARK: Widget Create
  def index
    begin
      @service.widgets.get { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
    rescue => e
      exception_handler_func(e)
    end
  end

  # //MARK: Widget Visible
  def visible
    begin
      payload = client_id_secret
      payload[:term] = params[:term] if params[:term]
      @service.widgets["/visible"].get({params: payload}) { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
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
      @service.widgets.post(payload) { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
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
      @service.widgets["/#{params[:id]}"].put(payload) { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
    rescue => e
      exception_handler_func(e)
    end
  end

  # //MARK: Widget Destroy
  def destroy
    begin
      @service.widgets["/#{params[:id]}"].delete { |response| 
        data = check_response(response) if response.code == 200
        render json: data || response, status: response.code
      }
    rescue => e
      exception_handler_func(e)
    end
  end

  private
    def widget_params
      params.require(:widget).permit(:name, :description, :kind)
    end

end