require 'rails_helper'

RSpec.describe Api::V1::AuthController, type: :controller do
  context "Without session" do
    describe "GET #create" do
      it "returns http success" do
        get :create, {
          params: {
            username: "jota.cervan@gmail.com",
            password: "hakunamatata"
          }
        }
        expect(response).to have_http_status(:success)
      end
    end

    describe "GET #revoke" do
      before(:each) do
        get :create, {
          params: {
            username: "jota.cervan@gmail.com",
            password: "hakunamatata"
          }
        }
      end
      it "returns http success" do
        get :revoke
        expect(response).to have_http_status(:success)
      end
    end
  end

end
