Rails.application.routes.draw do
  resources :users
  resources :relationships

  post "/login", to: "auth#create"
  post "/signup", to: "users#create"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'
end