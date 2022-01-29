export const signin = (data) =>{
  console.log("in actions "+JSON.stringify(data)) 
return(dispatch)=>{
    dispatch({
        type: 'login',
        payload: data
    })
}
}

export const signout = (data) =>{
    return(dispatch)=>{
        dispatch({
            type: 'logout',
            payload: data
        })
    }
        
}