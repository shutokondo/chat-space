require 'rails_helper'

RSpec.describe Message, type: :model do
  it "valid" do
    expect(build(:message)).to be_valid
  end

  describe "validation" do
    %w(body group user).each do |content|
      it "is invalid withoud #{content}" do
        message = build(:message, "#{content}": nil)
        message.valid?
        expect(message.errors["#{content}"]).to include("を入力してください")
      end
    end
  end
end
