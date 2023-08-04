//import styled from "styled-components"
import Card from"../Card/Card.jsx"


export default function CardsContainer(props){
console.log(props);
return(<div>
	{props.data.map(videogame=><Card videogame={videogame}/>)}
</div>


	)}