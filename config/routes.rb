Rails.application.routes.draw do
  resource :static_page, only: [:show]
  root to: "static_pages#show"
  resource :sessions, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]
end
