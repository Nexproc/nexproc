class Project < ActiveRecord::Base
  validates :name, :team, presence: true
  belongs_to :team
  has_many :tasks
end
