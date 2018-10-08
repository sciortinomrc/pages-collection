import React, {Component} from 'react';
import Card from './Card';

const PagesList=({category, cards, categories})=>{
	const test=categories.filter(item=>{
					return item.category===category
				})
	if(cards.length){
		return(
			<div className="d-inline-flex height" key={this.category}>
			{	
				cards.map(card=>{
					console.log(card)
					return(
						<Card
							name={card.name}
							key={card.id}
							category={card.category}
							picture={card.picture}
							link={card.link}
							fan_count={card.likes}
						/>)
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