import React, {useState, useEffect} from 'react'
import CardVacation from './CardVacation'
// import Card from 'react-bootstrap/Card'

function Vacations(props)
{

    let [data , setData] = useState([])
    let currentUserName = props.userData.user
    useEffect( ()=>
    {
 
        fetch('/api/Vacations')
        .then(res=> res.json())
        .then( (data) =>
        {
            setData(data.message);
            console.log('data::::', data.message)
        })
        .catch(err =>{console.log(err.message)})

        // fetch followers
        
    },[])

    return(
        <>
        <h1>Vacations</h1>
        {/* <h1>{JSON.stringify(data)}</h1> */}
        <div>{data.map(vacDetails=><CardVacation key={vacDetails.VacationId} VacationId={vacDetails.VacationId} currentUserName={currentUserName} Destination={vacDetails.Destination} Description= {vacDetails.Description} Price={vacDetails.Price} Depart={vacDetails.Depart} Return={vacDetails.Return} followID={vacDetails.followID}/>)}</div>
        </>
    )
}

 



export default Vacations