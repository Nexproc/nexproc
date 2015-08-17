class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name, null: false;
      t.integer :team_id, null: false;
      t.text :description

      t.timestamps null: false
    end
  end
end
