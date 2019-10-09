import React, {useState, useEffect} from 'react'
import Vacations from './Vacations';


function Main()
{
    let [data , setData] = useState({state: ' empty'})
    useEffect( ()=>
    {
        let token = localStorage.getItem("myJwt") 
        const options = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },        
        }
        fetch('/api/Main', options)
        .then(res=> res.json())
        .then( (data) =>
        {
      
                // alert( 'DAA ====>',JSON.stringify(data))
                 console.log("data ======>" ,data)
                 setData(data);
           
        
          })
        .catch(err =>{console.log(err.message)})

    },[])


    if(data.state === 'error')
    {

        console.log(' empty ===>',data.state)
        alert(data.state)
    
        return(<div>No main</div>)


    }else{
  
        
            return(
                <>
            <h1>
                hello main
            </h1>
            <Vacations userData= {data}  />
            </>
            )
    }
}
export default Main