class AddToolboxToReadyOrders < ActiveRecord::Migration
  def change
    add_column :ready_orders, :toolbox, :integer
  end
end
