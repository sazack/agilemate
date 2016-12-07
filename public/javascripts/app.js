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
        controller:'projectController'
      })
      .state('Dashboard.addproject',{
        url:'/projects/add',
        templateUrl:'/template/dashboard/addproject',
        controller:'projectController'
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
