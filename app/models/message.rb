class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  validates :group, :user, presence: true
  mount_uploader :image, ImageUploader
end
