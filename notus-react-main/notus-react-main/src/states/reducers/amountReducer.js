const reducer = (state='',action) =>{
    
    if(action.type==='login')
    {
       
        state=action.payload
        return state
    }
    else if(action.type==='logout')
    {
        state= ''
        return state
    }
    else
    {
        return state
    }

}
export default reducer