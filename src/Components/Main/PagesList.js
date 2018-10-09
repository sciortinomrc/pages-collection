import React, {Component} from 'react';
import Card from './Card';

const PagesList=({category, cards,db})=>{
	const array=cards;
	console.log('array',cards)
	if(cards.length){
		return(
			<div className="d-inline-flex height" key={this.category}>
			{	cards.map(card=>{
					const recordMatch=db.filter(record=>{
						if(record.id.includes(card.id) && category===record.category){
							return record
						}
					})
				if(recordMatch.length){
					return(<Card
						key={card.id}
						name={card.name}
						fan_count={card.fan_count}
						picture={card.picture.data.url}
						link={card.link}
						favourites={recordMatch[0].favourite}
					/>)
				}
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