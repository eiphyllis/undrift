class RelationshipsController < ApplicationController
    def index    
      render json: Relationship.all
    end 

  def create
    relationship = Relationship.new(relationships_params)
    # byebug
    # need user_id
    if relationship.save 
        render json: relationship
    else
        render json: {error: 'Please write in required fields.'}
    end
  end

  def show
   relationship =  Relationship.find(params[:id])
   render json: relationship
  end

  def update
    # byebug
    # .update_attributes + .save => .update
    # @relationship.update_attributes(relationship_params)
    # if
   relationship =  Relationship.find(params[:id])

     relationship.update(relationships_params)
        render json: relationship.user, include: :relationships
        # redirect_to relationship_path(@relationship)
    # else
    #     # redirect_to edit_relationship_path(@relationship)
    #     redirect_to "/relationships/#{@relationship.id}/edit"
    # end
  end

  def destroy 
    relationship = Relationship.find(params[:id])

    if  relationship
        relationship.destroy 
        render json:  relationship.user, include: :relationships
    else
        render json: { error: 'Invalid  relationship' }
    end
  end 

  private 
  def relationships_params
      params.require(:relationship).permit!
  end 
end
