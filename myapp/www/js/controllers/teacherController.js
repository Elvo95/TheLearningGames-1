/**
  THIS IS THE CONTROLLER'S STRUCTURE
    *DECLARATIONS FOR NG-SHOW
    *ACTION SHEETS
    *POPOVERS
    *POPOVERS' FUNCTIONS
      -LANGUAGES POPOVER
      -TEACHER HOME POPOVER
      -CLASS STUDENTS POPOVER
      -CLASS TEAMS POPOVER
      -MISSIONS POPOVER
      -DEFAULT POPOVER
    *MODALS
    *MODALS' FUNCTIONS
      -CONFIGURE LEVELS MODAL
      -NEW LEVEL MODAL
      -EDIT LEVEL MODAL
      -ATTENDANCE MODAL
      -SELECT CLASSROOMS MODAL
      -SELECT STUDENTS MODAL
      -SELECT ITEMS MODAL
      -SELECT ACHIEVEMENTS MODAL
      -SELECT TEAMS MODAL
      -SELECT REWARDS MODAL
      -SELECT MISSIONS MODAL
      -NEW CLASS MODAL
      -SECONDARY MENU MODAL
      -NEW STUDENT DIALOG MODAL
      -STUDENT DIALOG MODAL
      -QUANTIY RANDOM TEAMS MODAL
      -TEAM DIALOG MODAL
      -NEW TEAM DIALOG MODAL
      -EDIT TEAM MEMBERS MODAL
      -EDIT MISSION MODAL
      -EDIT MISSION REWARDS MODAL
      -EDIT MISSION MEMBERS MODAL
      -NEW TIEM MODAL
      -NEW ACHIEVEMENT MODAL
      -NEW REWARD MODAL
      -EDIT REWARD MODAL
      -NOTIFICATIONS MODAL
    *DECLARATIONS OF NEEDED VARIABLES AND FUNCTIONS
    *FUNCTIONS IN THE SCREENS
      -UPDATE INPUT FILE
      -ALERTS POPUP
      -HASHCODE POPUP
      -FUNCTIONS IN SETTINGS
      -FUNCTIONS IN HOME
      -FUNCTIONS IN PROFILE
      -FUNCTIONS IN CLASS
      -FUNCTIONS IN ITEMS
      -FUNCTIONS IN ACHIEVEMENTS
      -FUNCTIONS IN TEAMS
      -FUNCTIONS IN REWARDS
      -FUNCTIONS IN MISSIONS
      -FUNCTIONS NOTIFICATIONS
    *SORT FUNCTIONS
*/
angular.module('app.teacherController', ['pascalprecht.translate'])

