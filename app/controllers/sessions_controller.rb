class SessionsController < ApplicationController

	def new
		@session = []
		if session[:user]
			@msg = "what the heck?"
		end
	end

	def show
		# redirect_to root_url
	end


	def create
		user = User.authenticate(params[:username], params[:password])

	    if user
	      session[:user] = user
	      redirect_to new_distribution_url, :notice => "Logged In"
	    else
	      # session[:user] = nil
	      reset_session
	      flash.now.alert = "Invalid username or password"
	      render "new"
	    end
	end

	def destroy
		session[:user] = nil
		reset_session
		redirect_to root_url, :notice => "Logged out!"
	end
end
