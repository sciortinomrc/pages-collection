import {REQUEST_PAGE_SUCCESS, SET_DATABASE,
		REQUEST_PAGE_FAILED, GET_ACCESS_SUCCESS, WINDOW_RESIZE,
		CHANGE_PAGE, CATEGORY_CHOICE, ADD_PAGE_FAILED, 
		ADD_PAGE_SUCCESS, ACCESS_TOKEN, DISPLAY_CARD,
		SET_SEARCH_FIELD, SET_COUNTRY_FILTER, SET_CATEGORY_FILTER,
		FILTERS, LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_PENDING,
		LOGOUT, REGISTER, REGISTER_FAILED, UPDATE_FAVOURITES,
		UPDATE_USERS_FAVOURITES} from './constants';

export const setPagesDatabase=(database)=>dispatch=>{
	fetch('http://localhost:3001/')
	.then(response=>response.json())
	.then(data=>dispatch({type: SET_DATABASE, payload: data}))
}

export const getAccessToken = (at) =>({
  type: GET_ACCESS_SUCCESS, payload: ACCESS_TOKEN
})
export const getPageFromAPI = (record) => dispatch => {
	let payload;
	window.FB.api('/'+record.id,'get',{access_token:ACCESS_TOKEN, fields:'id,email'},(response)=>{
		if(response.error){
			window.FB.api('/'+record.id,'get',{access_token:ACCESS_TOKEN, fields:'id,name, fan_count, link, picture'},(response)=>{
				if(response.error){
					dispatch({type: REQUEST_PAGE_FAILED, payload: response.error.message})							
				}
				else{
					dispatch({type: REQUEST_PAGE_SUCCESS, payload: response})
				}
			})
		}
		else dispatch({type: REQUEST_PAGE_FAILED, payload: 'The request you have sent is not valid. Try a different Page ID'})
	})
}

export const windowResize = (windowSize) => ({type: WINDOW_RESIZE, payload: windowSize})
export const changePage = (page,chosen_category="")=> {
		if(chosen_category.length){
			return{
				type: CATEGORY_CHOICE,
				payload: {page,chosen_category}	
			}
		}else{
			return{
			type: CHANGE_PAGE,
			payload: page
			}
		}
}
export const newPage=(id,category,country,message)=>dispatch=>{
	if(id){

		fetch('http://localhost:3001/newpage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id, category, country, favourite:0
			})
		})
		.then(response=>{if(response.status!==200)throw new Error("Ops... Something went wrong - Try again please"); return response.json()})
		.then(data=>{
			dispatch({
				type:ADD_PAGE_SUCCESS, payload: data.pagesDatabase
			})
		})
		.catch(err=>
			dispatch({
			type: ADD_PAGE_FAILED, payload: err
		}))
	}
	else{
		dispatch({
			type: ADD_PAGE_FAILED, payload: 'The request you have sent is not valid. Try a different Page ID'
		})
	}
}

export const displayCard=(id,name,link,picture,fan_count)=>({
	type: DISPLAY_CARD,
	payload: {id,name,link,picture,fan_count}
})

export const setSearchfield=(text="")=>({
	type: SET_SEARCH_FIELD,
	payload: text
})

export const setCountryFilter=(filter="")=>({
	type: SET_COUNTRY_FILTER,
	payload: filter
})
export const setCategoryFilter=(filter="")=>({
	type: SET_CATEGORY_FILTER,
	payload: filter
})
export const setFilters=(categoryFilters,countryFilters)=>({
	type: FILTERS,
	payload: {categoryFilters,countryFilters}
})

export const setLoginState=(user="",password="")=>(dispatch)=>{
	if(user==="") dispatch({ type: LOGOUT, payload: 'Logged out'})
	else{
		dispatch({type: LOGIN_PENDING, payload: true})
		fetch('http://localhost:3001/login', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({ user,password})
		})
		.then(response=>{if(response.status!==200){throw new Error("Bad request")} return response.json()})
		.then(data=>{
			dispatch({type:LOGIN_SUCCESS, payload:data})
		})
		.catch(error=>dispatch( {type: LOGIN_FAILED, payload: 'Login failed'}))
	}
}
export const registerUser=(user, password,email)=>dispatch=>{
	dispatch({type: LOGIN_PENDING, payload: true})
	fetch('http://localhost:3001/register', {
		method: 'post',
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify({ user,password,email})
	})
	.then(response=>{if(response.status!==200){throw new Error("Bad request")} return response.json()})
	.then(data=>{
		dispatch({type: REGISTER, payload: 'Your account has been created'})
	})
	.catch(error=>dispatch({type: REGISTER_FAILED, payload: 'Error - Could not create new account'}))
}

export const updateFavourites=(id,user)=>dispatch=>{
	dispatch({type: LOGIN_PENDING, payload:true})
	fetch('http://localhost:3001/updatefavs', {
		method: 'post',
		headers: {'Content-Type':'application/json'},
		body:JSON.stringify({
			id,user
		})
	})
	.then(response=>response.json())
	.then(data=>{
		if(data.update){
			dispatch({type: UPDATE_FAVOURITES, payload:data.pagesDatabase})
			dispatch({type: UPDATE_USERS_FAVOURITES, payload: data.userToSend})
		}	
	})
	.catch(err=>console.log(err))
}
