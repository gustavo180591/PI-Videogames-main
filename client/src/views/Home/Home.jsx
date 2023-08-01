import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  // cuando se monta home que haga el dispatch
  // se dispara el useEffect() el useEffect hace el dispatch
  // eso hace que se ejecute el action creator (en archivo actions.js) ... ir al archivo actions.js linea 7
  // useEffect()- useDispatch
  return (
    <>
      <h1>Esta es la vista de home</h1>
      <CardsContainer />
    </>
  );
};

export default Home;
