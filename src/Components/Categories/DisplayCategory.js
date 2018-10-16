import React from 'react';
import PagesList from '../Main/PagesList';


class DisplayCategory extends React.Component {
	constructor({...props}){
		super(...props)
		this.state=({search: ''})
	}

	onSearchChange=(event)=>{
		this.setState({search: event.target.value})
	}

	render(){
		const cards=this.props.cards.filter(card=>{
				return card.name.toLowerCase().includes(this.state.search.toLowerCase());
		})
		return(
			<div>
				<input type="search"  className="text-center w-50" placeholder="filter pages" onChange={this.onSearchChange}/>
				<fieldset key={this.props.category} className="b m-2 pt-0 ">
					<legend className="b w-auto d-flex text-left pl-1 ml-3 "><p className="pl-3 pr-3 mb-0">{this.props.category.toUpperCase()}</p></legend>
						<div className="w-100 m-0 p-1 mtminus">
			 				<PagesList {...this.props} cards={cards} />
						</div>
				</fieldset>
			</div>
			)
	}
	
}

export default DisplayCategory;