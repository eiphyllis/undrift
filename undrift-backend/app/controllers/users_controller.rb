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
        # byebug
            render json: {error: user.errors.full_messages.to_sentence}, status: :not_acceptable
        end
    end

    def update  
        user = User.find(params[:id])
        user.update(user_params)
        render json: user, include: :relationships
    end 

    private

    def user_params
        params.require(:user).permit(:name, :password)
        # require that a param comes in as an object with specified key
    end
end
