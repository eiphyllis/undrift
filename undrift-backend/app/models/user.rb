class User < ApplicationRecord
    has_secure_password
    has_many :relationships

    validates :name, presence: true, uniqueness: { case_sensitive: false }

end
