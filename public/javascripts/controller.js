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

.controller('projectController',['$scope','$http','$state','$stateParams','projectData',function($scope,$http,$state,$stateParams,projectData){
  console.log(projectData);
  if(projectData.data.success){
    $scope.projDetails = projectData.data.data[0]
  }

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
  $scope.viewProjectDetail = function(id){
    console.log(id);
    // console.log("Yaha bata thoke");
    $http.get('/user/project/'+id).
    success(function(result){
      if(result.success){
        $scope.projDetails = result.data[0]
        $state.go('Dashboard.projectDetails',{details:$scope.projDetails})
        $scope.listProjectDevs();
        // console.log($scope.projDetails);
      }
    }).
    error(function(err){
      console.log(err);
    })
  }
  $scope.listProjectDevs = function(){
    $http.get('/user/developers/list').
    success(function(result){
      if(result.success){
        $scope.users =result.data
      }
    }).
    error(function(err){
      console.log(err);
    })
  }
  $scope.project.developers =[];
  $scope.activeClassFlags=[];
  $scope.listProjectDevs();
  $scope.storeDevs = function(email,index){
    $scope.activeClassFlags[index] = $scope.activeClassFlags[index] ? false:true;
    console.log($scope.activeClassFlags);
    var index = $scope.project.developers.indexOf(email)
    if(index>-1){
      $scope.project.developers.splice(index,1)
    }
    else{
      $scope.project.developers.push(email)
    }
  }
  $scope.project.id = $scope.projDetails.id
  $scope.addDevstoProject = function(){
    console.log("Hit Vayo Suman Bhai");
    $http.post('/user/project/developers/add',$scope.project).
      success(function(result){
        console.log(result);
        if(result.success){
          alert("Developers Added Successfully")
          $state.go('Dashboard.project.devList');
        }
      }).
      error(function(err){
        console.log(err);
      })
  }
  $scope.toggleDevAdd= function(){
    $scope.addDevdiv =!$scope.addDevdiv
  }
}])
.controller('DevListController',['$scope','$stateParams','$state','devLists',function functionName($scope,$stateParams,$state,devLists){
  if(devLists.data.success){
    $scope.projectdevelopers = devLists.data.data;
  }
}])
