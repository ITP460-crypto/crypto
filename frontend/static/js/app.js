// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyDMOF7rJOr0iHVHlNlNu9DB55KeMyuVsTY",
  authDomain: "crypto-a9f70.firebaseapp.com",
  databaseURL: "https://crypto-a9f70.firebaseio.com/",
  projectId: "crypto-a9f70",
  storageBucket: "gs://crypto-a9f70.appspot.com",
};
firebase.initializeApp(config);

function createAccount() {
  var email = $("#email").val()
  var password = $("#password").val()
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.log(`Firebase error during createAccount: ${error.code}, ${error.message}`)
    alert("This isn't working right now, try again later.")
  }).then(function() {
    doLogin(email, password, function() {
      window.location.href = "/dashboard/"
    })
  })
}

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

function login() {
  var email = $("#email").val()
  var password = $("#password").val()
  doLogin(email, password, function() {
    window.location.href = "/dashboard/"
  })
}

function logout() {
  firebase.auth().signOut().then(function() {
    sessionStorage.setItem("loggedIn", false)
    sessionStorage.setItem("email", "")
    sessionStorage.setItem("password", "")
    window.location.href = "/"
  }).catch(function(error) {
    alert("Couldn't log out. Please close the window.")
  });
}

$(document).ready(function() {
  if (sessionStorage.getItem("loggedIn") === "true") {
    var email = sessionStorage.getItem("email")
    var password = sessionStorage.getItem("password")
    doLogin(email, password, function(){})
  }
})