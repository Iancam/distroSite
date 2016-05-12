class ReadyOrder < ActiveRecord::Base
	belongs_to :school
	belongs_to :distribution

	validates :distribution_id, presence: true
	validates :school_id, presence: true

	accepts_nested_attributes_for :school

	def displayColumns
		columns = ["id",
			"subject",
			"grade_k_teacher",
			"grade_1_teacher",
			"grade_2_teacher",
			"grade_3_teacher",
			"grade_4_teacher",
			"grade_5_teacher",
			"grade_6_teacher",
			"grade_7_teacher",
			"grade_8_teacher",
			"gr_k_teacher_product",
			"gr_1_teacher_product",
			"gr_2_teacher_product",
			"gr_3_teacher_product",
			"gr_4_teacher_product",
			"gr_5_teacher_product",
			"gr_6_teacher_product",
			"gr_7_teacher_product",
			"gr_8_teacher_product",
			"grade_k_student",
			"grade_1_student",
			"grade_2_student",
			"grade_3_student",
			"grade_4_student",
			"grade_5_student",
			"grade_6_student",
			"grade_7_student",
			"grade_8_student",
			"gr_k_student_product",
			"gr_1_student_product",
			"gr_2_student_product",
			"gr_3_student_product",
			"gr_4_student_product",
			"gr_5_student_product",
			"gr_6_student_product",
			"gr_7_student_product",
			"gr_8_student_product",
			"created_at",
			"updated_at",
			"toolbox",
			"contact_name",
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

	def to_array
		self.attributes.values_at(*displayColumns)
	end
end
