import React, {Component} from 'react';
import "./Add.css";

class Add extends Component {
constructor(props){
	super(props)
	this.state={
		pageId: '',
		category: '',
		message: ''
	}
}

onInputsChange=(event)=>{

	(event.target.id==="id")
	? this.setState({pageId: event.target.value})
	: this.setState({category: event.target.value})
}

stateCheck=(f)=>{
	document.getElementById('id').value="";
	document.getElementById('category').value="";
	const {pageId, category}=this.state;
	if(pageId.length && category.length){
			f({id: this.state.pageId, category: this.state.category})
			setTimeout(()=>this.setState({message: this.props.readMessage()}),200)
	}else{this.setState({message: "There's been an error please enter the page again"})
	}

}

render(){
return(
	<div className="full-screen">
		<div className="d-flex flex-column m-auto w-75 border">
			<div className="m-auto rounded border shadow w-75">
				<h2 className="p-0 m-0">How does it work?</h2>
				<hr/>
				<p className="text-left p-2">
				The idea behind this website is to make it easier for you
				get the best selection of Facebook Pages based on categories.<br/>
				What's the best part? Well, You get to add new pages to our database and you get to choose the category!<br />
				How awesome is that?<br/>
				So let's get it started. All you need is the Facebook page ID and the category; we do the rest.
				</p>
				<h2 className="p-0 m-0">Let's get it started</h2>
				<hr/>
				<p className="text-left p-2">
				Here's what you have to do:
				</p>
				<ul className="text-left">
					<li>Copy the Facebook Page URL</li>
					<li>Go to <a href="https://findmyfbid.com/" target="_blank" rel="noopener noreferrer">https://findmyfbid.com/</a> and paste your URL</li>
					<li>Here's your Facebook Page ID. Paste it below, insert a Category and simply click Add Page</li>
				</ul>
				<hr/>
				
			</div>
			<div id="add" className="m-auto rounded border shadow w-75 p-3" >
				<h2 className="p-0 mb-4">Add your page here </h2>
				<div className="d-inline-flex w-75">
					<div className="d-flex flex-column border w-100">
						<input id="id" type="text" className="rounded-left text-center" placeholder="Page ID" onChange={this.onInputsChange}/>
						<input id="category" type="text" className="rounded-left text-center" placeholder="Category" onChange={this.onInputsChange}/>
					</div>
					<div className="h-auto w-15">
						<input type="button" className="h-100 w-100 btn btn-primary" value="Add" onClick={()=>this.stateCheck(this.props.addPage)}/>
					</div>
				</div>
					<p className="mt-2">{this.state.message}</p>
			</div>
		</div>
				
		
	</div>
	)
}
}

export default Add;