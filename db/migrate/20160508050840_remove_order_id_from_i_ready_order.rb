class RemoveOrderIdFromIReadyOrder < ActiveRecord::Migration
  def change
  	remove_column :i_ready_orders, :order_id, :integer
  end
end
