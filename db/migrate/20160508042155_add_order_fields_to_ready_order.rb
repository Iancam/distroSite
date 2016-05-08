class AddOrderFieldsToReadyOrder < ActiveRecord::Migration
  def change
    add_column :ready_orders, :distribution_id, :integer
    add_column :ready_orders, :contact_name, :string
    add_column :ready_orders, :school_id, :integer
  end
end
