var myapp = angular.module('myapp',['ui.router']);

myapp.config(function($urlRouterProvider, $stateProvider){
	
	$urlRouterProvider.otherwise('/angular');
	
	$stateProvider
	.state('angular' ,{
		url :'/angular',
		templateUrl :'template/angular.html',
		controller :'tableController'		
	})
	 .state('angular.pagination' ,{
		  url :'/angular/pagination',
		  templateUrl :'template/pagination.html',
		  controller : 'tableController'         		  
	 })
	.state('mongodb' ,{
		url :'/mongodb/:id',
		templateUrl :'template/mongodb.html',
		controller :'mongodbController'		
	})
	.state('emberjs' ,{
		url :'/emberjs',
		template :'<div class="alert alert-info">Hello world emberjs</div>',
		controller :'emberjsController'		
	})
	.state('reactjs' ,{
		url :'/reactjs?portfolioId&dataID',
		templateUrl :'template/react.html',
		controller :'crudContrroller'		
	})
	.state('redux' ,{
		url :'/redux',
		template :'<div class="alert alert-info" >Hello world redux</div>',
		controller :'reduxController'		
	})
	.state('mongoose' ,{
		url :'/mongoose',
		template :'<div class="alert alert-info">Hello world mongoose</div>',
		controller :'reduxController'		
	})
	.state('mean' ,{
		url :'/mean',
		template :'<div class="alert alert-info">Hello world mean</div>',
		controller :'reduxController'		
	})
	.state('customPagination' ,{
		url :'/custompagination',
		templateUrl :'template/custompagination.html',
		controller :'customController'		
	})
});

myapp.controller('customController', function($scope){	

	
	$scope.employeedata = [
	{name:'Putin' ,email :'Putin@gmail.com' ,age :66},
	{name:'Bush' ,email :'Bush@gmail.com' ,age :70},
	{name:'Trump' ,email :'Trump@gmail.com' ,age :80},
	{name:'Modi' ,email :'Modi@gmail.com' ,age :90},
   ];	

	
	$scope.tabledata = [
	{name:'john' ,email :'john@gmail.com' ,age :28},
	{name:'ronn' ,email :'ronn@gmail.com' ,age :29},
	{name:'tony' ,email :'tony@gmail.com' ,age :26},
	{name:'sonn' ,email :'sonn@gmail.com' ,age :25},
    {name:'ram' ,email :'ram@gmail.com' ,age :28},
	{name:'shyam' ,email :'shyam@gmail.com' ,age :29},
	{name:'laxman' ,email :'laxman@gmail.com' ,age :26},
	{name:'abraham' ,email :'abraham@gmail.com' ,age :25}];	
});


myapp.directive('tabledirective' , function(){
	return{
	restrict :'EAMC'	, // E= element, A= attribute. C= Class,
	scope :{
		tabledata: '='
	},
	transclude : true,
	templateUrl :'template/tabledirective.html',
	replace : false
	}	
});


myapp.controller('reactjsController', function($scope , $stateParams){	
$scope.bindData =  $stateParams.portfolioId;
$scope.dataID =  $stateParams.dataID;
});

myapp.controller('mongodbController', function($scope , $stateParams){	
$scope.bindData =  $stateParams.id;
});


myapp.controller('licontroller', function($scope , $http){		
	 $http.get('/api/about').success(function(response){		
		console.log('the data came from server is' + response);
		$scope.liData = response.docum;		
	});	
});

myapp.controller('tableController', function($scope, $http){		
	
		$scope.sortType = "name";
		$scope.sortReverse = false;
		
		$scope.currentPage = 0;
		$scope.pageSize = 3;
        $scope.tableData =[];		
		
        $scope.$watch('tableData' , function(){
		
		if( $scope.tableData.length >0){
			$scope.totalPage = Math.ceil($scope.tableData.length/$scope.pageSize);			
		}
		
	    });
		
	$http.get('/api/pagination').success(function(response){		
		    console.log('the data came from server is' + response);
		    $scope.tableData = response.docum;		
	  });
	
});

myapp.filter('startFrom', function() {
	return function(input, start) {
		if (input) {
			start = +start;	// parse to int
			return input.slice(start);
		}
		return [];
	}
});



myapp.controller('crudContrroller', function($scope , $http){
	
	 /*$http.get('/api/about').success(function(response){		
		console.log('the data came from server is' + response);
		$scope.liData = response.docum;		
	});	*/
	
	
	$scope.init = function() {
		
        $http.get('/employee/emp').success(function(response){			 
			 $scope.tabledata = response.docum;	
		 });
     };
	
	$scope.init();
	
	$scope.beginUpdate = function(data){
		//$scope.doc = data;
		$scope.doc = angular.copy(data)
		
	}
	
	$scope.updateEmployee = function(doc){
		
		console.log(JSON.stringify(doc));
		
		$http.put('/employee/emp', doc).success(function(response){			 
			 console.log('employee updated successfully');
			 $scope.refresh();			 
		 });
	}
	
	$scope.deleteEmployee = function(id){
	
		$http.delete('/employee/emp/' + id).success(function(response){			 
			 $scope.refresh();
		 });
	};
	
	$scope.refresh = function(){		
		 $http.get('/employee/emp').success(function(response){			 
			 $scope.tabledata = response.docum;	
		 });
	};
	
	$scope.addEmployee = function(data){
		//$scope.doc = '';
		console.log(JSON.stringify(data));
		 $http.post('/employee/emp' , data).success(function(response){			 
			 console.log('employee addedd successfully');
			 $scope.refresh();			 
		 });		
	};
});
