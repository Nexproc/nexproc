class Team < ActiveRecord::Base
  has_many :memberships, dependent: :destroy
  has_many :members, through: :memberships, source: :user
  has_many :projects
  validates :name, presence: true
end
