class CreateDistributions < ActiveRecord::Migration
  def change
    create_table :distributions do |t|
		t.string  :contact_name
		t.string  :street
  	t.string  :city
  	t.string  :state
  	t.integer :zip

		t.datetime :creation_date
		t.string   :final_quote_id
		t.integer  :po_number	
		t.integer  :district_id

      t.timestamps null: false
    end
  end
end
