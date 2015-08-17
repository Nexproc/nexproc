class Project < ActiveRecord::Base
  validates :name, :team, presence: true
  belongs_to :team
end
