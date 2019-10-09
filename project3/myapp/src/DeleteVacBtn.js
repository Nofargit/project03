import React, {useState} from 'react';
import Collapse from 'react-bootstrap/Collapse'


function DeleteVacBtn()
{
    let [collapse , setBtn] = useState(false)

    const deleteVac= (event)=>
    {
        setBtn(!collapse)
    }
    return(
        <>
    <button onClick= {deleteVac}  aria-controls="example-collapse-text"
    aria-expanded={collapse}>Delete</button>
    <Collapse in={collapse}>
        <div id='example-collapse-text' >
        <label>Enter Here the cuntry that you want to delete</label> <input type='text' /> <button >Find</button>
        </div>  
    </Collapse>
        </>
    )
}

export default DeleteVacBtn