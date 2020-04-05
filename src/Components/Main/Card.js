import React, { Component } from 'react';
import './Style/Card.css';
import { connect } from 'react-redux';
import { handlePages, updateFavourites } from '../../State/actions';

const mapStateToProps = state => ({
	user: state.loginStatus.user
})
const mapDispatchToProps = dispatch => {
	return {
		updateFavourites: async (id, user, count, direction) => {
			dispatch(await updateFavourites(id, user, count, direction))
			dispatch(await handlePages())
		}
	}
}

class Card extends Component {
	toggleFavourite = (event) => {
		const click = event.target;
		click.classList.toggle('fav')
		this.props.updateFavourites(this.props.id, this.props.user, this.props.user.favourites, !this.props.user.favourites.includes(this.props.id))
	}

	render() {
		const { id, type, likes, category, name, url, favourites, country } = this.props;
		return (


			<div id="card" title={category.toUpperCase() + ", " + country.toUpperCase()}>
				<div id="img-wrapper" >
					<img alt="" src={`https://graph.facebook.com/v6.0/${id}/picture?height=200`} height="100%" width="auto" />
					<p > </p>
				</div>
				<div className="d-flex flex-column">
					<a href={url} target='_blank' rel="noopener noreferrer"><p>{name}</p></a>
				</div>
				<div id="favs" >
					<p>{type}</p>
					<div>
						<p id="thumb" style={{ cursor: "default" }}><span className="fas fa-thumbs-up"></span> {likes}</p>
						{
							this.props.user && this.props.user.id ?
								<p id="star"><span onClick={this.toggleFavourite} style={{ color: this.props.user.favourites.includes(id) ? 'yellow' : '' }}>&#9733;</span>{favourites}</p>
								:
								<p id="star" style={{ cursor: "default" }}><span>&#9733;</span>{favourites}</p>
						}
					</div>

				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);