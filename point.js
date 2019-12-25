


  /**
   * Function called when clicking the Login/Logout button.
   */
  // [START buttoncallback]

  function toggleSignIn() {


    if (!firebase.auth().currentUser) {
      // [START createprovider]
      var config = {
        apiKey: "AIzaSyBqPq5zvMTXv72ngFLPQe8RHE1DxBFWs9w",
        authDomain: "my-project-1574031936136.firebaseapp.com",
        databaseURL: "https://my-project-1574031936136.firebaseio.com",
        projectId: "my-project-1574031936136",
        storageBucket: "my-project-1574031936136.appspot.com",
        messagingSenderId: "1053075746804",

      };
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
}
      var provider = new firebase.auth.GoogleAuthProvider();
      // [END createprovider]
      // [START addscopes]
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // [END addscopes]
      // [START signin]
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // [START_EXCLUDE]
        document.getElementById('quickstart-oauthtoken').textContent = token;
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END signin]

    } else {
      // [START signout]

      document.getElementById("yourpoints").style.display="none";
      document.getElementById("mypoints").style.visibility="hidden";
      firebase.auth().signOut();
      window.location.reload();
      //document.getElementById("mypoints").style.display="none";



      // [END signout]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = true;

    //document.getElementById("mypoints").style.display="none";


    // [END_EXCLUDE]
  }
  // [END buttoncallback]
  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.

   */

  function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    var config = {
      apiKey: "AIzaSyBqPq5zvMTXv72ngFLPQe8RHE1DxBFWs9w",
      authDomain: "my-project-1574031936136.firebaseapp.com",
      databaseURL: "https://my-project-1574031936136.firebaseio.com",
      projectId: "my-project-1574031936136",
      storageBucket: "my-project-1574031936136.appspot.com",
      messagingSenderId: "1053075746804",

    };
    // console.log(config);
    firebase.initializeApp(config);
    var pointval=0;



    // const config= {
    //   apiKey: "AIzaSyBqPq5zvMTXv72ngFLPQe8RHE1DxBFWs9w",
    //   authDomain: "my-project-1574031936136.firebaseapp.com",
    //   databaseURL: "https://my-project-1574031936136.firebaseio.com/",
    //   storageBucket: "my-project-1574031936136.appspot.com",
    //
    // };
    // firebase.initializeApp(config1);
