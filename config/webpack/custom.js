const path = require('path')   
module.exports = {             
  resolve: {                   
    alias: {                   
      '@': path.resolve(__dirname, '..', '..', 'app/javascript/'), 
      '@components': path.resolve(__dirname, '..', '..', 'app/javascript/components'),
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src')
    }   
  }
} 
