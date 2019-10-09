import React, {useState} from 'react'
function FollowersHandle(props)
{

    const details = {
        destinationProps: props.Destination,
        currentUserName:props.currentUserName
    }

    // console.log("details" , details)
    // const destinationProps = [props.Destination]
    // const dataUserNAme = props.currentUserName
    const [followingVecations , setFollowingVecation] = useState(details)


    console.log('followingVecations>>>>',followingVecations)

    console.log(props.currentUserName)
    if(props.isChecked=== true)
    {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },        
            body: JSON.stringify(followingVecations)

        }
        console.log("details", details)

        fetch(`/api/FollowersHandle`, options)
        .then(res=>res.json())
        .then((data)=>
        {
        
                alert(JSON.stringify(data))
                console.log('this is data in fetch' , data)
   
        })
        .catch(err => console.log({state: 'error' , message: err.message}))
        // return <h1>im following handler</h1>
        

    }else{
        
    }
    return(
        <></>
    )
}

export default FollowersHandle;