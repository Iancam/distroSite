class AddOrderFieldsToIReadyOrder < ActiveRecord::Migration
  def change
    add_column :i_ready_orders, :distribution_id, :integer
    add_column :i_ready_orders, :contact_name, :string
    add_column :i_ready_orders, :school_id, :integer
  end
end
