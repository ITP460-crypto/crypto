// # App.js: this is the main app code that runs on all pages

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDMOF7rJOr0iHVHlNlNu9DB55KeMyuVsTY",
  authDomain: "crypto-a9f70.firebaseapp.com",
  databaseURL: "https://crypto-a9f70.firebaseio.com/",
  projectId: "crypto-a9f70",
  storageBucket: "gs://crypto-a9f70.appspot.com",
};
firebase.initializeApp(config);

// Called when the page wants to make an account, gets the data from the form and submits to Firebase
function createAccount() {
  var email = $("#email").val()
  var password = $("#password").val()
  if (password.length < 6) {
    alert("Your password must be at least 6 characters!")
    return
  }
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.log(`Firebase error during createAccount: ${error.code}, ${error.message}`)
    alert("This isn't working right now, try again later.")
  }).then(function() {
    doLogin(email, password, function() {
      window.location.href = "/dashboard/"
    })
  })
}

//Called when other code wants to login to Firebase directly
function doLogin(email, password, then) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    //alert("Hmm, something went wrong...")
    console.log(`Firebase error during doLogin: ${errorCode}, ${errorMessage}`)
    sessionStorage.setItem("loggedIn", false)
    // ...
  }).then(function(user) {
    if (typeof(user) === "undefined") {
      alert("Hmm, that username/password isn't correct.")
      sessionStorage.setItem("loggedIn", false)
      console.log("Was unable to log in!")
    } else {
      sessionStorage.setItem("loggedIn", true)
      sessionStorage.setItem("email", email)
      sessionStorage.setItem("password", password)
      sessionStorage.setItem("uid", user.uid)
      console.log(`Logged in successfully as ${email}`)
      //if they go to the homepage but they're already signed in, send them to the dash
      if (window.location.href.indexOf("dashboard") < 0) {
        window.location.href = "/dashboard/"
      }
      if (typeof($("#accountname")[0]) !== "undefined") {
        console.log("attempting to write accountname")
        $("#accountname").html(email)
      } else {
        console.log("not attempting to write accountname")
      }
      then()
    }
  });
}

//Pulls new data out of Firebase and pushes out new graphs
function updateUserGraphs(graphs) {
  const uid = sessionStorage.getItem("uid");
  firebase.database().ref('graphs/'+uid).set(graphs);
}

//Gets the UID for the graphs from Firebase
function getUserGraphs() {
  const uid = sessionStorage.getItem("uid");
  return firebase.database().ref('graphs/'+uid).once('value')
}

//Called when the user clicks the login button and uses doLogin to actually login to Firebase
function login() {
  var email = $("#email").val()
  var password = $("#password").val()
  doLogin(email, password, function() {
    window.location.href = "/dashboard/"
  })
}

//Called when the user clicks the logout button and uses doLogin to actually login to Firebase
function logout() {
  firebase.auth().signOut().then(function() {
    sessionStorage.setItem("loggedIn", false)
    sessionStorage.setItem("email", "")
    sessionStorage.setItem("password", "")
    sessionStorage.setItem("uid", "")
    window.location.href = "/"
  }).catch(function(error) {
    alert("Couldn't log out. Please close the window.")
  });
}

//This is the page initializer, it calles doLogin if the user was already logged in on another page
$(document).ready(function() {
  if (sessionStorage.getItem("loggedIn") === "true") {
    var email = sessionStorage.getItem("email")
    var password = sessionStorage.getItem("password")
    doLogin(email, password, function(){})
  }
})
