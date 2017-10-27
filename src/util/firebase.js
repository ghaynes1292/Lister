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
export const firebaseAuth = firebase.auth;
export const provider = new firebase.auth.GoogleAuthProvider();

export const dbListItemRef = firebase.database().ref('listItems/');
export const dbListRef = firebase.database().ref('lists/');
export const dbThemeRef = firebase.database().ref('theme/');

export const fbPersistListItems = (listItems) => {
  dbListItemRef.set(listItems);
}

export const fbPersistListItem = (listItem) => {
  console.log('about to persist list item', listItem)
  firebase.database().ref('listItems/' + listItem.id).set(listItem);
}

export const fbPersistLists = (lists) => {
  dbListRef.set(lists);
}

export const fbPersistTheme = (theme) => {
  dbThemeRef.set(theme);
}

export const userSignIn = () => firebaseAuth().signInWithRedirect(provider)

export const userSignOut = () => firebaseAuth().signOut()
