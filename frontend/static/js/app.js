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
  //alert("works")
  var email = $("#email").val()
  var psk = $("#password").val()
  firebase.auth().createUserWithEmailAndPassword(email, psk).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Hmm, something went wrong...")
    console.log(`${errorCode}, ${errorMessage}`)
    // ...
  });
  alert("Account created! You can now login.")
  //window.location.href = "/"
}

function login() {
  var email = $("#email").val()
  var password = $("#password").val()
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    //alert("Hmm, something went wrong...")
    sessionStorage.setItem("loggedIn", false)
    // ...
  }).then(function(user) {
    if (typeof(user) === "undefined") {
      alert("Hmm, that username/password isn't correct.")
      sessionStorage.setItem("loggedIn", false)
    } else {
      sessionStorage.setItem("loggedIn", true)
      sessionStorage.setItem("email", email)
      sessionStorage.setItem("password", password)
      window.location.href = "/dashboard/"
    }
  });
}

$(document).ready(function() {
  console.log("running")
  if (sessionStorage.getItem("loggedIn") === "true") {
    var email = sessionStorage.getItem("email")
    var password = sessionStorage.getItem("password")
    console.log(email)
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Hmm, something went wrong...")
      // ...
    }).then(function(user) {
      if (typeof(user) === "undefined") {
        alert("Hmm, that username/password isn't correct.")
      } else {
        sessionStorage.setItem("loggedIn", true)
        console.log("loggedIn")
      }
    });
  }
})