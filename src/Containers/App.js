import React, { Component } from 'react';
import { connect } from 'react-redux';
import Top from '../Components/Top/Top'; import Scroller from '../Components/Home/Scroller'; import Bottom from '../Components/Bottom';
import Add from '../Components/Add/Add'; import Home from '../Components/Home/Home'; import Login from '../Components/Form/Login';
import Register from '../Components/Form/Register'; import PagesList from '../Components/Main/PagesList'; import Categories from '../Components/Categories/Categories';
import DisplayCategory from '../Components/Categories/DisplayCategory'; import Card from '../Components/Main/Card';
import './App.css';
import {getPageFromAPI, getAccessToken,
  windowResize, changePage, newPage } from  '../State/actions.js'

const mapStateToProps= state=>{
  return {
    database: state.addNewPage.database,
    cards: state.fbApiCall.cards,
    isPending: state.fbApiCall.isPending,
    message: state.fbApiCall.message,
    error: state.fbLogin.error,
    accessToken: state.fbLogin.accessToken,
    size: state.onWindowResize.size,
    open: state.onPageChange.open,
    category: state.onPageChange.chosen_category,
    card: state.displaySingleCard.card

  }
 }
const mapDispatchToProps = (dispatch) =>{
  return{
   onApiCall: (url) => dispatch(getPageFromAPI(url)),
   getAccessToken: ()=> dispatch(getAccessToken()),
   onPageChange: (page,category)=>dispatch(changePage(page,category)),
   onWindowResize: (size)=>dispatch(windowResize(size))
    }
  }
class App extends Component {
constructor(){
  super()
  this.state=({
    test: {}
  })
}
componentDidMount(){ 
    //load accessToken    
     this.props.getAccessToken();

     console.log(this.props.accessToken)
      //delayed api call and cards load + set message
   this.props.database.map(record=>{
    this.props.onApiCall(record)
    return record
   })/*
     let url = new URL(`https://graph.facebook.com/${record.id}`),
        params = {access_token: this.props.accessToken, fields:'id,name,picture,fan_count,link'}
     Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
     this.props.onApiCall(url)
     return record
     })
   },2000)*/
   
//resize event listener
  window.addEventListener('resize',()=>{
      this.props.onWindowResize([window.innerWidth, window.innerHeight])
    })
  }
//add new Page
  addPage=(obj)=>{
      this.props.onApiCall(obj);
  }
//select category
//display single card
  displayReceivedCard=()=>{
    const {card,database}=this.props;
    const record=database.filter(record=>{
     return record && record.id===card.id

     })
    console.log(record)
    return(
          <Card
            id={card.id}
            name={card.name}
            fan_count={card.fan_count}
            picture={card.picture.data.url}
            link={card.link}
            favourites={record[0].favourite}
            category={record[0].category}
            country={record[0].country}
          />
         )
  } 
//renders the page based on the state
  returnSwitch=()=>{
    const {open, accessToken, cards, database, onPageChange, addPage, readStateMessage, category} = this.props;
      switch(open){
          case 'home':  return ( <Home category='categories' at={accessToken} cards={cards} db={database} onPageChange={onPageChange}/>);
          case 'add': return( <Add addPage={addPage} readMessage={readStateMessage}/>)
          case 'login': return (<Login />)
          case 'register': return (<Register />)
          case 'categories': return( <Categories categories={database} onPageChange={onPageChange}/>);
          case 'display-all': return ( <DisplayCategory category='all' cards={cards} db={database}/> )
          case 'display-category': return (<DisplayCategory category={category} cards={cards} db={database}/>)
          case 'card': return (<div className="d-flex m-auto justify-content-center">{this.displayReceivedCard()}</div>)
          default: return( <h1> ... The page is Loading ...</h1> )
      }
  }
//render method
  render() {
      
      const { accessToken }=this.props;
      return(
        accessToken? (
          <div className="App d-block w-100 m-0 p-0">
            <Top />
              <div className="d-flex flex-column pt">
                  <Scroller>
                    {this.returnSwitch()}
                  </Scroller>
                  <Bottom height={this.props.size[1]} />
              </div>
          </div>
          ):
        (
          <h1 className="text-center mt-5">.... WAITING AUTHORIZATION FROM FACEBOOK .... </h1>
        )
        )
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(App);