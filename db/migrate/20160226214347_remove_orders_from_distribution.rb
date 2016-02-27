class RemoveOrdersFromDistribution < ActiveRecord::Migration
  def change
    remove_column :distributions, :address_id, :integer
    remove_column :distributions, :school_id, :integer
    remove_column :distributions, :teacher_grades_id, :integer
    remove_column :distributions, :student_grades_id, :integer
  end
end
