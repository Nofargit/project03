// import React, {useState, useEffect} from 'react';
// import FollowersHandle from './FollowersHandle';


//  function CardVacation(props){

//   const Destination = props.Destination




//     const [isChecked , setFollowers] = useState(false)



//       const [follow , setButton] = useState('Follow')
//       // console.log('>>currentUserName' , props.currentUserName)


//   // let arryForFollowingVacation = [];

//   const followButton =()=>
//   {
//           if(isChecked === false)
//           {
//             console.log(isChecked)
//             setFollowers(true)
//             console.log('isChecked>>>>>>>>>>' , isChecked)
//             setButton('Following')
//             // arryForFollowingVacation.push(Destination)
//             // console.log("arryForFollowingVacation" , arryForFollowingVacation)

//           }
//           else{            
//             setFollowers(false)
//             setButton('Follow')
//           }
//   }





//     return(
//         <>


// <div className='cardDiv'>

//   <button id="follow-button" onClick={followButton} >  <FollowersHandle  currentUserName={props.currentUserName} isChecked={isChecked}  Destination={ props.Destination} /> {follow} </button>


//   <p>vacation to: {props.Destination}</p>
//   <div>
//   Description: {props.Description}
//   <br/>
//   Dates: {props.Dates}
//   <br/> 
//   Price: {props.Price}
//   </div>


//  </div>


// </>
//     )

// }


// export default CardVacation;


////////////////////////////////////////////////////////////////////////////////////////////////




import React, { useState } from 'react';
// import FollowersHandle from './FollowersHandle';

function CardVacation(props) {
  const details = {
    currentUserName: props.currentUserName,
    Destination: props.Destination,
    VacationId: props.VacationId
  }
  
  // const [{button, follow} , setButton] = useState({buttoncolor:'black' ,follow: false })

  let props_followID =  props.followID
  const [buttonColor, setButton] = useState( props_followID )

  console.log('buttonColor--->', buttonColor)
  console.log('props_followID--->', props_followID)



  const followButton = () => {
    if (props_followID === null) {
      console.log('want to fallow');

      console.log("details", details)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details)
      }
    
 
      fetch(`/api/FollowVacation`, options)
        .then(res => res.json())
        .then((data) => {
          console.log('data', data)
          console.log(buttonColor , '<<<<buttonColor')
          setButton(buttonColor === true)
          console.log(buttonColor , '<<<<buttonColor')

        })
        .catch(err => console.log({ state: 'error', message: err.message }))

    } else {

      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details)
      }
    
      console.log('following');
      fetch(`/api/UnfollowVacation`, options)
        .then(res => res.json())
        .then((data) => {
        setButton(props_followID = null)
        console.log("data...>" , data)
        })
        .catch(err => console.log({ state: 'error', message: err.message }))
    }
  }




  return (
    <>


      <div className='cardDiv'>

        <button type="button" className="btn btn-light" id='btn-light' style={{ color: buttonColor  === null ? 'black' : 'red' }} onClick={followButton} > ♥ </button>


        <p>vacation to: {props.Destination}</p>
        <div>
          Description: {props.Description}
          <br />
          Price: ${props.Price}
          <br />
          Depart: {props.Depart}
          <br />
          Return: {props.Return}
        </div>



      </div>


    </>
  )

}


export default CardVacation;