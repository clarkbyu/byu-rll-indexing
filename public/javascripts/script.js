var myApp = angular.module("myApp", ["firebase"]);

myApp.controller("chatController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray) {
        var ref = firebase.database().ref().child("messages");
        $scope.chats = $firebaseArray(ref);
        $scope.update = function(user) {
            var newmessage = { from: user.name || "anonymous", body: user.chat };
            console.log(newmessage);
            $scope.chats.$add(newmessage);
            user.chat = "";
        };
    }
]);

myApp.controller("indexController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray) {
        $scope.record_no = "n1";
        var record_no = $scope.record_no;
        
        var ref = firebase.database().ref().child("suggestions").child(record_no);
        
        $scope.options = $firebaseArray(ref);
        
        $scope.update = function(name) {
            console.log(name);
            var submissionRef = firebase.database().ref().child("submissions").child(record_no);
            $scope.submissionArray = $firebaseArray(ref);
            var newSelection = { record: record_no, name: name };
            console.log(newSelection);
            console.log(firebase.database.ServerValue.TIMESTAMP);
            $scope.submissionArray.$add(newSelection);
            name = "";
        };
    }

]);

/*

var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
starCountRef.on('value', function(snapshot) {
  updateStarCount(postElement, snapshot.val());
});


*/
