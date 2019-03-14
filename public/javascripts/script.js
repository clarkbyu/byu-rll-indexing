var angular;
var firebase;
var navigator;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBnRAxggO7kSNHcqMIwLrZI4phE-R390jI",
    authDomain: "byu-rll-indexing.firebaseapp.com",
    databaseURL: "https://byu-rll-indexing.firebaseio.com",
    projectId: "byu-rll-indexing",
    storageBucket: "byu-rll-indexing.appspot.com",
    messagingSenderId: "456237008839"
};
firebase.initializeApp(config);

var recordsIndexed = 0;
//var records = prepareUserArray(size);

var myApp = angular.module("myApp", ["firebase"]);

myApp.controller("indexController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray) {
        var app_config = firebase.database().ref().child("configuration");
        
        var sessionID = uniqueID('u');
        
        $scope.size = 170;
        
        $scope.records = prepareUserArray($scope.size);
        $scope.index = 0;
        
        $scope.pageLoad = function() {
            if ($scope.index == $scope.size) {
                $scope.index = 0;
            }
            
            $scope.record_no = $scope.records[$scope.index];
            $scope.record_img_url = "records/" + $scope.record_no + ".JPG";
            var record_no = $scope.record_no;
            
            var ref = firebase.database().ref().child("suggestions").child(record_no);
            
            $scope.options = $firebaseArray(ref);
        };
        
        $scope.pageLoad($scope.index);
        
        $scope.update = function(name, suggested) {
            console.log(name);
            var record_no = $scope.record_no;
            recordsIndexed += 1;
            
            var submissionRef = firebase.database().ref().child("submissions").child(record_no);
            $scope.submissionArray = $firebaseArray(submissionRef);
            var newSelection = { 
                record: record_no,
                name: name,
                suggested: suggested,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                session: sessionID,
                session_total: recordsIndexed,
                user_platform: navigator.platform
            };
            
            $scope.submissionArray.$add(newSelection);
            $scope.name = "";
            $scope.index += 1;
            $scope.pageLoad();
        };
    }

]);

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function prepareUserArray(size) {
    var i = 0;
    var array = [];
    
    while (i < size) {
        array[i] = "n" + i;
        i += 1;
    }
    
    array = shuffle(array);
    
    return array;
}

function uniqueID(prefix) {
    var key = (new Date).getTime().toString(36).substr(1, 6);
    key += '-' + Math.random().toString(36).substr(3, 6);
    if(prefix) {
        return prefix + '-' + key;
    }
    return key;
}