//     if (!firebase.apps.length) {
//       firebase.initializeApp(config);
// }
    // const firebaseApp=firebase;




    firebase.auth().onAuthStateChanged(function(user) {


       if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        if (email.includes("gmail")==true){
          // alert("Error!")

              firebase.auth().signOut();
              document.getElementById("name").style.display = "block";
              document.getElementById("submit").style.display= "block";
              document.getElementById("myDIV").style.display= "block";
              document.getElementById("mypoints").style.display="none";
              document.getElementById("yourpoints").style.display="none";

              //document.getElementById("message").style.display="block";
              document.getElementById("submit").addEventListener("click", getvalue, false);

              function getvalue(){
                document.getElementById("name").style.display = "none";
                document.getElementById("submit").style.display= "none";
                document.getElementById("myDIV").style.display= "none";
                document.getElementById("yourpoints").style.display="block";
              var userinput= document.getElementById("name").value;
              var userinput1=userinput.substring(0,7);
              console.log(userinput1);


              //document.getElementById("input").innerHTML=userinput;
              var ref = firebase.database().ref();

              ref.on("value", function(snapshot) {
                 var obj= snapshot.val();
            //     console.log(obj);

                 var stringified= JSON.stringify(obj);
              //   alert("stringified value is:" stringified);
              //   alert(stringified);

                 var parsedObj = JSON.parse(stringified);
                // alert(parsedObj);
                 // console.log(parsedObj);



                 // var result = [];
                 //
                 //  for(var i in stringified)
                 //   result.push([i, stringified [i]]);

                 var keyval = Object.keys(parsedObj);
                 console.log(keyval);
                 var values = Object.values(parsedObj);
                 console.log(values);

                // var keys = []
                  //for(var k in stringified){
                  //         keys.push(k)
                  //   }
                  // console.log(keyval[0]);
                     var arrayLength = keyval.length;
                     var foundindex;
                     // for (var i = 0; i < arrayLength; i++) {
                      //    console.log(i);
                      var i=0;
                      while (i<arrayLength){
                       if (keyval[i] == userinput1) {
                          console.log(keyval[i]);
                          console.log(i);
                          foundindex = i;



                       }
                       i++;
                     }
                     //console.log(foundindex);
                     // if(foundindex==email){
                     //   document.getElementById("test").innerHTML = values[foundindex];
                     // }

                      pointval=values[foundindex];
                     //console.log(pointval);
                     //document.getElementById("yourpoints").style.display="block";
                     document.getElementById("mypoints").innerHTML=pointval;
                     document.getElementById("mypoints").style.display="block";

                    // document.getElementById("message").style.display="block";





              }, function (error) {
                 console.log("Error: " + error.code);
              });



              //document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';

              // document.getElementById('quickstart-sign-in').addEventListener('click', hidepoints, false);




            }



              // var button = document.createElement("button");
              // button.innerHTML = "Submit";
              //
              // // 2. Append somewhere
              // var body = document.getElementsByTagName("body")[0];
              // body.appendChild(button);
              //
              // // 3. Add event handler
              // button.addEventListener ("click", function() {
              //   alert("did something");
              // });


           // document.getElementById('quickstart-sign-out').trigger('click');
           // document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
           // document.getElementById('quickstart-sign-in').disabled = true;



        }
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        var email=user.email;
        var emailuser=email.substring(0,7);

        console.log(emailuser);


        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        document.getElementById('quickstart-account-details').textContent =null;
        //document.getElementById('mypoints').style.display="none";
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE]

        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';


        document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
          document.getElementById('quickstart-account-details').textContent =null;
        document.getElementById("mypoints").style.display="none";
        // document.getElementById('quickstart-account-details').textContent = 'null';
        // document.getElementById('quickstart-oauthtoken').textContent = 'null';
        // [END_EXCLUDE]
      }
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in').disabled = false;


      // [END_EXCLUDE]

      var ref = firebase.database().ref();


      ref.on("value", function(snapshot) {
         var obj= snapshot.val();
    //     console.log(obj);

         var stringified= JSON.stringify(obj);
      //   alert("stringified value is:" stringified);
      //   alert(stringified);

         var parsedObj = JSON.parse(stringified);
        // alert(parsedObj);
         // console.log(parsedObj);



         // var result = [];
         //
         //  for(var i in stringified)
         //   result.push([i, stringified [i]]);

         var keyval = Object.keys(parsedObj);
         console.log(keyval);
         var values = Object.values(parsedObj);
         console.log(values);

        // var keys = []
          //for(var k in stringified){
          //         keys.push(k)
          //   }
          // console.log(keyval[0]);
             var arrayLength = keyval.length;
            //var foundindex=1;
             // for (var i = 0; i < arrayLength; i++) {
              //    console.log(i);
              var i=0;
              while (i<arrayLength){
               if (keyval[i] == emailuser) {
                  console.log(keyval[i]);
                  console.log(i);
                  foundindex = i;
                  console.log(foundindex);



               }
               i++;
             }
             //console.log(foundindex);
             // if(foundindex==email){
             //   document.getElementById("test").innerHTML = values[foundindex];
             // }
        //    var pointval=0;
             pointval=values[foundindex];
            // console.log(pointval);
            //document.getElementById("mypoints").childNodes[0].nodeValue=null;
            document.getElementById("mypoints").style.display="none";

             document.getElementById("mypoints").innerHTML=pointval;



             document.getElementById("mypoints").style.display="block";




      }, function (error) {
         console.log("Error: " + error.code);
      });
    });
    // [END authstatelistener]

    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      //document.getElementById("mypoints").style.display="none";

  }

  window.onload = function() {

  initApp();
  };
