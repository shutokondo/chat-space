class ChatController < ApplicationController
  before_action :authenticate_user!, only: :index

  def index
    @group = Group.find(params[:group_id])
  end
end
