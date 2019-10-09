import React ,{ useState } from 'react';

function LoginPage()
{
    const initializedLogin=
    {
        userName: '',
        userPassword:''
    }
    const [user , setInputs] = useState(initializedLogin)

    const handleInputChange= (event)=>
    {
        // event.preventDefault()
      setInputs({...user, [event.currentTarget.id]: event.currentTarget.value})
      //updating on every press. 
      console.log('users====>',user)
    }



    const handleSubmit= (e)=>
    {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },        
            body: JSON.stringify(user)
        }
        fetch('http://localhost:5080/api/login', options)
        .then(res=> res.json())
        .then( (data) =>
        {
            if(data.message ==='enter values')
            {
                alert('no values in all fields!')
                return
            }
             alert(JSON.stringify(data))
             localStorage.setItem('myJwt', data.token)
             
             if(data.message === 'user or password incorrect'){
                // console.log('data.message')
               alert('one of your details is wrong')
                return
             }
          
             else{
                 if(data.admin){document.location.href='/AdminPage'}
                 else{
                     console.log('admin false')
                     document.location.href='/Main'}
             }
          })
        .catch(err =>{
            console.log(err)
            console.log({state: 'error' , message: err.message})
        })
    }
    return(
         <form onSubmit={handleSubmit}>
                <div>
                    <label> User name </label>
                    <input type='text' id='userName' name='userName' onChange={handleInputChange} value={user.userName} required /> 
                    <br/>
                    <label> PASSWORD </label>
                    <input type='password' id='userPassword' name='userPassword' onChange={handleInputChange} value= {user.userPassword} required />
                    <br/>
                    <button onClick={handleSubmit}>Login</button>
                </div>
        </form>
    ) 
}


export default LoginPage;