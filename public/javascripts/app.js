'use strict';

var dependencies = [
  'controllers',
  'ui.router',
  'ngMaterial',
  'ngMessages'
];

var agileMate = angular.module('agileMate',dependencies)
  .config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home',{
        url:'/',
        templateUrl:'/template/home/index',
        controller:'LoginController'
      })
      .state('signup',{
        url:'/signup',
        templateUrl:'/template/home/register',
        controller:'LoginController'
      })
      .state('Dashboard',{
        url:'/dashboard',
        templateUrl:'/template/dashboard/home',
        controller:'DashController'
      })
      .state('Dashboard.developers',{
        url:'/developers',
        templateUrl:'/template/dashboard/developers',
        controller:'DevController'
      })
      .state('Dashboard.addDev',{
        url:'/developers/add',
        templateUrl:'/template/dashboard/adddev',
        controller:'DevController'
      })
      .state('Dashboard.projects',{
        url:'/projects',
        templateUrl:'/template/dashboard/projectlist',
        controller:'DashController'
      })
      .state('Dashboard.project',{
        url:'/project/:name',
        templateUrl:'/template/dashboard/projdetails',
        resolve:{
          projectData:function($http,$stateParams){
            return $http.get('/user/project/'+$stateParams.name)
          }
        },
        controller:'projectController'
      })
      .state('Dashboard.project.devList',{
        url:'/developers/projects/:id',
        templateUrl:'/template/dashboard/developers-projects',
        resolve:{
          devLists:function($http,$stateParams){
            return $http.get('/user/project/developers/'+$stateParams.id)
          }
        },
        controller:'DevListController'
      })
      .state('Dashboard.addproject',{
        url:'/add',
        templateUrl:'/template/dashboard/addproject',
        controller:'DashController'
      })
      .state('Dashboard.addSprint',{
        url:'/project/sprint/add',
        templateUrl:'/template/dashboard/addsprint',
        controller:'addSprint',
        params:{
          id:null
        }
      })
      .state('Dashboard.sprintList',{
        url:'/project/sprint/:id',
        templateUrl:'/template/dashboard/sprintlists',
        resolve:{
          sprintList:function($http,$stateParams,$rootScope){
            $rootScope.projectId = $stateParams.id
            return $http.get('/user/project/sprint/'+$stateParams.id)
          }
        },
        controller:'sprintlisting'
      })
      .state('Dashboard.sprintList.add',{
        url:'/add',
        templateUrl:'/template/dashboard/addtasks',
        controller:'taskAdd',
        params:{
          projectSprintId:null
        }
      })
      .state('Dashboard.taskList',{
        url:'/project/sprint/tasks/:projectSprintId',
        templateUrl:'/template/dashboard/viewtasks',
        resolve:{
          taskDetails: function($http,$stateParams){
            console.log($stateParams);
            return $http.get('/user/project/task/'+ $stateParams.projectSprintId)
          }
        },
        controller:'tasksList'
      })
      .state('userDash',{
        url:'/user/',
        templateUrl:'/template/users/index',
      })
      .state('userDash.projects',{
        url:'projects',
        templateUrl:'/template/users/projects',
        controller:'userProject'
      })
      .state('userDash.tasks',{
        url:'tasks',
        templateUrl:'/template/users/tasks',
        controller:'userTasks'
      })

    $httpProvider.interceptors.push(function($q,$window){
      return{
        request: function(config){
          var token = $window.localStorage.agileMateToken
          if(token){
            config.headers.Authorization ='Bearer'+token;
          }
          else{

          }
          return config
        },
        response: function(response){
          if(response.data.statusCode==401){
            $window.location.replace('/#/')
            alert(response.data.error_msg)
          }
          return response
        }
      }
    })
  }])
