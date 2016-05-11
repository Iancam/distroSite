class AddProductTypeToReadyOrder < ActiveRecord::Migration
  def change
    ["k",1,2,3,4,5,6,7,8].each do |grade|
      teacher = "gr_#{grade}_teacher_product"
      student = "gr_#{grade}_student_product"
      add_column :ready_orders, teacher, :string
      add_column :ready_orders, student, :string
    end
  end
end
