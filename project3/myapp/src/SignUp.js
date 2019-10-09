import React, {useState} from 'react';


function SignUp() 
{
      //define first state 
  const initializedUser ={
    firstName:'',
    lastName:'',
    userName:'',
    email:'',
    userPassword:'',
  }

  const [user , setInputs] = useState(initializedUser)
      //adding to arry [user] the values that was write
  const handleInputChange= (event)=>
  {
    setInputs({...user, [event.currentTarget.id]: event.currentTarget.value})
  }

    //add user to database
  const handleAdd =(event) =>
  {
    event.preventDefault()

      const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },        
      body: JSON.stringify(user)
  } 

    fetch('/api/Users', options)
    .then(res=> res.json())
    .then( (data) =>
    {
      if(data.state ==='errorMsg')
      {
        alert(data.message)
        return
      }
      if(data.state === undefined)
      {
        alert('email exsist')
        return
      }
      
      else{
        alert(JSON.stringify(data.message))
        setInputs(initializedUser)

      }

      })
    // .catch(err =>{console.log({err: 'exsist'})})
    .catch(err =>{console.log(err)
    alert('error same email')
    alert({err: 'error same email'})
    })
    
  }


       return(
        <form onSubmit={handleAdd}>
        <div>
          <label> first name </label>
          <input type='text' id='firstName' name='firstName' onChange={handleInputChange} value={user.firstName} required /> 
          <br/>
          <label> last name </label>
          <input type='text' id='lastName' name='lastName' onChange={handleInputChange} value= {user.lastName} required />
        </div>
          <div>
            <label>User Name</label>
            <input  id="userName" name="userName" onChange={handleInputChange} value={user.userName} required />
          </div>
          <div>
          <label> email address </label>
          <input type='text' id='email' name='email' onChange={handleInputChange} value={user.email}  required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" id="userPassword"  name="userPassword" onChange={handleInputChange} value={user.userPassword} required/>
          </div>
          <button type="submit">Sign Up</button>
      </form>
      )
 

}


export default SignUp;
