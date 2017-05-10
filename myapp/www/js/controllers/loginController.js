angular.module('app.loginController', ['pascalprecht.translate'])
     
.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$state', 'sharedData', '$firebaseArray', '$ionicPopup', '$ionicLoading', '$translate', '$rootScope',
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state, sharedData, $firebaseArray, $ionicPopup, $ionicLoading, $translate, $rootScope) {

  /*
    *************************************DECLARE FUNCTIONS FOR NG-SHOW********************************
  */

  $scope.loginType=false;
  $scope.loginType2=false;

  $scope.allFalseForm = function() {
    $scope.loginType=false;
    $scope.loginType2=false;
  }
  
  $scope.teacherForm = function() {
    $scope.loginType=true;
    $scope.loginType2=false;
    $scope.modelLoginTeacher = {};
    sharedData.setData('teacher');
  }
  $scope.studentForm = function() {
    $scope.loginType=false;
    $scope.loginType2=true;
    $scope.modelLoginStudent = {};
    sharedData.setData('student');
  }

  /*
    *************************************DECLARE VARIABLES & GIVE TO $SCOPE ALL THE VALUES WE NEED****
  */

  $translate(['ACCEPT', 'ACCOUNT_STUDENT_NOT_EXIST', 'ACCOUNT_TEACHER_NOT_EXIST', 'CANCEL', 'CHECK_EMAIL_TO_VERIFY', 'EMAIL_INVALID', 'EMAIL_OF_ACCOUNT', 'ERROR_ACCESS_UNKNOW', 'INSERT_EMAIL_CORRECT', 'USER_NOT_FOUND', 'VERIFY_EMAIL', 'WRONG_CREDENTIALS']).then(function(translations) {
    $scope.acceptText = translations.ACCEPT;
    $scope.accountStudentNotExistAlert = translations.ACCOUNT_STUDENT_NOT_EXIST;
    $scope.accountTeacherNotExistAlert = translations.ACCOUNT_TEACHER_NOT_EXIST;
    $scope.cancelText = translations.CANCEL;
    $scope.checkEmailToVerify = translations.CHECK_EMAIL_TO_VERIFY;
    $scope.emailInvalidAlert = translations.EMAIL_INVALID;
    $scope.emailOfAccountText = translations.EMAIL_OF_ACCOUNT;
    $scope.errorUnknowAlert = translations.ERROR_ACCESS_UNKNOW;
    $scope.insertEmailValidAlert = translations.INSERT_EMAIL_CORRECT;
    $scope.userNotFoundAlert = translations.USER_NOT_FOUND;
    $scope.verifyEmailAlert = translations.VERIFY_EMAIL;
    $scope.wronCredentialsAlert = translations.WRONG_CREDENTIALS;
  });

  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');

  /*
    *************************************EVERY FUNCTIONALITY FUNCTION GOES HERE***********************
  */

  $scope.logInTeacher = function(email, password) {

    if (email != undefined && email.includes('@')) {
      $ionicLoading.show();
    }

    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
      $ionicLoading.hide();
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
      var sessionUser = firebase.auth().currentUser;
      if (sessionUser) {
        //User is signed in.
        var teachersArray = $firebaseArray(teachersRef);
        teachersArray.$loaded(function() {
          if (teachersArray.$getRecord(sessionUser.uid) && sessionUser.emailVerified == true) {
            $state.go('teacherHome');
            $scope.modelLoginTeacher = {};
            $scope.allFalseForm();
            $ionicLoading.hide();
          } else if (sessionUser.emailVerified == false){
            alert($scope.verifyEmailAlert);
            firebase.auth().signOut();
            $ionicLoading.hide();
          } else {
            alert($scope.accountTeacherNotExistAlert);
            $ionicLoading.hide();
          }
        });
      } else {
        //No user is signed in.
        $ionicLoading.hide();
      }
    }).catch(function(error) {
      if (error) {
        switch (error.code) {
    			case "auth/wrong-password":
    				alert($scope.wronCredentialsAlert);
    				break;
    			case "auth/user-not-found":
    				alert($scope.userNotFoundAlert);
    				break;
    			case "auth/invalid-email":
    				alert($scope.emailInvalidAlert);
    				break;
    			default:
    				alert($scope.errorUnknowAlert);
    				break;
  			}
        $ionicLoading.hide();
		  }
    });
  }

  $scope.logInStudent = function(email, password) {

    if (email != undefined && email.includes('@')) {
      $ionicLoading.show();
    }

    if (firebase.auth().currentUser) {
      $ionicLoading.hide();
      firebase.auth().signOut();
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
      var sessionUser = firebase.auth().currentUser;
      if (sessionUser) {
        //User is signed in.
        var studentsArray = $firebaseArray(studentsRef);
        studentsArray.$loaded(function() {
          if (studentsArray.$getRecord(sessionUser.uid)) {
            var student = studentsArray.$getRecord(sessionUser.uid);
            if(student.emailVerified == true || sessionUser.emailVerified == true) {
              $state.go('studentHome');
              $scope.modelLoginStudent = {};
              $scope.allFalseForm();
              $ionicLoading.hide();
            } else {
              alert($scope.verifyEmailAlert);
              firebase.auth().signOut();
              $ionicLoading.hide();
            }
          } else {
            alert($scope.accountStudentNotExistAlert);
            $ionicLoading.hide();
          }
        });
      } else {
        //No user is signed in.
        $ionicLoading.hide();
      }
    }).catch(function(error) {
      if (error) {
        switch (error.code) {
    			case "auth/wrong-password":
    				alert($scope.wronCredentialsAlert);
    				break;
    			case "auth/user-not-found":
    				alert($scope.userNotFoundAlert);
    				break;
    			case "auth/invalid-email":
    				alert($scope.emailInvalidAlert);
    				break;
    			default:
    				alert($scope.errorUnknowAlert);
    				break;
    		}
        $ionicLoading.hide();
		  }
    });
  }

  $scope.showResetPasswordPopup = function() {
    $scope.emailUser = {};
    var ressetPasswordPopup = $ionicPopup.alert({
      title: $scope.emailOfAccountText,
      template: '<input type="text" ng-model="emailUser.mail">',
      scope : $scope,

      buttons : [
        {text: $scope.cancelText},
        {text: $scope.acceptText,
          onTap: function(e) {
            firebase.auth().sendPasswordResetEmail($scope.emailUser.mail).then(function() {
              alert($scope.checkEmailToVerify);
            }).catch(function(error) {
              if (error) {
                switch (error.code) {
                  case "auth/argument-error":
                    alert($scope.insertEmailValidAlert);
                    break;
                  default:
                    alert($scope.insertEmailValidAlert);
                    break;
                }
              }
            });
          }
        },
      ] 
    });     
  };

  $rootScope.$on('$translateChangeSuccess', function () {
    $scope.acceptText = $translate.instant('ACCEPT');
    $scope.accountStudentNotExistAlert = $translate.instant('ACCOUNT_STUDENT_NOT_EXIST');
    $scope.accountTeacherNotExistAlert = $translate.instant('ACCOUNT_TEACHER_NOT_EXIST');
    $scope.cancelText = $translate.instant('CANCEL');
    $scope.checkEmailToVerify = $translate.instant('CHECK_EMAIL_TO_VERIFY');
    $scope.emailInvalidAlert = $translate.instant('EMAIL_INVALID');
    $scope.emailOfAccountText = $translate.instant('EMAIL_OF_ACCOUNT');
    $scope.errorUnknowAlert = $translate.instant('ERROR_ACCESS_UNKNOW');
    $scope.insertEmailValidAlert = $translate.instant('INSERT_EMAIL_CORRECT');
    $scope.userNotFoundAlert = $translate.instant('USER_NOT_FOUND');
    $scope.verifyEmailAlert = $translate.instant('VERIFY_EMAIL');
    $scope.wronCredentialsAlert = $translate.instant('WRONG_CREDENTIALS');
  });

}])