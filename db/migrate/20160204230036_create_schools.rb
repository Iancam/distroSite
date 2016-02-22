class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
      t.integer :pid
      t.string :name
      t.integer :enrollment
      t.string :street
      t.string :city
      t.string :state
      t.integer :zip
      t.integer :district_id

      t.timestamps null: false
    end
  end
end
