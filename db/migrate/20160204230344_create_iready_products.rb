class CreateIreadyProducts < ActiveRecord::Migration
  def change
    create_table :iready_products do |t|
      t.integer :reo_id
      t.string :subject
      t.string :tier
      t.string :isbn
      t.integer :sch_price
      t.string :license_length
      t.string :grade_range
      t.string :product
      t.string :license_type
      t.string :prefix
      t.string :suffix

      t.timestamps null: false
    end
  end
end
