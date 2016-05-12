class Distribution < ActiveRecord::Base
  attr_accessible :street, :city, :state, 
          :contact_name, :creation_date, 
          :final_quote_id, :po_number, 
          :i_ready_orders_attributes,
          :ready_orders_attributes, :zip,
          :districts_attributes,
          :district_id
  validates :district_id, presence: true
  has_many :i_ready_orders
  has_many :ready_orders

  belongs_to :district
  belongs_to :user
  accepts_nested_attributes_for :i_ready_orders, :reject_if => lambda { |a| a[:content].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :ready_orders, :reject_if => lambda { |a| a[:content].blank? }, :allow_destroy => true


  def distribution_info
    schools = School.where(district_id: self.district_id).collect { |e| [e.pid, e.name, e.enrollment] }
    d_with_district = self.attributes
    d_with_district["district"] = District.where(pid: self.district_id)[0]
    district_options = []
    if d_with_district["district"]
      state = d_with_district["district"]["state"]
      district_options = District.where(state: state).pluck('name').uniq
    end

    i_ready_users = IReadyOrder.where(distribution_id: self.id).to_a
    ready_users = ReadyOrder.where(distribution_id: self.id).to_a
    i_ready_users.map! do |e|
      school = School.find_by(pid: e.school_id)
      user = e.attributes
      user["school"] = school
      user
    end
    ready_users.map! do |e|
      school = School.find_by(pid: e.school_id)
      user = e.attributes
      user["school"] = school
      user
    end
    {
    distribution: d_with_district,
    schools: schools,
    district_options: district_options,
    i_ready_users: i_ready_users,
    ready_users: ready_users
    }
  end

  def to_csv
    dist_csv_string = CSV.generate do |csv|
      #do the distribution header
      Distribution.column_names.each do |c|
        csv << ['',c, self.attributes[c]]
      end
      #do ready orders
      # column names for orders, school and ReadyOrders
      csv << [""]+ReadyOrder.column_names + School.column_names     
      self.ready_orders.each do |ready|
        schoolFields = School.where(id: ready.school_id).to_array
        csv << [""]+ready.to_array
      end
      csv << [""]
      csv << [""]
      # header row including order, school and iready column names
      csv << [""]+IReadyOrder.column_names + School.column_names
      self.i_ready_orders.each do |iready|
        csv << [""]+iready.to_array
      end
    end
    return dist_csv_string    
  end

end

