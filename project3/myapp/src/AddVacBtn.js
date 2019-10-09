import React, {useState} from 'react';
import Collapse from 'react-bootstrap/Collapse'

function AddVacBtn()
{
    const initializedAddForm=
    {
        vacationName: '', 
        description:'',
        price: '',
        depart: '',
        Return: ''

    }

    let [collapse , setBtn] = useState(false)
    let [details , setDetails] = useState(initializedAddForm)

    const inputChangeHandler=(event)=>
    {
        setDetails({...details , [event.currentTarget.id]: event.currentTarget.value});
        console.log('details>>>>', details)
    }



    const addVac= (event)=>
    {
        setBtn(!collapse)
    }

    const addVacation =(e)=>
    {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },        
            body: JSON.stringify(details)
        }
        fetch('api/AddVacation', options)
        .then(res=> res.json())
        .then( (data) =>
        {
            if(data.state === 'errorMsg')
            {
                alert(data.message)
                return
            }else{
                if(data.state === 'error')
                {
                    console.log(data.message)
                    console.log(data)
                    return;
                }
                alert('vacation created')
                console.log('data>>>>' , data)
                setDetails(initializedAddForm)
            }

             

          })
        .catch(err =>{
            console.log(err)
            console.log({state: 'error' , message: err.message})
        })
    }

return(
    <>
    <button onClick= {addVac}  aria-controls="example-collapse-text"
    aria-expanded={collapse}>Add</button>
    <Collapse in={collapse}>
        <form id='example-collapse-text' onSubmit={addVacation}>
            {/* <label>Vacation Name:</label> <input type='text' /> */}
            <label>Vacation Name:</label> <input type='text' id='vacationName' onChange={inputChangeHandler} value={details.vacationName} required/> <br/>
            <label>Description:</label> <input type='text' id='description' onChange={inputChangeHandler} value={details.description} required /> <br/>
            <label>Price:</label> <input type='text'  id='price' onChange={inputChangeHandler} value={details.price} required/> <br/>
            <label>Depart:</label> <input type='date' id='depart' onChange={inputChangeHandler} value={details.depart} required/> <br/>
            <label>Return:</label> <input type='date' id='Return' onChange={inputChangeHandler} value={details.Return} required/> 
 <br/>
            <button onClick={addVacation}>Click here to add vacation</button>
        </form>  
    </Collapse>
    </>


    
)
}

export default AddVacBtn