class CreateRelationships < ActiveRecord::Migration[6.0]
  def change
    create_table :relationships do |t|
      t.string :name
      t.string :notes
      t.string :freq
      t.string :social
      t.integer :user_id

      t.timestamps
    end
  end
end
