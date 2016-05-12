class AdminController < ApplicationController
  def show_distributions
    @distributions = Distribution.all
    distribution_information = []
    @distributions.each do |d|
      distribution_information << d.distribution_info
    end
    respond_to do |format|
      format.html {render "admin/show_distributions"}
      format.json {render json: distribution_information}
    end
  end

  def show
    redirect_to show_distributions_url
  end
end
