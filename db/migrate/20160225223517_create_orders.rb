class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :distribution_id 
      t.string  :contact_name 
      t.integer :school_id 
      t.timestamps null: false
    end
  end
end
