import {REQUEST_PAGE_PENDING, REQUEST_PAGE_SUCCESS, 
		REQUEST_PAGE_FAILED, GET_ACCESS_SUCCESS, WINDOW_RESIZE,
		CHANGE_PAGE, CATEGORY_CHOICE, ADD_PAGE_FAILED,
		ADD_PAGE_SUCCESS, ACCESS_TOKEN, DISPLAY_CARD,
		SET_SEARCH_FIELD, SET_COUNTRY_FILTER, SET_CATEGORY_FILTER,
		FILTERS, LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_PENDING,
		LOGOUT, REGISTER, REGISTER_FAILED } from './constants';

export const getAccessToken = (at) =>({
  type: GET_ACCESS_SUCCESS, payload: ACCESS_TOKEN
})
export const getPageFromAPI = (record) => (dispatch) => {
	dispatch({ type: REQUEST_PAGE_PENDING, payload: record});
	let payload;
	window.FB.api('/'+record.id,'get',{access_token:ACCESS_TOKEN, fields:'id,name,fan_count, link, picture'},(response)=>{
		payload=response;
	})
	setTimeout(()=>{
		if(payload.error){
			dispatch({type: REQUEST_PAGE_FAILED, payload: payload.error.message})
		}
		else{
			dispatch({type: REQUEST_PAGE_SUCCESS, payload: payload})
		}
	},1000)
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
export const newPage=(id,category,country,message)=>{
	if(!id)
		return{
			type: ADD_PAGE_FAILED,
			payload: message
		}
	else
		return{
			type: ADD_PAGE_SUCCESS,
			payload: {id,category,country,message}
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

const database=[{user: 'marco', password: 'marco',fav: []}, {user: 'sandro', password:'sandro',fav: []}, {user: 'gianni', password:'gianni',fav: []}];
export const setLoginState=(user="",password="")=>(dispatch)=>{
	if(user==="" && password==="") dispatch({ type: LOGOUT, payload: 'Logged out'})
	else{
		dispatch({type: LOGIN_PENDING, payload: true})
		const dbCheck=database.filter(record=>{
			return record.user===user && record.password===password;
		})
		if(dbCheck[0]) dispatch({type:LOGIN_SUCCESS, payload:dbCheck[0]})
		else dispatch({type: LOGIN_FAILED, payload: 'Login failed'})
	}
}
export const registerUser=(user="", password="")=>dispatch=>{
	const dbCheck=database.filter(dbUser=>dbUser==={user,password})
	if(!dbCheck[0]){
		database.push({user,password,fav: []})
		return dispatch({type: REGISTER, payload: 'Your account has been created'})
	}

}




	