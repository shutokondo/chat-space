class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :name
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
end
