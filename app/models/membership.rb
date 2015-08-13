class Membership < ActiveRecord::Base
  belongs_to :user
  belongs_to :team
  validates :user, :team, presence: true
  validates :user, uniqueness: { scope: :team }
end
