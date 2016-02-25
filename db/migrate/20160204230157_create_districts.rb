class CreateDistricts < ActiveRecord::Migration
  def change
    create_table :districts do |t|
      t.integer :pid
      t.string :name
      t.string :state

      t.timestamps null: false
    end
  end
end

