import React from 'react';
import "./About.css";

const About=()=>{
	return(
		<div id="about-wrapper">
			<div>
				<h1>What's Pagesify?</h1>
				From the idea of <a href="https://sciortino-mrc.netlify.com" target="_blank" rel="noopener noreferrer">Marco Sciortino</a> Pagesify is a place for Facebook pages. <br />
				Whether you are a simple user who wants to collect all the pages you follow, or you own a Facebook page and want to showcase it, all you need to do is
				log in and then Add it to our database following the instructions. 
			</div>
			<hr />
			<div>
				<h1>Nothing to add?</h1>
				That's absolutely no problem. The main idea behind Pagesify is to create a share point where everyone can find different Facebook pages based on categories of interest and country.
				So, if you do not have any page to add, you can simply browse all the exsisting page list and add the ones you want to your favourites.
				It is that simple.
			</div>
			<h2> What are you waiting for then? Log in and let the fun get started </h2>

		</div>
	)
}

export default About;