import React from 'react';
import Card from './Card';
const PagesList=({...props})=>{
	console.log(props)
	if(props.cards.length){
		let lim=1;
		return(
			<div className="d-flex flex-wrap justify-content-baseline height m-auto" key={this.category}>
			{

				props.cards.map(card=>{
					let recordMatch=props.database.filter(record=>{
						return (record && props.category==='' && record.id.includes(card.id)) || (record && record.id.includes(card.id) && props.category===record.category)
						})
					console.log({recordMatch})
					recordMatch=recordMatch.filter(record=>{
						return (record && props.country==='' && record.id.includes(card.id)) || (record && record.id.includes(card.id) && props.country===record.country)
						})
					console.log({recordMatch})
					
				if(props.limit && lim>props.limit){ return undefined}
				if(recordMatch.length){
					lim++;
					return(<Card
						id={card.id}
						name={card.name}
						fan_count={card.fan_count}
						picture={card.picture.data.url}
						link={card.link}
						favourites={recordMatch[0].favourite}
						category={recordMatch[0].category}
						country={recordMatch[0].country}
					/>)
				}
				else return undefined
			})
			}		
			 </div>
			)
		}
	else{
		return( <p></p> )
	}
}
export default PagesList;