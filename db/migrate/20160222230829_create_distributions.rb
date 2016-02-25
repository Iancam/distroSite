class CreateDistributions < ActiveRecord::Migration
  def change
    create_table :distributions do |t|
		t.string :contact_name
		t.datetime :creation_date
		t.string :final_quote_id
		t.integer :po_number	
		t.integer :address_id
		t.integer :district_id
		t.integer :school_id
		t.integer :teacher_grades_id
		t.integer :student_grades_id

      t.timestamps null: false
    end
  end
end
