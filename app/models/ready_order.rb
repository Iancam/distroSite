class ReadyOrder < ActiveRecord::Base
  belongs_to :school
  belongs_to :distribution

  validates :distribution_id, presence: true
  validates :school_id, presence: true

  accepts_nested_attributes_for :school

  def self.displayColumns
    [
      "school_pid",
      "name",
      "contact_name",
      "subject",
      "toolbox",
      "street",
      "city",
      "state",
      "zip",
      "gr_k_student_product",
      "grade_k_student",
      "gr_1_student_product",
      "grade_1_student",
      "gr_2_student_product",
      "grade_2_student",
      "gr_3_student_product",
      "grade_3_student",
      "gr_4_student_product",
      "grade_4_student",
      "gr_5_student_product",
      "grade_5_student",
      "gr_6_student_product",
      "grade_6_student",
      "gr_7_student_product",
      "grade_7_student",
      "gr_8_student_product",
      "grade_8_student",
      "gr_k_teacher_product",
      "grade_k_teacher",
      "gr_1_teacher_product",
      "grade_1_teacher",
      "gr_2_teacher_product",
      "grade_2_teacher",
      "gr_3_teacher_product",
      "grade_3_teacher",
      "gr_4_teacher_product",
      "grade_4_teacher",
      "gr_5_teacher_product",
      "grade_5_teacher",
      "gr_6_teacher_product",
      "grade_6_teacher",
      "gr_7_teacher_product",
      "grade_7_teacher",
      "gr_8_teacher_product",
      "grade_8_teacher",
      
      
      
      
      
      
      
      
      
    ]
  end

  def teacher_total
    teacher_arr = ReadyOrder.column_names.map { |column| column.index("teacher")? self.attributes.values_at(column)[0] : 0}
    teacher_arr.reduce{|x,y| x+y}
  end
  

  def student_total
    student_arr = ReadyOrder.column_names.map { |column| column.index("student")? self.attributes.values_at(column)[0] : 0}
    student_arr.reduce{|x,y| x+y}
  end

  def attributes_with_school
    school = School.find_by(pid: self.school_id)
    user = self.attributes
    user["school"] = school
    user
  end

  def displayArray
    attributes = self.attributes
    if !self.id 
      return nil
    end
    school_attributes = School.find_by(pid: self.school_id).attributes
    attributes.merge!(school_attributes)
    attributes["school_pid"] = school_attributes['pid']
    attributes.values_at(*ReadyOrder.displayColumns)
  end

  def to_array
    self.attributes.values_at(*ReadyOrder.displayColumns)
  end
end
