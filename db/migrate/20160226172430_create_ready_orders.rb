class CreateReadyOrders < ActiveRecord::Migration
  def change
    create_table :ready_orders do |t|
      t.string  :subject
      t.integer :order_id
			t.integer :grade_1_teacher
			t.integer :grade_2_teacher
			t.integer :grade_3_teacher
			t.integer :grade_4_teacher
			t.integer :grade_5_teacher
			t.integer :grade_6_teacher
			t.integer :grade_7_teacher
			t.integer :grade_8_teacher
			t.integer :grade_1_student
			t.integer :grade_2_student
			t.integer :grade_3_student
			t.integer :grade_4_student
			t.integer :grade_5_student
			t.integer :grade_6_student
			t.integer :grade_7_student
			t.integer :grade_8_student

      t.timestamps null: false
    end
  end
end
