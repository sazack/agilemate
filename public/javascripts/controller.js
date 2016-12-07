'use strict';

angular.module('controllers',[])

.controller('LoginController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
  $scope.login = function(){
    $http.post('/login',$scope.userDetail).
    success(function(result){
      if(result.success){
        console.log(result);
        $window.localStorage.agileMateToken = result.token
        $state.go('Dashboard')
      }
      else{
        alert(result.error_msg)
      }
    }).
    error(function(err){
      if(err){
        console.log(err);
      }
    })
    console.log("Hello");
  }
  $scope.signup = function(){
    // console.log($scope.organization)
    $http.post('/user/register',$scope.organization).
    success(function(result){
      if(result.success){
        $window.localStorage.agileMateToken = result.token
        $state.go('Dashboard')
      }
    }).
    error(function(err){
      console.log(err);
    })
  }
}])

.controller('DashController',['$scope','$state','$http','$window',function($scope,$state,$http,$window){
  // console.log("Hello");
  $scope.logOut = function(){
    delete $window.localStorage.agileMateToken
    $state.go('home')
  }
}])

.controller('DevController',['$scope','$state','$http',function($scope,$state,$http){
  // if(userList.data.success){
  //   $scope.users = userList.data.data;
  // }
  $scope.getUsers = function(){
    $http.get('/user/developers/list').
      success(function(result){
        if(result.success){
          console.log(result);
          $scope.users =result.data
        }
      }).
      error(function(err){
        console.log(err);
      })
  }
  $scope.getUsers();
  $scope.developer = {}
  $scope.register = function(){
    $scope.developer.name= $scope.developer.first_name + ''+ $scope.developer.last_name
    $http.post('/user/developer/add',$scope.developer).
      success(function(result){
        if(result.success){
          alert("Developer Added Successfully")
          $state.go('Dashboard.developers')
        }
      }).
      error(function(err){
        console.log(err);
      })
  }
}])

.controller('projectController',['$scope','$http',function($scope,$http){

  $scope.viewProjects = function(){
    $http.get('/user/project/list').
      success(function(result){
        if(result.success){
          // console.log(result);
          $scope.projects = result.data
          console.log($scope.projects);
        }
      })
  }
  $scope.viewProjects();
  $scope.project={}
  $scope.getDate = function(){
    $scope.project.deadline= new Date();
  }
  $scope.platforms = [{id:1,name:'Web'},{id:2,name:'Android'},{id:3,name:'iOS'},{id:4,name:'Desktop'},{id:5,name:'cross platform'}]
  console.log($scope.project.platform);
  $scope.project.platform ==[{id:1,name:"web"}]

  $scope.addProject = function(){
    console.log($scope.project);
    $http.post('/user/project/add',$scope.project).
      success(function(result){
        if(result.success){
          alert("Project Added Successfully")
          $state.go('Dashboard.projects')
        }
      }).
      error(function(err){
        console.log(err);
      })
  }
}])
