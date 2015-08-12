Rails.application.routes.draw do
  root to: "sessions#new"
  resource :sessions, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]
end
