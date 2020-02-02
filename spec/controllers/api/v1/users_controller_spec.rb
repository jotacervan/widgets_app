require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  context "Register a new user" do
    describe "GET #create" do
      it "returns http success" do
        instance_double(RestClient::Response,
          body: {
            'isAvailable' => true,
            'imageAvailable' => false,
          }.to_json)

        post :create 
        
        allow(RestClient::Request).to receive(:execute).and_return(response)
      end
    end
  end
  context "Protected routes" do
    describe "GET #update" do
      it "returns http success" do
        get :update, params: { id: 100 }
        expect(response).to have_http_status(401)
      end
    end

    describe "GET #show" do
      it "returns http success" do
        get :show, params: { id: 100 }
        expect(response).to have_http_status(401)
      end
    end

    describe "GET #change_password" do
      it "returns http success" do
        get :change_password
        expect(response).to have_http_status(401)
      end
    end
  end

end
