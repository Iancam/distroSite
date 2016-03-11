class AdminController < ApplicationController
  def show_distributions
  	@distributions = Distribution.all
  end

  def show
  	redirect_to show_distributions_url
  end
end
