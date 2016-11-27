class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users

  validates :name, :user_ids, presence: true
end
