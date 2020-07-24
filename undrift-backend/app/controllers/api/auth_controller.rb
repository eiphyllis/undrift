class AuthController < ApplicationController
    skip_before_action :logged_in?

    def create
        user = User.find_by(name: params[:name])
        if user && user.authenticate(params[:password])
            render json: {name: user.name}
        else
            render json: {error: "invalid username or password"}
        end
    end
end