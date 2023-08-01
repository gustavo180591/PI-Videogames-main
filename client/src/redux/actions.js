import axios from "axios";
// colocamos export porque lo vamos a necesitar afuera.
export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  // usamos dispatch para llegar al reducer
  // el action creator retorna la funcion 
  // el thunkMiddleware toma la función la ejecuta, hace el dispatch
  // al hacer el dispatch la información va al reducer. ir archivo reducer.js linea 8
  return async function (dispatch) {
    // axios.get es una promesa
    const apiData = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    // .data es donde viene la información.
    const users = apiData.data;
    // cuando se haga el dispatch esta actions { type: GET_USERS, payload: users } ... va al reducer.
    // el reducer recibe esa action (ver archivo reducer.js) y tiene que trabajar con ella.
    dispatch({ type: GET_USERS, payload: users });
  };
};
// ESTO ASI NO!!!

/*     export const getUser = (id) => {        
        return async function (dispatch) {   
          const apiData = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
          );         
          const user = apiData.data;         
          dispatch({ type:"GET_USER", payload: user });
  };
}; */

  /* export const filterBySource = ()=>{
    dispatch({type:"FILTER_BY_SOURCE"});
  }; */
  // EJEMPLO DE ACTION CREATE COMUN