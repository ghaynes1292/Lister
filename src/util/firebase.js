import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyARoaj8eZ_MpqSMXVO27jLdAyCxNWwrYcE",
  authDomain: "pwa-list.firebaseapp.com",
  databaseURL: "https://pwa-list.firebaseio.com",
  projectId: "pwa-list",
  storageBucket: "pwa-list.appspot.com",
  messagingSenderId: "241274381227"
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();

export const dbListItemRef = firebase.database().ref('listItems/');
export const dbListRef = firebase.database().ref('lists/');
export const dbThemeRef = firebase.database().ref('theme/');

export const fbPersistListItems = (listItems) => {
  dbListItemRef.set(listItems);
}

export const fbPersistLists = (lists) => {
  dbListRef.set(lists);
}

export const fbPersistTheme = (theme) => {
  dbThemeRef.set(theme);
}

export const userSignIn = () => firebase.auth().signInWithRedirect(provider);

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    console.log('signed in token', token)
    // ...
  }
  // The signed-in user info.
  console.log('result signed in', result.user)
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  console.log('error signing in', error)
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

export const userSignOut = () => firebase.auth().signOut().then(function() {
  console.log('signed out')
}).catch(function(error) {
  console.log('error occured while trying to sign out', error)
});
