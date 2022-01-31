var initial ={
    "id":"",
    "name":"",
    "email":"",
    "password":""
}


const reducer = (state=initial,action) =>{
    
    if(action.type==='login')
    {   console.log("in reducer "+JSON.stringify(action.payload))
       var dataRecieved={
        "id":action.payload.id,
        "name":action.payload.name,
        "email":action.payload.email,
        "password":action.payload.password

       }
       console.log("data recieved "+JSON.stringify(dataRecieved))
        state=dataRecieved
        console.log("data sent to state "+JSON.stringify(state))
        return state
    }
    else if(action.type==='logout')
    {   var dataRemove={
        "id":'none',
        "name":'none',
        "email":'none',
        "password":'none'

       }
        state= dataRemove
        return state
    }
    else
    {
        return state
    }

}
export default reducer