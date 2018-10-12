import React,{Component} from 'react';
import App from './App';


class WindowFB extends Component{

	constructor(){
		super()
		this.state={
			fbOk: false
		}
	}

	componentDidMount(){
		window.fbAsyncInit = function() {
      //apptest
      /*window.FB.init({
        appId: '493486697820891',
        appSecret: 'facc5d5c9bef95c160cf627b5ca76e76',
        cookie: true,
        version: 'v3.1'
      });*/
      //app
     window.FB.init({
        appId: '899425356926402',
        appSecret: 'bd3418470ead59bf077838b510f19d64',
        cookie: true,
        version: 'v3.1'
      });
    };
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));	
    setTimeout(()=>this.setState({fbOk: true}),150)
}

	render(){
		return(
			this.state.fbOk?<App />:<div className="d-flex justify-content-center m-auto"><p>..... LOADING DEPENDENCIES FROM FACEBOOK.COM .....</p></div>
			)
		}
}
export default WindowFB;