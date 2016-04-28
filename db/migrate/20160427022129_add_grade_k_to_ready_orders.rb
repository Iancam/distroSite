class AddGradeKToReadyOrders < ActiveRecord::Migration
  def change
  	add_column :ready_orders, :grade_k_teacher, :integer
	add_column :ready_orders, :grade_k_student, :integer
  end
end
