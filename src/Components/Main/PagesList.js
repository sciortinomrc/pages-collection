import React from 'react';
import Card from './Card';

const PagesList=({category, cards,db,limit})=>{
	if(cards.length){
		let lim=1;
		return(
			<div className="d-flex flex-wrap justify-content-baseline height m-auto" key={this.category}>
			{

				cards.map(card=>{
					const recordMatch=db.filter(record=>{
						return record && category==='all' && record.id.includes(card.id) || record && record.id.includes(card.id) && category===record.category
						})
					
				if(limit && lim>limit){ return}
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