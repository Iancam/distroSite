class AlterColumnIReadyOrdersToolbox < ActiveRecord::Migration
  def change
  	change_column :i_ready_orders, :toolbox, :string
  end
end
