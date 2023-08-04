function login(data){
  return{type:"login", payload:data}
  
  }
  
   function loginGenres(data){
  return{type:"loginGenres", payload:data}
  
  }
  
  
  module.exports={login,loginGenres}