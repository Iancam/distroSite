class CreateDistributions < ActiveRecord::Migration
  def change
    create_table :distributions do |t|
		t.datetime :creation_date
		t.string   :final_quote_id
		t.integer  :po_number	
		t.integer  :district_id
    
      t.timestamps null: false
    end
  end
end