.controller('teacherHomeCtrl', ['$scope', '$stateParams', '$ionicModal', '$http', '$state', '$ionicPopover', '$ionicActionSheet', '$firebaseObject', '$firebaseArray', '$ionicPopup', 'sharedData', '$ionicLoading', 'localStorageService', '$translate', '$rootScope',

function ($scope, $stateParams, $ionicModal, $http, $state, $ionicPopover, $ionicActionSheet, $firebaseObject, $firebaseArray, $ionicPopup, sharedData, $ionicLoading, localStorageService, $translate, $rootScope) {

  /**
    *************************************DECLARE FUNCTIONS FOR NG-SHOW********************************
    They work showing the cointainer that depends on the variable with @value: true.
  */

  $scope.allFalse = function() {
    $scope.teacherHomeView = false;
    $scope.profileView = false;
    $scope.settingsView = false;
    $scope.classStudentsView = false;
    $scope.classTeamsView = false;
    $scope.rulesView = false;
    $scope.itemsView = false;
    $scope.achievementsView = false;
    $scope.missionsView = false;
    $scope.rewardShopView = false;
    $scope.archivedClassroomsToShow = false;
  }

  $scope.teacherHomeForm = function() {
    $scope.allFalse();
    $scope.teacherHomeView = true;
  }

  $scope.profileForm = function() {
    $scope.allFalse();
    $scope.modelProfile = {};
    $scope.profileView = true;
    if ($scope.teacher.name.length > 32) {
      $scope.teacher.name = CryptoJS.AES.decrypt($scope.teacher.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
      $scope.teacher.surname = CryptoJS.AES.decrypt($scope.teacher.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
    }
  }

  $scope.settingsForm = function() {
    $scope.allFalse();
    $scope.settingsView = true;
  }

  $scope.classForm = function() {
    $scope.allFalse();
    $scope.classStudentsView = true;
  }

  $scope.teamsForm = function() {
    $scope.allFalse();
    $scope.classTeamsView = true;
  }

  $scope.rulesForm = function() {
    $scope.allFalse();
    $scope.rulesView = true;
  }

  $scope.itemsForm = function() {
    $scope.allFalse();
    $scope.modelItem = {};
    $scope.itemsView = true;
  }

  $scope.achievementsForm = function() {
    $scope.allFalse();
    $scope.modelAchievement = {};
    $scope.achievementsView = true;
  }

  $scope.missionsForm = function() {
    $scope.allFalse();
    $scope.missionsView = true;
  }

  $scope.rewardShopForm = function() {
    $scope.allFalse();
    $scope.rewardShopView = true;
  }

  $scope.teacherHomeForm();

  $scope.loginTypeSelectItem=true;
  $scope.loginTypeSelectStudent=false;

  $scope.selectItemForm = function() {
    $scope.loginTypeSelectItem=true;
    $scope.loginTypeSelectStudent=false;
  }

  $scope.selectStudentForm = function() {
    $scope.loginTypeSelectItem=false;
    $scope.loginTypeSelectStudent=true;
  }

  /**
    *************************************EVERY ACTIONSHEET GOES HERE*******************************
    Defines what's going to be shown after press the floating button and it's behaviour.
  */

                                        /* TEACHERHOME ACTIONSHEET */

  $scope.showActionsheetTeacherHome = function() {
    $ionicActionSheet.show({
      titleText: $scope.actionTeacherHomePopover,
      buttons: [
        { text: '<i class="icon ion-archive"></i>' + $scope.archiveClassroomsActionSheetOption },
        { text: '<i class="icon ion-share"></i>' + $scope.unarchiveClassroomsActionSheetOption },
      ],
      destructiveText: '<i class="icon ion-trash-b"></i>' + $scope.deleteClassroomsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //ARCHIVE CLASSES ACTION
          $scope.actionSheetTeacherHomeType = 'archive';
          $scope.toShow = true;
          $scope.showSelectClassroomsModal();
        } else if (index === 1) {
          //UNARCHIVE CLASSES ACTION
          $scope.actionSheetTeacherHomeType = 'unArchive';
          $scope.toShow = false;
          $scope.showSelectClassroomsModal();
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE CLASSROOMS 
        $scope.actionSheetTeacherHomeType = 'delete';
        $scope.toShow = true;
        $scope.showSelectClassroomsModal();
        return true;
      }
    });
  };

                                          /* CLASS STUDENTS ACTIONSHEET */

  $scope.showActionsheetClassStudents = function() {
    $ionicActionSheet.show({
      titleText: $scope.actionClassroomStudentsActionSheet,
      buttons: [
        { text: '<i class="icon ion-funnel"></i>' + $scope.takeAttendanceActionSheetOption },
        { text: '<i class="icon ion-wand"></i>' + $scope.evaluateStudentsActionSheetOption },
        { text: '<i class="icon ion-email"></i>' + $scope.sendMessageActionSheetOption },
        { text: '<i class="icon ion-shuffle"></i>' + $scope.randomStudentActionSheetOption },
      ],
      destructiveText: '<i class="icon ion-trash-b"></i>' + $scope.deleteStudentsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //TAKE ATTENDANCE ACTION
          $scope.actionsheetClassStudentsType = 'attendance';
          $scope.showAttendanceModal();
        } else if (index === 1) {
          //EVALUATE STUDENTS ACTION
          $scope.actionsheetClassStudentsType = 'evaluate';
          $scope.showSelectStudentsModal();
        } else if (index === 2) {
          //SEND MESSAGE ACTION
          $scope.showInputMessage = true;
          $scope.showSelectStudentsModal();
        } else if (index === 3) {
          //RANDOM STUDENT
          $scope.getRandomStudent();
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE STUDENTS ACTION
        $scope.actionsheetClassStudentsType = 'delete';
        $scope.showSelectStudentsModal();
        return true;
      }
    });
  };

                                          /* CLASS TEAMS ACTIONSHEET */

  $scope.showActionsheetClassTeams = function() {
    $ionicActionSheet.show({
      titleText: $scope.actionClassroomTeamsActionSheet,
      buttons: [
        { text: '<i class="icon ion-wand"></i>' + $scope.evaluateTeamsActionSheetoption },
        { text: '<i class="icon ion-email"></i>' + $scope.sendMessageActionSheetOption },
        { text: '<i class="icon ion-shuffle"></i>' + $scope.randomTeamActionSheetOption },
      ],
      destructiveText: '<i class="icon ion-trash-b"></i>' + $scope.deleteTeamsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //EVALUATE TEAMS ACTION
          $scope.actionSheetClassTeamsType = 'evaluate';
          $scope.showSelectTeamsModal();
        } else if (index === 1) {
          //SEND MESSAGE ACTION
          $scope.showInputMessage = true;
          $scope.showSelectTeamsModal();
        } else if (index === 2) {
          //RANDOM TEAM
          $scope.getRandomTeam();
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE TEAMS ACTION
        $scope.actionSheetClassTeamsType = 'delete';
        $scope.showSelectTeamsModal();
        return true;
      }
    });
  };

                                          /* ITEMS ACTIONSHEET */

  $scope.showActionsheetItems = function() {
    $ionicActionSheet.show({
      titleText: $scope.actionItemsActionSheet,
      destructiveText: '<i class="icon ion-trash-b"></i>' + $scope.deleteItemsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
      },
      destructiveButtonClicked: function() {
        //DELETE ITEMS ACTION
        $scope.actionSheetItemsType = 'delete';
        $scope.showSelectItemsModal();
        return true;
      }
    });
  };

                                          /* ACHIEVEMENT ACTIONSHEET */

  $scope.showActionsheetAchievements = function() {
    $ionicActionSheet.show({
      titleText: $scope.actionAchievementsActionSheet,
      destructiveText: '<i class="icon ion-trash-b"></i>' + $scope.deleteAchievementsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
      },
      destructiveButtonClicked: function() {
        //DELETE ACHIEVEMENT ACTION
        $scope.actionSheetAchievementsType = 'delete';
        $scope.showSelectAchievementsModal();
        return true;
      }
    });
  };

                                          /* REWARDS ACTIONSHEET */

  $scope.showActionsheetRewards = function() {
    $ionicActionSheet.show({
      titleText: $scope.actionRewardsActionSheet,
      destructiveText: '<i class="icon ion-trash-b"></i>' + $scope.deleteRewardsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
      },
      destructiveButtonClicked: function() {
        //DELETE REWARD ACTION
        $scope.actionSheetRewardsType = 'delete';
        $scope.showSelectRewardsModal();
        return true;
      }
    });
  };

                                          /* MISSIONS ACTIONSHEET */

  $scope.showActionsheetMissions = function() {
    $ionicActionSheet.show({
      titleText: $scope.actionMissionsActionSheet,
      destructiveText: '<i class="icon ion-trash-b"></i>' + $scope.deleteMissionsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
      },
      destructiveButtonClicked: function() {
        //DELETE MISSION ACTION
        $scope.actionSheetMissionsType = 'delete';
        $scope.showSelectMissionsModal();
        return true;
      }
    });
  };

  /*
    *************************************SAVE EVERY POPOVER INTO $SCOPE*******************************
  */

  $scope.templateLanguagesPopover = '<ion-popover-view>'+
    '<div ng-controller="changeLanguageCtrl">'+
      '<ion-list class="list-elements">'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'es\'); closePopoverLanguages()">{{ \'BUTTON_LANG_ES\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'en\'); closePopoverLanguages()">{{ \'BUTTON_LANG_EN\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'it\'); closePopoverLanguages()">{{ \'BUTTON_LANG_IT\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'tr\'); closePopoverLanguages()">{{ \'BUTTON_LANG_TR\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'de\'); closePopoverLanguages()">{{ \'BUTTON_LANG_DE\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'hu\'); closePopoverLanguages()">{{ \'BUTTON_LANG_HU\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'ru\'); closePopoverLanguages()">{{ \'BUTTON_LANG_RU\' | translate }}</ion-item>'+
      '</ion-list>'+
    '</div>'+
  '</ion-popover-view>';

  $scope.templateTeacherHomePopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherHome(); createDemoClassroom()"><i class="icon ion-university"></i>&nbsp;&nbsp;{{ \'CREATE_DEMO_CLASS\' | translate}}</ion-item>'+
      '<ion-item class="itemPopover" ng-hide="archivedClassroomsToShow" ng-click="showArchivedClassrooms(true)"><i class="icon ion-eye"></i>&nbsp;&nbsp;{{ \'SEE_ARCHIVED_CLASSES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-show="archivedClassroomsToShow" ng-click="showArchivedClassrooms(false)"><i class="icon ion-eye-disabled"></i>&nbsp;&nbsp;{{ \'HIDE_ARCHIVED_CLASSES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherHome(); settingsForm()"><i class="icon ion-gear-a"></i>&nbsp;&nbsp;{{ \'SETTINGS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover log-out-button" ng-click="closePopoverTeacherHome(); logOut()"><i class="icon ion-log-out"></i>&nbsp;&nbsp;{{ \'LOG_OUT\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateClassStudentsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents(); showConfigureLevelsModal()"><i class="icon ion-levels"></i>&nbsp;&nbsp;{{ \'CONFIGURE_LEVELS\' | translate }}</ion-item>'+
      '<ion-toggle class="itemPopover" ng-model="checkboxStudentsView" ng-checked="classroom.studentsView" ng-click="setStudentsView(checkboxStudentsView)" toggle-class="toggle-calm"><i class="icon ion-image"></i>&nbsp;&nbsp;{{ \'SHOW_IMAGES\' | translate }}</ion-toggle>'+
      '<ion-toggle class="itemPopover" ng-model="checkboxNotifications" ng-checked="classroom.notifications" ng-click="setNotifications(checkboxNotifications)" toggle-class="toggle-calm" ng-disabled="isArchivedClassroom"><i class="icon ion-alert"></i>&nbsp;&nbsp;{{ \'NOTIFICATIONS\' | translate }}</ion-toggle>'+
      '<ion-toggle class="itemPopover" ng-model="checkboxOpening" ng-checked="classroom.open" ng-click="setOpening(checkboxOpening)" toggle-class="toggle-calm" ng-disabled="isArchivedClassroom"><i class="icon ion-unlocked"></i>&nbsp;&nbsp;{{ \'OPENING\' | translate }}</ion-toggle>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents(); showHashcodePopup()"><i class="icon ion-key"></i>&nbsp;&nbsp;{{ \'SEE_CLASS_HASHCODE\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents(); rulesForm()"><i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'SEE_RULES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents(); rewardShopForm()"><i class="icon ion-bag"></i>&nbsp;&nbsp;{{ \'REWARD_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents(); missionsForm()"><i class="icon ion-map"></i>&nbsp;&nbsp;{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents(); settingsForm()"><i class="icon ion-gear-a"></i>&nbsp;&nbsp;{{ \'SETTINGS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover log-out-button" ng-click="closePopoverClassStudents(); logOut()"><i class="icon ion-log-out"></i>&nbsp;&nbsp;{{ \'LOG_OUT\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateClassTeamsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams(); showConfigureLevelsModal()"><i class="icon ion-levels"></i>&nbsp;&nbsp;{{ \'CONFIGURE_LEVELS\' | translate }}</ion-item>'+
      '<ion-toggle class="itemPopover" ng-model="checkboxNotifications" ng-checked="classroom.notifications" ng-click="setNotifications(checkboxNotifications)" toggle-class="toggle-calm" ng-disabled="isArchivedClassroom"><i class="icon ion-alert"></i>&nbsp;&nbsp;{{ \'NOTIFICATIONS\' | translate }}</ion-toggle>'+
      '<ion-toggle class="itemPopover" ng-model="checkboxOpening" ng-checked="classroom.open" ng-click="setOpening(checkboxOpening)" toggle-class="toggle-calm" ng-disabled="isArchivedClassroom"><i class="icon ion-unlocked"></i>&nbsp;&nbsp;{{ \'OPENING\' | translate }}</ion-toggle>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams(); showHashcodePopup()"><i class="icon ion-key"></i>&nbsp;&nbsp;{{ \'SEE_CLASS_HASHCODE\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams(); rulesForm()"><i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'SEE_RULES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams(); rewardShopForm()"><i class="icon ion-bag"></i>&nbsp;&nbsp;{{ \'REWARD_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams(); missionsForm()"><i class="icon ion-map"></i>&nbsp;&nbsp;{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams(); settingsForm()"><i class="icon ion-gear-a"></i>&nbsp;&nbsp;{{ \'SETTINGS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover log-out-button" ng-click="closePopoverClassTeams(); logOut()"><i class="icon ion-log-out"></i>&nbsp;&nbsp;{{ \'LOG_OUT\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateMissionsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-hide="finishedMissionsToShow" ng-click="closePopoverMissions(); showFinishedMissions(true)"><i class="icon ion-eye"></i>&nbsp;&nbsp;{{ \'SEE_MISSIONS_ENDED\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-show="finishedMissionsToShow" ng-click="closePopoverMissions(); showFinishedMissions(false)"><i class="icon ion-eye-disabled"></i>&nbsp;&nbsp;{{ \'HIDE_MISSIONS_ENDED\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverMissions(); rulesForm()"><i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'SEE_RULES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverMissions(); rewardShopForm()"><i class="icon ion-bag"></i>&nbsp;&nbsp;{{ \'REWARD_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverMissions(); missionsForm()"><i class="icon ion-map"></i>&nbsp;&nbsp;{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverMissions(); settingsForm()"><i class="icon ion-gear-a"></i>&nbsp;&nbsp;{{ \'SETTINGS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover log-out-button" ng-click="closePopoverMissions(); logOut()"><i class="icon ion-log-out"></i>&nbsp;&nbsp;{{ \'LOG_OUT\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateTeacherDefaultPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherDefault(); rulesForm()"><i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'SEE_RULES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherDefault(); rewardShopForm()"><i class="icon ion-bag"></i>&nbsp;&nbsp;{{ \'REWARD_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherDefault(); missionsForm()"><i class="icon ion-map"></i>&nbsp;&nbsp;{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherDefault(); settingsForm()"><i class="icon ion-gear-a"></i>&nbsp;&nbsp;{{ \'SETTINGS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover log-out-button" ng-click="closePopoverTeacherDefault(); logOut()"><i class="icon ion-log-out"></i>&nbsp;&nbsp;{{ \'LOG_OUT\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  /**
    *************************************EVERY POPOVER FUNCTION GOES HERE*******************************
    Defines the behaviour of each popover.
  */

                                        /* LANGUAGES POPOVER */

  $scope.popoverLanguages = $ionicPopover.fromTemplate($scope.templateLanguagesPopover, {
    scope: $scope
  });
  $scope.openPopoverLanguages = function($event) {
    $scope.popoverLanguages.show($event);
  };
  $scope.closePopoverLanguages = function() {
    $scope.popoverLanguages.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.popoverLanguages.remove();
  });
  $scope.$on('popoverLanguages.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverLanguages.removed', function() {
    // Execute action
  });

                                        /* TEACHERHOME POPOVER */

  $scope.popoverTeacherHome = $ionicPopover.fromTemplate($scope.templateTeacherHomePopover, {
    scope: $scope
  });
  $scope.openPopoverTeacherHome = function($event) {
    $scope.popoverTeacherHome.show($event);
  };
  $scope.closePopoverTeacherHome = function() {
    $scope.popoverTeacherHome.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverTeacherHome.remove();
  });
  $scope.$on('popoverTeacherHome.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverTeacherHome.removed', function() {
    // Execute action
  });

                                        /* CLASS STUDENTS POPOVER */

  $scope.popoverClassStudents = $ionicPopover.fromTemplate($scope.templateClassStudentsPopover, {
    scope: $scope
  });
  $scope.openPopoverClassStudents = function($event) {
    $scope.popoverClassStudents.show($event);
  };
  $scope.closePopoverClassStudents = function() {
    $scope.popoverClassStudents.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverClassStudents.remove();
  });
  $scope.$on('popoverClassStudents.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverClassStudents.removed', function() {
    // Execute action
  });

                                        /* CLASS TEAMS POPOVER */

  $scope.popoverClassTeams = $ionicPopover.fromTemplate($scope.templateClassTeamsPopover, {
    scope: $scope
  });
  $scope.openPopoverClassTeams = function($event) {
    $scope.popoverClassTeams.show($event);
  };
  $scope.closePopoverClassTeams = function() {
    $scope.popoverClassTeams.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverClassTeams.remove();
  });
  $scope.$on('popoverClassTeams.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverClassTeams.removed', function() {
    // Execute action
  });

                                        /* MISSIONS POPOVER */

  $scope.popoverMissions = $ionicPopover.fromTemplate($scope.templateMissionsPopover, {
    scope: $scope
  });
  $scope.openPopoverMissions = function($event) {
    $scope.popoverMissions.show($event);
  };
  $scope.closePopoverMissions = function() {
    $scope.popoverMissions.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverMissions.remove();
  });
  $scope.$on('popoverMissions.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverMissions.removed', function() {
    // Execute action
  });

                                        /* DEFAULT POPOVER */

  $scope.popoverteacherDefault = $ionicPopover.fromTemplate($scope.templateTeacherDefaultPopover, {
    scope: $scope
  });
  $scope.openPopoverTeacherDefault = function($event) {
    $scope.popoverteacherDefault.show($event);
  };
  $scope.closePopoverTeacherDefault = function() {
    $scope.popoverteacherDefault.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverteacherDefault.remove();
  });
  $scope.$on('popoverteacherDefault.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverteacherDefault.removed', function() {
    // Execute action
  });

  /*
    *************************************SAVE EVERY MODAL INTO $SCOPE*******************************
  */

  $scope.attendanceModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<input class="dateInput" type="text" value="{{date | date:\'dd-MM-yyyy\'}}" readonly />'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkStudent" class="list-student" ng-repeat="student in students" ng-checked="student.classrooms[classroom.id].inClass" ng-click="inClass(student)">{{student.name}} {{student.surname}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="attendance-button123" ng-click="selectStudents()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SET_ATTENDANCE_FOR_TODAY\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectClassroomsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_CLASSROOMS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkClassroom" ng-repeat="classForSelection in classroomsForSelection" ng-click="changeSelectedClassroom(classForSelection)" ng-checked="classForSelection.selected" ng-hide="classForSelection.archived === toShow">{{classForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectClassroomsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-disabled="!enableSelectButton" ng-click="selectClassrooms()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectStudentsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<div ng-show="showInputMessage">'+
        '<h3>{{ \'SEND_MESSAGE\' | translate }}</h3>'+
        '<label class="item item-input" id="signUp-input3">'+
          '<span class="inputLabelProfile">'+
            '<i class="icon ion-paper-airplane"></i>&nbsp;&nbsp;{{ \'MESSAGE\' | translate }}:'+
            '<input id="inputMessage" type="text" ng-model="modelSelectStudents.message">'+
          '</span>'+
        '</label>'+
      '</div>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_STUDENTS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkStudent" class="list-student" ng-repeat="studentForSelection in studentsForSelection" ng-click="changeSelectedStudent(studentForSelection)" ng-checked="studentForSelection.selected">'+
          '<p>{{studentForSelection.name}}</p>'+
          '<p>{{studentForSelection.surname}}</p>'+
        '</ion-checkbox>'+  
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectStudentsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-hide="showInputMessage" ng-disabled="!enableSelectButton" id="attendance-button123" ng-click="selectStudents()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
        '<button ng-show="showInputMessage" ng-disabled="!modelSelectStudents.message || !enableSelectButton" id="attendance-button124" ng-click="selectStudentsForMessage(modelSelectStudents.message)" id="attendance-btn123" class="button button-calm  button-block">{{ \'SEND_MESSAGE\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectItemsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_ITEMS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkItem" ng-repeat="itemForSelection in itemsForSelection" ng-click="changeSelectedItem(itemForSelection)" ng-checked="itemForSelection.selected">{{itemForSelection.name}} {{itemForSelection.score}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectItemsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-disabled="!enableSelectButton" ng-click="selectItems()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectAchievementsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_ACHIEVEMENTS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkAchievement" ng-repeat="achievementForSelection in achievementsForSelection" ng-click="changeSelectedAchievement(achievementForSelection)" ng-checked="achievementForSelection.selected">{{achievementForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectAchievementsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-disabled="!enableSelectButton" ng-click="selectAchievements()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectTeamsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<div ng-show="showInputMessage">'+
        '<h3>{{ \'SEND_MESSAGE\' | translate }}</h3>'+
        '<label class="item item-input" id="signUp-input3">'+
          '<span class="inputLabelProfile">'+
            '<i class="icon ion-paper-airplane"></i>&nbsp;&nbsp;{{ \'MESSAGE\' | translate }}:'+
            '<input id="inputMessage" type="text" ng-model="modelSelectTeams.message">'+
          '</span>'+
        '</label>'+
      '</div>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_TEAMS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkTeam" ng-repeat="teamForSelection in teamsForSelection" ng-click="changeSelectedTeam(teamForSelection)" ng-checked="teamForSelection.selected">{{teamForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectTeamsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-hide="showInputMessage" ng-disabled="!enableSelectButton" id="attendance-button123" ng-click="selectTeams()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
        '<button ng-show="showInputMessage" ng-disabled="!modelSelectTeams.message || !enableSelectButton" id="attendance-button124" ng-click="sendMessageTeams(modelSelectTeams.message)" id="attendance-btn123" class="button button-calm  button-block">{{ \'SEND_MESSAGE\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectRewardsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_REWARDS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkReward" ng-repeat="rewardForSelection in rewardsForSelection" ng-click="changeSelectedReward(rewardForSelection)" ng-checked="rewardForSelection.selected">{{rewardForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectRewardsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-disabled="!enableSelectButton" ng-click="selectRewards()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectMissionsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_MISIONS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkMission" ng-repeat="missionForSelection in missionsForSelection" ng-click="changeSelectedMission(missionForSelection)" ng-checked="missionForSelection.selected">{{missionForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectMissionsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-disabled="!enableSelectButton" ng-click="selectMissions()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newClassModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'NEW_CLASS\' | translate }}</h3>'+
      '<form id="dataClassForm" class="list">'+
        '<label class="item item-input">'+
          '<span class="input-label">{{ \'CLASS_NAME\' | translate }}</span>'+
          '<input type="text" placeholder="{{ \'CLASS_NAME\' | translate }}" ng-model="modelNewClass.name">'+
        "</label>"+
      "</form>"+
      "<div>"+
        '<form class="list">'+
          '<label class="item item-input item-select">'+
            '<span class="input-label">{{ \'COPY_ELEMENTS_FROM_ANOTHER_CLASS\' | translate }}</span>'+
            '<select id="selectClass">'+
              '<option>{{ \'NONE\' | translate }}</option>'+
              '<option ng-repeat="class in classrooms">{{class.name}}</option>'+
            '</select>'+
          '</label>'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalNewClass()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-click="createClassroom(modelNewClass.name) ; closeModalNewClass()">{{ \'CREATE\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.configureLevelsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'LEVELS_CONFIGURATION\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-item id="attendance-checkbox2" name="checkItem" ng-repeat="level in levels" ng-click="setLevel(level)">{{level.level}}. {{level.title}}&nbsp;&nbsp;&nbsp;<i class="icon ion-chevron-left float_right"/>'+
          '<ion-option-button class="button-assertive" ng-click="deleteLevel(level)" ng-disabled="isArchivedClassroom">{{ \'DELETE\' | translate }}</ion-option-button>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm button-block" ng-click="closeConfigureLevelsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" id="attendance-btn123" class="button button-calm button-block" ng-click="showNewLevelModal()" ng-disabled="isArchivedClassroom">{{ \'ADD_LEVEL\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newLevelModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
     '<h3>{{ \'NEW_LEVEL\' | translate }}</h3>'+
      '<form id="newItemForm" class="list list-student fullScreen">'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_TITLE\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'LEVEL_TITLE\' | translate }}" ng-model="modelNewLevel.title">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_LEVEL\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'LEVEL_LEVEL\' | translate }}" ng-model="modelNewLevel.level">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_REQUIRED_POINTS\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'LEVEL_REQUIRED_POINTS\' | translate }}" ng-model="modelNewLevel.requiredPoints">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeNewLevelModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="createLevel(modelNewLevel.title, modelNewLevel.level, modelNewLevel.requiredPoints)" ng-disabled="!modelNewLevel.title || !modelNewLevel.level || !modelNewLevel.requiredPoints">{{ \'ADD_LEVEL\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editLevelModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
     '<h3>{{ \'EDIT_LEVEL\' | translate }}</h3>'+
      '<form id="newItemForm" class="list list-student fullScreen">'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_TITLE\' | translate }}</span>'+
            '<input type="text" placeholder="{{level.title}}" ng-model="modelEditLevel.title" ng-disabled="isArchivedClassroom">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_LEVEL\' | translate }}</span>'+
            '<input type="number" placeholder="{{level.level}}" ng-model="modelEditLevel.level" ng-disabled="isArchivedClassroom">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_REQUIRED_POINTS\' | translate }}</span>'+
            '<input type="number" placeholder="{{level.requiredPoints}}" ng-model="modelEditLevel.requiredPoints" ng-disabled="isArchivedClassroom">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeEditLevelModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="editLevel(modelEditLevel.title, modelEditLevel.level, modelEditLevel.requiredPoints)" ng-disabled="(!modelEditLevel.title && !modelEditLevel.level && !modelEditLevel.requiredPoints) || isArchivedClassroom">{{ \'EDIT_LEVEL\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.secondaryMenuModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'ASSIGN_STUDENT_TO_TEAM\' | translate }}</h3>'+
      '<form class="list">'+
        '<label class="item item-input item-select">'+
          '<span class="input-label">{{ \'SELECT\' | translate }}</span>'+
          '<select id="selectTeam">'+
              '<option>{{ \'NONE\' | translate }}</option>'+
              '<option ng-repeat="team in teams">{{team.name}}</option>'+
          '</select>'+
        '</label>'+
        '<h3>{{ \'COPY_STUDENT_TO_ANOTHER_CLASS\' | translate }}</h3>'+
        '<label class="item item-input item-select">'+
          '<span class="input-label">{{ \'SELECT\' | translate }}</span>'+
          '<select id="selectCopy">'+
              '<option>{{ \'NONE\' | translate }}</option>'+
              '<option ng-repeat="class in classrooms">{{class.name}}</option>'+
          '</select>'+
        '</label>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalSecondary()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="secondaryMenuSelection()">{{ \'ACCEPT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
      '</ion-modal-view>';

  $scope.newStudentModal = '<ion-modal-view class="fondo">'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'NEW_STUDENT\' | translate }}</h3>'+
      '<div class="avatar_margen">'+
        '<div class="teacherAvatar">'+
          '<img src={{defaultAvatar}} class="avatar">'+
        '</div>'+
      '</div>'+
      '<label ng-show="!isIOS" class="button button-calm inputfile">'+
        '{{ \'SELECT_IMAGE\' | translate }}'+
        '<input class="button button-light button-block button-outline" type="file" id="inputNewStudentPicture" ng-click="updateInputFile(\'inputNewStudentPicture\')">'+
      '</label>'+
      '<input class="button button-light button-block button-outline" ng-show="isIOS" type="file" id="inputNewStudentPicture" ng-click="updateInputFile(\'inputNewStudentPicture\')">'+
      '<div>'+
        '<ion-list>'+
          '<form id="newStudentForm" class="list">'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="input-label">'+
                '<i class="icon ion-person"></i>&nbsp;&nbsp;{{ \'NAME\' | translate }}</span>'+
              '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewStudent.name">'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="input-label">'+
                '<i class="icon ion-person"></i>&nbsp;&nbsp;{{ \'SURNAME\' | translate }}</span>'+
              '<input type="text" placeholder="{{ \'SURNAME\' | translate }}" ng-model="modelNewStudent.surname">'+
            '</label>'+
          '</form>'+
          '<h3>{{ \'EMAI_AUTOGENERATE\' | translate }}</h3>'+
          '<h3>{{ \'PASSWORD\' | translate }}: student</h3>'+
        '</ion-list>'+
      '</div>'+
      '<div>'+
        '<form class="list">'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalNewStudentDialog()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-disabled="!modelNewStudent.name || !modelNewStudent.surname" ng-click="createNewStudent(modelNewStudent.name, modelNewStudent.surname)">{{ \'CREATE\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>)';

  $scope.studentDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{student.name}} {{student.surname}}</h3>'+
      '<div>'+
      '<div class="avatar_margen">'+
        '<div class="teacherAvatar">'+
          '<img src="{{!classroom.studentsView ? student.avatar : student.picture}}" class="avatar">'+
        '</div>'+
      '</div>'+
      '<label ng-show="!isIOS" class="button button-calm inputfile" ng-show="classroom.studentsView" ng-disabled="isArchivedClassroom">'+
        '{{ \'SELECT_IMAGE\' | translate }}'+
        '<input class="button button-light button-block button-outline" type="file" id="inputStudentPicture" ng-click="updateStudentPicture()" ng-disabled="isArchivedClassroom">'+
      '</label>'+
      '<input class="button button-light button-block button-outline" ng-show="isIOS" type="file" id="inputStudentPicture" ng-click="updateStudentPicture()" ng-disabled="isArchivedClassroom">'+
        '<form id="studentProfileFormData" class="list">'+
          '<ion-list id="signUp-list2">'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="inputLabelProfile">'+
                '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'LEVEL_IN_CLASS\' | translate }}'+
                '<p>{{student.level.level}}&nbsp;({{student.level.title}})</p>'+
              '</span>'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="inputLabelProfile">'+
                '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'TOTAL_POINTS_CLASS\' | translate }}'+
                '<p>{{student.classrooms[classroom.id].totalPoints}}</p>'+
              '</span>'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="inputLabelProfile">'+
                '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'SCHOOL\' | translate }}'+
                '<p>{{student.school}}</p>'+
              '</span>'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input5">'+
              '<span class="inputLabelProfile">'+
                '<i class="icon ion-at"></i>&nbsp;&nbsp;{{ \'EMAIL\' | translate }}'+
                '<p>{{student.email}}</p>'+
              '</span>'+
            '</label>'+
          '</ion-list>'+
        '</form>'+
      '</div>'+
      '<div ng-show="studentHasItems">'+
        '<h3>{{ \'ITEMS\' | translate }}</h3>'+
        '<ion-list>'+
          '<ion-item class="list-student-dialog" ng-repeat="item in studentItems">'+
            '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{item.name}}'+
            '<span class="item-note">{{item.points}} / {{item.maxScore}}&nbsp;&nbsp;&nbsp;<i class="icon ion-chevron-left float_right"/></span>'+
            '<ion-option-button class="button-assertive swipe-button" ng-click="removePoints(item)" ng-disabled="isArchivedClassroom">'+
              '<i class="icon ion-minus-round"></i>'+
            '</ion-option-button>'+
            '<ion-option-button class="button-calm swipe-button" ng-click="addPoints(item)" ng-disabled="isArchivedClassroom">'+
              '<i class="icon ion-plus-round"></i>'+
            '</ion-option-button>'+
        '</ion-list>'+
      '</div>'+
      '<div class="button-bar action_buttons">'+
        '<button ng-click="closeModalStudentDialog()" class="button button-light button-block button-outline icon ion-arrow-return-left"></button>'+
        '<button ng-click="showModalSecondary()" class="button button-light button-block button-outline icon ion-android-more-horizontal" ng-disabled="isArchivedClassroom"></button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.quantityRandomTeamsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'SELECT_QUANTITY_RANDOM_TEAMS\' | translate }}</h3>'+
	  '<input class="item item-input" id="quantityInput" type="number" ng-model="modelQuantity.quantity">'+
	  '<div class="button-bar action_buttons">'+
		'<button class="button button-calm  button-block" ng-click="closeModalQuantityRandomTeams()">{{ \'CANCEL\' | translate }}</button>'+
		'<button class="button button-calm  button-block" ng-click="createRandomTeams(modelQuantity.quantity)">{{ \'CREATE_RANDOM_TEAMS\' | translate }}</button>'+
	  '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.teamDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{team.name}}</h3>'+
      '<div>'+
        '<div class="avatar_margen">'+
          '<div class="teacherAvatar">'+
            '<img src={{team.picture}} class="avatar">'+
          '</div>'+
        '</div>'+
        '<label ng-disabled="isArchivedClassroom" ng-show="!isIOS" class="button button-calm inputfile">'+
          '{{ \'SELECT_IMAGE\' | translate }}'+
          '<input class="button button-light button-block button-outline" type="file" id="inputTeamPicture" ng-click="updateTeamPicture()">'+
        '</label>'+
        '<input class="button button-light button-block button-outline" ng-show="isIOS" type="file" id="inputTeamPicture" ng-click="updateTeamPicture()" ng-disabled="isArchivedClassroom">'+
        '<form id="teamDialogForm">'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{team.name}}" ng-model="modelTeamDialog.name" ng-disabled="isArchivedClassroom">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'TEAM_OBJECTIVE\' | translate }}</span>'+
            '<input type="text" placeholder="{{team.objective}}" ng-model="modelTeamDialog.objective" ng-disabled="isArchivedClassroom">'+
          '</label>'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalTeamDialog()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-disabled="(!modelTeamDialog.name && !modelTeamDialog.objective) || isArchivedClassroom" ng-click="editTeam(modelTeamDialog.name, modelTeamDialog.objective)">{{ \'EDIT_TEAM\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
      '<div>'+
        '<h3>{{ \'TEAM_MEMBERS\' | translate}}</h3>'+
        '<ion-list>'+
          '<ion-item class="list-student item item-avatar" ng-repeat="teamMember in teamMembers">'+
            '<img src="{{!classroom.studentsView ? teamMember.avatar : teamMember.picture}}">'+
            '<p>{{teamMember.name}}</p>'+ 
            '<p>{{teamMember.surname}}</p>'+
          '</ion-item>'+
        '</ion-list>'+
      '</div>'+
      '<button ng-click="showModalEditMembers()" class="button button-calm button-block" ng-disabled="isArchivedClassroom">{{ \'EDIT_MEMBERS\' | translate }}</button>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newTeamDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>New Team</h3>'+
      '<div>'+
        '<div class="avatar_margen">'+
          '<div class="teacherAvatar">'+
            '<img src={{defaultTeamAvatar}} class="avatar">'+
          '</div>'+
        '</div>'+
        '<label ng-show="!isIOS" class="button button-calm inputfile">'+
          '{{ \'SELECT_IMAGE\' | translate }}'+
          '<input class="button button-light button-block button-outline" type="file" id="inputNewTeamPicture" ng-click="updateInputFile(\'inputNewTeamPicture\')">'+
        '</label>'+
        '<input class="button button-light button-block button-outline" ng-show="isIOS" type="file" id="inputNewTeamPicture" ng-click="updateInputFile(\'inputNewTeamPicture\')">'+
        '<form id="newTeamForm">'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewTeamDialog.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'TEAM_OBJECTIVE\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'TEAM_OBJECTIVE\' | translate }}" ng-model="modelNewTeamDialog.objective">'+
          '</label>'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalNewTeamDialog()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-disabled="!modelNewTeamDialog.name || !modelNewTeamDialog.objective" ng-click="createTeam(modelNewTeamDialog.name, modelNewTeamDialog.objective)">{{ \'CREATE\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
      '<div>'+
        '<h3>{{ \'TEAM_MEMBERS\' | translate}}</h3>'+
        '<ion-list>'+
          '<ion-checkbox class="list-student" ng-repeat="studentForTeamSelection in studentsForTeamSelection" ng-checked="studentForTeamSelection.selected" ng-click="changeSelectedStudentForTeam(studentForTeamSelection)">{{studentForTeamSelection.name}} {{studentForTeamSelection.surname}}</ion-checkbox>'+
        '</ion-list>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMembersModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'EDIT_MEMBERS\' | translate }}</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="studentForTeamSelection in studentsForTeamSelection" ng-checked="studentForTeamSelection.inTeam" ng-click="inTeam(studentForTeamSelection)">{{studentForTeamSelection.name}} {{studentForTeamSelection.surname}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMembers()" class="button button-calm button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editTeamMembers()" class="button button-calm button-block">{{ \'EDIT_MEMBERS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{mission.name}}</h3>'+
      '<form class="list">'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }} </span>'+
            '<input type="text" ng-disabled="mission.finished || isArchivedClassroom" placeholder="{{mission.name}}" ng-model="modelEditMission.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">FECHA DE FINALIZACIÓN</span>'+
            '<input type="date" ng-disabled="mission.finished || isArchivedClassroom" placeholder="{{mission.date}}" ng-model="modelEditMission.date">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'ADDITIONAL_POINTS_MISSION\' | translate }}</span>'+
            '<input type="text" ng-disabled="mission.finished || isArchivedClassroom" placeholder="{{mission.additionalPoints}}" ng-model="modelEditMission.additionalPoints">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalEditMission()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-disabled="(!modelEditMission.name && !modelEditMission.additionalPoints && !modelEditMission.date) || mission.finished" ng-click="editMission(modelEditMission.name, modelEditMission.additionalPoints, modelEditMission.date)">EDITAR MISIÓN</button>'+
      '</div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'ITEMS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="item in missionItems">'+
          '{{item.name}}'+
          '<p>{{ \'NEEDED_POINTS\' | translate }}: {{item.neededPoints}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="achievements-button91" class="button button-calm button-block" ng-disabled="mission.finished || isArchivedClassroom" ng-click="showModalEditMissionItems()">{{ \'EDIT_ITEMS\' | translate }}</button>'+
      '</div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'REWARDS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="reward in missionRewards">{{reward.name}}</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="achievements-button91" class="button button-calm button-block" ng-disabled="mission.finished || isArchivedClassroom" ng-click="showModalEditMissionRewards()">{{ \'EDIT_REWARDS\' | translate }}</button>'+
      '</div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'STUDENTS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student item item-avatar" ng-repeat="student in missionStudents">'+
          '<img src="{{!classroom.studentsView ? student.avatar : student.picture}}">'+
          '<p>{{student.name}}</p>'+
          '<p>{{student.surname}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="achievements-button91" class="button button-calm button-block" ng-disabled="mission.finished || isArchivedClassroom" ng-click="showModalEditMissionMembers()">{{ \'EDIT_STUDENTS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionItemsModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'EDIT_ITEMS\' | translate }}</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="itemForMissionSelection in itemsForMissionSelection" ng-checked="itemForMissionSelection.inMission" ng-click="inMission(itemForMissionSelection)">{{itemForMissionSelection.name}} {{itemForMissionSelection.score}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMissionItems()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editMissionItems()" class="button button-calm  button-block">{{ \'EDIT_ITEMS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionRewardsModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'EDIT_REWARDS\' | translate }}</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="rewardForMissionSelection in rewardsForMissionSelection" ng-checked="rewardForMissionSelection.inMission" ng-click="inMission(rewardForMissionSelection)">{{rewardForMissionSelection.name}} {{rewardForMissionSelection.price}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMissionRewards()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editMissionRewards()" class="button button-calm  button-block">{{ \'EDIT_REWARDS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionMembersModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'EDIT_STUDENTS\' | translate }}</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="studentForMissionSelection in studentsForMissionSelection" ng-checked="studentForMissionSelection.inMission" ng-click="inMission(studentForMissionSelection)">{{studentForMissionSelection.name}} {{studentForMissionSelection.surname}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMissionMembers()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editMissionMembers()" class="button button-calm  button-block">{{ \'EDIT_STUDENTS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newItemModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
     '<h3>{{ \'NEW_ITEM\' | translate }}</h3>'+
      '<form id="newItemForm" class="list list-student fullScreen">'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewItem.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'DESCRIPTION\' | translate }}" ng-model="modelNewItem.description">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'SCORE\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'SCORE\' | translate }}" ng-model="modelNewItem.score">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'MAX_SCORE\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'MAX_SCORE\' | translate }}" ng-model="modelNewItem.maxScore">'+
          '</label>'+
          '<ion-toggle toggle-class="toggle-calm" ng-model="modelNewItem.useForLevel">{{ \'USE_FOR_LEVEL\' | translate }}</ion-toggle>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalNewItem()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="createItem(modelNewItem.name, modelNewItem.description, modelNewItem.score, modelNewItem.maxScore, modelNewItem.useForLevel)" ng-disabled="!modelNewItem.name || !modelNewItem.description || !modelNewItem.score">{{ \'ADD_ITEM\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newAchievementModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'NEW_ACHIEVEMENT\' | translate }}</h3>'+
      '<div>'+
        '<div class="avatar_margen">'+
          '<div class="teacherAvatar">'+
            '<img src={{defaultAchievementAvatar}} class="avatar">'+
          '</div>'+
          '<button class="button button-calm galeryLeft" ng-click="galeryBack()"><i class="icon ion-chevron-left"></i></button>'+
          '<button class="button button-calm galeryRight" ng-click="galeryForward()"><i class="icon ion-chevron-right"></i></button>'+
        '</div>'+
        '<label ng-show="!isIOS" class="button button-calm inputfile">'+
          '{{ \'SELECT_IMAGE\' | translate }}'+
          '<input class="button button-light button-block button-outline" type="file" id="inputNewAchievementBadge" ng-click="updateInputFile(\'inputNewAchievementBadge\')">'+
        '</label>'+
        '<input class="button button-light button-block button-outline" ng-show="isIOS" type="file" id="inputNewAchievementBadge" ng-click="updateInputFile(\'inputNewAchievementBadge\')">'+
        '<form id="newAchievementForm" class="list">'+
          '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewAchievement.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'DESCRIPTION\' | translate }}" ng-model="modelNewAchievement.description">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'REQUIREMENTS\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'REQUIREMENTS\' | translate }}" ng-model="modelNewAchievement.requirements">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'MAX_LEVEL\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'MAX_LEVEL\' | translate }}" ng-model="modelNewAchievement.maxLevel">'+
          '</label>'+
        '</ion-list>'+
        '</form>'+
        '<div class="button-bar action_buttons">'+
          '<button class="button button-calm  button-block" ng-click="closeModalNewAchievement()">{{ \'CANCEL\' | translate }}</button>'+
          '<button class="button button-calm  button-block"  ng-click="createAchievement(modelNewAchievement.name, modelNewAchievement.description, modelNewAchievement.requirements, modelNewAchievement.maxLevel)" ng-disabled="!modelNewAchievement.name || !modelNewAchievement.description || !modelNewAchievement.requirements || !modelNewAchievement.maxLevel">{{ \'ADD_ACHIEVEMENT\' | translate }}</button>'+
        '</div>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newRewardModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<form id="newRewardForm" class="list">'+
        '<h3>{{ \'NEW_REWARD\' | translate }}</h3>'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewReward.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'DESCRIPTION\' | translate }}" ng-model="modelNewReward.description">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'PRICE\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'PRICE\' | translate }}" ng-model="modelNewReward.price">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalNewReward()" >{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="createReward(modelNewReward.name, modelNewReward.description, modelNewReward.price)" ng-disabled=" !modelNewReward.name || !modelNewReward.description || !modelNewReward.price">{{ \'ADD_REWARD\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editRewardModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<form id="editRewardForm" class="list">'+
        '<h3>{{reward.name}}</h3>'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }} </span>'+
            '<input type="text" placeholder="{{reward.name}}" ng-model="modelEditReward.name" ng-disabled="isArchivedClassroom">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
            '<input type="text" placeholder="{{reward.description}}" ng-model="modelEditReward.description" ng-disabled="isArchivedClassroom">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'PRICE\' | translate }}</span>'+
            '<input type="number" placeholder="{{reward.price}}" ng-model="modelEditReward.price" ng-disabled="isArchivedClassroom">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalEditReward()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-disabled="(!modelEditReward.name && !modelEditReward.description && !modelEditReward.price) || isArchivedClassroom" ng-click="editReward(modelEditReward.name, modelEditReward.description, modelEditReward.price)">{{ \'EDIT_REWARD\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.notificationsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'NOTIFICATIONS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7">'+
        '<ion-item id="attendance-checkbox2" ng-repeat="notification in notifications">{{notification.message}}'+
          '<p>{{notification.type}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeNotificationsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="deleteNotifications()">{{ \'CLEAN_NOTIFICATIONS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  /**
    *************************************EVERY MODAL FUNCTION GOES HERE*******************************
    Defines the behaviour of each modal.
  */

                                        /* CONFIGURE LEVELS MODAL */

  $scope.configureLevelsModal = $ionicModal.fromTemplate($scope.configureLevelsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showConfigureLevelsModal = function() {
    $scope.closePopoverClassStudents();
    $scope.getLevels();
    $scope.configureLevelsModal.show();
  }
  $scope.closeConfigureLevelsModal = function() {
    $scope.closePopoverClassStudents();
    $scope.configureLevelsModal.hide();
  }

                                        /* NEW LEVEL MODAL */

  $scope.newLevelModal = $ionicModal.fromTemplate($scope.newLevelModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showNewLevelModal = function() {
    $scope.modelNewLevel = {};
    $scope.closeConfigureLevelsModal();
    $scope.newLevelModal.show();
  }
  $scope.closeNewLevelModal = function() {
    $scope.newLevelModal.hide();
    $scope.showConfigureLevelsModal();  
  }

                                        /* EDIT LEVEL MODAL */

  $scope.editLevelModal = $ionicModal.fromTemplate($scope.editLevelModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showEditLevelModal = function() {
    $scope.modelEditLevel = {};
    $scope.closeConfigureLevelsModal();
    $scope.editLevelModal.show();
  }
  $scope.closeEditLevelModal = function() {
    $scope.editLevelModal.hide();
    $scope.showConfigureLevelsModal(); 
  }

                                        /* ATTENDANCE MODAL */

  $scope.attendanceModal = $ionicModal.fromTemplate($scope.attendanceModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showAttendanceModal = function() {
    $scope.attendanceModal.show();
    $scope.date = Date.now(); 
  }
  $scope.closeAttendanceModal = function() {
    $scope.attendanceModal.hide();
  }

                                        /* SELECT CLASSROOMS MODAL */

  $scope.selectClassroomsModal = $ionicModal.fromTemplate($scope.selectClassroomsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectClassroomsModal = function() {
    $scope.enableSelectButton = false;
    $scope.getClassroomsForSelection();
    $scope.selectClassroomsModal.show();
  }
  $scope.closeSelectClassroomsModal = function() {
    $scope.selectClassroomsModal.hide();
    $scope.enableSelectButton = false;
  }

                                        /* SELECT STUDENTS MODAL */

  $scope.selectStudentsModal = $ionicModal.fromTemplate($scope.selectStudentsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectStudentsModal = function() {
    $scope.enableSelectButton = false;
    $scope.modelSelectStudents = {};
    $scope.getStudentsForSelection();
    $scope.selectStudentsModal.show();
  }
  $scope.closeSelectStudentsModal = function() {
    $scope.selectStudentsModal.hide();
    $scope.showInputMessage = false;
    $scope.enableSelectButton = false;
  }

                                        /* SELECT ITEMS MODAL */

  $scope.selectItemsModal = $ionicModal.fromTemplate($scope.selectItemsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectItemsModal = function() {
    $scope.enableSelectButton = false;
    if ($scope.newMissionModal != undefined) {
      if ($scope.newMissionModal.isShown()) {
        $scope.newMissionModal.hide();
        modalMissions = 1;
      }
    }

    if ($scope.editMissionModal != undefined) {
      if ($scope.editMissionModal.isShown()) {
        $scope.editMissionModal.hide();
        modalMissions = 2;
      }
    }
    $scope.getItemsForSelection();
    $scope.selectItemsModal.show();
  }
  $scope.closeSelectItemsModal = function() {
    $scope.selectItemsModal.hide();
    $scope.enableSelectButton = false;
    if (modalMissions != undefined) {
      if (modalMissions == 1) {
        $scope.newMissionModal.show();
      }
      if (modalMissions == 2) {
        $scope.editMissionModal.show();
      }
    }
  }

                                        /* SELECT ACHIEVEMENTS MODAL */

  $scope.selectAchievementsModal = $ionicModal.fromTemplate($scope.selectAchievementsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectAchievementsModal = function() {
    $scope.enableSelectButton = false;
    $scope.getAchievementsForSelection();
    $scope.selectAchievementsModal.show();
  }
  $scope.closeSelectAchievementsModal = function() {
    $scope.selectAchievementsModal.hide();
    $scope.enableSelectButton = false;
  }
  
                                        /* SELECT TEAMS MODAL */

  $scope.selectTeamsModal = $ionicModal.fromTemplate($scope.selectTeamsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectTeamsModal = function() {
    $scope.enableSelectButton = false;
    $scope.modelSelectTeams = {};
    $scope.getTeamsForSelection();
    $scope.selectTeamsModal.show();
  } 
  $scope.closeSelectTeamsModal = function() {
    $scope.selectTeamsModal.hide();
    $scope.showInputMessage = false;
    $scope.enableSelectButton = false;
  }

                                        /* SELECT REWARDS MODAL */

  $scope.selectRewardsModal = $ionicModal.fromTemplate($scope.selectRewardsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectRewardsModal = function() {
    $scope.enableSelectButton = false;
    $scope.getRewardsForSelection();
    $scope.selectRewardsModal.show();
  }
  $scope.closeSelectRewardsModal = function() {
    $scope.selectRewardsModal.hide();
    $scope.enableSelectButton = false;
  }

                                        /* SELECT MISSIONS MODAL */

  $scope.selectMissionsModal = $ionicModal.fromTemplate($scope.selectMissionsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectMissionsModal = function() {
    $scope.enableSelectButton = false;
    $scope.getMissionsForSelection();
    $scope.selectMissionsModal.show();
  }
  $scope.closeSelectMissionsModal = function() {
    $scope.selectMissionsModal.hide();
    $scope.enableSelectButton = false;
  }

                                        /* NEW CLASS MODAL */

  $scope.newClassModal = $ionicModal.fromTemplate($scope.newClassModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showModalNewClass = function() {
    $scope.modelNewClass = {};
    $scope.newClassModal.show();  
  }
  $scope.closeModalNewClass = function() {
    $scope.newClassModal.hide();
  }

                                        /* SECONDARY MENU MODAL */

  $scope.secondaryMenuModal = $ionicModal.fromTemplate( $scope.secondaryMenuModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalSecondary = function() {
    if ($scope.studentDialogModal != undefined) {
      if ($scope.studentDialogModal.isShown()) {
        $scope.studentDialogModal.hide();
        modalFirst = 1;
      }
    }
    if ($scope.newStudentModal != undefined) {
      if ($scope.newStudentModal.isShown()) {
        $scope.newStudentModal.hide();
        modalFirst = 2;
      }
    }
    $scope.secondaryMenuModal.show();  
  }
  $scope.closeModalSecondary = function() {
    $scope.clearFormSecundaryModal();
    $scope.secondaryMenuModal.hide();
    if (modalFirst != undefined) {
      if (modalFirst == 1)
        $scope.studentDialogModal.show(); 
      if (modalFirst == 2)
        $scope.newStudentModal.show();
    }
  }

                                        /* NEW STUDENT DIALOG MODAL */

  $scope.newStudentModal = $ionicModal.fromTemplate($scope.newStudentModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewStudentDialog = function() {
    $scope.modelNewStudent = {};
    $scope.newStudentModal.show();  
  }
  $scope.closeModalNewStudentDialog = function() {
    document.getElementById('inputNewStudentPicture').value = '';
    $scope.newStudentModal.hide();
  }

                                        /* STUDENT DIALOG MODAL */

  $scope.studentDialogModal = $ionicModal.fromTemplate($scope.studentDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalStudentDialog = function() {
    $scope.studentDialogModal.show();  
  }
  $scope.closeModalStudentDialog = function() {
    $scope.studentDialogModal.hide();
  }
  
                                          /* QUANTITY RANDOM TEAMS MODAL */

  $scope.quantityRandomTeamsModal = $ionicModal.fromTemplate($scope.quantityRandomTeamsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalQuantityRandomTeams = function() {
    $scope.modelQuantity = {};
    $scope.quantityRandomTeamsModal.show();  
  }
  $scope.closeModalQuantityRandomTeams = function() {
    $scope.quantityRandomTeamsModal.hide();
  }

                                        /* TEAM DIALOG MODAL */  

  $scope.teamDialogModal = $ionicModal.fromTemplate($scope.teamDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalTeamDialog = function() {
    $scope.modelTeamDialog = {};
    $scope.teamDialogModal.show();  
  }
  $scope.closeModalTeamDialog = function() {
    $scope.teamDialogModal.hide();
  }

                                        /* NEW TEAM DIALOG MODAL */

  $scope.newTeamDialogModal = $ionicModal.fromTemplate($scope.newTeamDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewTeamDialog = function() {
    $scope.modelNewTeamDialog = {};
    $scope.getStudentsForTeamSelection();
    $scope.newTeamDialogModal.show();  
  }
  $scope.closeModalNewTeamDialog = function() {
    document.getElementById('inputNewTeamPicture').value = '';
    $scope.newTeamDialogModal.hide();
  }

                                        /* EDIT TEAM MEMBERS MODAL */

  $scope.editMembersModal = $ionicModal.fromTemplate($scope.editMembersModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMembers = function() {
    $scope.editMembers = true;
    $scope.getStudentsForTeamSelection();
    $scope.editMembersModal.show();  
  }
  $scope.closeModalEditMembers = function() {
    $scope.editMembersModal.hide();
  }

                                        /* EDIT MISSION MODAL */

  $scope.editMissionModal = $ionicModal.fromTemplate($scope.editMissionModal,  {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMission = function() {
    if (modalMissions != undefined) {
      if (modalMissions == 0) {
        $scope.modelEditMission = {};
        var dateTimeStamp = new Date($scope.mission.date);
        $scope.modelEditMission.date = dateTimeStamp;  
      }
    }
    $scope.editMissionModal.show();  
  }
  $scope.closeModalEditMission = function() {
    $scope.editMissionModal.hide();
    modalMissions = 0;
  }

                                            /* EDIT MISSION ITEMS MODAL */

  $scope.editMissionItemsModal = $ionicModal.fromTemplate($scope.editMissionItemsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMissionItems = function() {
    $scope.editingMissionItems = true;
    $scope.getItemsForMissionSelection();
    $scope.editMissionItemsModal.show();  
  }
  $scope.closeModalEditMissionItems = function() {
    $scope.editMissionItemsModal.hide();
  }

                                          /* EDIT MISSION REWARDS MODAL */

  $scope.editMissionRewardsModal = $ionicModal.fromTemplate($scope.editMissionRewardsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMissionRewards = function() {
    $scope.editingMissionRewards = true;
    $scope.getRewardsForMissionSelection();
    $scope.editMissionRewardsModal.show();  
  }
  $scope.closeModalEditMissionRewards = function() {
    $scope.editMissionRewardsModal.hide();
  }

                                          /* EDIT MISSION MEMBERS MODAL */

  $scope.editMissionMembersModal = $ionicModal.fromTemplate($scope.editMissionMembersModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMissionMembers = function() {
    $scope.editingMissionMembers = true;
    $scope.getMembersForMissionSelection();
    $scope.editMissionMembersModal.show();  
  }
  $scope.closeModalEditMissionMembers = function() {
    $scope.editMissionMembersModal.hide();
  }

                                        /* NEW ITEM MODAL */

  $scope.newItemModal = $ionicModal.fromTemplate($scope.newItemModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewItem = function() {
    $scope.modelNewItem = {};
    $scope.newItemModal.show();  
  }
  $scope.closeModalNewItem = function() {
    $scope.newItemModal.hide();
  }

                                        /* NEW ACHIEVEMENT MODAL */

  $scope.newAchievementModal = $ionicModal.fromTemplate($scope.newAchievementModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewAchievement = function() {
    $scope.modelNewAchievement = {};
    $scope.newAchievementModal.show();  
  }
  $scope.closeModalNewAchievement = function() {
    document.getElementById('inputNewAchievementBadge').value = '';
    $scope.newAchievementModal.hide();
  }

                                       /* NEW REWARD MODAL */
  $scope.newRewardModal = $ionicModal.fromTemplate($scope.newRewardModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewReward = function() {
    $scope.modelNewReward = {};
    $scope.newRewardModal.show();  
  } 
  $scope.closeModalNewReward = function() {
    $scope.newRewardModal.hide();
  }

                                        /* EDIT REWARD MODAL */

  $scope.editRewardModal = $ionicModal.fromTemplate($scope.editRewardModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditReward = function() {
    $scope.modelEditReward = {};
    $scope.editRewardModal.show();  
  }
  $scope.closeModalEditReward = function() {
    $scope.editRewardModal.hide();
  }

                                        /* NOTIFICATIONS MODAL */

  $scope.notificationsModal = $ionicModal.fromTemplate($scope.notificationsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showNotificationsModal = function() {
    $scope.notificationsModal.show();
  }
  $scope.closeNotificationsModal = function() {
    $scope.notificationsModal.hide();
  }

  /**
    *************************************CLEAN FORM FUNCTIONS GOES HERE*******************************
    Used to clean some forms and also to put the index in the used select elements in the first index.
  */

  $scope.clearFormSecundaryModal = function() {
    var selectTeam = document.getElementById("selectTeam").selectedIndex = 0;
    var selectCopy = document.getElementById("selectCopy").selectedIndex = 0;
  }

  /*
    *************************************DECLARE VARIABLES & GIVE TO $SCOPE ALL THE VALUES WE NEED****
  */

  /**
    Checks if there is a user signed up in the application.
    It is used to prevent the users to enter this page without permission.
  */
  if (firebase.auth().currentUser === null) {
    $state.go('login');
  }

  /**
    Saves the credentials used to log in in the local storage.
  */
  firebase.auth().onAuthStateChanged(function(user) {
    if (user && sharedData.getData() === 'teacher') {
      sessionUser = firebase.auth().currentUser;
      firebase.auth().currentUser.getToken(true).then(function(idToken) {
        var userData = {
          'sessionUserId' : sessionUser.uid,
          'token' : idToken,
          'type' : 'teacher',
        };

        localStorageService.set('userCredentials', userData);
      });
      //Saves the teacher into the session and decrypts the teacher's name and surname.
      var teachersArray = $firebaseArray(teachersRef);
      teachersArray.$loaded(function() {
        $scope.teacher = teachersArray.$getRecord(sessionUser.uid);
        $scope.teacher.name = CryptoJS.AES.decrypt($scope.teacher.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
        $scope.teacher.surname = CryptoJS.AES.decrypt($scope.teacher.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
        $scope.getClassrooms();
      })
    }
  });

  /**
    Needed for the translations to work in the controller's words.
  */
  $translate(['ACTIONS_ACHIEVEMENTS', 'ACTIONS_CLASSROOM_STUDENTS', 'ACTIONS_CLASSROOM_TEAMS', 
    'ACTIONS_ITEMS', 'ACTION_MISSIONS', 'ACTIONS_REWARDS', 'ACTIONS_TEACHER_HOME', 'ACHIEVEMENT', 'ARCHIVE_CLASSES', 
    'BACKUP', 'BECAUSE_COMPLETE_MISSION', 'CANCEL', 'CANT_ASK_MORE_SCORE_THAN_MAX', 'CANT_CREATE_MORE_TEAMS_THAN_STUDENT', 'CHANGE_SCORE', 'CLASS_CODE', 'DATA_CHANGED',
    'DELETE_ACHIEVEMENTS', 'DELETE_CLASSROOMS', 'DELETE_ITEMS', 'DELETE_MISSIONS', 'DELETE_REWARDS', 'DELETE_STUDENTS', 'DELETE_TEAMS', 'EDIT_SCORE', 'EMAIL_ALREADY_USED', 
    'EMAIL_CHANGED', 'EMAIL_INVALID', 'EVALUATE_STUDENTS', 'EVALUATE_TEAMS', 'EXPORT', 'FILE_INVALID', 'IMPORT', 'INTRODUCE_MISSION_NAME', 
    'INTRODUCE_ADDITIONAL_POINTS', 'ERROR_ACCESS_UNKNOW', 'ERROR_WEAK_PASSWORD', 'HAS_EXPIRED', 'HAS_FINISHED', 'HAS_FINISHED_MISSION', 'HAS_LOST_ACHIEVEMENT', 
    'HAS_LOST_MIN_POINTS_IN_ITEM', 'HAS_LOST_MIN_POINTS_IN_ITEM', 
    'HAS_RECIBED_MAX_POINTS_IN_ITEM', 'HAS_UNLOCKED_LEVEL_ACHIEVEMENT', 'HAVE_FINISHED_MISSION', 'HAVE_LOST_ACHIEVEMENT',  'HAVE_UNLOCKED_LEVEL_ACHIEVEMENT', 'IN_THE_ACHIEVEMENT', 
    'INTRODUCE_FINISH_DATE', 'INTRODUCE_MISSION_NAME', 'ITEM', 'MAX_SCORE_ESTABLISEHD', 'MAX_SCORE_WILL_ESTABLISH', 'MISSION', 'MUST_SET_A_VALID_OR_MAYOR_DATE', 'MUST_SET_NAME_IN_MISSION',
    'NEXT', 'NOTIFICATION_OF_MISSION', 'NOTIFICATION_OF_STUDENT', 'NOTIFICATION_HAS_LOST' , 'NOTIFICATION_HAS_WIN', 'PASSWORD_CHANGED', 'OKAY', 'POINTS_ON_THE_ITEM',
    'RANDOM_STUDENT', 'RANDOM_TEAM', 'REWARD', 'SEND_MESSAGE', 'STUDENT_DOESNT_HAVE_ENOUGH_POINTS', 'TAKE_ATTENDANCE', 'TEACHER_MESSAGE', 'TIME_TO_FINISH_MISSION', 
    'UNARCHIVE_CLASSES', 'USE_DEFAULT_POINT', 'YOU_WIN_REWARD', 'ZERO_SCORE_ESTABLISHED', 'ZERO_SCORE_WILL_ESTABLISH']).then(function(translations) {
    $scope.actionAchievementsActionSheet = translations.ACTIONS_ACHIEVEMENTS;
    $scope.actionClassroomStudentsActionSheet = translations.ACTIONS_CLASSROOM_STUDENTS;
    $scope.actionClassroomTeamsActionSheet = translations.ACTIONS_CLASSROOM_TEAMS;
    $scope.actionItemsActionSheet = translations.ACTIONS_ITEMS;
    $scope.actionMissionsActionSheet = translations.ACTION_MISSIONS;
    $scope.actionRewardsActionSheet = translations.ACTIONS_REWARDS;
    $scope.actionTeacherHomeActionSheet = translations.ACTIONS_TEACHER_HOME;
    $scope.achievementText = translations.ACHIEVEMENT;
    $scope.archiveClassroomsActionSheetOption = translations.ARCHIVE_CLASSES;
    $scope.backupActionSheetOption = translations.BACKUP;
    $scope.becouseCompleteMission = translations.BECAUSE_COMPLETE_MISSION;
    $scope.cancelText = translations.CANCEL;
    $scope.cantAskMoreScoreAlert = translations.CANT_ASK_MORE_SCORE_THAN_MAX;
    $scope.cantCreateMoreTeamsThanStudentsAlert = translations.CANT_CREATE_MORE_TEAMS_THAN_STUDENT;
    $scope.changeScore = translations.CHANGE_SCORE;
    $scope.classCodePopup = translations.CLASS_CODE;
    $scope.dataChangedAlert = translations.DATA_CHANGED;
    $scope.deleteAchievementsActionSheetOption = translations.DELETE_ACHIEVEMENTS;
    $scope.deleteClassroomsActionSheetOption = translations.DELETE_CLASSROOMS;
    $scope.deleteItemsActionSheetOption = translations.DELETE_ITEMS;
    $scope.deleteMissionsActionSheetOption = translations.DELETE_MISSIONS;
    $scope.deleteRewardsActionSheetOption = translations.DELETE_REWARDS;
    $scope.deleteStudentsActionSheetOption = translations.DELETE_STUDENTS;
    $scope.deleteTeamsActionSheetOption = translations.DELETE_TEAMS;
    $scope.editScoreText = translations.EDIT_SCORE;
    $scope.errorEmailUsedAlert = translations.EMAIL_ALREADY_USED;
    $scope.emailChangedAlert = translations.EMAIL_CHANGED;
    $scope.emailInvalidAlert = translations.EMAIL_INVALID;
    $scope.errorUnknowAlert = translations.ERROR_ACCESS_UNKNOW;
    $scope.evaluateStudentsActionSheetOption = translations.EVALUATE_STUDENTS;
    $scope.evaluateTeamsActionSheetoption = translations.EVALUATE_TEAMS;
    $scope.exportPopoverOption = translations.EXPORT;
    $scope.fileInvalidAlert = translations.FILE_INVALID;
    $scope.hasLostMinPointItemAlert = translations.HAS_LOST_MIN_POINTS_IN_ITEM;
    $scope.hasRecibedMaxPointsItemAlert = translations.HAS_RECIBED_MAX_POINTS_IN_ITEM;
    $scope.importPopoverOption = translations.IMPORT;
    $scope.inTheAchievementText = translations.IN_THE_ACHIEVEMENT;
    $scope.introduceFinishDateText = translations.INTRODUCE_FINISH_DATE;
    $scope.introduceMissionName = translations.INTRODUCE_MISSION_NAME;
    $scope.introduceAdditionalPoints = translations.INTRODUCE_ADDITIONAL_POINTS;
    $scope.maxPointsHasBeenEstablishedAlert = translations.MAX_SCORE_ESTABLISEHD;
    $scope.maxPointsWillEstablishAlert = translations.MAX_SCORE_WILL_ESTABLISH;
    $scope.mustSetNameMission = translations.MUST_SET_NAME_IN_MISSION;
    $scope.mustSetValidDatePopup = translations.MUST_SET_A_VALID_OR_MAYOR_DATE;
    $scope.nextText = translations.NEXT;
    $scope.notificationFinishedMissionStudentSide = translations.HAVE_FINISHED_MISSION;
    $scope.notificationsFinishedMissionTeacherSide = translations.HAS_FINISHED_MISSION;
    $scope.notificationMissionExpired = translations.HAS_EXPIRED;
    $scope.notificationMissionEnded = translations.HAS_FINISHED;
    $scope.notificationOfMission = translations.NOTIFICATION_OF_MISSION;
    $scope.notificationOfStudent = translations.NOTIFICATION_OF_STUDENT;
    $scope.notificationLose = translations.NOTIFICATION_HAS_LOST;
    $scope.notificationTimeToFinishMissionText = translations.TIME_TO_FINISH_MISSION;
    $scope.notificationTypeItem = translations.ITEM;
    $scope.notificationTypeMission = translations.MISSION;
    $scope.notificationTypeReward = translations.REWARD;
    $scope.notificationUnlockedLevelAchievementStudentSide = translations.HAVE_UNLOCKED_LEVEL_ACHIEVEMENT;
    $scope.notificationUnlockedLevelAchievementTeacherSide = translations.HAS_UNLOCKED_LEVEL_ACHIEVEMENT;
    $scope.notificationLostAchievementStudentSide = translations.HAVE_LOST_ACHIEVEMENT;
    $scope.notificationLostAchievementTeacherSide = translations.HAS_LOST_ACHIEVEMENT;
    $scope.notificationWin = translations.NOTIFICATION_HAS_WIN;
    $scope.okayText = translations.OKAY;
    $scope.passwordChangedAlert = translations.PASSWORD_CHANGED;
    $scope.pointOnTheitemSet = translations.POINTS_ON_THE_ITEM;
    $scope.randomStudentActionSheetOption = translations.RANDOM_STUDENT;
    $scope.randomTeamActionSheetOption = translations.RANDOM_TEAM;
    $scope.sendMessageActionSheetOption = translations.SEND_MESSAGE;
    $scope.studentDoesNotHaveEnougPointsAlert = translations.STUDENT_DOESNT_HAVE_ENOUGH_POINTS;
    $scope.takeAttendanceActionSheetOption = translations.TAKE_ATTENDANCE;
    $scope.teacherMessageNotificationType = translations.TEACHER_MESSAGE;
    $scope.useDefaultPoints = translations.USE_DEFAULT_POINT;
    $scope.unarchiveClassroomsActionSheetOption = translations.UNARCHIVE_CLASSES;
    $scope.weakPasswordAlert = translations.ERROR_WEAK_PASSWORD;
    $scope.youHaveWinTheReward = translations.YOU_WIN_REWARD;
    $scope.zeroPointEstablishedAlert = translations.ZERO_SCORE_ESTABLISHED;
    $scope.zeroPointsWillEstablishAlert = translations.ZERO_SCORE_WILL_ESTABLISH;
  });

  /**
    Needed for the translations to change their value in execution time.
  */
  $rootScope.$on('$translateChangeSuccess', function () {
    $scope.actionAchievementsActionSheet = $translate.instant('ACTIONS_ACHIEVEMENTS');
    $scope.actionClassroomStudentsActionSheet = $translate.instant('ACTIONS_CLASSROOM_STUDENTS');
    $scope.actionClassroomTeamsActionSheet = $translate.instant('ACTIONS_CLASSROOM_TEAMS');
    $scope.actionItemsActionSheet = $translate.instant('ACTIONS_ITEMS');
    $scope.actionMissionsActionSheet = $translate.instant('ACTION_MISSIONS');
    $scope.actionRewardsActionSheet = $translate.instant('ACTION_REWARDS');
    $scope.actionTeacherHomeActionSheet = $translate.instant('ACTIONS_TEACHER_HOME');
    $scope.achievementText = $translate.instant('ACHIEVEMENT');
    $scope.archiveClassroomsActionSheetOption = $translate.instant('ARCHIVE_CLASSES');
    $scope.backupActionSheetOption = $translate.instant('BACKUP');
    $scope.becouseCompleteMission = $translate.instant('BECAUSE_COMPLETE_MISSION');
    $scope.cancelText = $translate.instant('CANCEL');
    $scope.cantAskMoreScoreAlert = $translate.instant('CANT_ASK_MORE_SCORE_THAN_MAX');
    $scope.cantCreateMoreTeamsThanStudentsAlert = $translate.instant('CANT_CREATE_MORE_TEAMS_THAN_STUDENT');
    $scope.changeScore = $translate.instant('CHANGE_SCORE');
    $scope.classCodePopup = $translate.instant('CLASS_CODE');
    $scope.dataChangedAlert = $translate.instant('DATA_CHANGED');
    $scope.deleteAchievementsActionSheetOption = $translate.instant('DELETE_ACHIEVEMENTS');
    $scope.deleteClassroomsActionSheetOption = $translate.instant('DELETE_CLASSROOMS');
    $scope.deleteItemsActionSheetOption = $translate.instant('DELETE_ITEMS');
    $scope.deleteMissionsActionSheetOption = $translate.instant('DELETE_MISSIONS');
    $scope.deleteRewardsActionSheetOption = $translate.instant('DELETE_REWARDS');
    $scope.deleteStudentsActionSheetOption = $translate.instant('DELETE_STUDENTS');
    $scope.deleteTeamsActionSheetOption = $translate.instant('DELETE_TEAMS');
    $scope.editScoreText = $translate.instant('EDIT_SCORE');
    $scope.errorEmailUsedAlert = $translate.instant('EMAIL_ALREADY_USED');
    $scope.emailChangedAlert = $translate.instant('EMAIL_CHANGED');
    $scope.emailInvalidAlert = $translate.instant('EMAIL_INVALID');
    $scope.errorUnknowAlert = $translate.instant('ERROR_ACCESS_UNKNOW');
    $scope.evaluateStudentsActionSheetOption = $translate.instant('EVALUATE_STUDENTS');
    $scope.evaluateTeamsActionSheetoption = $translate.instant('EVALUATE_TEAMS');
    $scope.exportPopoverOption = $translate.instant('EXPORT');
    $scope.fileInvalidAlert = $translate.instant('FILE_INVALID');
    $scope.hasLostMinPointItemAlert = $translate.instant('HAS_LOST_MIN_POINTS_IN_ITEM');
    $scope.hasRecibedMaxPointsItemAlert = $translate.instant('HAS_RECIBED_MAX_POINTS_IN_ITEM');
    $scope.importPopoverOption = $translate.instant('IMPORT');
    $scope.inTheAchievementText = $translate.instant('IN_THE_ACHIEVEMENT');
    $scope.introduceFinishDateText = $translate.instant('INTRODUCE_FINISH_DATE');
    $scope.introduceMissionName = $translate.instant('INTRODUCE_MISSION_NAME');
    $scope.introduceAdditionalPoints = $translate.instant('INTRODUCE_ADDITIONAL_POINTS');
    $scope.maxPointsHasBeenEstablishedAlert = $translate.instant('MAX_SCORE_ESTABLISEHD');
    $scope.maxPointsWillEstablishAlert = $translate.instant('MAX_SCORE_WILL_ESTABLISH');
    $scope.mustSetNameMission = $translate.instant('MUST_SET_NAME_IN_MISSION');
    $scope.mustSetValidDatePopup = $translate.instant('MUST_SET_A_VALID_OR_MAYOR_DATE');
    $scope.nextText = $translate.instant('NEXT');
    $scope.notificationFinishedMissionStudentSide = $translate.instant('HAVE_FINISHED_MISSION');
    $scope.notificationsFinishedMissionTeacherSide = $translate.instant('HAS_FINISHED_MISSION');
    $scope.notificationMissionExpired = $translate.instant('HAS_EXPIRED');
    $scope.notificationMissionEnded = $translate.instant('HAS_FINISHED');
    $scope.notificationOfMission = $translate.instant('NOTIFICATION_OF_MISSION');
    $scope.notificationOfStudent = $translate.instant('NOTIFICATION_OF_STUDENT');
    $scope.notificationLose = $translate.instant('NOTIFICATION_HAS_LOST');
    $scope.notificationTimeToFinishMissionText = $translate.instant('TIME_TO_FINISH_MISSION');
    $scope.notificationTypeItem = $translate.instant('ITEM');
    $scope.notificationTypeMission = $translate.instant('MISSION');
    $scope.notificationTypeReward = $translate.instant('REWARD');
    $scope.notificationUnlockedLevelAchievementStudentSide = $translate.instant('HAVE_UNLOCKED_LEVEL_ACHIEVEMENT');
    $scope.notificationUnlockedLevelAchievementTeacherSide = $translate.instant('HAS_UNLOCKED_LEVEL_ACHIEVEMENT');
    $scope.notificationLostAchievementStudentSide = $translate.instant('HAVE_LOST_ACHIEVEMENT');
    $scope.notificationLostAchievementTeacherSide = $translate.instant('HAS_LOST_ACHIEVEMENT');
    $scope.notificationWin = $translate.instant('NOTIFICATION_HAS_WIN');
    $scope.okayText = $translate.instant('OKAY');
    $scope.passwordChangedAlert = $translate.instant('PASSWORD_CHANGED');
    $scope.pointOnTheitemSet = $translate.instant('POINTS_ON_THE_ITEM');
    $scope.randomStudentActionSheetOption = $translate.instant('RANDOM_STUDENT');
    $scope.randomTeamActionSheetOption = $translate.instant('RANDOM_TEAM');
    $scope.sendMessageActionSheetOption = $translate.instant('SEND_MESSAGE');
    $scope.studentDoesNotHaveEnougPointsAlert = $translate.instant('STUDENT_DOESNT_HAVE_ENOUGH_POINTS');
    $scope.takeAttendanceActionSheetOption = $translate.instant('TAKE_ATTENDANCE');
    $scope.teacherMessageNotificationType = $translate.instant('TEACHER_MESSAGE');
    $scope.useDefaultPoints = $translate.instant('USE_DEFAULT_POINT');
    $scope.unarchiveClassroomsActionSheetOption = $translate.instant('UNARCHIVE_CLASSES');
    $scope.weakPasswordAlert = $translate.instant('ERROR_WEAK_PASSWORD');
    $scope.youHaveWinTheReward = $translate.instant('YOU_WIN_REWARD');
    $scope.zeroPointEstablishedAlert = $translate.instant('ZERO_SCORE_ESTABLISHED');
    $scope.zeroPointsWillEstablishAlert = $translate.instant('ZERO_SCORE_WILL_ESTABLISH');
  });

  $scope.achievementGalery = ['img/userDefaultAvatar.png', 'img/teamDefaultAvatar.png', 'img/achievementDefaultBadge.png']
  $scope.defaultAvatar = 'img/userDefaultAvatar.png';
  $scope.defaultTeamAvatar = 'img/teamDefaultAvatar.png';
  $scope.defaultAchievementAvatar = 'img/achievementDefaultBadge.png';

  $scope.isArchivedClassroom = false;
  $scope.isIOS = ionic.Platform.isIOS() || ionic.Platform.isIPad();

  var modalFirst;
  var modalMissions = 0;

  var sessionUser;
  var secondaryConnection = null;

  var demoClassroom = false;

  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');
  var classroomsRef = firebase.database().ref('classrooms');
  var itemsRef = firebase.database().ref('items');
  var achievementsRef = firebase.database().ref('achievements');
  var teamsRef = firebase.database().ref('teams');
  var rewardsRef = firebase.database().ref('rewards');
  var missionsRef = firebase.database().ref('missions');

  $scope.enableSelectButton = false;

  /*
    *************************************EVERY FUNCTIONALITY FUNCTION GOES HERE***********************
  */




                                        /* UPDATE INPUT FILE */

  /**
    @elementId: Id of the input type file used to get the picture
    Used to get the file selected depending on the input type file used
  */
  $scope.updateInputFile = function(elementId) {
    var fileButton = document.getElementById(elementId);
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $scope.file = e.target.files[0];
      }
    });
  }




                                        /* ALERTS POPUP */
  /**
    @title: The tile of the popup, either an icon or a text.
    @content: The message of the popup.
    Used to create alert popups
  */
  $scope.popupAlertCreate = function(title, content) {
    $ionicPopup.show({
      title: title,
      template: '<p style="text-align:center;">'+content+'</p>',
      buttons: [
        {text: $scope.okayText,}
      ]
    });
  }



                                        /* HASHCODE POPUP */

  /**
    Used to show the hashcode's popup
  */
  $scope.showHashcodePopup = function() {
    var alertPopup = $ionicPopup.alert({
      title: $scope.classCodePopup,
      template: '<p class="classroom-hashcode">' + $scope.classroom.hashcode + '</p>',
    });

    alertPopup.then(function(res) {
    });
  };




                                        /* FUNCTIONS IN SETTINGS */

  /**
    Logs out the session user.
  */
  $scope.logOut = function() {
    if (firebase.auth().currentUser) {
      $ionicPopup.show({
        title: $scope.systemWarning,
        template: $scope.sureYouWannaExit,
        buttons: [{
            text: $scope.cancelText,
          },
          {
            text: $scope.okayText,
            onTap: function() {
              var userData = {};
              localStorageService.set('userCredentials', userData);

              firebase.auth().signOut();
              $state.go('login');
              $scope.teacherHomeForm();
            }
          },
        ]
      });
    }
  }




                                        /* FUNCTIONS IN TEACHER HOME */

  /**
    Get all the classrooms that the teacher manage and saves them in the session.
    Asks firebase for the correspond classrooms' references
    Defines an event for each classroom's reference which is triggered every time that database reference is modified.
    The event saves every classroom in the session.
  */
  $scope.getClassrooms = function() {
    var teacherClassroomsRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/classrooms');
    var classroomKeys = $firebaseArray(teacherClassroomsRef);
    classroomKeys.$loaded(function() {
      $scope.classrooms = [];
      for (i = 0 ; i < classroomKeys.length ; i++) {
        var classKey = classroomKeys.$keyAt(i);
        var loopClassroom = firebase.database().ref('classrooms/' + classKey);
        loopClassroom.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            for (j = 0 ; j < $scope.classrooms.length ; j++) {
                if ($scope.classrooms[j].id == snapshot.val().id) {
                  change = true;
                  index = j;
                  break;
                }              
            }
            if (!change) {
              $scope.classrooms.push(snapshot.val());            
            } else {
              $scope.classrooms[index] = snapshot.val();
            }
            if ($scope.classroom != undefined) {
              $scope.getLevels();
            }
            $scope.classrooms.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getClassroomsForSelection();
          }
        });
      }
    });
  }

  /**
    Copy all the classrooms in another array for selection purposes.
  */
  $scope.getClassroomsForSelection = function() {
    $scope.classroomsForSelection = angular.copy($scope.classrooms);
    for (var element in $scope.classroomsForSelection) {
      $scope.classroomsForSelection[element].selected = false;
    }
  }

  /**
    @name: The name for the classroom that is going to be create.
    Creates a classroom and add its reference to the teacher's tree on the firebase database.
    Also creates the hashcode for the classroom and add it to the classroom's tree on the firebase database.
  */
  $scope.createClassroom = function(name) {
    var classroomsNode = $firebaseArray(classroomsRef);
    classroomsNode.$loaded(function() {
      classroomsNode.$add({
        'name' : name,
        'open' : true,
        'archived' : false,
        'notifications' : true,
        'teacher' : $scope.teacher.$id,
      }).then(function(refNewClassroom) {
        var newClassroomId = refNewClassroom.key;

        var idForClassroomRef = firebase.database().ref('classrooms/' + newClassroomId + '/id');
        idForClassroomRef.set(newClassroomId);

        var a = CryptoJS.SHA1(newClassroomId + Date.now().toString()).toString();
        var hash = a.substr(0, 10).toUpperCase();
        var hashCodeForClassroomRef = firebase.database().ref('classrooms/' + newClassroomId + '/hashcode');
        hashCodeForClassroomRef.set(hash);

        var hashCodeRef = firebase.database().ref('hashcodes/' + hash + '/id');
        hashCodeRef.set(newClassroomId);

        var newteacherClassroomRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/classrooms/' + newClassroomId);
        newteacherClassroomRef.set(true);

        //COPY PREFERENCES FROM OTHER CLASSROOM
        if (document.getElementById("selectClass") != null) {
          var classroomIndex = document.getElementById("selectClass").selectedIndex;
        } else {
          var classroomIndex = 0;
        }
        
        if (classroomIndex != 0) {
        	var classroom = $scope.classrooms[classroomIndex - 1];
          $scope.copyPreferencesFromClassroom(classroom, newClassroomId);
        } else if (demoClassroom) {

          //DEMO CLASSROOM
          $scope.demoClassrooms = [];
          var loopClassroom = firebase.database().ref('classrooms/demoClassroomKey');
          loopClassroom.on('value', function(snapshot) {
            if (snapshot.val() != null) {
              $scope.demoClassrooms.push(snapshot.val());
              $scope.copyPreferencesFromClassroom(snapshot.val(), newClassroomId);
              demoClassroom = false;
            }
          });

        } else {
          //CREATE DEMO LEVEL
          var demoLevel = {
            'title' : 'Beginner',
            'level' : 0,
            'requiredPoints' : 0,
          }
          var classroomLevelRef = firebase.database().ref('classrooms/' + newClassroomId + '/levels');
          var classroomLevelArray = $firebaseArray(classroomLevelRef);
          classroomLevelArray.$loaded(function() {
            classroomLevelArray.$add(demoLevel).then(function(refNewLevel) {
              var levelId = refNewLevel.key;

              var idForLevelRef = firebase.database().ref('classrooms/' + newClassroomId + '/levels/' + levelId + '/id');
              idForLevelRef.set(levelId);
            });
          });

          $scope.getClassrooms();
        }
      });
    });
  }

  /**
    Creates a demo classroom
  */
  $scope.createDemoClassroom = function() {
    demoClassroom = true;
    $scope.createClassroom('Demo Classroom');
  }

  /**
    @classroom: The classroom that is going to be remove.
    Removes a level and  its references in the students' and teacher's tree on firebase database.
    Also removes the items, rewards, achievements and missions references from the mission in the students' tree on firebase database.
    Removes all the classroom's items'references as well as the achievements'references on the firebase database.
    Than removes all the achievements' pictures from the firebase storage.
  */
  $scope.deleteClassroom = function(classroom) {
    for (var studentId in classroom.students) {
      var studentClassToDeleteRef = firebase.database().ref('students/' + studentId + '/classrooms/' + classroom.id);
      studentClassToDeleteRef.remove();

      var imagesRef = firebase.storage().ref().child('Profile_Pictures/' + studentId + '/' + classroom.id + '/classroomPicture');
      imagesRef.delete().then(function() {
      }).catch(function(error) {
      });
    }

    var teacherClassToDelefeRef = firebase.database().ref('teachers/' + sessionUser.uid + '/classrooms/' + classroom.id);
    teacherClassToDelefeRef.remove();

    var classroomHascodeRef = firebase.database().ref('hashcodes/' + classroom.hashcode);
    classroomHascodeRef.remove();

    var classToDeleteRef = firebase.database().ref('classrooms/' + classroom.id);
    classToDeleteRef.remove();
    
    var itemIdList = [];
    for (var itemId in classroom.items) {
      itemIdList.push(itemId);
      var classItemToDeleteRef = firebase.database().ref('items/' + itemId);
      classItemToDeleteRef.once('value').then(function(snapshot) {
        var item = snapshot.val();
        for (var achievementId in item.achievements) {
          var achievementToDeleteRef = firebase.database().ref('achievements/' + achievementId);
          achievementToDeleteRef.remove();
          var imagesRef = firebase.storage().ref().child('Achievement_Pictures/' + achievementId + '/achievementPicture');
          imagesRef.delete().then(function() {
          }).catch(function(error) {
          });
        }
        if (item.id === itemId) {
          $scope.deleteItemReferences(itemIdList);
        }
      });

      for (var studentId in classroom.students) {
        var studentItemToDeleteRef = firebase.database().ref('students/' + studentId + '/items/' + itemId);
        studentItemToDeleteRef.remove();
      }
    }

    for (var rewardId in classroom.rewards) {
      var classRewardToDeleteRef = firebase.database().ref('rewards/' + rewardId);
      classRewardToDeleteRef.remove();
      for (var studentId in classroom.students) {
        var studentRewardToDeleteRef = firebase.database().ref('students/' + studentId + '/rewards/' + rewardId);
        studentRewardToDeleteRef.remove();
      }
    }

    for (var teamId in classroom.teams) {
      var classTeamToDeleteRef = firebase.database().ref('teams/' + teamId);
      classTeamToDeleteRef.remove();

      var imagesRef = firebase.storage().ref().child('Team_Pictures/' + teamId + '/teamPicture');
      imagesRef.delete().then(function() {
      }).catch(function(error) {
      });

      for (var studentId in classroom.students) {
        var studentTeamToDeleteRef = firebase.database().ref('students/' + studentId + '/teams/' + teamId);
        studentTeamToDeleteRef.remove();
      }
    }

    for (var missionId in classroom.missions) {
      var classMissionToDeleteRef = firebase.database().ref('missions/' + missionId);
      classMissionToDeleteRef.remove();
      for (var studentId in classroom.students) {
        var studentMissionToDeleteRef = firebase.database().ref('students/' + studentId + '/missions/' + missionId);
        studentMissionToDeleteRef.remove();
      }
    }

    $scope.getClassrooms();
  }

  /**
    @itemIdList: List with all the items' ids to delete.
    Deletes all the items' references on the firebase database. This function is apart of the previous function because
    it has to handle with an event, making the iteration useless to iterate between items' ids. So they are stored in an
    array to being deleted here.
  */
  $scope.deleteItemReferences = function(itemIdList) {
    for (var element in itemIdList) {
      var classItemToDeleteRef = firebase.database().ref('items/' + itemIdList[element]);
      classItemToDeleteRef.remove();
    }
  }

  /**
    @classroom: The classroom that is going to be saved in the session.
    @archived: If the classroom is archived or not, to not allow create or add if it's archived.
    Saves the classroom selected in the session and get all from it (items, rewards, missions, rules...)
  */
  $scope.setClassroom = function(classroom, archived) {
    $scope.classroom = classroom;
    $scope.getStudents();
    $scope.getLevels();
    $scope.getItems();
    $scope.getTeams();
    $scope.getRewards();
    $scope.getMissions();
    $scope.getNotifications();
    $scope.classForm();

    $scope.isArchivedClassroom = archived;
  }

  /**
    @classroom: The classroom that is about to be archived.
    Makes the classroom to be archived.
  */
  $scope.archiveClassroom = function(classroom) {
    var classroomToArchiveRef = firebase.database().ref('classrooms/' + classroom.id + '/archived');
    classroomToArchiveRef.set(true)
  }

  /**
    @classroom: The classroom that is about to be unarchived.
    Makes the classroom to be unarchived.
  */
  $scope.unArchiveClassroom = function(classroom) {
    var classroomToArchiveRef = firebase.database().ref('classrooms/' + classroom.id + '/archived');
    classroomToArchiveRef.set(false)
  }

  /**
    @value: True o false. To show the classrooms
    Shows or hide the archived classrooms depending the value.
  */
  $scope.showArchivedClassrooms = function(value) {
    $scope.archivedClassroomsToShow = value;
    $scope.closePopoverTeacherHome();
  }

  /**
    @originalClassroom: The original classroom that is used to copy data.
    @newClassroomId: The id of the new classroom that is going to be a copy.
    It gets all the levels, items, students, achievements, missions... from the original classroom to the new classroom.
  */
  $scope.copyPreferencesFromClassroom = function(originalClassroom, newClassroomId) {
    $scope.classroom = {};
    $scope.classroom.id = originalClassroom.id;

    var classroomLevelsRef = firebase.database().ref('classrooms/' + newClassroomId + '/levels');
    var classroomLevelsArray = $firebaseArray(classroomLevelsRef);
    classroomLevelsArray.$loaded(function() {
      for (var levelId in originalClassroom.levels) {
        classroomLevelsArray.$add({
          'title' : originalClassroom.levels[levelId].title,
          'level' : originalClassroom.levels[levelId].level,
          'requiredPoints' : originalClassroom.levels[levelId].requiredPoints,
        }).then(function(ref) {
          var id = ref.key;

          var idForLevelRef = firebase.database().ref('classrooms/' + newClassroomId + '/levels/' + id + '/id');
          idForLevelRef.set(id);
        });
      }
    });

    for (var studentId in originalClassroom.students) {
      var newClassStudentRef = firebase.database().ref('classrooms/' + newClassroomId + '/students/' + studentId);
      newClassStudentRef.set(true);

      var newStudentClassRef = firebase.database().ref('students/' + studentId + '/classrooms/' + newClassroomId);
      newStudentClassRef.set({
        'id' : $scope.classroom.id,
        'totalPoints' : 0,
        'inClass' : true,
      });
    }

    var teamsArray = $firebaseArray(teamsRef);
    teamsArray.$loaded(function() {
      for (var teamId in originalClassroom.teams) {
        var loopTeam = firebase.database().ref('teams/' + teamId);
        loopTeam.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var team = snapshot.val();
            teamsArray.$add({
              'name' : team.name,
              'objective' : team.objective,
              'picture' : team.picture,
            }).then(function(ref) {
              var id = ref.key;

              var idForTeamRef = firebase.database().ref('teams/' + id + '/id');
              idForTeamRef.set(id);

              var classroomRef = firebase.database().ref('classrooms/' + newClassroomId  + '/teams/' + id);
              classroomRef.set(true);
            });
          }
        })
      }
    });

    var itemsArray = $firebaseArray(itemsRef);
    var achievementsArray = $firebaseArray(achievementsRef);
    itemsArray.$loaded(function() {
      achievementsArray.$loaded(function() {
        var itemId = 0;
        for (var itemId in originalClassroom.items) {
          var loopItem = firebase.database().ref('items/' + itemId);
          loopItem.on('value', function(snapshotItem) {
            if (snapshotItem.val() != null) {
              var item = snapshotItem.val();
              itemsArray.$add({
                'name' : item.name,
                'description' : item.description,
                'score' : item.score,
                'maxScore' : item.maxScore,
                'useForLevel' : item.useForLevel,
              }).then(function(refItem) {
                var newItemId = refItem.key;
  
                var idForItemRef = firebase.database().ref('items/' + newItemId + '/id');
                idForItemRef.set(newItemId);
  
                var classroomItemRef = firebase.database().ref('classrooms/' + newClassroomId + '/items/' + newItemId);
                classroomItemRef.set(newItemId);
  
                if (item.achievements != undefined) {
                  for (var achievementId in item.achievements) {
                    var loopAchievement = firebase.database().ref('achievements/' + achievementId);
                    loopAchievement.on('value', function(snapshotAchievement) {
                      if (snapshotAchievement.val() != null) {
                        var achievement = snapshotAchievement.val();
                        achievementsArray.$add({
                          'name' : achievement.name,
                          'description' : achievement.description,
                          'badge' : achievement.badge,
                          'maxLevel' : achievement.maxLevel,
                          'requirements' : achievement.requirements,
                        }).then(function(refAchievement) {
                          var newAchievementId = refAchievement.key;
  
                          var idForAchievementRef = firebase.database().ref('achievements/' + newAchievementId + '/id');
                          idForAchievementRef.set(newAchievementId);
  
                          var classroomAchievementRef = firebase.database().ref('items/' + newItemId + '/achievements/' + newAchievementId);
                          classroomAchievementRef.set(newAchievementId);
                        });
                      }
                    })
                  }
                }
              });
            }
          });
        }
      });
    });

    var rewardsArray = $firebaseArray(rewardsRef);
    rewardsArray.$loaded(function() {
      for (var rewardId in originalClassroom.rewards) {
        var loopReward = firebase.database().ref('rewards/' + rewardId);
        loopReward.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var reward = snapshot.val();
            rewardsArray.$add({
              'name' : reward.name,
              'description' : reward.description,
              'price' : reward.price,
            }).then(function(ref) {
              var id = ref.key;

              var idForRewardRef = firebase.database().ref('rewards/' + id + '/id');
              idForRewardRef.set(id);

              var classroomRewardsRef = firebase.database().ref('classrooms/' + newClassroomId + '/rewards/' + id);
              classroomRewardsRef.set(id);
            });
          }
        });
      }
    });

    $scope.getClassrooms();
  }

  /**
    Gets all the selected classrooms in the modal and then calls the correspond method depending on the var created when choose an option in the action sheet.
  */
  $scope.selectClassrooms = function() {
    $scope.closeSelectClassroomsModal();
    if ($scope.actionSheetTeacherHomeType === 'delete') {
      for (var element in $scope.classroomsForSelection) {
        if ($scope.classroomsForSelection[element].selected === true) {
          $scope.deleteClassroom($scope.classroomsForSelection[element]);
        }
      }
      $scope.classroomsForSelection = $scope.classrooms;
    } else if ($scope.actionSheetTeacherHomeType === 'archive') {
      for (var element in $scope.classroomsForSelection) {
        if ($scope.classroomsForSelection[element].selected === true) {
          $scope.archiveClassroom($scope.classroomsForSelection[element]);
        }
      }
    } else if ($scope.actionSheetTeacherHomeType === 'unArchive') {
      for (var element in $scope.classroomsForSelection) {
        if ($scope.classroomsForSelection[element].selected === true) {
          $scope.unArchiveClassroom($scope.classroomsForSelection[element]);
        }
      }
    }
  }

  /**
    @classroom: The classroom selected.
    Checks if the selected classroom it was already selected or not.
    Also detects if there is anyone selected, and then enables the select button.
  */
  $scope.changeSelectedClassroom = function(classroom) {
    if (classroom.selected === false) {
      classroom.selected = true;
    } else {
      classroom.selected = false;
    }
    $scope.enableSelectButton = false;
    for (var element in $scope.classroomsForSelection) {
      if ($scope.classroomsForSelection[element].selected) {
        $scope.enableSelectButton = true;
        break;
      }
    }
  }

  


                                        /* FUNCTIONS IN TEACHER PROFILE */

  /**
    Updates the teacher's avatar with an image uploaded from the local storage and saves it on the firebase storage.
  */
  $scope.updateTeacherAvatar = function() {
    var downloadURL;
    var fileButton = document.getElementById('inputAvatar');
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Profile_Pictures/' + sessionUser.uid + '/profilePicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {

          }, function error(error) {
            $ionicLoading.hide();
          }, function complete() {
            downloadURL = task.snapshot.downloadURL;
              
            $scope.teacher.avatar = downloadURL;
            var teacherAvatarToUpdateRef = firebase.database().ref('teachers/' + sessionUser.uid + '/avatar/');
            teacherAvatarToUpdateRef.set(downloadURL);
            sessionUser.updateProfile ({
              photoURL : downloadURL,
            });
            $scope.teacher.name = CryptoJS.AES.decrypt($scope.teacher.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
            $scope.teacher.surname = CryptoJS.AES.decrypt($scope.teacher.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
            $ionicLoading.hide();

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
          });
        } else {
          $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.fileInvalidAlert);
        }
      }
    });
  }

  /**
    Updates the teacher's profile information with either some or all the fields and saves changes on the firebase database.
  */
  $scope.editTeacherData = function(name, surname, school) {
    if (name != undefined) {
      $scope.teacher.name = name;
      var teacherNameRef = firebase.database().ref('teachers/' + sessionUser.uid + '/name');
      teacherNameRef.set(CryptoJS.AES.encrypt(name,sessionUser.uid).toString());
      sessionUser.updateProfile ({
        displayName : name + ' ' + $scope.teacher.surname,
      });
    }

    if (surname != undefined) {
      $scope.teacher.surname = surname;
      var teacherSurnameRef = firebase.database().ref('teachers/' + sessionUser.uid + '/surname');
      teacherSurnameRef.set(CryptoJS.AES.encrypt(surname,sessionUser.uid).toString());
      sessionUser.updateProfile ({
        displayName : $scope.teacher.name + ' ' + surname,
      });
    }

    if (school != undefined) {
      $scope.teacher.school = school;
      var teacherSchoolRef = firebase.database().ref('teachers/' + sessionUser.uid + '/school');
      teacherSchoolRef.set(school);
    }

    $scope.settingsForm();
    $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.dataChangedAlert);
  }

  /**
    Updates the teacher's password, sends a confirmation email to the user's email and saves changes on the firebase database.
  */
  $scope.updateTeacherPassword = function(newPassword) {
    sessionUser.updatePassword(newPassword).then(function() {
      $scope.settingsForm();
      $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.passwordChangedAlert);
    });
  }

  /**
    Updates the teacher's email, sends a confirmation email to the user's email and saves changes on the firebase database.
  */
  $scope.updateTeacherEmail = function(email) {
    sessionUser.updateEmail(email).then(function() {
      var teacherEmailRef = firebase.database().ref('teachers/' + sessionUser.uid + '/email');
      teacherEmailRef.set(email);
      $scope.settingsForm();
      $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.emailChangedAlert);
    });
  }




                                        /* FUNCTIONS IN CLASS */

  /**
    Get all the levels from the classroom and saves them in the session.
    Asks firebase for the correspond levels' references
    Defines an event for each level's reference which is triggered every time that database reference is modified.
    The event saves every level in the session.
  */                                      
  $scope.getLevels = function() {
    var classroomLevelsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels');
    var classroomLevelsArray = $firebaseArray(classroomLevelsRef);
    classroomLevelsArray.$loaded(function() {
      $scope.levels = [];
        for (var element in classroomLevelsArray) {
          var classroomLevelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + classroomLevelsArray[element].id);
          classroomLevelRef.on('value', function(snapshot) {
            if (snapshot.val() != null) {
              var change = false;
              var index = -1;
              var level = snapshot.val();

              for (i = 0 ; i < $scope.levels.length ; i++) {
                if ($scope.levels[i].id == level.id) {
                  change = true;
                  index = i;
                  break;
                }
              }

              if (!change) {
                $scope.levels.push(level);
              } else {
                $scope.levels[index] = level
              }
              $scope.levels.sort(sortByLevel);
              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
              }
            }
          });
        }
    });
  }

  /**
    @title: The title for the level that is going to be created.
    @level: The  numeric level for the level that is going to be created.
    @neededPoints: The points needed to reach the level that is going to be created.
    Creates a level and add its reference to the classroom's tree on the firebase database.
  */
  $scope.createLevel = function(title, level, requiredPoints) {
    var newLevel = {
      'title' : title,
      'level' : level,
      'requiredPoints' : requiredPoints,
    }
    var classroomLevelsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels');
    var classroomLevelsArray = $firebaseArray(classroomLevelsRef);
    classroomLevelsArray.$loaded(function() {
      classroomLevelsArray.$add(newLevel).then(function(ref) {
        var id = ref.key;

        var idForLevelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + id + '/id');
        idForLevelRef.set(id);
        newLevel.id = id;

        $scope.getLevels();
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
          $scope.$apply();
        }

        $scope.levels = $scope.levels;
        $scope.closeNewLevelModal();
      });
    });
  }

  /**
    @level: The level that is going to be remove.
    Removes a level and its references in the classroom's tree on firebase database.
  */
  $scope.deleteLevel = function(level) {
    var levelToDeleteRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + level.id);
    levelToDeleteRef.remove();

    $scope.getLevels();

    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
      $scope.$apply();
    }
  }

  /**
    @level: The level that is going to be saved in the session.
    Saves the level selected in the session.
  */
  $scope.setLevel = function(level) {
    $scope.level = level;
    $scope.showEditLevelModal();
  }

  /**
    @title: The new title to set in the level about to be edited.
    @level: The numeric level to set in the level about to be edited.
    @requiredPoints: The required points to set in the level about to be edited.
    Edits the level in the session with the new title, level and required points.
  */
  $scope.editLevel = function(title, level, requiredPoints) {
    if (title != undefined && level != undefined && requiredPoints != undefined) {
      var editLevel = {
        'id' : $scope.level.id,
        'title' : title,
        'level' : level,
        'requiredPoints' : requiredPoints,
      }
      var levelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id);
      levelRef.set(editLevel);
      $scope.levels[$scope.level.id] = editLevel;
    }

    if (title != undefined) {
      var levelTitleRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id + '/title');
      levelTitleRef.set(title);
    }

    if (level != undefined) {
      var levelLevelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id + '/level');
      levelLevelRef.set(level);
    }

    if (requiredPoints != undefined) {
      var levelRequiredPointsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id + '/requiredPoints');
      levelRequiredPointsRef.set(requiredPoints);
    }

    $scope.getLevels();
    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
      $scope.$apply();
    }
    $scope.closeEditLevelModal();
  }

  /**
    Updates the students's classroom's picture with an image uploaded from the local storage and saves it on the firebase storage.
  */
  $scope.updateStudentPicture = function() {
    var downloadURL;
    var fileButton = document.getElementById('inputStudentPicture');
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Profile_Pictures/' + $scope.student.id + '/' + $scope.classroom.id + '/classroomPicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {

          }, function error(error) {
            $ionicLoading.hide();
          }, function complete() {
            downloadURL = task.snapshot.downloadURL;
              
            $scope.student.picture = downloadURL;
            var studentPictureToUpdateRef = firebase.database().ref('students/' + $scope.student.id + '/classrooms/' + $scope.classroom.id + '/picture');
            studentPictureToUpdateRef.set(downloadURL);
            
            $ionicLoading.hide();

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
          });
        } else {
          $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.fileInvalidAlert);
        }
      }
    });
  }

  /**
    Get all the students from the classroom and saves them in the session.
    Asks firebase for the correspond students' references.
    Defines an event for each student's reference which is triggered every time that database reference is modified.
    The event saves every student in the session after decrypt their names and surnames.
  */ 
  $scope.getStudents = function() {
    var classroomStudentsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/students');
    var studentKeys = $firebaseArray(classroomStudentsRef);
    studentKeys.$loaded(function() {
      $scope.students = [];
      for (i = 0 ; i < studentKeys.length ; i++) {
        var studentKey = studentKeys.$keyAt(i);
        var loopStudent = firebase.database().ref('students/' + studentKey);
        loopStudent.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var student = snapshot.val();
            student.name = CryptoJS.AES.decrypt(student.name, student.id).toString(CryptoJS.enc.Utf8);
            student.surname =CryptoJS.AES.decrypt(student.surname, student.id).toString(CryptoJS.enc.Utf8);
            if (student.classrooms != undefined && student.classrooms[$scope.classroom.id] != undefined) {
              student.picture = student.classrooms[$scope.classroom.id].picture;
            }
            for (j = 0 ; j < $scope.students.length ; j++) {
              if ($scope.students[j].id == student.id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.students.push(student);
            } else {
              $scope.students[index] = student
            }
            $scope.students.sort(sortBySurname);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
          }
        });
        $scope.getStudentsForSelection();
      }
    });
  }

  /**
    Copy all the students in another array for selection purposes.
    If the selection purpose is to evaluate students. It is going to copy the students that are in the classroom.
  */
  $scope.getStudentsForSelection = function() {
    $scope.studentsForSelection = [];
    if ($scope.actionsheetClassStudentsType == 'evaluate') {
      for (var element in $scope.students) {
        if ($scope.students[element].classrooms[$scope.classroom.id].inClass) {
          $scope.studentsForSelection.push($scope.students[element]);
        }
      }
      for (var element in $scope.studentsForSelection) {
        $scope.studentsForSelection[element].selected = false;
      }
    } else {
      $scope.studentsForSelection = angular.copy($scope.students);
      for (var element in $scope.studentsForSelection) {
        $scope.studentsForSelection[element].selected = false;
      }
    }
  }

  /**
    @name: The name for the student that is going to be created.
    @surname: The surname for the student that is going to be created.
    Creates a student and add its reference to the classroom's tree on the firebase database.
    Also add the classroom's reference to the new student's tree on the firebase database.
    The new student gets the email auto verified.
  */
  $scope.createNewStudent = function(name, surname) {
    var teacherId = $scope.teacher.$id;
    var a = teacherId.substr(teacherId.length -2).toLowerCase();
    var classroomId = $scope.classroom.id;
    var b = classroomId.substr(classroomId.length -2).toLowerCase();
    var dateTimeHash = Date.now().toString();
    var c = dateTimeHash.substr(dateTimeHash.length -3).toLowerCase();
    var email = (name.replace(/\s/g, '') + surname.replace(/\s/g, '') + '.' + a + b + c + '@student.com').toLowerCase().trim();
    var password = "student";

    if (secondaryConnection == null) {
      var config = {
        apiKey: "AIzaSyBBKqBEuzK2MF9zm4V6u5BoqWWfdtQEF94",
        authDomain: "thelearninggamesproject-99882.firebaseapp.com",
        databaseURL: "https://thelearninggamesproject-99882.firebaseio.com",
        storageBucket: "thelearninggamesproject-99882.appspot.com",
        messagingSenderId: "451254044984",
      };
      secondaryConnection = firebase.initializeApp(config, "Secondary");
    }

    secondaryConnection.auth().createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
      var sessionStudent = secondaryConnection.auth().currentUser;
      if (sessionStudent) {
        //User is signed in.
        sessionStudent.updateProfile({
          displayName : name + ' ' + surname,
          photoURL : $scope.defaultAvatar
        }).then(function() {
          //Update successful.
          var newStudentRef = firebase.database().ref('students/'+sessionStudent.uid);
          newStudentRef.set({
            'id' : sessionStudent.uid,
            'name' : CryptoJS.AES.encrypt(name, sessionStudent.uid).toString(),
            'surname' : CryptoJS.AES.encrypt(surname, sessionStudent.uid).toString(),
            'email' : sessionStudent.email,
            'school' : $scope.teacher.school,
            'avatar' : sessionStudent.photoURL,
            'emailVerified' : true,
          }).then(function() {
            var downloadURL;
            var newClassStudentRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/students/' + sessionStudent.uid);
            newClassStudentRef.set(true);

            //PICTURE PART
            if ($scope.file != undefined || $scope.file != null) {
              $ionicLoading.show();
              var fileExtension = $scope.file.name.split('.').pop().toLowerCase();
              if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
                var storageRef = firebase.storage().ref('Profile_Pictures/' + sessionStudent.uid + '/' + $scope.classroom.id + '/classroomPicture');
                var task = storageRef.put($scope.file);
                task.on('state_changed', function progress(snapshot) {

                }, function error(error) {
                  $ionicLoading.hide();
                }, function complete() {
                  downloadURL = task.snapshot.downloadURL;
                  var newStudentClassRef = firebase.database().ref('students/' + sessionStudent.uid + '/classrooms/' + $scope.classroom.id);
                  newStudentClassRef.set({
                    'id' : $scope.classroom.id,
                    'totalPoints' : 0,
                    'usedPoints' : 0,
                    'inClass' : true,
                    'picture' : downloadURL,
                  });
                  $ionicLoading.hide();

                  if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                    $scope.$apply();
                  }
                });
              } else {
                $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.fileInvalidAlert);
              }
              $scope.file = undefined;
            } else {
              var newStudentClassRef = firebase.database().ref('students/' + sessionStudent.uid + '/classrooms/' + $scope.classroom.id);
              newStudentClassRef.set({
                'id' : $scope.classroom.id,
                'totalPoints' : 0,
                'usedPoints' : 0,
                'inClass' : true,
                'picture' : $scope.defaultAvatar,
              });
            }
            secondaryConnection.auth().signOut();

            $scope.closeModalNewStudentDialog();
            $scope.getStudents();
          });
        });
      }
    }).catch(function(error) {
      if (error) {
        switch (error.code) {
          case "auth/weak-password":
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.weakPasswordAlert);
            break;
          case "auth/email-already-in-use":
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.errorEmailUsedAlert);
            break;
          case "auth/invalid-email":
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.emailInvalidAlert);
            break;
          default:
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.errorUnknowAlert);
        }
      }
    });
  }

  /**
    @student: The student that is going to be remove.
    Removes  the student's references in the classroom's tree on firebase database.
    Also removes the classroom's reference from the student's tree on firebase database.
    Removes the student's reference from all the teams that it could be part of.
    Removes all the classroom's missions' references from the student's tree on firebase database.
    Finally removes the student's classsroom's image from the firebase storage.
  */
  $scope.deleteStudent = function(student) {
    var studentClassRef = firebase.database().ref('students/' + student.id + '/classrooms/' + $scope.classroom.id);
    studentClassRef.remove();

    var classStudentRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/students/' + student.id);
    classStudentRef.remove();

    for (var item in $scope.items) {
      var studentItemToDeleteRef = firebase.database().ref('students/' + student.id + '/items/' + $scope.items[item].id);
      studentItemToDeleteRef.remove();
    }

    for (var team in $scope.teams) {
      var teamStudentsToDeleteRef = firebase.database().ref('teams/' + $scope.teams[team].id + '/students/' + student.id);
      teamStudentsToDeleteRef.remove();

      var studentTeamsToDeleteRef = firebase.database().ref('students/' + student.id + '/teams/' + $scope.teams[team].id);
      studentTeamsToDeleteRef.remove();
    }

    for (var mission in $scope.missions) {
      var studentMissionsToDeleteRef = firebase.database().ref('students/' + student.id + '/missions/' + $scope.missions[mission].id);
      studentMissionsToDeleteRef.remove();
    }

    var imagesRef = firebase.storage().ref().child('Profile_Pictures/' + student.id + '/' + $scope.classroom.id + '/classroomPicture');
    imagesRef.delete().then(function() {
    }).catch(function(error) {
    });
  }

  /**
    @student: The student that is going to be saved in the session.
    Saves the student selected in the session.
    Also gets all the students items and his classroom's level.
  */
  $scope.setStudent = function(student) {
    $scope.student = student;
    $scope.studentHasItems = false;
    for (var levelId in $scope.classroom.levels) {
      if (student.classrooms[$scope.classroom.id].totalPoints >= $scope.classroom.levels[levelId].requiredPoints) {
        $scope.student.level = $scope.classroom.levels[levelId];
      }
    }
    $scope.studentItems = [];
    for (var itemId in student.items) {
      for (i = 0 ; i < $scope.items.length ; i++) {
        if (student.items[itemId].id == $scope.items[i].id) {
          $scope.studentHasItems = true;
          if ($scope.items[i].achievements != undefined) {
            $scope.studentItems.push({
              'id' : student.items[itemId].id,
              'points' : student.items[itemId].points,
              'name' : $scope.items[i].name,
              'score' : $scope.items[i].score,
              'maxScore' : $scope.items[i].maxScore,
              'useForLevel' : $scope.items[i].useForLevel,
              'achievements' : $scope.items[i].achievements,
            });
          } else {
            $scope.studentItems.push({
              'id' : student.items[itemId].id,
              'points' : student.items[itemId].points,
              'name' : $scope.items[i].name,
              'score' : $scope.items[i].score,
              'maxScore' : $scope.items[i].maxScore,
              'useForLevel' : $scope.items[i].useForLevel,
            });
          }
        }
      }
    }
    $scope.showModalStudentDialog();
  }

  /**
    @studentsView: True or false.
    Determinates if the photo that is shown from the studnet's is going to be either their avatar or their classroom's pictures.
  */
  $scope.setStudentsView = function (studentsView) {
    if(studentsView == undefined) {
      studentsView = false;
    }
    var classStudentsViewRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/studentsView');
    classStudentsViewRef.set(studentsView);
    $scope.classroom.studentsView = studentsView;
  }

  /**
    @notification: True or false.
    Sets the notifications for the classroom.
  */
  $scope.setNotifications = function(notification) {
    if (notification == undefined) {
      notification = false;
    }
    var classNotificationsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/notifications');
    classNotificationsRef.set(notification);
    $scope.classroom.notifications = notification;
  }

  /**
    @opening: True or false.
    Sets the opening for the classroom. If true the students can join to the classroom by its hashcode.
  */
  $scope.setOpening = function(opening) {
    if (opening == undefined) {
      opening = false;
    }
    var classOpeningRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/open');
    classOpeningRef.set(opening);
    $scope.classroom.open = opening;
  }

  /**
    Adds the student to a team.
    Copies the student to another class.
  */
  $scope.secondaryMenuSelection = function() {
    var teamIndex = document.getElementById("selectTeam").selectedIndex;
    var classroomIndex = document.getElementById("selectCopy").selectedIndex;

    var team = $scope.teams[teamIndex - 1];
    var classroom = $scope.classrooms[classroomIndex - 1];

    if (team != undefined && classroom != undefined) {
      $scope.addStudentToTeam(team, $scope.student);
      $scope.copyStudentToClass(classroom, $scope.student);
    } else {
      if (team != undefined) {
        $scope.addStudentToTeam(team, $scope.student);
      }

      if (classroom != undefined) {
        $scope.copyStudentToClass(classroom, $scope.student);
      }
    }
    $scope.closeModalSecondary();
  }

  /**
    @team: The team where the student is going to be added.
    @student: The student that is going to be added in a team.
    Adds the student's reference to the team's tree on the firebase database.
    Also add the team's refence to the student's tree on the firebase database.
  */
  $scope.addStudentToTeam = function(team, student) {
    var studentTeamsRef = firebase.database().ref('students/' + student.id + '/teams/' + team.id);
    studentTeamsRef.set(true);

    var teamStudentsRef = firebase.database().ref('teams/' + team.id + '/students/' + student.id);
    teamStudentsRef.set(true);
  }

  /**
    @classroom: The classsroom whre the student is going to be copied.
    @student: The student that is going to be added in a classroom.
    Adds the student's reference to the classroom's tree on the firebase database.
    Also add the classroom's reference to the student's tree on the firebase database.
  */
  $scope.copyStudentToClass = function(classroom, student) {
    var classStudentRef = firebase.database().ref('classrooms/' + classroom.id + '/students/' + student.id);
    classStudentRef.set(true);

    var studentClassRef = firebase.database().ref('students/' + student.id + '/classrooms/' + classroom.id);
    studentClassRef.set({
      'id' : classroom.id,
      'totalPoints' : 0,
      'inClass' : true,
      'picture' : $scope.defaultAvatar,
    });
  }

  /**
    Gets all the selected students in the modal and then calls the correspond method depending on the var created when choose an option in the action sheet.
  */
  $scope.selectStudents = function() {
    $scope.closeSelectStudentsModal();
    $scope.closeAttendanceModal();
    if ($scope.actionsheetClassStudentsType === 'delete') {
      for (var element in $scope.studentsForSelection) {
        if ($scope.studentsForSelection[element].selected === true) {
          $scope.deleteStudent($scope.studentsForSelection[element]);
        }
      }
      $scope.getStudents();
    } else if ($scope.actionsheetClassStudentsType === 'evaluate') {
      $scope.studentsToEvaluate = [];
      for (var element in $scope.studentsForSelection) {
        if ($scope.studentsForSelection[element].selected === true) {
          $scope.studentsToEvaluate.push($scope.studentsForSelection[element]);
        }
      }
      $scope.actionSheetItemsType = 'evaluateStudents';
      $scope.showSelectItemsModal();
    } else if ($scope.actionsheetClassStudentsType === 'attendance') {
      for (var element in $scope.students) {
        $scope.editStudentsAttendance($scope.students[element]);
      }
    } else if ($scope.actionsheetClassStudentsType === 'newMissionCreation') {
      $scope.actionSheetRewardsType = 'newMissionCreation';
      $scope.newMission.students = $scope.studentsForSelection;
      $scope.showSelectRewardsModal();
    }
  }

  /**
    @message: The message that is going to be send.
    Gets all the selected students in the modal and then calls the correspond method to send a message for each student.
  */
  $scope.selectStudentsForMessage = function(message) {
    $scope.closeSelectStudentsModal();
    for (var element in $scope.studentsForSelection) {
      if ($scope.studentsForSelection[element].selected === true) {
        $scope.sendMessageStudents($scope.studentsForSelection[element].id, message);
      }
    }
  }

  /**
    @studentId: The id of the student that is goin to recieve the message.
    @message: The message that is going to be send to the student
    Sends a message to the correspond student with the same studnetId.
    Adds the notification info in student's tree on firebase database.
  */
  $scope.sendMessageStudents = function(studentId, message) {
    var studentNotificationsRef = firebase.database().ref('students/' + studentId + '/notifications/' + $scope.classroom.id);
    var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
    studentNoticationsArray.$loaded(function() {
      studentNoticationsArray.$add({
        'type' : $scope.teacherMessageNotificationType,
        'message' : message,
        'date' : Date.now(),
      });
    });
  }
  
  /**
    @student: The student selected.
    Checks if the selected student it was already selected or not.
    Also detects if there is anyone selected, and then enables the select button.
  */
  $scope.changeSelectedStudent = function(student) {
    if (student.selected === false) {
      student.selected = true;
    } else {
      student.selected = false;
    }
    $scope.enableSelectButton = false;
    for (var element in $scope.studentsForSelection) {
      if ($scope.studentsForSelection[element].selected) {
        $scope.enableSelectButton = true;
        break;
      }
    }
  }

  /**
    @student: The student that si going to be checked in class.
    Checks the attendance of one student in the classroom.
  */
  $scope.inClass = function(student) {
    if (student.classrooms[$scope.classroom.id].inClass === true) {
      student.classrooms[$scope.classroom.id].inClass = false;
    } else {
      student.classrooms[$scope.classroom.id].inClass = true;
    }
  }

  /**
    @student: The student that is going to change its attendance.
    Edits the students attendance in the classroom.
  */
  $scope.editStudentsAttendance = function(student) {
    var studentAttendanceRef = firebase.database().ref('students/' + student.id + '/classrooms/' + $scope.classroom.id + '/inClass');
    studentAttendanceRef.set(student.classrooms[$scope.classroom.id].inClass);
  }

  /**
    Picks a random student from all in the classroom.
  */
  $scope.getRandomStudent = function() {
    var randomStudent = Math.trunc(Math.random()*$scope.students.length);

    $scope.popupAlertCreate($scope.randomStudentActionSheetOption, $scope.students[randomStudent].name + ' ' + $scope.students[randomStudent].surname);
  }
  
  


                                        /* FUNCTIONS IN ITEMS */

  /**
    Get all the items from the classroom and saves them in the session.
    Asks firebase for the correspond items' references.
    Defines an event for each item's reference which is triggered every time that database reference is modified.
    The event saves every item in the session.
  */
  $scope.getItems = function() {
    var classroomItemsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/items');
    var itemKeys = $firebaseArray(classroomItemsRef);
    itemKeys.$loaded(function() {
      $scope.items = [];
      for (i = 0 ; i < itemKeys.length ; i++) {
        var itemKey = itemKeys.$keyAt(i);
        var loopItem = firebase.database().ref('items/' + itemKey);
        loopItem.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var item = snapshot.val();
            for (j = 0 ; j < $scope.items.length ; j++) {
              if (item.id == $scope.items[j].id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.items.push(item);  
            } else {
              $scope.items[index] = item;
            }
            $scope.items.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getItemsForSelection();
          }
        });
      }
    });
  }

  /**
    Copy all the items in another array for selection purposes.
  */
  $scope.getItemsForSelection = function() {
    $scope.itemsForSelection = angular.copy($scope.items);
    for (var element in $scope.itemsForSelection) {
      $scope.itemsForSelection[element].selected = false;
    }
  }

  /**
    @name: The name for the item that is going to be create.
    @description: A description for the item that is going to be created.
    @score: Default score for the item.
    @maxScore: Max score for the item.
    @useForLevel: True or false. If the points achieved in the item either adds to the classroom's level or not.
    Creates an item and add its reference to the classroom's tree on the firebase database.
  */
  $scope.createItem = function (name, description, score, maxScore, useForLevel) {
    if (useForLevel == undefined) {
      useForLevel = false;
    }
    if (maxScore == undefined || maxScore === 0) {
      maxScore = '∞';
    }
    var itemsNode = $firebaseArray(itemsRef);
    itemsNode.$loaded(function() {
      itemsNode.$add({
        'name' : name,
        'description' : description,
        'score' : score,
        'maxScore' : maxScore,
        'useForLevel' : useForLevel
      }).then(function(ref) {
        var id = ref.key;

        var idForItemRef = firebase.database().ref('items/' + id + '/id');
        idForItemRef.set(id);

        var classroomRef = firebase.database().ref('classrooms/' + $scope.classroom.id  + '/items/' + id);
        classroomRef.set(true);

        $scope.closeModalNewItem();
        $scope.getItems();
      });  
    });
  }

  /**
    @item: The item that is going to be remove.
    Removes  the item's references on firebase database.
    Then removes  the item's references in the classroom's tree on firebase database.
    Also removes the item's reference from the students that unlocked it tree on firebase database.
    Removes the item's reference from the classroom's missions tree on the firebase database.
    Finally removes all the achievements that depend on the item and theirs pictures from firebase storage.
  */
  $scope.deleteItem = function(item) {
    var itemRef = firebase.database().ref('items/' + item.id);
    itemRef.remove();

    var classItemRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/items/' + item.id);
    classItemRef.remove();

    for (var student in $scope.students) {
      var studentItemsToDeleteRef = firebase.database().ref('students/' + $scope.students[student].id + '/items/' + item.id);
      studentItemsToDeleteRef.remove();
    }

    for (var mission in $scope.missions) {
      var missionItemToDeleteRef = firebase.database().ref('missions/' + $scope.missions[mission].id + '/items/' + item.id);
      missionItemToDeleteRef.remove();
    }
    
    for (var achievementId in item.achievements) {
      var itemAchievementsToDeleteRef = firebase.database().ref('achievements/' + achievementId);
      itemAchievementsToDeleteRef.remove();

      var imagesRef = firebase.storage().ref().child('Achievement_Pictures/' + achievementId + '/achievementPicture');
      imagesRef.delete().then(function() {
      }).catch(function(error) {
      });
    }

    $scope.getItems();
  }

  /**
    @item: The item that is going to be saved in the session.
    Saves the item selected in the session.
    Also gets all the item's achievements.
  */
  $scope.setItem = function(item) {
    $scope.item = item;
    $scope.getAchievements();
    $scope.itemsForm();
  }

  /**
    @name: The new name for the item that is going to be edited.
    @description: A new description for the item that is going to be edited.
    @score: New default score for the item.
    @maxScore: New max score for the item.
    @useForLevel: True or false. If the points achieved in the item either adds to the classroom's level or not.
    Edits the item saved in the session with the new data.
  */
  $scope.editItem = function(name, description, score, maxScore, useForLevel) {
    if (name != undefined && description != undefined && score != undefined && maxScore != undefined) {
      var itemRef = firebase.database().ref('items/' + $scope.item.id);
      if (useForLevel != $scope.item.useForLevel && useForLevel != undefined) {
        var itemUse = useForLevel
      } else {
        var itemUse = $scope.item.useForLevel
      }
      var itemEdit = {
        'id' : $scope.item.id,
        'name' : name,
        'description' : description,
        'score' : score,
        'maxScore' : maxScore,
        'useForLevel' : itemUse,
      };
      itemRef.set(itemEdit);
    } else {
      if (name != undefined) {
        var itemNameRef = firebase.database().ref('items/' + $scope.item.id + '/name');
        itemNameRef.set(name);
      }

      if (description != undefined) {
        var itemDescriptionRef = firebase.database().ref('items/' + $scope.item.id + '/description');
        itemDescriptionRef.set(description);
      }

      if (score != undefined) {
        var itemScoreRef = firebase.database().ref('items/' + $scope.item.id + '/score');
        itemScoreRef.set(score);
      }

      if (maxScore != undefined) {
        var itemMaxScoreRef = firebase.database().ref('items/' + $scope.item.id + '/maxScore');
        itemMaxScoreRef.set(maxScore);
      }

      if (useForLevel != $scope.item.useForLevel && useForLevel != undefined) {
        var itemUseLevelRef = firebase.database().ref('items/' + $scope.item.id + '/useForLevel');
        itemUseLevelRef.set(useForLevel);
      }
    }
    $scope.rulesForm();
  }

  /**
    @item: The item to evaluate.
    Evaluates students from another array with the item choosed.
    Checks if the students already have items or not. Also if the student already had this item, and if the student unlocks either an achievement, a mission or both.
    Plus the item score with the student points if the item has the useForLevel atributte set in true.
  */
  $scope.evaluateStudents = function(item) {
    for (var pos in $scope.studentsToEvaluate) {
      if ($scope.studentsToEvaluate[pos].items != undefined) {
        var studentItems = $scope.studentsToEvaluate[pos].items;
        var studentItemRef = firebase.database().ref('students/' + $scope.studentsToEvaluate[pos].id + '/items/' + item.id);
        if (!(item.id in studentItems)) {
          studentItemRef.set({
            'id' : item.id,
            'points' : item.score,
          });
		      $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'win');
          $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], item.score);
          $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);

        } else {
          var studentPoints = $scope.studentsToEvaluate[pos].items[item.id].points;
          if ((Number(studentPoints) + Number(item.score)) > Number(item.maxScore)) {
            studentItemRef.set({
              'id' : item.id,
              'points' : item.maxScore,
            });
            $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'win');
            $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], item.maxScore);
            $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);
            $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.notificationOfStudent + ': ' + $scope.studentsToEvaluate[pos].name + ' ' + $scope.studentsToEvaluate[pos].surname + ' ' + $scope.hasRecibedMaxPointsItemAlert + ': ' + item.name + ', ' + $scope.maxPointsHasBeenEstablishedAlert);
          } else {
            studentItemRef.set({
              'id' : item.id,
              'points' : Number(studentPoints) + Number(item.score),
            });
      			if (Math.sign(item.score) == -1) {
      			  $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'lose');
      			} else {
      			  $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'win');
      			}
            $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], (Number(studentPoints) + Number(item.score)));
            $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);
            if ((Number(studentPoints) + Number(item.score)) < 0) {
              studentItemRef.set({
                'id' : item.id,
                'points' : 0,
              });
              $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'lose');
              $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], 0);
              $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.notificationOfStudent + ': ' + $scope.studentsToEvaluate[pos].name + ' ' + $scope.studentsToEvaluate[pos].surname + ' ' + $scope.hasLostMinPointItemAlert + ': ' + item.name + ', ' + $scope.zeroPointEstablishedAlert);
            }
          }
        }   
      } else {
        var studentItemRef = firebase.database().ref('students/' + $scope.studentsToEvaluate[pos].id + '/items/' + item.id);
        studentItemRef.set({
          'id' : item.id,
          'points' : item.score,
        });
        $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'win');
        $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], item.score);
        $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);
      }
      if (item.useForLevel) {
        var pointsAdded = Number($scope.studentsToEvaluate[pos].classrooms[$scope.classroom.id].totalPoints) + Number(item.score);
        var studentClassroomTotalPointsRef = firebase.database().ref('students/' + $scope.studentsToEvaluate[pos].id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
        if (pointsAdded < 0) {
          studentClassroomTotalPointsRef.set(0);
        } else {
          studentClassroomTotalPointsRef.set(pointsAdded);  
        }
      }     
    }
    $scope.getNotifications();
  }

  /**
    @item: The item to evaluate.
    Evaluates teams from another array with the item choosed.
    Checks if the team's students already have items or not. Also if the team's student already had this item, and if the team's student unlocks either an achievement, a mission or both.
    Plus the item score with the tem's student points if the item has the useForLevel atributte set in true.
  */
  $scope.evaluateTeams = function(item) {
    for (var pos in $scope.teamsToEvaluate) {
      for (var studentId in $scope.teamsToEvaluate[pos].students) {
        for (var studentPos in $scope.students) {
          if ($scope.students[studentPos].id == studentId) {
            if ($scope.students[studentPos].items != undefined) {
              var studentItems = $scope.students[studentPos].items;
              var studentItemRef = firebase.database().ref('students/' + $scope.students[studentPos].id + '/items/' + item.id);
              if (!(item.id in studentItems)) {
                studentItemRef.set({
                  'id' : item.id,
                  'points' : item.score,
                });
                $scope.createNotificationItems($scope.students[studentPos].id, item, 'win');
                $scope.checkAchievements(item, $scope.students[studentPos], item.score);
                $scope.checkMissions(item, $scope.students[studentPos], item.score);
              } else {
                var studentPoints = $scope.students[studentPos].items[item.id].points;
                if ((Number(studentPoints) - Number(item.score)) > Number(item.maxScore)) {
                  studentItemRef.set({
                    'id' : item.id,
                    'points' : item.maxScore,
                  });
                  $scope.createNotificationItems($scope.students[studentPos].id, item, 'win');
                  $scope.checkAchievements(item, $scope.students[studentPos], item.maxScore);
                  $scope.checkMissions(item, $scope.students[studentPos], item.score);
                  $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.notificationOfStudent + ': ' + $scope.students[studentPos].name + ' ' + $scope.students[studentPos].surname  + ' ' + $scope.hasRecibedMaxPointsItemAlert + ': ' + item.name + ', ' + $scope.maxPointsHasBeenEstablishedAlert);
                } else {
                  studentItemRef.set({
                    'id' : item.id,
                    'points' : Number(studentPoints) + Number(item.score),
                  });
        				  if (Math.sign(item.score) == -1) { 
                    $scope.createNotificationItems($scope.students[studentPos].id, item, 'lose');
        				  } else {
                    $scope.createNotificationItems($scope.students[studentPos].id, item, 'win');
        				  }
                  $scope.checkAchievements(item, $scope.students[studentPos], (Number(studentPoints) + Number(item.score)));
                  $scope.checkMissions(item, $scope.students[studentPos], item.score);
                  if ((Number(studentPoints) + Number(item.score)) < 0) {
                    studentItemRef.set({
                      'id' : item.id,
                      'points' : 0,
                    });
                    $scope.createNotificationItems($scope.students[studentPos].id, item, 'lose');
                    $scope.checkAchievements(item, $scope.students[studentPos], 0);
                    $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.notificationOfStudent + ': ' + $scope.students[studentPos].name + ' ' + $scope.students[studentPos].surname + ' ' + $scope.hasLostMinPointItemAlert + ': ' + item.name + ', ' + $scope.zeroPointEstablishedAlert);
                  }
                }
              }
            } else {
              var studentItemRef = firebase.database().ref('students/' + $scope.students[studentPos].id + '/items/' + item.id);
              studentItemRef.set({
                'id' : item.id,
                'points' : item.score,
              });
              $scope.createNotificationItems($scope.students[studentPos].id, item, 'win');
              $scope.checkAchievements(item, $scope.students[studentPos], item.score);
              $scope.checkMissions(item, $scope.students[studentPos], item.score);
            }

            if (item.useForLevel) {
              var pointsAdded = Number($scope.students[studentPos].classrooms[$scope.classroom.id].totalPoints) + Number(item.score);
              var studentClassroomTotalPointsRef = firebase.database().ref('students/' + $scope.students[studentPos].id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
              if (pointsAdded < 0) {
                studentClassroomTotalPointsRef.set(0);
              } else {
                studentClassroomTotalPointsRef.set(pointsAdded);
              }
            }  
          }
        }
      }
    }
    $scope.getNotifications();
  }

  /**
    Gets all the selected items in the modal and then calls the correspond method depending on the var created when choose an option in the action sheet.
  */
  $scope.selectItems = function() {
    $scope.closeSelectItemsModal();
    if ($scope.actionSheetItemsType === 'delete') {
      for (var element in $scope.itemsForSelection) {
        if ($scope.itemsForSelection[element].selected === true) {
          $scope.deleteItem($scope.itemsForSelection[element]);
        }
      }
    } else if ($scope.actionSheetItemsType === 'evaluateStudents') {
      for (var element in $scope.itemsForSelection) {
        if ($scope.itemsForSelection[element].selected === true) {
          $scope.evaluateStudents($scope.itemsForSelection[element]);    
        }
      }
      $scope.getStudents();
    } else if ($scope.actionSheetItemsType === 'evaluateTeams') {
      for (var element in $scope.itemsForSelection) {
        if ($scope.itemsForSelection[element].selected === true) {
          $scope.evaluateTeams($scope.itemsForSelection[element]);
        }
      }
      $scope.getStudents();
      $scope.getTeams();
    } else if ($scope.actionSheetItemsType === 'newMissionCreation') {
      $scope.actionsheetClassStudentsType = 'newMissionCreation';
      $scope.newMission.items = $scope.itemsForSelection;
      $scope.showSelectStudentsModal();
    }
  }

  /**
    @item: The item selected.
    Checks if the selected item it was already selected or not.
    Then if the selection purpose is to evaluate or create a mission a popup appears to ask the item's score.
    Also detects if there is anyone selected, and then enables the select button.
  */
  $scope.changeSelectedItem = function(item) {
      if (item.selected === false) {
        item.selected = true;
        if ($scope.actionSheetItemsType === 'evaluateStudents' || $scope.actionSheetItemsType === 'evaluateTeams' || $scope.actionSheetItemsType == 'newMissionCreation') { 
        $scope.points = item.score;
        $scope.popupChooseScore = $ionicPopup.show({
          title: $scope.editScoreText,
          template: '<input id="inputScore" type="number" ng-model="points">',
          scope: $scope,
          buttons: [
            {
              text: $scope.cancelText,
              onTap: function() {
                item.selected = false;
                $scope.enableSelectButton = false;
                for (var element in $scope.itemsForSelection) {
                  if ($scope.itemsForSelection[element].selected) {
                    $scope.enableSelectButton = true;
                    break;
                  }
                }
              }
            },
            { text: $scope.useDefaultPoints,
              type: 'button-positive',
            },
            {
              text: $scope.changeScore,
              type: 'button-positive',
              onTap: function(e) {
                var actualScore = document.getElementById("inputScore").value;
                if (actualScore > item.maxScore) {
                  e.preventDefault();
                } else if (-(actualScore) > item.maxScore) {
                  e.preventDefault();
                } else {
                  item.score = actualScore;
                }
              }
            }
          ]
        });
      }
    } else {
      item.selected = false;
    }
    $scope.enableSelectButton = false;
    for (var element in $scope.itemsForSelection) {
      if ($scope.itemsForSelection[element].selected) {
        $scope.enableSelectButton = true;
        break;
      }
    }
  }

  /**
    @item: The item that is going to remove its score from the student points
    Removes points from the student's actual score in the item and then, if the item is used for level, also removes the same quantity of points from the student's actual classroom points.
  */
  $scope.removePoints = function(item) {
    var studentItemPointsToRemoveRef = firebase.database().ref('students/' + $scope.student.id + '/items/' + item.id + '/points');
    var studentClassPointsToRemoveRef = firebase.database().ref('students/' + $scope.student.id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
    if ((Number($scope.student.items[item.id].points) - 1) < 0) {
      $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.studentDoesNotHaveEnougPointsAlert + ', ' + $scope.zeroPointsWillEstablishAlert);
      studentItemPointsToRemoveRef.set(0);
      $scope.student.items[item.id].points = 0;
      $scope.createNotificationItems($scope.student.id, item, 'lose');
      $scope.checkAchievements(item, $scope.student, 0);
    } else {
      studentItemPointsToRemoveRef.set((Number($scope.student.items[item.id].points) - 1));
      $scope.student.items[item.id].points = (Number($scope.student.items[item.id].points) - 1);
      $scope.createNotificationItems($scope.student.id, item, 'lose');
      $scope.checkAchievements(item, $scope.student, Number($scope.student.items[item.id].points));
    }

    item.points = $scope.student.items[item.id].points;

    if (item.useForLevel) {
      if (($scope.student.classrooms[$scope.classroom.id].totalPoints - 1) < 0) {
        studentClassPointsToRemoveRef.set(0);
        $scope.student.classrooms[$scope.classroom.id].totalPoints = 0;
      } else {
        studentClassPointsToRemoveRef.set($scope.student.classrooms[$scope.classroom.id].totalPoints - 1); 
        $scope.student.classrooms[$scope.classroom.id].totalPoints = Number($scope.student.classrooms[$scope.classroom.id].totalPoints) - 1;
      }
    }
  }

  /**
    @item: The item that is going to add its score to the student points
    Adds points to the student's actual score in the item and then, if the item is used for level, also adds the same quantity of points to the student's actual classroom points.
  */
  $scope.addPoints = function(item) {
    var studentItemPointsToAddRef = firebase.database().ref('students/' + $scope.student.id + '/items/' + item.id + '/points');
    var studentClassPointsToAddRef = firebase.database().ref('students/' + $scope.student.id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
    if ((Number($scope.student.items[item.id].points) + 1) > item.maxScore) {
      $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.studentDoesNotHaveEnougPointsAlert + ', ' + $scope.maxPointsWillEstablishAlert);
      studentItemPointsToAddRef.set(item.maxScore);
      $scope.student.items[item.id].points = item.maxScore;
      $scope.createNotificationItems($scope.student.id, item, 'win');
      $scope.checkAchievements(item, $scope.student, item.maxScore);
      for (var element in $scope.items) {
        if ($scope.items[element].id == item.id) {
          $scope.checkMissions($scope.items[element], $scope.student, 1);
        }
      }
    } else {
      studentItemPointsToAddRef.set((Number($scope.student.items[item.id].points) + 1));
      $scope.student.items[item.id].points = (Number($scope.student.items[item.id].points) + 1);
      $scope.createNotificationItems($scope.student.id, item, 'win');
      $scope.checkAchievements(item, $scope.student, Number($scope.student.items[item.id].points));
      for (var element in $scope.items) {
        if ($scope.items[element].id == item.id) {
          $scope.checkMissions($scope.items[element], $scope.student, 1);
        }
      }
      $scope.checkMissions(item, $scope.student, 1);
    }

    item.points = $scope.student.items[item.id].points;

    if (item.useForLevel) {
      studentClassPointsToAddRef.set($scope.student.classrooms[$scope.classroom.id].totalPoints + 1);
      $scope.student.classrooms[$scope.classroom.id].totalPoints = $scope.student.classrooms[$scope.classroom.id].totalPoints + 1;
    }
  }

  
  

                                        /* FUNCTIONS IN ACHIEVEMENTS */

  /**
    Updates the achievement's picture with an image uploaded from the local storage and saves it on the firebase storage.
  */
  $scope.updateAchievementPicture = function() {
    var downloadURL;
    var fileButton = document.getElementById('inputAchievementPicture');
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Achievement_Pictures/' + $scope.achievement.id + '/achievementPicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {

          }, function error(error) {
            $ionicLoading.hide();
          }, function complete() {
            downloadURL = task.snapshot.downloadURL;
              
            $scope.achievement.badge = downloadURL;
            var achievementPictureToUpdateRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/badge/');
            achievementPictureToUpdateRef.set(downloadURL);
            
            $ionicLoading.hide();

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
          });
        } else {
          $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.fileInvalidAlert);
        }
      }
    });
  }

  /**
    Get all the achievements from the item in session and saves them in the session.
    Asks firebase for the correspond achievements' references.
    Defines an event for each achievement's reference which is triggered every time that database reference is modified.
    The event saves every achievement in the session.
  */
  $scope.getAchievements = function() {
    var itemAchievementsRef = firebase.database().ref('items/' + $scope.item.id + '/achievements');
    var achievementKeys = $firebaseArray(itemAchievementsRef);
    achievementKeys.$loaded(function() {
      $scope.achievements = [];
      for (i = 0 ; i < achievementKeys.length ; i++) {
        var achievementKey = achievementKeys.$keyAt(i);
        var loopAchievement = firebase.database().ref('achievements/' + achievementKey);
        loopAchievement.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var achievement = snapshot.val();
            for (j = 0 ; j < $scope.achievements.length ; j++) {
              if (achievement.id == $scope.achievements[j].id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.achievements.push(achievement);
            } else {
              $scope.achievements[index] = achievement;
            }
            $scope.achievements.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getAchievementsForSelection();
          }
        });
      }
    });
  }

  /**
    Copy all the achievements in another array for selection purposes.
  */
  $scope.getAchievementsForSelection = function() {
    $scope.achievementsForSelection = angular.copy($scope.achievements);
    for (var element in $scope.achievementsForSelection) {
      $scope.achievementsForSelection[element].selected = false;
    }
  }

  /**
    Jumps forward in the images' gallery for the new achievement creation
  */
  $scope.galeryForward = function(){
    var pos = $scope.achievementGalery.indexOf($scope.defaultAchievementAvatar);
    if(pos == -1){
      $scope.defaultAchievementAvatar = $scope.achievementGalery[0];
    }
    else if(pos != -1 && pos < $scope.achievementGalery.length-1){
      $scope.defaultAchievementAvatar = $scope.achievementGalery[pos+1];
    }
    else {
      $scope.defaultAchievementAvatar = $scope.achievementGalery[0];
    }
  }

  /**
    Jumps back in the images' gallery for the new achievement creation
  */
  $scope.galeryBack = function(){
    var pos = $scope.achievementGalery.indexOf($scope.defaultAchievementAvatar);
    if(pos == -1){
      $scope.defaultAchievementAvatar = $scope.achievementGalery[$scope.achievementGalery.length-1];
    }
    else if(pos != -1 && pos > 0){
      $scope.defaultAchievementAvatar = $scope.achievementGalery[pos-1];
    }
    else {
      $scope.defaultAchievementAvatar = $scope.achievementGalery[$scope.achievementGalery.length-1];
    }
  }
  
  /**
    @name: The name for the achievement that is going to be create.
    @description: A description for the achievement that is going to be created.
    @requirements: The required point in the session item to unlock the achievement.
    @maxLevel: Max level for the achievement.
    Creates an achievement and add its reference to the session item's tree on the firebase database.
  */
  $scope.createAchievement = function(name, description, requirements, maxLevel) {
    if (requirements > $scope.item.maxScore) {
      $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.cantAskMoreScoreAlert);
    } else {
      var achievementsNode = $firebaseArray(achievementsRef);
      achievementsNode.$loaded(function() {
        achievementsNode.$add({
          'name' : name,
          'description' : description,
          'requirements' : requirements,
          'maxLevel' : maxLevel,
          'badge' : '',
        }).then(function(ref) {
          var downloadURL;
          var id = ref.key;

          var idForAchievementRef = firebase.database().ref('achievements/' + id + '/id');
          idForAchievementRef.set(id);

          var itemsAchievementsRef = firebase.database().ref('items/' + $scope.item.id + '/achievements/' + id);
          itemsAchievementsRef.set(true);

          //PICTURE PART
          if ($scope.file != undefined || $scope.file != null) {
            $ionicLoading.show();
            var fileExtension = $scope.file.name.split('.').pop().toLowerCase();
            if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
              var storageRef = firebase.storage().ref('Achievement_Pictures/' + id + '/achievementPicture');
              var task = storageRef.put($scope.file);
              task.on('state_changed', function progress(snapshot) {

              }, function error(error) {
                $ionicLoading.hide();
              }, function complete() {
                downloadURL = task.snapshot.downloadURL;
                var achievementBadgeRef = firebase.database().ref('achievements/' + id + '/badge');
                achievementBadgeRef.set(downloadURL);
                $ionicLoading.hide();

                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                  $scope.$apply();
                }
              });
            } else {
              $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.fileInvalidAlert);
            }
            $scope.file = undefined;
          } else {
            var achievementBadgeRef = firebase.database().ref('achievements/' + id + '/badge');
            achievementBadgeRef.set($scope.defaultAchievementAvatar);
          }
          $ionicLoading.hide();

          $scope.closeModalNewAchievement();
          $scope.getAchievements();
        });  
      });
    }
  }

  /**
    @achievement: The achievement that is going to be remove.
    Removes  the achievement's references on firebase database.
    Then removes  the achievement's references in the session item's tree on firebase database.
    Also removes the achievement's picture from the firebase storage.
    Finally removes the achievement's referecne from the students that unlocked it on the firebase database
  */
  $scope.deleteAchievement = function(achievement) {
    var itemAchievementRef = firebase.database().ref('items/' + $scope.item.id + '/achievements/' + achievement.id);
    itemAchievementRef.remove();

    var achievementToDeleteRef = firebase.database().ref('achievements/' + achievement.id);
    achievementToDeleteRef.remove();

    var imagesRef = firebase.storage().ref().child('Achievement_Pictures/' + achievement.id + '/achievementPicture');
    imagesRef.delete().then(function() {
    }).catch(function(error) {
    });

    for (var student in $scope.students) {
      if ($scope.students[student].items != undefined && $scope.students[student].items[$scope.item.id] != undefined 
        && $scope.students[student].items[$scope.item.id].achievements != undefined) {
        var studentAchievementToDeleteRef = firebase.database().ref('students/' + $scope.students[student].id + '/items/' + $scope.item.id + '/achievements/' + achievement.id);
        studentAchievementToDeleteRef.remove();
      }
    }
    $scope.getAchievements();
  }

  /**
    @achievement: The achievement that is going to be saved in the session.
    Saves the achievement selected in the session.
  */
  $scope.setAchievement = function(achievement) {
    $scope.achievement = achievement;
    $scope.achievementsForm();
  }

  /**
    @name: The new name for the achievement that is going to be edited.
    @description: A new description for the achievement that is going to be edited.
    @requirements: The new required points in the session item to unlock the achievement.
    @maxLevel: Max level for the achievement.
    Edits the achievement saved in the session with the new data.
  */
  $scope.editAchievement = function(name, description, requirements, maxLevel) {
    if (name != undefined && description != undefined && requirements != undefined && maxLevel != undefined) {
      var achievementRef = firebase.database().ref('achievements/' + $scope.achievement.id);
      var achievementEdit = {
        'id' : $scope.achievement.id,
        'name' : name,
        'description' : description,
        'requirements' : requirements,
        'maxLevel' : maxLevel,
        'badge' : $scope.achievement.badge,
      };
      achievementRef.set(achievementEdit);
    } else {
      if (name != undefined) {
        var achievementNameRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/name');
        achievementNameRef.set(name);
      }

      if (description != undefined) {
        var achievementDescriptionRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/description');
        achievementDescriptionRef.set(description);
      }

      if (requirements != undefined) {
        var achievementRequirementsRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/requirements');
        achievementRequirementsRef.set(requirements);
      }

      if (maxLevel != undefined) {
        var achievementMaxLevelRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/maxLevel');
        achievementMaxLevelRef.set(maxLevel);
      }
    }
    $scope.itemsForm();
  }

  /**
    Gets all the selected achievements in the modal and then calls the correspond method depending on the var created when choose an option in the action sheet.
  */
  $scope.selectAchievements = function() {
    $scope.closeSelectAchievementsModal();
    if ($scope.actionSheetAchievementsType === 'delete') {
      for (var element in $scope.achievementsForSelection) {
        if ($scope.achievementsForSelection[element].selected === true) {
          $scope.deleteAchievement($scope.achievementsForSelection[element]);
        }
      }
      $scope.achievementsForSelection = $scope.achievements;
    }
  }
  
  /**
    @achievement: The achievement selected.
    Checks if the selected achievement it was already selected or not.
    Also detects if there is anyone selected, and then enables the select button.
  */
  $scope.changeSelectedAchievement = function(achievement) {
    if (achievement.selected === false) {
      achievement.selected = true;
    } else {
      achievement.selected = false;
    }
    $scope.enableSelectButton = false;
    for (var element in $scope.achievementsForSelection) {
      if ($scope.achievementsForSelection[element].selected) {
        $scope.enableSelectButton = true;
        break;
      }
    }
  }

  /**
    @item: The item that was evaluating the student.
    @student: The student that was being evaluated.
    @points: The points that are used to evaluate the student.
    Checks if the student after been evaluated it also unlocked an achievement.
    Defines an event for each achievement's reference which is triggered every time that database reference is modified.
    The event checks if the student already had the acheivement unlocked or what level/points it had.
  */
  $scope.checkAchievements = function(item, student, points) {
    if (item.achievements != undefined) {
      var itemAchievementsRef = firebase.database().ref('items/' + item.id + '/achievements');
      var itemAchievementsArray = $firebaseArray(itemAchievementsRef);
      var achievementsArray = $firebaseArray(achievementsRef);
      itemAchievementsArray.$loaded(function() {
        achievementsArray.$loaded(function() {
          for (i = 0 ; i < itemAchievementsArray.length ; i++) {
            var achievementKey = itemAchievementsArray.$keyAt(i);
            var loopAchievements = firebase.database().ref('achievements/' + achievementKey);
            loopAchievements.on('value', function(snapshot) {
              if (snapshot.val() != null) {
                var achievementToCheck = snapshot.val();
                if (student.items != undefined && student.items[item.id].achievements != undefined && student.items[item.id].achievements[achievementToCheck.id] != undefined) {
                  var studentLevel = student.items[item.id].achievements[achievementToCheck.id].level;
                }
                if (points > achievementToCheck.requirements) {
                  var levelAchievement = points / achievementToCheck.requirements;
                  levelAchievement = Math.trunc(levelAchievement);
                  if (levelAchievement > achievementToCheck.maxLevel) {
                    levelAchievement = achievementToCheck.maxLevel;
                  }
                  var studentItemAchievementRef = firebase.database().ref('students/' + student.id + '/items/' + item.id + '/achievements/' + achievementToCheck.id);
                  studentItemAchievementRef.set({
                    'id' : achievementToCheck.id,
                    'level' : levelAchievement,
                  });
                  if (studentLevel != levelAchievement) {
                    $scope.createNotificationAchievements(student.id, 'student', achievementToCheck, 'win', levelAchievement, null);
                    $scope.createNotificationAchievements($scope.teacher.$id, 'teacher', achievementToCheck, 'win', levelAchievement, student);
                  }
                  /*THINGS TO DO NULL REFERENCE AND UNDEFINED HERE
                  student.items[item.id].achievements[achievementToCheck.id].id = achievementToCheck.id;
                  student.items[item.id].achievements[achievementToCheck.id].level = levelAchievement;*/
                } else {
                  if (student.items != undefined && student.items[item.id].achievements != undefined && student.items[item.id].achievements[achievementToCheck.id] != undefined) {
                    $scope.createNotificationAchievements(student.id, 'student', achievementToCheck, 'lose', levelAchievement, null);
                    $scope.createNotificationAchievements($scope.teacher.$id, 'teacher', achievementToCheck, 'lose', levelAchievement, student);
                  }
                  var studentItemAchievementRef = firebase.database().ref('students/' + student.id + '/items/' + item.id + '/achievements/' + achievementToCheck.id);
                  studentItemAchievementRef.remove();
                  /*delete $scope.student.items[item.id].achievements[achievementToCheck.id];*/
                }
              }
            });
          }
        });
      });
    }
  }




                                       /* FUNCTIONS IN TEAMS */

  /**
    Updates the teams's picture with an image uploaded from the local storage and saves it on the firebase storage.
  */
  $scope.updateTeamPicture = function() {
    var downloadURL;
    var fileButton = document.getElementById('inputTeamPicture');
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Team_Pictures/' + $scope.team.id + '/teamPicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {

          }, function error(error) {
            $ionicLoading.hide();
          }, function complete() {
            downloadURL = task.snapshot.downloadURL;
              
            $scope.team.picture = downloadURL;
            var teamPictureToUpdateRef = firebase.database().ref('teams/' + $scope.team.id + '/picture');
            teamPictureToUpdateRef.set(downloadURL);
            
            $ionicLoading.hide();

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
          });
        } else {
          $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.fileInvalidAlert);
        }
      }
    });
  }

  /**
    Get all the teams from the classroom and saves them in the session.
    Asks firebase for the correspond teams' references.
    Defines an event for each team's reference which is triggered every time that database reference is modified.
    The event saves every team in the session.
  */
  $scope.getTeams = function() {
    var classroomTeamsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/teams');
    var teamKeys = $firebaseArray(classroomTeamsRef);
    teamKeys.$loaded(function() {
      $scope.teams = [];
      for (i = 0 ; i < teamKeys.length ; i++) {
        var teamKey = teamKeys.$keyAt(i);
        var loopTeam = firebase.database().ref('teams/' + teamKey);
        loopTeam.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var team = snapshot.val();
            for (j = 0 ; j < $scope.teams.length ; j++) {
              if ($scope.teams[j].id == team.id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.teams.push(team);
            } else {
              $scope.teams[index] = team;
            }
            $scope.teams.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getTeamsForSelection();
          }
        });
      }
    });
  }

  /**
    Copy all the students in another array for selection in team.
  */
  $scope.getStudentsForTeamSelection = function() {
    $scope.studentsForTeamSelection = angular.copy($scope.students);
    if ($scope.editMembers) {
      for (var element in $scope.studentsForTeamSelection) {
        $scope.studentsForTeamSelection[element].inTeam = false;
      }
      if ($scope.team.students != undefined) {
        for (var student in $scope.studentsForTeamSelection) {
          if ($scope.team.students[$scope.studentsForTeamSelection[student].id] === true) {
            $scope.studentsForTeamSelection[student].inTeam = true;
          }
        }
      }
      $scope.editMembers = false;
    } else {
      for (var element in $scope.studentsForTeamSelection) {
        $scope.studentsForTeamSelection[element].selected = false;
      }
    }
  }

  /**
    Copy all the teams in another array for selection purposes.
  */
  $scope.getTeamsForSelection = function() {
    $scope.teamsForSelection = angular.copy($scope.teams);
    for (var element in $scope.teamsForSelection) {
      $scope.teamsForSelection[element].selected = false;
    }
  }

  /**
    @name: The name for the team that is going to be create.
    @objective: An objective for the team that is going to be created.
    Creates a team and add its reference to the classroom's tree on the firebase database.
    Also add the team's reference to each student member's tree on the firebase database and then the student member's reference to the team's tree on the firebase database.
  */
  $scope.createTeam = function(name, objective) {
    var teamsNode = $firebaseArray(teamsRef);
    teamsNode.$loaded(function() {
      teamsNode.$add({
        'name' : name,
        'objective' : objective,
      }).then(function(ref) {
        var downloadURL;
        var id = ref.key;

        var idForTeamRef = firebase.database().ref('teams/' + id + '/id');
        idForTeamRef.set(id);

        var classroomRef = firebase.database().ref('classrooms/' + $scope.classroom.id  + '/teams/' + id);
        classroomRef.set(true);

        for (var element in $scope.studentsForTeamSelection) {
          if ($scope.studentsForTeamSelection[element].selected === true) {

            var studentId = $scope.studentsForTeamSelection[element].id;

            var studentTeamsRef = firebase.database().ref('students/' + studentId + '/teams/' + id);
            studentTeamsRef.set(true);

            var teamStudentsRef = firebase.database().ref('teams/' + id + '/students/' + studentId);
            teamStudentsRef.set(true);
          }
        }

        //PICUTRE PART
        if ($scope.file != undefined || $scope.file != null) {
          $ionicLoading.show();
          var fileExtension = $scope.file.name.split('.').pop().toLowerCase();
          if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
            var storageRef = firebase.storage().ref('Team_Pictures/' + id + '/teamPicture');
            var task = storageRef.put($scope.file);
            task.on('state_changed', function progress(snapshot) {

            }, function error(error) {
              $ionicLoading.hide();
            }, function complete() {
              downloadURL = task.snapshot.downloadURL;
              var teamPictureRef = firebase.database().ref('teams/' + id + '/picture');
              teamPictureRef.set(downloadURL);

              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
              }
            });
          } else {
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.fileInvalidAlert);
          }
          $scope.file = undefined;
        } else {
          var teamPictureRef = firebase.database().ref('teams/' + id + '/picture');
          teamPictureRef.set($scope.defaultTeamAvatar);
        }
        $ionicLoading.hide();

        $scope.closeModalNewTeamDialog();
        $scope.getStudentsForTeamSelection();
        $scope.getTeams();
      });  
    });
  }

  /**
    @numTeams: The number of teams that are going to be created.
    Creates a number of teams equal to the numTeams. These teams are going to have a roandom number of students.
  */
  $scope.createRandomTeams = function(numTeams) {
    if (numTeams > $scope.students.length) {
      $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.cantCreateMoreTeamsThanStudentsAlert);
    } else {
      var objective = 'Random';
      var picture = $scope.defaultTeamAvatar;
      var numParticipants = $scope.students.length;
      var participantsPerTeam = Math.trunc(numParticipants / numTeams);
      var lefttovers = numParticipants % numTeams;
      randomNumberList = [];
      for (i = 0 ; i < numParticipants ; i++) {
        randomNumberList.push(i);
      }
      randomNumberList = randomNumberList.sort(function() { return Math.random() - 0.5 });
      var teamsList = [];
      var teamNamesList = [];
      for (i = 0 ; i < numTeams ; i++) {
        var team = [];
        for (j = 0 ; j < participantsPerTeam ; j++) {
          team.push($scope.students[randomNumberList[0]]);
          randomNumberList.splice(0, 1);
        }
        teamNamesList.push('Random ' + (i+1));
        teamsList.push(team);
      }
      if (lefttovers > 0) {
        for ( i = 0 ; i < lefttovers ; i++) {
          var randomTeam = Math.trunc(Math.random()*numTeams);
          teamsList[randomTeam].push($scope.students[randomNumberList[i]]);
        }
      }
      var teamsNode = $firebaseArray(teamsRef);
      teamsNode.$loaded(function() {
        var counter = 0;
        for (i = 0 ; i < numTeams ; i++) {
          teamsNode.$add({
            'name' : teamNamesList[i],
            'objective' : objective,
            'picture' : picture,
          }).then(function(ref) {
            var id = ref.key;
            
            var idForTeamRef = firebase.database().ref('teams/' + id + '/id');
            idForTeamRef.set(id);

            var classroomRef = firebase.database().ref('classrooms/' + $scope.classroom.id  + '/teams/' + id);
            classroomRef.set(true);

            for (var element in teamsList[counter]) {

              var studentId = teamsList[counter][element].id;

              var studentTeamsRef = firebase.database().ref('students/' + studentId + '/teams/' + id);
              studentTeamsRef.set(true);

              var teamStudentsRef = firebase.database().ref('teams/' + id + '/students/' + studentId);
              teamStudentsRef.set(true);
            }
            counter++;
            $scope.getTeams();
          });
        }
      });
      $scope.closeModalQuantityRandomTeams();
    }
  }

  /**
    @team: The team that is going to be remove.
    Removes  the team's references on firebase database.
    Then removes  the team's references in the students members' tree on firebase database.
    Also removes the team's reference from the classroom's tree on the firebase database.
    Finally removes the team's classroom's picture from the firebase storage.
  */
  $scope.deleteTeam = function(team) {
    var teamToDeleteRef = firebase.database().ref('teams/' + team.id);
    teamToDeleteRef.remove();

    for (var student in $scope.students) {
      var studentTeamToDeleteRef = firebase.database().ref('students/' + $scope.students[student].id + '/teams/' + team.id);
      studentTeamToDeleteRef.remove();
    }

    var classroomTeamToDelete = firebase.database().ref('classrooms/' + $scope.classroom.id + '/teams/' + team.id);
    classroomTeamToDelete.remove();

    var imagesRef = firebase.storage().ref().child('Team_Pictures/' + team.id + '/teamPicture');
    imagesRef.delete().then(function() {
    }).catch(function(error) {
    });

    $scope.getTeams();
  }

  /**
    @team: The team that is going to be saved in the session.
    Saves the team selected in the session.
  */
  $scope.setTeam = function(team) {
    $scope.team = team;
    $scope.teamMembers = [];
    for (var student in $scope.students) {
      for (var teamMemberId in team.students) {
        if ($scope.students[student].id == teamMemberId) {
          $scope.teamMembers.push({
            'id' : $scope.students[student].id,
            'name' : $scope.students[student].name,
            'surname' : $scope.students[student].surname,
            'avatar' : $scope.students[student].avatar,
            'picture' : $scope.students[student].picture,
          });
        }
      }
    }
    $scope.showModalTeamDialog();
  }

  /**
    @name: The new name for the team that is going to be edited.
    @objective: The new objective for the team that is going to be edited.
    Edits the item saved in the session with the new data.
  */
  $scope.editTeam = function(name, objective) {
    if (name != undefined) {
      $scope.team.name = name;
      var teamNameRef = firebase.database().ref('teams/' + $scope.team.id + '/name');
      teamNameRef.set(name);
    }
    if (objective != undefined) {
      $scope.team.objective = objective;
      var teamObjectiveRef = firebase.database().ref('teams/' + $scope.team.id + '/objective');
      teamObjectiveRef.set(objective);
    }
    $scope.closeModalTeamDialog();
  }

  /**
    Edits the members of the team and either adds or removes them from the team's tree on the firebase database.
  */
  $scope.editTeamMembers = function() {
    $scope.closeModalEditMembers();
    for (var element in $scope.studentsForTeamSelection) {
      var studentTeamRef = firebase.database().ref('students/' + $scope.studentsForTeamSelection[element].id + '/teams/' + $scope.team.id);
      var teamStudentRef = firebase.database().ref('teams/' + $scope.team.id + '/students/' + $scope.studentsForTeamSelection[element].id);
      if ($scope.studentsForTeamSelection[element].inTeam === false) {
        studentTeamRef.remove();
        teamStudentRef.remove();
      } else {
        studentTeamRef.set(true);
        teamStudentRef.set(true);
      }
    }
    $scope.closeModalTeamDialog();
  }

  /**
    Gets all the selected teams in the modal and then calls the correspond method depending on the var created when choose an option in the action sheet.
  */
  $scope.selectTeams = function() {
    $scope.closeSelectTeamsModal();
    if ($scope.actionSheetClassTeamsType === 'delete') {
      for (var element in $scope.teamsForSelection) {
        if ($scope.teamsForSelection[element].selected === true) {
          $scope.deleteTeam($scope.teamsForSelection[element]);
        }
      }
    $scope.teamsForSelection = $scope.teams;
    } else if ($scope.actionSheetClassTeamsType === 'evaluate') {
      $scope.teamsToEvaluate = [];
      for (var element in $scope.teamsForSelection) {
        if ($scope.teamsForSelection[element].selected === true) {
          $scope.teamsToEvaluate.push($scope.teamsForSelection[element]);
        }
      }
      $scope.actionSheetItemsType = 'evaluateTeams';
      $scope.showSelectItemsModal();
    }
  }

  /**
    @message: The message that is going to be send to the selected teams.
    Sends a message to the students members of the selected teams.
  */
  $scope.sendMessageTeams = function(message) {
    $scope.closeSelectTeamsModal();
    for (var teamForSelection in $scope.teamsForSelection) {
      if ($scope.teamsForSelection[teamForSelection].selected === true) {
        for (var team in $scope.teams) {
          if ($scope.teams[team].id == $scope.teamsForSelection[teamForSelection].id) {
            for (var student in $scope.teams[team].students) {
              $scope.sendMessageStudents(student, message);
            }
          }
        }
      }
    }
  }

  /**
    @student: The student selected.
    Checks if the selected student it was already selected or not.
  */
  $scope.changeSelectedStudentForTeam = function(student) {
    if (student.selected === false) {
      student.selected = true;
    } else {
      student.selected = false;
    }
  }

  /**
    @student: The student selected
    Checks if the selected student it was already in the session team.
  */
  $scope.inTeam = function(student) {
    if (student.inTeam === true) {
      student.inTeam = false;
    } else {
      student.inTeam = true;
    }
  }

  /**
    @team: The team selected.
    Checks if the selected team it was already selected or not.
    Also detects if there is anyone selected, and then enables the select button.
  */
  $scope.changeSelectedTeam = function(team) {
    if (team.selected === false) {
      team.selected = true;
    } else {
      team.selected = false;
    }
    $scope.enableSelectButton = false;
    for (var element in $scope.teamsForSelection) {
      if ($scope.teamsForSelection[element].selected) {
        $scope.enableSelectButton = true;
        break;
      }
    }
  }

  /**
    Picks a random team from all in the classroom.
  */
  $scope.getRandomTeam = function() {
    var randomTeam = Math.trunc(Math.random()*$scope.teams.length);

    $scope.popupAlertCreate($scope.randomTeamActionSheetOption, $scope.teams[randomTeam].name);

    alertPopup.then(function(res) {
    });
  }

  


                                        /* FUNCTIONS IN REWARDS */

  /**
    Get all the rewards from the classroom and saves them in the session.
    Asks firebase for the correspond rewards' references.
    Defines an event for each reward's reference which is triggered every time that database reference is modified.
    The event saves every reward in the session.
  */
  $scope.getRewards = function() {
    var classroomRewardsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/rewards');
    var rewardKeys = $firebaseArray(classroomRewardsRef);
    rewardKeys.$loaded(function() {
      $scope.rewards = [];
      for (i = 0 ; i < rewardKeys.length ; i++) {
        var rewardKey = rewardKeys.$keyAt(i);
        var loopReward = firebase.database().ref('rewards/' + rewardKey);
        loopReward.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var reward = snapshot.val();
            for (j = 0 ; j < $scope.rewards.length ; j++) {
              if (reward.id == $scope.rewards[j].id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.rewards.push(reward);  
            } else {
              $scope.rewards[index] = reward;
            }
            $scope.rewards.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getRewardsForSelection();
          }
        });
      }
    });
  }

  /**
    Copy all the rewards in another array for selection purposes.
  */
  $scope.getRewardsForSelection = function() {
    $scope.rewardsForSelection = angular.copy($scope.rewards);
    for (var element in $scope.rewardsForSelection) {
      $scope.rewardsForSelection[element].selected = false;
    }
  }

  /**
    @name: The name for the reward that is going to be create.
    @description: The description for the reward that is going to be created.
    @price: The price for the reward that is going to be created.
    Creates a reward and add its reference to the classroom's tree on the firebase database.
  */
  $scope.createReward = function(name, description, price) {
    var rewardsNode = $firebaseArray(rewardsRef);
    rewardsNode.$loaded(function() {
      rewardsNode.$add({
        'name' : name,
        'description' : description,
        'price' : price,
      }).then(function(ref) {
        var id = ref.key;

        var idForRewardRef = firebase.database().ref('rewards/' + id + '/id');
        idForRewardRef.set(id);

        var classroomRewardsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/rewards/' + id);
        classroomRewardsRef.set(id);

        $scope.closeModalNewReward();
        $scope.getRewards();
      });  
    });
  }

  /**
    @reward: The reward that is going to be remove.
    Removes  the reward's references on firebase database.
    Then removes  the reward's references in the students that have already bought it tree on firebase database.
    Also removes the reward's reference from the classroom's tree on the firebase database.
    Finally removes the reward's reference from the missions' tree on the firebase database.
  */
  $scope.deleteReward = function(reward) {
    var classroomRewardRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/rewards/' + reward.id);
    classroomRewardRef.remove();

    var rewardToDeleteRef = firebase.database().ref('rewards/' + reward.id);
    rewardToDeleteRef.remove();

    for (var student in $scope.students) {
      var studentRewardToDeleteRef = firebase.database().ref('students/' + $scope.students[student].id + '/rewards/' + reward.id);
      studentRewardToDeleteRef.remove();
    }

    for (var mission in $scope.missions) {
      var missionRewardToDeleteRef = firebase.database().ref('missions/' + $scope.missions[mission].id + '/rewards/' + reward.id);
      missionRewardToDeleteRef.remove();
    }

    $scope.getRewards();
  }

  /**
    @reward: The reward that is going to be saved in the session.
    Saves the reward selected in the session.
  */
  $scope.setReward = function(reward) {
    $scope.reward = reward;
    $scope.showModalEditReward();
  }

  /**
    @name: The new name for the reward that is going to be edited.
    @description: The new description for the reward that is going to be edited.
    @price: The new price for the reward that is going to be edited.
    Edits the reward saved in the session with the new data.
  */
  $scope.editReward = function(name, description, price) {
    if (name != undefined && description != undefined && price != undefined) {
      var reward = {
        'id' : $scope.reward.id,
        'name' : name,
        'description' : description,
        'price' : price,
      }
      var rewardRef = firebase.database().ref('rewards/' + $scope.reward.id);
      rewardRef.set(reward);
    } else {
      if (name != undefined) {
        $scope.reward.name = name;
        var rewardNameRef = firebase.database().ref('rewards/' + $scope.reward.id + '/name');
        rewardNameRef.set(name);
      }

      if (description != undefined) {
        $scope.reward.description = description;
        var rewardDescriptionRef = firebase.database().ref('rewards/' + $scope.reward.id + '/description');
        rewardDescriptionRef.set(description);
      }

      if (price != undefined) {
        $scope.reward.price = price;
        var rewardPriceRef = firebase.database().ref('rewards/' + $scope.reward.id + '/price');
        rewardPriceRef.set(price);
      }
    }
    $scope.closeModalEditReward();
  }

  /**
    Gets all the selected rewards in the modal and then calls the correspond method depending on the var created when choose an option in the action sheet.
  */
  $scope.selectRewards = function() {
    $scope.closeSelectRewardsModal();
    if ($scope.actionSheetRewardsType === 'delete') {
      for (var element in $scope.rewardsForSelection) {
        if ($scope.rewardsForSelection[element].selected === true) {
          $scope.deleteReward($scope.rewardsForSelection[element]);
        }
      }
    $scope.rewardsForSelection = $scope.rewards;
    } else if ($scope.actionSheetRewardsType === 'newMissionCreation') {
      $scope.newMission.rewards = $scope.rewardsForSelection;
      $scope.createMission($scope.newMission);
    }
  }

  /**
    @reward: The reward selected.
    Checks if the selected reward it was already selected or not.
    Also detects if there is anyone selected, and then enables the select button.
  */
  $scope.changeSelectedReward = function(reward) {
    if (reward.selected === false) {
      reward.selected = true;
    } else {
      reward.selected = false;
    }
    $scope.enableSelectButton = false;
    for (var element in $scope.rewardsForSelection) {
      if ($scope.rewardsForSelection[element].selected) {
        $scope.enableSelectButton = true;
        break;
      }
    }
  }

  


                                        /* FUNCTIONS IN MISSIONS */

  /**
    Get all the missions from the classroom and saves them in the session.
    Asks firebase for the correspond missions' references.
    Defines an event for each mission's reference which is triggered every time that database reference is modified.
    The event saves every mission in the session.
    In the event is checked if a mission's finish date is less than the actual date. In that case the mission is set to finished and removes the mission's reference
    on the students' tree on firebase database. Then sends a notification to the teacher.
  */
  $scope.getMissions = function() {
    var classroomMissionsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/missions');
    var missionKeys = $firebaseArray(classroomMissionsRef);
    missionKeys.$loaded(function() {
      $scope.missions = [];
      for (i = 0 ; i < missionKeys.length ; i++) {
        var missionKey = missionKeys.$keyAt(i);
        var loopMission = firebase.database().ref('missions/' + missionKey);
        loopMission.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var mission = snapshot.val();
            if(mission.date < Date.now() && mission.finished == false) {
              var missionStateRef = firebase.database().ref('missions/' + mission.id + '/finished');
              missionStateRef.set(true);
              mission.finisehd = true;

              for(var studentId in mission.students) {
                var studentMissionToDeleteRef = firebase.database().ref('students/' + studentId + '/missions/' + mission.id);
                studentMissionToDeleteRef.remove();
              }
              $scope.createNotificationsMissionFinishedByTime($scope.teacher, mission);
            }
            for (j = 0 ; j < $scope.missions.length ; j++) {
              if (mission.id == $scope.missions[j].id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.missions.push(mission);  
            } else {
              $scope.missions[index] = mission;
            }
            $scope.missions.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getMissionsForSelection();
          }
        });
      }
    });
  }

  /**
    Get all the sessions mission's items saves them in the session.
    Makes a copy of the classroom's items and checks if they are part of the missions.
    If they are it gets also the needed points in the items for the session mission.
    If they are not prepares them to be selected.
  */
  $scope.getItemsForMissionSelection = function() {
    $scope.itemsForMissionSelection = angular.copy($scope.items);
    if ($scope.editingMissionItems) {
      for (var element in $scope.itemsForMissionSelection) {
        $scope.itemsForMissionSelection[element].inMission = false;
      }
      if ($scope.mission.items != undefined) {
        for (var item in $scope.itemsForMissionSelection) {
          if ($scope.mission.items[$scope.itemsForMissionSelection[item].id] != undefined) {
            $scope.itemsForMissionSelection[item].inMission = true;
            $scope.itemsForMissionSelection[item].score = $scope.mission.items[$scope.itemsForMissionSelection[item].id].neededPoints;
          }
        }
      }
    } else {
      for (var element in $scope.itemsForMissionSelection) {
        $scope.itemsForMissionSelection[element].selected = false;
      }
    }
  }

  /**
    Get all the sessions mission's rewards saves them in the session.
    Makes a copy of the classroom's rewards and checks if they are part of the missions.
    If they are not prepares them to be selected.
  */
  $scope.getRewardsForMissionSelection = function() {
    $scope.rewardsForMissionSelection = angular.copy($scope.rewards);
    if ($scope.editingMissionRewards) {
      for (var element in $scope.rewardsForMissionSelection) {
        $scope.rewardsForMissionSelection[element].inMission = false;
      }
      if ($scope.mission.rewards != undefined) {
        for (var reward in $scope.rewardsForMissionSelection) {
          if ($scope.mission.rewards[$scope.rewardsForMissionSelection[reward].id] === true) {
            $scope.rewardsForMissionSelection[reward].inMission = true;
          }
        }
      }
    } else {
      for (var element in $scope.rewardsForMissionSelection) {
        $scope.rewardsForMissionSelection[element].selected = false;
      }
    }
  }

  /**
    Get all the sessions mission's students saves them in the session.
    Makes a copy of the classroom's students and checks if they are part of the missions.
    If they are not prepares them to be selected.
  */
  $scope.getMembersForMissionSelection = function() {
    $scope.studentsForMissionSelection = angular.copy($scope.students);
    if ($scope.editingMissionMembers) {
      for (var element in $scope.studentsForMissionSelection) {
        $scope.studentsForMissionSelection[element].inMission = false;
      }
      if ($scope.mission.students != undefined) {
        for (var student in $scope.studentsForMissionSelection) {
          if ($scope.mission.students[$scope.studentsForMissionSelection[student].id] != undefined) {
            $scope.studentsForMissionSelection[student].inMission = true;
          }
        }
      }
    } else {
      for (var element in $scope.studentsForMissionSelection) {
        $scope.studentsForMissionSelection[element].selected = false;
      }
    }
  }

  /**
    Copy all the missions in another array for selection purposes.
  */
  $scope.getMissionsForSelection = function() {
    $scope.missionsForSelection = angular.copy($scope.missions);
    for (var element in $scope.missionsForSelection) {
      $scope.missionsForSelection[element].selected = false;
    }
  }

  /**
    @mission: The mission that is going to be created
    Creates a mission and add its reference to the classroom's tree on the firebase database.
    Also adds the mission's reference in the mission's items' trees as well as it adds the items' references in the mission's tree on the firebase database.
    Then adds the mission's reference in the mission's students' trees as well as it adds the students' references in the mission's tree on the firebase database.
  */
  $scope.createMission = function(mission) {
    var date = mission.date.getTime();
    if (mission.additionalPoints == undefined) {
      mission.additionalPoints = 0;
    }
    var missionsNode = $firebaseArray(missionsRef);
    missionsNode.$loaded(function() {
      missionsNode.$add({
        'name' : mission.name,
        'additionalPoints' : mission.additionalPoints,
        'date': date,
        'finished' : false,
      }).then(function(ref) {
        var id = ref.key;

        var missionIdRef = firebase.database().ref('missions/' + id + '/id');
        missionIdRef.set(id);

        for (var pos in mission.items) {
          if (mission.items[pos].selected) {
            var missionItemRef = firebase.database().ref('missions/' + id + '/items/' + mission.items[pos].id);
            missionItemRef.set({
              'id' : mission.items[pos].id,
              'neededPoints' : mission.items[pos].score
            });

            var itemMissionRef = firebase.database().ref('items/' + mission.items[pos].id + '/missions/' + id);
            itemMissionRef.set(true);
          }
        }

        for (var pos in mission.students) {
          if (mission.students[pos].selected) {
            var missionStudentRef = firebase.database().ref('missions/' + id + '/students/' + mission.students[pos].id);
            missionStudentRef.set(false);

            var studentMissionRef = firebase.database().ref('students/' + mission.students[pos].id + '/missions/' + id);
            studentMissionRef.set(id);

            for (var element in mission.items) {
              if (mission.items[element].selected) {
                var studentItemsMissionRef = firebase.database().ref('students/' + mission.students[pos].id + '/missions/' + id + '/items/' + mission.items[element].id);
                studentItemsMissionRef.set({
                  'id' : mission.items[element].id,
                  'points' : 0,
                });
              }
            }
          }
        }

        for (var pos in mission.rewards) {
          if (mission.rewards[pos].selected) {
            var missionRewardRef = firebase.database().ref('missions/' + id + '/rewards/' + mission.rewards[pos].id);
            missionRewardRef.set(true);
          }
        }

        var classroomMissionsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/missions/' + id);
        classroomMissionsRef.set(true);

        $scope.getMissions();
      });
    });
  }

  /**
    @mission: The mission that is going to be remove.
    Removes  the mission's references on firebase database.
    First removes the mission's reference from the classroom's tree on the firebase database.
    Then removes  the mission's references in the students that have it pending tree on firebase database.
    Also removes the mission's reference from the classroom's items' trees on the firebase database.
  */
  $scope.deleteMission = function(mission) {
    var classroomMissionRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/missions/' + mission.id);
    classroomMissionRef.remove();

    var missionToDeleteRef = firebase.database().ref('missions/' + mission.id);
    missionToDeleteRef.remove();

    for (var itemId in mission.items) {
      var itemMissionRef = firebase.database().ref('items/' + itemId + '/missions/' + mission.id);
      itemMissionRef.remove();
    }

    for (var studentId in mission.students) {
      var studentMissionToDeleteRef = firebase.database().ref('students/' + studentId + '/missions/' + mission.id);
      studentMissionToDeleteRef.remove();
    }

    $scope.getMissions();
  }

  /**
    @mission: The mission that is going to be saved in the session.
    Saves the mission selected in the session.
    Gets all the mission's items.
    Then gets all the mission's rewards.
    Finally gets all the mission's students.
  */
  $scope.setMission = function(mission) {
    $scope.mission = mission;
    $scope.missionItems = [];
    $scope.missionRewards = [];
    $scope.missionStudents = [];
    for (var item in $scope.items) {
      for (var itemMissionId in mission.items) {
        if ($scope.items[item].id === itemMissionId) {
          $scope.items[item].neededPoints = mission.items[itemMissionId].neededPoints;
          $scope.missionItems.push($scope.items[item]);
        }
      }
    }

    for (var reward in $scope.rewards) {
      for (var rewardMissionId in mission.rewards) {
        if ($scope.rewards[reward].id === rewardMissionId) {
          $scope.missionRewards.push($scope.rewards[reward]);
        }
      }
    }

    for (var student in $scope.students) {
      for (var studentMissionId in mission.students) {
        if ($scope.students[student].id === studentMissionId) {
          $scope.missionStudents.push($scope.students[student]);
        }
      }
    }
    $scope.showModalEditMission();
  }

  /**
    @value: True or false.
    Determinates if shows the finished missions or not depending on the @value.
  */
  $scope.showFinishedMissions = function(value) {
    $scope.finishedMissionsToShow = value;
  }

  /**
    @name: The new name for the mission that is going to be edited.
    @additionalPoints: The new addditional points for the mission that is going to be edited.
    @date: The new finish date for the mission that is going to be edited.
    Edits the mission saved in the session with the new data.
  */
  $scope.editMission = function(name, additionalPoints, date) {
    var dateTimeStamp = date.getTime();
    var missionNameRef = firebase.database().ref('missions/' + $scope.mission.id + '/name');
    var missionAdditionalPointsRef = firebase.database().ref('missions/' + $scope.mission.id + '/additionalPoints');
    var missionDateRef = firebase.database().ref('missions/' + $scope.mission.id + '/date');
    if (name != undefined && additionalPoints != undefined && date != undefined) {
      missionNameRef.set(name);
      missionAdditionalPointsRef.set(additionalPoints);
      missionDateRef.set(dateTimeStamp);
    } else {
      if (name != undefined) {
        missionNameRef.set(name);
      }
      if (additionalPoints != undefined) {
        missionAdditionalPointsRef.set(additionalPoints);
      }
      if (date != undefined) {
        missionDateRef.set(dateTimeStamp);
      }
    }
    $scope.closeModalEditMission();
  }

  /**
    Changes the items and their needed points for the session mission.
    Either removes or adds the mission's reference to the old or new items.
  */
  $scope.editMissionItems = function() {
    $scope.closeModalEditMissionItems();
    for (var element in $scope.itemsForMissionSelection) {
      var missionItemRef = firebase.database().ref('missions/' + $scope.mission.id + '/items/' + $scope.itemsForMissionSelection[element].id);
      var itemMissionRef = firebase.database().ref('items/' + $scope.itemsForMissionSelection[element].id + '/missions/' + $scope.mission.id);
      if ($scope.itemsForMissionSelection[element].inMission === false) {
        missionItemRef.remove();
        itemMissionRef.remove();
        for (var studentId in $scope.mission.students) {
          var studentMissionItemToDelRef  = firebase.database().ref('students/' + studentId + '/missions/' + $scope.mission.id + '/items/' + $scope.itemsForMissionSelection[element].id);
          studentMissionItemToDelRef.remove();
        }
      } else {
        missionItemRef.set({
          'id' : $scope.itemsForMissionSelection[element].id,
          'neededPoints' : $scope.itemsForMissionSelection[element].score
        });
        itemMissionRef.set(true);
        for (var studentId in $scope.mission.students) {
          var studentMissionItemRef = firebase.database().ref('students/' + studentId + '/missions/' + $scope.mission.id + '/items/' + $scope.itemsForMissionSelection[element].id);
          studentMissionItemRef.set({
            'id' : $scope.itemsForMissionSelection[element].id,
            'points' : 0,
          });
        }
      }
    }
    $scope.closeModalEditMission();
  }

  /**
    Changes the rewards for the session mission.
    Either removes or adds the mission's reference to the old or new rewards.
  */
  $scope.editMissionRewards = function() {
    $scope.closeModalEditMissionRewards();
    for (var element in $scope.rewardsForMissionSelection) {
      var missionRewardRef = firebase.database().ref('missions/' + $scope.mission.id + '/rewards/' + $scope.rewardsForMissionSelection[element].id);
      if ($scope.rewardsForMissionSelection[element].inMission === false) {
        missionRewardRef.remove();
      } else {
        missionRewardRef.set(true);
      }
    }
    $scope.closeModalEditMission();
  }

  /**
    Changes the students members for the sessions mission.
    Either removes or adds the new mission's reference to the old or new members.
  */
  $scope.editMissionMembers = function() {
    $scope.closeModalEditMissionMembers();
    for (var element in $scope.studentsForMissionSelection) {
      var missionStudentRef = firebase.database().ref('missions/' + $scope.mission.id + '/students/' + $scope.studentsForMissionSelection[element].id);
      var studentMissionRef = firebase.database().ref('students/' + $scope.studentsForMissionSelection[element].id + '/missions/' + $scope.mission.id);
      var studentMissionIdRef = firebase.database().ref('students/' + $scope.studentsForMissionSelection[element].id + '/missions/' + $scope.mission.id + '/id');
      if ($scope.studentsForMissionSelection[element].inMission === false) {
        missionStudentRef.remove();
        studentMissionRef.remove();
      } else {
        missionStudentRef.set(false);
        studentMissionIdRef.set($scope.mission.id);
        for (var itemId in $scope.mission.items) {
          var studentItemsMissionRef = firebase.database().ref('students/' + $scope.studentsForMissionSelection[element].id + '/missions/' + $scope.mission.id + '/items/' + itemId);
          if ($scope.studentsForMissionSelection[element].missions == undefined || $scope.studentsForMissionSelection[element].missions[$scope.mission.id].items == undefined) {
            studentItemsMissionRef.set({
              'id' : itemId,
              'points' : 0,
            });
          } else if ($scope.studentsForMissionSelection[element].missions[$scope.mission.id].items[itemId].points > 0 &&
            $scope.studentsForMissionSelection[element].missions[$scope.mission.id].items[itemId] != undefined) {
            studentItemsMissionRef.set({
              'id' : itemId,
              'points' : $scope.studentsForMissionSelection[element].missions[$scope.mission.id].items[itemId].points,
            });
          }
        }
      }
    }
    $scope.closeModalEditMission();
  }

  /**
    Gets all the selected missions in the modal and then calls the correspond method depending on the var created when choose an option in the action sheet.
  */
  $scope.selectMissions = function() {
    $scope.closeSelectMissionsModal();
    if ($scope.actionSheetMissionsType === 'delete') {
      for (var element in $scope.missionsForSelection) {
        if ($scope.missionsForSelection[element].selected === true) {
          $scope.deleteMission($scope.missionsForSelection[element]);
        }
      }
      $scope.missionsForSelection = $scope.rewards;
    }
  }

  /**
    @object: The object that is going to be in or out from the mission.
    Checks if the selected object was already in the mission or not.
    If the @object it's an item lets chjoose the needed points for the item.
  */
  $scope.inMission = function(object) {
    if (object.inMission === true) {
      object.inMission = false;
    } else {
      object.inMission = true;
      if (object.price == undefined && object.classrooms == undefined) {
        $scope.points = object.score;
        $scope.popupChooseScore = $ionicPopup.show({
          template: '<input id="inputScore" type="number" ng-model="points">',
          scope: $scope,
          buttons: [
            {
              text: $scope.cancelText,
              onTap: function() {
                object.inMission = false;
              }
            },
            { text: $scope.useDefaultPoints,
              type: 'button-positive',
            },
            {
              text: $scope.changeScore,
              type: 'button-positive',
              onTap: function(e) {
                var actualScore = document.getElementById("inputScore").value;
                if (actualScore > object.maxScore) {
                  e.preventDefault();
                } else if (-(actualScore) > object.maxScore) {
                  e.preventDefault();
                } else {
                  object.score = actualScore;
                }
              }
            }
          ]
        });
      }
    }
  }

  /**
    @mission: The mission selected.
    Checks if the selected mission it was already selected or not.
    Also detects if there is anyone selected, and then enables the select button.
  */
  $scope.changeSelectedMission = function(mission) {
    if (mission.selected === false) {
      mission.selected = true;
    } else {
      mission.selected = false;
    }
    $scope.enableSelectButton = false;
    for (var element in $scope.missionsForSelection) {
      if ($scope.missionsForSelection[element].selected) {
        $scope.enableSelectButton = true;
        break;
      }
    }
  }

  /**
    Shows a popup to set a name for the mission that is about to be created.
    Then opens another popup to set the additional points for the same mission.
    Finally opens a final popup to set the finish date of the mission.
  */
  $scope.setNewMissionNamePopup = function() {
    $scope.newMission = {};
    var missionNamePopup = $ionicPopup.show({
      title: $scope.introduceMissionName,
      template: '<input type="text" ng-model="newMission.name">',
      scope : $scope,

      buttons: [
        {text: $scope.cancelText},
        {text: $scope.nextText,
        onTap: function(e) {
          if($scope.newMission.name !=undefined) {
            var missionAdditionalPointsPopup = $ionicPopup.show({
              title: $scope.introduceAdditionalPoints,
              template: '<input type="number" ng-model="newMission.additionalPoints">',
              scope : $scope,

              buttons: [
                {text: $scope.cancelText},
                {text: $scope.nextText,
                  onTap : function(e) {
                    var missionDatePopup = $ionicPopup.show({
                      title: $scope.introduceFinishDateText,
                      template: '<input type="date" ng-model="newMission.date">',
                      scope : $scope,

                      buttons: [
                        {text: $scope.cancelText},
                        {text: $scope.nextText,
                          onTap : function(e) {
                            if($scope.newMission.date != undefined && $scope.newMission.date.getTime() > Date.now()) {
                              $scope.actionSheetItemsType = 'newMissionCreation';
                              $scope.showSelectItemsModal();
                            } else {
                              $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.mustSetValidDatePopup);
                            }
                          }
                        },
                      ]
                    });
                  }
                },
              ]
            });
          } else {
             $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.mustSetNameMission);
          }
        }
        },
      ]
    });
  };

  /**
    @item: The item that is evaluating the student.
    @student: The student that is being evaluated.
    @points: The point that being either given or removed from the students points
    Checks if an student unlocks or not a mission.
    First checks if the student has the mission pending.
    Then checks the student's item's mission points and either add or remove the @points. After that checks if the student finished the items.
    If the student has finished the mision the removes its reference from the student's tree on the firebase databse.
    After that gives the mission's additional points and rewards to the student.
    Then sends the correspond notifications to the student.
    Finally checks if all the students have finished the mission and if true it sets the mission's attribute 'finished' to true and send the 
    correspond notifications to the students in the mission.
  */
  $scope.checkMissions = function(item, student, points) {
    if (item.missions != undefined) {
      for (var missionId in item.missions) {
        for (var element in $scope.missions) {
          if ($scope.missions[element].id == missionId) {
            if ($scope.missions[element].finished === false) {
              if (student.missions != undefined) {
                if (missionId in student.missions) {
                  var numItemsToUnlock = Object.keys($scope.missions[element].items).length;
                  var unlockedMissionItems = 0;
                  for (var itemId in $scope.missions[element].items) {
                    var studentMissionItemPointsRef = firebase.database().ref('students/' + student.id + '/missions/' + missionId + '/items/' + itemId + '/points');
                    if (student.missions[missionId].items[itemId] != undefined) {
                      if (item.id == itemId) {
                        if ((Number(student.missions[missionId].items[itemId].points) + Number(points)) < $scope.missions[element].items[itemId].neededPoints) {
                          studentMissionItemPointsRef.set((Number(student.missions[missionId].items[itemId].points) + Number(points)));
                        } else {
                          unlockedMissionItems += 1;
                          var studentMissionItemRef = firebase.database().ref('students/' + student.id + '/missions/' + missionId + '/items/' + itemId);
                          studentMissionItemRef.remove();
                          student.missions[missionId].items[itemId] = undefined;
                        }
                      }
                    } else {
                      unlockedMissionItems += 1;
                    }
                  }
                  //Student has finished the mission
                  if (numItemsToUnlock == unlockedMissionItems) {
                    var studentMissionToDeleteRef = firebase.database().ref('students/' + student.id + '/missions/' + missionId);
                    studentMissionToDeleteRef.remove();

                    var missionStudentRef = firebase.database().ref('missions/' + missionId + '/students/' + student.id);
                    missionStudentRef.set(true);
                    $scope.missions[element].students[student.id] = true;

                    var studentClassPointsRef = firebase.database().ref('students/' + student.id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
                    studentClassPointsRef.set(Number(student.classrooms[$scope.classroom.id].totalPoints) + $scope.missions[element].additionalPoints);

                    for (var rewardId in $scope.missions[element].rewards) {
                      var rewardForStudentRef = firebase.database().ref('students/' + student.id + '/rewards/' + rewardId);
                      if (student.rewards != undefined && student.rewards[rewardId] != undefined) {
                        rewardForStudentRef.set({
                          'id' : rewardId,
                          'amount' : (Number(student.rewards[rewardId].amount) + 1),
                        });
                      } else {
                        rewardForStudentRef.set({
                          'id' : rewardId,
                          'amount' : 1,
                        });
                      }
                      for (var rewardPos in $scope.rewards) {
                        if ($scope.rewards[rewardPos].id == rewardId) {
                          $scope.createNotificationsRewards(student, $scope.rewards[rewardPos], $scope.missions[element]);
                          break;
                        }
                      }
                    }
                    $scope.createNotificationMissions(student.id, 'student', $scope.missions[element], student, false);
                    var studentsToUnlock = Object.keys($scope.missions[element].students).length;
                    var unlockedStudents = 0;
                    for (var studentId in $scope.missions[element].students) {
                      if ($scope.missions[element].students[studentId] == true) {
                        unlockedStudents += 1;
                      }
                    }
                    if (unlockedStudents == studentsToUnlock) {
                      var missionStateRef = firebase.database().ref('missions/' + missionId + '/finished');
                      missionStateRef.set(true);
                      $scope.createNotificationMissions($scope.teacher.$id, 'teacher', $scope.missions[element], student, true);
                    } else {
                      $scope.createNotificationMissions($scope.teacher.$id, 'teacher', $scope.missions[element], student, false);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  


                                        /* FUNCTIONS NOTIFICATIONS */

  /**
    Get all the notifications from the teacher.
    Asks firebase for the correspond notifications' references.
    Defines an event for each notification's reference of the classroom which is triggered every time that database reference is modified.
    The event saves every notification in the session.
  */
  $scope.getNotifications = function() {
    var teacherNotificationsRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/notifications/' + $scope.classroom.id);
    var teacherNotificationsArray = $firebaseArray(teacherNotificationsRef);
    teacherNotificationsArray.$loaded(function() {
      $scope.notifications = [];
        for (var element in teacherNotificationsArray) {
          var teacherNotificationRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/notifications/' + $scope.classroom.id + '/' + teacherNotificationsArray[element].$id);
          teacherNotificationRef.on('value', function(snapshot) {
            if (snapshot.val() != null) {
              var change = false;
              var index = -1;
              var notification = snapshot.val();
              $scope.notifications.push(notification);

              $scope.notifications.sort(sortByDate);
              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
              }
            }
          });
        }
        if ($scope.notifications.length > 0 && $scope.classroom.notifications) {
          $scope.showNotificationsModal();
        }
    });
  }

  /**
    @userId: The id of the user that is going to recieve the notification.
    @item: The item which triggers the notification.
    @operationType: Win or lose. Tells the method what message send.
    Creates a notification for the students to inform that won or lost points in an item.
  */
  $scope.createNotificationItems = function(userId, item, operationType) {
    var studentNotificationsRef = firebase.database().ref('students/' + userId + '/notifications/' + $scope.classroom.id);
    var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
    studentNoticationsArray.$loaded(function() {
      if (operationType == 'win') {
        studentNoticationsArray.$add({
          'type' : $scope.notificationTypeItem,
          'message' : $scope.notificationWin + ' 1 ' + $scope.pointOnTheitemSet + ': ' + item.name,
          'date' : Date.now(),
        });
      } else if (operationType == 'lose') {
        studentNoticationsArray.$add({
          'type' : $scope.notificationTypeItem,
          'message' : $scope.notificationLose + ' 1 ' + $scope.pointOnTheitemSet + ': ' + item.name,
          'date' : Date.now(),
        });
      }
    });
  }

  /**
    @userId: The id of the user that is going to recieve the notification.
    @userType: student or teacher. Tells the method if the notification is for the student or for the teacher.
    @achievement: The achievement wich triggers the notification.
    @operationType: Win or lose. Tells the method what message send.
    @levelAchievementreached: The level that the student evaluated reached in the @achivement.
    @studentToEvaluate: The student that it being evaluated.
    Creates a notification either for the students to inform that won or lost an achievement or for the teacher to inform that a student won or lost an achievement.
  */
  $scope.createNotificationAchievements = function(userId, userType, achievement, operationType, levelAchievementReached, studentToEvaluate) {
    if (userType == 'student') {
      var studentNotificationsRef = firebase.database().ref('students/' + userId + '/notifications/' + $scope.classroom.id);
      var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
      studentNoticationsArray.$loaded(function() {
        if (operationType == 'win') {
          studentNoticationsArray.$add({
            'type' : $scope.achievementText,
            'message' : $scope.notificationUnlockedLevelAchievementStudentSide + ' ' + levelAchievementReached + ' ' + $scope.inTheAchievementText + ': ' + achievement.name,
            'date' : Date.now(),
          });
        } else if (operationType == 'lose') {
          studentNoticationsArray.$add({
            'type' : $scope.achievementText,
            'message' : $scope.notificationLostAchievementStudentSide + ': ' + achievement.name,
            'date' : Date.now(),
          });
        }
      });
    } else if (userType == 'teacher') {
      var teacherNotificationsRef = firebase.database().ref('teachers/' + userId + '/notifications/' + $scope.classroom.id);
      var teacherNotificationsArray = $firebaseArray(teacherNotificationsRef);
      teacherNotificationsArray.$loaded(function() {
        if (operationType == 'win') {
          teacherNotificationsArray.$add({
            'type' : $scope.achievementText,
            'message' : $scope.notificationOfStudent + ' ' + studentToEvaluate.name + ' ' + studentToEvaluate.surname + ' ' + $scope.notificationUnlockedLevelAchievementTeacherSide + ' ' + levelAchievementReached + ' ' + $scope.inTheAchievementText + ': ' + achievement.name,
            'date' : Date.now(),
          });
        } else if (operationType == 'lose') {
          teacherNotificationsArray.$add({
            'type' : $scope.achievementText,
            'message' : $scope.notificationOfStudent + ' ' + studentToEvaluate.name + ' ' + studentToEvaluate.surname + ' ' + $scope.notificationLostAchievementTeacherSide + ' ' + achievement.name,
            'date' : Date.now(),
          });
        }
      });
    }
  }

  /**
    @userId: The id of the user that is going to recieve the notification.
    @userType: student or teacher. Tells the method if the notification is for the student or for the teacher.
    @mission: The mission wich triggers the notification.
    @studentToEvaluate: The student that it being evaluated.
    @finished: If true send a notification to the teacher
    Creates a notification either for the students to inform that finished a mission or for the teacher to inform that a student finished a mission.
  */
  $scope.createNotificationMissions = function(userId, userType, mission, studentToEvaluate, finished) {
    if (userType == 'student') {
      var studentNotificationsRef = firebase.database().ref('students/' + userId + '/notifications/' + $scope.classroom.id);
      var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
      studentNoticationsArray.$loaded(function() {
        studentNoticationsArray.$add({
          'type' : $scope.notificationTypeMission,
          'message' : $scope.notificationFinishedMissionStudentSide + ': ' + mission.name,
          'date' : Date.now(),
        });
      });
    } else if (userType == 'teacher') {
      var teacherNotificationsRef = firebase.database().ref('teachers/' + userId + '/notifications/' + $scope.classroom.id);
      var teacherNotificationsArray = $firebaseArray(teacherNotificationsRef);
      teacherNotificationsArray.$loaded(function() {
        teacherNotificationsArray.$add({
          'type' : $scope.notificationTypeMission,
          'message' : $scope.notificationOfStudent + ' ' + studentToEvaluate.name + ' ' + studentToEvaluate.surname + ' ' + $scope.notificationFinishedMissionTeacherSide + ': ' + mission.name,
          'date' : Date.now(),
        });
        if (finished) {
          teacherNotificationsArray.$add({
          'type' : $scope.notificationTypeMission,
          'message' : $scope.notificationOfMission + ': ' + mission.name + ' ' + $scope.notificationMissionEnded,
          'date' : Date.now(),
        });
        }
      });
    }
  }

  /**
    @student: The student that is going to recieve the notification.
    @reward: The reward which triggers the notification.
    @mission: The missions that unlocks the rewards for the student.
    Creates a notification for the students to inform that won rewards from a mission finished.
  */
  $scope.createNotificationsRewards = function(student, reward, mission) {
    var studentNotificationsRef = firebase.database().ref('students/' + student.id + '/notifications/' + $scope.classroom.id);
    var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
    studentNoticationsArray.$loaded(function() {
      studentNoticationsArray.$add({
        'type' : $scope.notificationTypeReward,
        'message' : $scope.youHaveWinTheReward + ' ' + reward.name + ' ' + $scope.becouseCompleteMission + ' ' + mission.name,
        'date' : Date.now(),
      });
    });
  }

  /**
    @user: The user that is going to recieve the notification.
    @mission: The missions that its time has expired.
    Creates a notification for the teacher to inform that a mission's time has expired.
  */
  $scope.createNotificationsMissionFinishedByTime = function(user, mission) {
    var teacherNotificationsRef = firebase.database().ref('teachers/' + user.$id + '/notifications/' + $scope.classroom.id);
    var teacherNotificationsArray = $firebaseArray(teacherNotificationsRef);
    teacherNotificationsArray.$loaded(function() {
      teacherNotificationsArray.$add({
        'type' : $scope.notificationTypeMission,
        'message' : $scope.notificationTimeToFinishMissionText + ' ' + mission.name + ' ' + $scope.notificationMissionExpired,
        'date' : Date.now(),
      });
    });
  }

  /**
    Removes all the notifications from the teacher's tree.
  */
  $scope.deleteNotifications = function() {
    var notificationToDeleteRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/notifications/' + $scope.classroom.id);
    notificationToDeleteRef.remove();
    $scope.closeNotificationsModal();
    $scope.getNotifications();
  }

  /*
    *************************************EVERY SORT FUNCTION GOES HERE***********************
  */

  /**
    Sorts an array by name.
  */
  var sortByName = function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  }

  /**
    Sorts an array by surname.
  */
  var sortBySurname = function(a, b) {
    var surnameA = a.surname.toUpperCase();
    var surnameB = b.surname.toUpperCase();
    if (surnameA < surnameB) {
      return -1;
    }
    if (surnameA > surnameB) {
      return 1;
    }
    //surnames must be equal
    return 0;
  }

  /**
    Sorts an array by level.
  */
  var sortByLevel = function(a, b) {
    var levelA = a.level;
    var levelB = b.level;
    if (levelA < levelB) {
      return -1;
    }
    if (levelA > levelB) {
      return 1;
    }
    //levels must be equal
    return 0;
  }

  /**
    Sorts an array by date.
  */
  var sortByDate = function(a, b) {
    var dateA = a.date;
    var dateB = b.date;
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }
    //dates must be equal
    return 0;
  }
}])