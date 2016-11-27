class MessagesController < ApplicationController
  before_action :authenticate_user!, only: :index
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
  end

  def create
    @message = @group.messages.build(message_params)
    if @message.save
      redirect_to group_messages_path(@group)
    else
      redirect_to group_messages_path(@group), alert: t('.alert')
    end
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:body).merge(user_id: current_user.id)
  end
end
