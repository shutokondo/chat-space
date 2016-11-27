class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  validates :body, :group, :user, presence: true
end
