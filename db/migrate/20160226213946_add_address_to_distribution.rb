class AddAddressToDistribution < ActiveRecord::Migration
  def change
    add_column :distributions, :street, :string
    add_column :distributions, :city, :string
    add_column :distributions, :state, :string
    add_column :distributions, :zip, :integer
  end
end
