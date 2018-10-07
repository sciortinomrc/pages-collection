import React, {Component} from 'react';
import Card from './Card';

class PageList extends Component{
	constructor(props){
		super(props)
		this.state={
			cards:[]
		}
	}
componentDidMount(){
	const {category, pages, cross, onApiCall}=this.props;
	let objPush=[];
	cross.map(item=>{
		console.log=onApiCall(item,category)
	})
	setTimeout(()=>{
		this.setState({cards: objPush})
	},500)
	
}
render(){
	const {category, pages, cross, at}=this.props;
	const test=cross.filter(item=>{
					return item.category===category
				})
	if(this.state.cards.length){
		return(
			<div className="d-inline-flex height" key={this.category}>
			{	
				this.state.cards.map(card=>{
					const abc=test.map(obj=>obj.id);
					for(let i=0; i<abc.length; i++){
						if(abc[i]===card.id){
							return (
								<Card
									name={card.name}
									key={card.id}
									fan_count={card.likes}
									picture={card.picture}
									link={card.link}
									/>
								)
						}
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
		 	
	
}
export default PageList;