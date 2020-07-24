class UsersController < ApplicationController
    def index 
        render json: User.all, include: :relationships
    end

    def show
        user = User.find(params[:id])
        render json: user, include: :relationships

    end

    def create 
        user = User.new(user_params)
        if user.save
            render json: user, except: [:created_at, :updated_at], include: :relationships, status: :created
        else
            render json: {error: 'Please write a name.'}, status: :not_acceptable
        end
    end

    def update  
        user = User.find(params[:id])
        user.update(user_params)
        render json: user
    end 

    def existing_user 
        user = User.find_by(name: params[:name])

        if user
            render json: user, include: :relationships
        else
            render json: {error: 'No user found'}
        end
    end

    private

    def user_params
        params.require(:user).permit!
    end
end
