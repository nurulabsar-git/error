import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
      firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    // console.log("object");
    return firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      const {displayName, photoURL, email} = result.user;
      const singInUser = {
        isSingIn: true, 
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return singInUser;
      // console.log(displayName, email, photoURL);
    })

    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
}

export const handleFbSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(facebookProvider)
    .then((result) => {
      
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
      user.success = true;
      return user;
  
      
    })
    .catch((error) => {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

 export const handleSingOut = () => {
    // console.log('sign out');
   return firebase.auth().signOut()
    .then(result => {
     const signOutUser = {
       isSingIn: false,
       
       name: '',
       email: '',
       password: '',
       photo: "" ,
       error: '',
       success: false
    }
    return signOutUser;
    })
    .catch(error => {
     
    })
  }


  export const createUserWithEmailAndPassword = (name, email, password) => {
    
   return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
    const newUserInfo = result.user
    newUserInfo.error = '';
    newUserInfo.success = true;
    updateUserName(name);
    return newUserInfo;
    
    })
  .catch((error) => {
    //handle error
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
    
  });

  }
  

  export const signInWithEmailAndPassword = (email, password) => {
   return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      const newUserInfo = result.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    return newUserInfo;
    console.log('sign in user info', result.user);
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      
    });

  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
    displayName: name})
    .then( function () {
    console.log('user info updated successfully');
    })
    
    .catch(function(error) {
        console.log(error);
      });
  
    }








