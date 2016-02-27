class CreateIReadyOrders < ActiveRecord::Migration
  def change
    create_table :i_ready_orders do |t|
      t.string  :subject
      t.integer :order_id 
      t.boolean  :toolbox
      t.integer  :enrollment


      t.timestamps null: false
    end
  end
end
