class Team < ActiveRecord::Base
  has_many :memberships, dependent: :destroy
  has_many :members, through: :memberships, source: :user
  belongs_to (
      :admin,
      class_name: "User",
      foreign_key: :admin_id,
      primary_key: :id
    )
  validates :name, presence: true
end
