Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'users/create'
      get 'users/update'
      get 'users/show'
      get 'users/change_password'
      get 'users/check_email'
      get 'users/reset_password'
    end
  end
  root 'widget#index'

  # //NOTE: make sure to keep the line below the last line of the routes.
  get '*widget', to: 'widget#index'
end
