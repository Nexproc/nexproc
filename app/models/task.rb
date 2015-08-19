class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :project
  belongs_to :parent_task, class_name: 'Task'

  before_validation :defaults
  validates :project, :completed, presence: true
  validates :parent_task, presence: true if :parent_is_declared?
  validates :user, presence: true if :user_is_declared?

  def user_is_declared?
    !!self.user_id
  end

  def parent_is_declared?
    !!self.parent_task_id
  end

  def defaults
    self.completed = !!self.completed
  end
end
