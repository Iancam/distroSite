class ReadyOrder < ActiveRecord::Base
	belongs_to :order

	def teacher_total
		teacher_arr = ReadyOrder.column_names.map { |column| column.index("teacher")? self.attributes.values_at(column)[0] : 0}
		teacher_arr.reduce{|x,y| x+y}
	end
	

	def student_total
		student_arr = ReadyOrder.column_names.map { |column| column.index("student")? self.attributes.values_at(column)[0] : 0}
		student_arr.reduce{|x,y| x+y}
	end

	def to_array
		self.attributes.values_at(*ReadyOrder.column_names)
	end
end
