class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :project_id, null: false
      t.integer :parent_task_id
      t.integer :user_id
      t.text :body
      t.boolean :completed, null: false, default: false
      t.date :due_date
      t.date :start_date

      t.timestamps null: false
    end
  end
end
