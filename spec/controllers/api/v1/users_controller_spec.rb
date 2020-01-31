require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do

  describe "GET #create" do
    it "returns http success" do
      get :create
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #update" do
    it "returns http success" do
      get :update
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "returns http success" do
      get :show
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #change_password" do
    it "returns http success" do
      get :change_password
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #check_email" do
    it "returns http success" do
      get :check_email
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #reset_password" do
    it "returns http success" do
      get :reset_password
      expect(response).to have_http_status(:success)
    end
  end

end
