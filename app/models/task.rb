class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :project
  belongs_to :parent_task, class_name: 'Task', foreign_key: :parent_task_id
  has_many :tasks, foreign_key: :parent_task_id

  before_validation 'self.name = "" unless self.name'
  validates :project, presence: true
  validates :parent_task, presence: true, if: "!!self.parent_task_id"
  validates :user, presence: true, if: "!!self.user_id"
end
