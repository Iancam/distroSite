class DropOrdersTable < ActiveRecord::Migration
  def change
    drop_table :orders do |t|
    	t.integer  "distribution_id"
			t.string   "contact_name"
			t.integer  "school_id"
      t.string :email, null: false
      t.timestamps null: false
    end
  end
end
