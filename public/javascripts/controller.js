'use strict';

angular.module('controllers',[])

.controller('LoginController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
  $scope.login = function(){
    $http.post('/login',$scope.userDetail).
    success(function(result){
      if(result.success){
        console.log(result);
        $window.localStorage.agileMateToken = result.token
        if(result.user_type==2){
          $state.go('userDash.projects')
        }
        else{
          $state.go('Dashboard.feed')
        }
      }
      else{
        toastr.error(result.error_msg)
      }
    }).
    error(function(err){
      if(err){
        console.log(err);
      }
    })
  }
  $scope.signup = function(){
    // console.log($scope.organization)
    $http.post('/register',$scope.register).
      success(function(result){
      if(result.success){
        $window.localStorage.agileMateToken = result.token
        $state.go('Dashboard.feed')
      }
    }).
    error(function(err){
      console.log(err);
    })
  }
}])

.controller('DashController',['$scope','$state','$http','$window',function($scope,$state,$http,$window,$rootScope){
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
  $scope.project={}
  $scope.addProject = function(){
    console.log($scope.project);
    $http.post('/user/project/add',$scope.project).
      success(function(result){
        if(result.success){
          toastr.success("Project Added Successfully")
          $state.go('Dashboard.projects')
        }
      }).
      error(function(err){
        console.log(err);
      })
  }
  $scope.platforms = [{id:1,name:'Web'},{id:2,name:'Android'},{id:3,name:'iOS'},{id:4,name:'Desktop'},{id:5,name:'cross platform'}]
  console.log($scope.project.platform);
  $scope.project.platform ==[{id:1,name:"web"}]

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
  $scope.listProjectDevs();

  $scope.addProjectIssues = function(){
    console.log($scope.issue);
    $http.post('/user/issues/add',$scope.issue).
      success(function(result){
        if(result.success){
          // console.log(result);
          toastr.success("Issues Added successfully");
          $state.go("Dashboard.feed")
        }
      }).
      error(function(err){
        console.log(err);
      })
  }
  $scope.viewIssues = function(){
    $http.get('/user/issues/list').
      success(function(result){
        if(result.success){
          $scope.issues = result.data.result
          $scope.users= result.data.user
          console.log($scope.issues);
        }
      })
      .error(function(err){
        console.log(err);
      })
  }
  $scope.viewIssues();
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
          toastr.success("Developer Added Successfully")
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
  $scope.listProjectDevs();
  $scope.project.developers =[];
  $scope.activeClassFlags=[];
  $scope.storeDevs = function(email,index){
    $scope.activeClassFlags[index] = $scope.activeClassFlags[index] ? false:true;
    console.log($scope.activeClassFlags);
    var index = $scope.project.developers.indexOf(email)
    if(index>-1){
      $scope.project.developers.splice(index,1)
      toastr.error(email+"has been Unselected")
    }
    else{
      $scope.project.developers.push(email)
      toastr.success(email+"has been Selected")
    }
  }
  $scope.project.id = $scope.projDetails.id
  $scope.addDevstoProject = function(){
    $http.post('/user/project/developers/add',$scope.project).
      success(function(result){
        console.log(result);
        if(result.success){
          toastr.success("Developers Added Successfully")
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
.controller('addSprint',['$scope','$state','$stateParams','$http',function($scope,$state,$stateParams,$http){
  $scope.sprint={}
  if($stateParams.id){
    // console.log($stateParams.id);
    $scope.sprint.projectId = $stateParams.id
  }
  // console.log($stateParams);
  $scope.addSprint = function(){
    console.log($scope.sprint)
    $http.post('/user/project/sprint/add',$scope.sprint).
    success(function(result){
      if(result.success){
        toastr.success("Sprint Added Successfully")
        $state.go('Dashboard.projects')
      }
    })
  }
}])

.controller('sprintlisting',['$scope','$state','sprintList','$rootScope',function($scope,$state,sprintList,$rootScope){
  if(sprintList.data.success){
    $scope.projSprints = sprintList.data.data
  }
}])

.controller('taskAdd',['$scope','$state','$http','$stateParams','$rootScope',function($scope,$state,$http,$stateParams,$rootScope){
  $scope.task={};
  console.log($stateParams);
  if($stateParams.id){
    $scope.task.projectSprintId = $stateParams.id;
    // console.log("Yo ho"+ $scope.task.sprintProjectId);
  }
  $scope.task.projectId= $rootScope.projectId;
  $scope.addTasks = function(){
    console.log($scope.task);
    $http.post('/user/project/task/add',$scope.task).
      success(function(result){
        if(result.success){
          // console.log(result);
          toastr.success("Task Created Successfully")
          $state.reload();
        }
      }).
      error(function(err){
        if(err) return next(err);
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
  $scope.listProjectDevs();
  // console.log($scope.users);
  // $scope.task.username == $scope.users.username
}])

.controller('tasksList',function($scope,$state,taskDetails){
  console.log(taskDetails);
  if(taskDetails.data.success){
    $scope.taskInfo = taskDetails.data.data
  }
})

.controller('profileController',function($scope,$state,$http){
 $scope.viewProfile = function(){
   $http.get('/user/profile').
     success(function(result){
       if(result.success){
         $scope.profile = result.data[0]
       }
     }).
     error(function(err){
       console.log(err);
     })
 }
 $scope.viewProfile();
    $scope.toggleEdit=function(){
      $scope.edit=true;
    }
    $scope.editProfile = function(){
      $http.put('/user/profile/update',$scope.profile).
        success(function(result){
          if(result.success){
            toastr.success("Profile Updated Successfully")
            $state.go('userDash.projects')
          }
        }).
        error(function(err){
          console.log(err);
        })
    }
})

.controller('userDashController',function($scope,$http,$state,$window){
  $scope.logOut= function(){
    delete $window.localStorage.agileMateToken,
    $state.go('home')
  }
  $scope.myIssues= function(){
    $http.get('/user/issues').
      success(function(result){
        if(result.success){
          $scope.issues = result.data
        }
      }).
      error(function(err){
        if(err){
          console.log(err);
        }
      })
  }
  $scope.myIssues();
  $scope.viewMyTasks = function(){
    $http.get('/user/tasks').
    success(function(result){
      console.log(result);
      $scope.myTasks = result.data
    }).
    error(function(error){
      console.log(error);
    })
  }
  $scope.viewMyTasks();
  $scope.viewIssues = function(){
    $http.get('/user/issues/list').
      success(function(result){
        if(result.success){
          $scope.issues = result.data.result
          $scope.users= result.data.user
          console.log($scope.issues);
        }
      })
      .error(function(err){
        console.log(err);
      })
  }
  $scope.viewIssues();
  $scope.viewMyProjects = function(){
    $http.get('/user/projects').
    success(function(result){
      console.log(result);
      $scope.myProjects = result.data
    }).
    error(function(error){
      console.log(error);
    })
  }
  $scope.viewMyProjects();
})
