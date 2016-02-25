class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.string   "email"	
    	t.string   "password_salt"
	    t.string   "password_digest"
	    t.datetime "created_at",      :null => false
	    t.datetime "updated_at",      :null => false
      t.timestamps null: false
    end
  end
end
