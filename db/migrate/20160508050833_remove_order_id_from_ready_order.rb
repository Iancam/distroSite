class RemoveOrderIdFromReadyOrder < ActiveRecord::Migration
  def change
  	remove_column :ready_orders, :order_id, :integer
  end
end
