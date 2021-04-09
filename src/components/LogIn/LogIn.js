import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSingOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';



function LogIn() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSingIn : false,
    name : '',
    email : '',
    photo: ''
  });

  initializeLoginFramework();


  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  
  
  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(result =>{
       handleResponse(result, true);
      
      })
  }
  
  const singOut = () => {
    handleSingOut()
    .then(result => {
      handleResponse(result, false);
    })
  }

const fbSignIn = () => {

handleFbSignIn()
.then(result => {
  handleResponse(result, true);
})  
}



  
 const handleResponse = (result, redirect) => {
  setUser(result);
  setLoggedInUser(result);
  if(redirect){
    history.replace(from);
  }
 }
   

   const handleBlur = (hello) =>{
        // console.log(hello.target.value, hello.target.name);
        let isFormValid = true;
        if(hello.target.name === 'email'){
        //  const isEmailValid = /\S+@\S+\.\S+/.test(hello.target.value);
         isFormValid = /\S+@\S+\.\S+/.test(hello.target.value);
        //  console.log(isEmailValid);
        }
        if(hello.target.name ==="password"){
          const isPasswordValid = hello.target.value.length > 8;
          const passwordHasNumber = /\d{1}/.test(hello.target.value);
           isFormValid = isPasswordValid && passwordHasNumber;
          // console.log(isPasswordValid && passwordHasNumber);
        }

        if(isFormValid){
          const newUserInfo = {...user};
          newUserInfo[hello.target.name] = hello.target.value;
          setUser(newUserInfo);

        }
      }

      const handleSubmit = (hello) => {
        // console.log(user.email, user.password)
        if(newUser && user.email && user.password){
         createUserWithEmailAndPassword(user.name, user.email, user.password)
         .then(result => {
           handleResponse(result, true);
         })
    
  }
        if(!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(result => {
          handleResponse(result, true);
        })
      }


   hello.preventDefault();
  }

  





  return (
    <div style={{textAlign: 'center'}}>
      { user.isSingIn?<button onClick={singOut}>Sign out</button> : 
      <button onClick={googleSignIn}>Sign in</button>
        
      } <br/>

      <button onClick={fbSignIn}>Sign in using facebook</button>

      {
        user.isSingIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
    <h1>Our Own Authentication</h1>
    <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id=""/>
    <label htmlFor="newUser">New User Sign up</label>
    <form onSubmit={handleSubmit}>
    {newUser && <input  onBlur={handleBlur} name= "name" type="text" placeholder="your name"/>
   } <br/>
    <input onBlur={handleBlur} type="text" name="email" placeholder="Your email address" required/> <br/>
    <input onBlur={handleBlur} type="password" name="password" placeholder="your password" required/> <br/>
    
    <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
    </form>

     <p style={{color: 'red'}}>{user.error}</p>
   {/* <p style={{color: 'green'}}>{user.success}</p> */}

    {
      user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged in'} successfully</p>
    }
    </div>
  );
}

export default LogIn;
