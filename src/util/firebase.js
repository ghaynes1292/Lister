import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyARoaj8eZ_MpqSMXVO27jLdAyCxNWwrYcE",
  authDomain: "pwa-list.firebaseapp.com",
  databaseURL: "https://pwa-list.firebaseio.com",
  projectId: "pwa-list",
  storageBucket: "pwa-list.appspot.com",
  messagingSenderId: "241274381227"
};

firebase.initializeApp(firebaseConfig)

export const dbListItemRef = firebase.database().ref('listItems/');
export const dbListRef = firebase.database().ref('lists/');

export const fbPersistListItems = (listItems) => {
  dbListItemRef.set(listItems);
}

export const fbPersistLists = (lists) => {
  dbListRef.set(lists);
}
