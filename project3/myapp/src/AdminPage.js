import React , {useState, useEffect} from 'react';
import CardVacation from './CardVacation';
import Vacations from './Vacations';
import AddVacBtn from './AddVacBtn';
import DeleteVacBtn from './DeleteVacBtn';

function AdminPage()
{

    const addCavation= (event)=>
    {
        alert('add vac')
        
    }

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
        fetch('/api/AdminPage', options)
        .then(res=> res.json())
        .then( (data) =>
        {
            //  alert(JSON.stringify(data))
            //  if(data.state === 'success'){
                 setData(data);
                
            //  }
    
          })
        .catch(err =>{console.log(err.message)})

    },[])

    if(data.state === 'success')
    {
        return(
            <>
        <h1>
            hello Admin
        </h1>
        <div>
            <AddVacBtn/>              <DeleteVacBtn/>
 
            {/* <button onClick={addCavation} >Add vacation</button> */}
        </div>
        {/* <div>
            <DeleteVacBtn/>
        </div> */}
        <Vacations userData= {data}  />



        </>
        )
    }else{
        return(<div>You have no authorization !</div>)
        
    }
}
export default AdminPage