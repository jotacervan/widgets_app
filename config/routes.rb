Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :update, :show]
      resources :auth, only: [:create]
      post 'auth/revoke', to: 'auth#revoke'
      get  'users/me', to: 'users#show_me'
      get  'users/me/check_email', to: 'users#check_email'
      post 'users/reset_password', to: 'users#reset_password'
      post 'users/change_password', to: 'users#change_password'
    end
  end
  root 'widget#index'

  # //NOTE: make sure to keep the line below the last line of the routes.
  get '*widget', to: 'widget#index'
end
