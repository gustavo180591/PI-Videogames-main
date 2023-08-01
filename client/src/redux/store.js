// copn applyMiddleware, compose mejoramos el store se puede agregar modificaciones.
import { createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducer";
// ayuda en los errores que podamos tener en la url.
import thunkMiddleware from "redux-thunk";
// esta extension window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ tiene la capacidad de hacer también un compose.
// si tenemos instalados el window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ se hace con él, sino va con compose.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore (
    rootReducer,
    // el thunkMiddleware es el que sí puede hacer las request.
    composeEnhancer(applyMiddleware	(thunkMiddleware))
);

export default store; 