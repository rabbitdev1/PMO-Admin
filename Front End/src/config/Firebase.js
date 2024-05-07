import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCBbaAuNuwQdmQbADNN8mZkN571yw56c1Y",
  authDomain: "pmoadmindemo.firebaseapp.com",
  projectId: "pmoadmindemo",
  storageBucket: "pmoadmindemo.appspot.com",
  messagingSenderId: "412317160291",
  appId: "1:412317160291:web:f77a65c5ed2eb9c3d87956",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const storage = firebase.storage();

export { storage };
