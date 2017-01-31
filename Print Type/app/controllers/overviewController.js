myapp.controller('OverviewController', ['$scope', '$stateParams', 'RTService', function($scope, $stateParams, RTService) {

	
	console.log('OverviewController');

	$scope.RTService = RTService;
	$scope.projects = RTService.projects;
	
	RTService.elementStyleChange = false;
	RTService.selectedElemId = null;
	console.log('RTService.elementStyleChange' , RTService.elementStyleChange);

	console.log('RTService.selectedElemId'), RTService.selectedElemId;



	$scope.addProject = function() {
		var newProject = {
			title: $scope.project.title,
		}

		var newElement = {
			tag: 'h1',
					style: {
						bg_color: '#ffffff',
						color: '#000000',
						font_family: "'Cormorant Infant', serif",
						line_height: '33',
						text_size: 20,
					},
					content: ' ',
		}

		RTService.addProject(newProject)
			.then(function(projectId) {
				console.log(projectId);
				var newElement = {
					tag: 'h1',
					style: {
						bg_color: '#ffffff',
						color: '#000000',
						font_family: "'Cormorant Infant', serif",
						line_height: '33',
						text_size: 20,
					},
					content: ' ',
				}
				var elemIndex = 0;
				RTService.addElementToProject(projectId, elemIndex, newElement);
			}, function(){
		});

		console.log('RTService.projects', RTService.projects);
		console.log('$scope.projects', $scope.projects);
	};

}])