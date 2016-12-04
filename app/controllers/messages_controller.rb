class MessagesController < ApplicationController
  before_action :authenticate_user!, only: :index
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @group.messages, include: :user }
    end
  end

  def create
    @message = @group.messages.build(message_params)
    respond_to do |format|
      if @message.save
        format.html do
          redirect_to group_messages_path(@group)
        end
        format.json do
          render json: @message, include: :user
        end
      else
        format.html do
          redirect_to group_messages_path(@group), alert: t('.alert')
        end
        format.json do
          render json: @message.errors, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end
end
