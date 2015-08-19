class TaskDescriptionIsName < ActiveRecord::Migration
  def change
    rename_column :tasks, :description, :name
  end
end
