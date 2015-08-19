class AddTaskDescription < ActiveRecord::Migration
  add_column :tasks, :description, :string
end
