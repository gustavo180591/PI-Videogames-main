import { GET_USERS } from "./actions";


const initialState = {
  users: [],
};
//initialState recibe el estado que va a modificar 
// recibe la action que acabamos de despachar. 
//evalua el (action.type)
// ve que es GET_USERS y crea un estado nuevo en linea 21 return { ...state, users: action.payload }; que es igual al 
// estado anterior con esta modificación. users: action.payload
const rootReducer = (state = initialState, action) => {
    
  switch (action.type) {
    // que (action.type) tengo ? GET_USERS
    case GET_USERS:
        // que tengo que hacer? retornar un estado nuevo.
        // en el que tengamos las propiedas de ...state y dentro del objeto state users sea igual a action.payload.
        // este es el objeto final { ...state, users: action.payload }
        // pisa la información y volvemos al CardsContainer
      return { ...state, users: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
