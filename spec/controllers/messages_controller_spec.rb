require 'rails_helper'

RSpec.describe MessagesController, type: :controller do
  let(:user) { create(:user) }
  let(:group) { create(:group) }

  describe 'GET #index' do
    context "when user logs in" do
      before { login_user(user) }
      it "renders the :index template" do
        get :index, group_id: group
        expect(response).to have_http_status(:success)
      end
    end

    context "when user doesn't log in" do
      it "redirect to user sign in page" do
        get :index, group_id: group
        expect(response).to redirect_to new_user_session_path
      end
    end
  end

  describe 'POST #create' do
    before { login_user(user) }

    context "when saves the message successfully" do
      let(:message_params) { attributes_for(:message) }
      let(:params) { { message: message_params, user_id: user, group_id: group } }

      it "saves the message in the database" do
        expect{
          post :create, params
        }.to change(Message, :count).by(1)
      end

      it "redirect to message page" do
        post :create, params
        expect(response).to redirect_to group_messages_path(group)
      end
    end

    context "when failed to save the message" do
      let(:message_params) { attributes_for(:message, body: nil) }
      let(:params) { { message: message_params, user_id: user, group_id: group } }

      it "redirect to message page" do
        post :create, params
        expect(response).to redirect_to group_messages_path(group)
      end
    end
  end
end
