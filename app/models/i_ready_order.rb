class IReadyOrder < ActiveRecord::Base
  belongs_to :school
  belongs_to :distribution
  validates :distribution_id, presence: true
  validates :school_id, presence: true

  accepts_nested_attributes_for :school
  
  def self.displayColumns
    [ 
      "school_pid",
      "subject",
      "total_enrollment",
      "contact_name",
      "toolbox",
      "tier",
      "SKU",
      "name",
      "enrollment",
      "street",
      "city",
      "state",
      "zip" 
    ]
  end

  def tier
    if self.enrollment < 200
      return ' <200'
    end
    if self.enrollment <= 350
      return '200-350'
    end
    if self.enrollment <= 500
      return '351-500'
    end
    if self.enrollment <= 800
      return '501-800'
    end
    if self.enrollment <= 1200
      return '801-1200'
    end
    if self.enrollment > 1200
      return '1201+'
    end
  end

  def SKU
    puts self.tier
    puts IreadyProduct.where(subject: self.subject)
    IreadyProduct.find_by(subject: self.subject.capitalize, tier: self.tier).reo_id
  end

  def attributes_with_school
    #TODO: replace this with including
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
    attributes["total_enrollment"] = attributes["enrollment"]
    attributes.delete("enrollment")
    attributes['tier'] = self.tier
    attributes['SKU'] = self.SKU

    school_attributes = School.find_by(pid: self.school_id).attributes
    school_attributes["mdr_enrollment"] = school_attributes["enrollment"]
    attributes.merge!(school_attributes)
    attributes["school_pid"] = school_attributes['pid']

    attributes.values_at(*IReadyOrder.displayColumns)
  end
end
