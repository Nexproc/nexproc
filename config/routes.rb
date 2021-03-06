Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :teams
    resources :memberships, only: [:create, :destroy, :index]
    resources :projects, only: [:create, :destroy, :update, :show, :index]
    resources :tasks, only: [:create, :update, :destroy, :show, :index]
  end

  root to: "static_pages#show"
  resource :static_page, only: [:show]
  resource :sessions, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
end
