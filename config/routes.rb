Rails.application.routes.draw do
  root 'widget#index'

  # //NOTE: make sure to keep the line below the last line of the routes.
  get '*widget', to: 'widget#index'
end
