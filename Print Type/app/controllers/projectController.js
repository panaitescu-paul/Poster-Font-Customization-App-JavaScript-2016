myapp.controller('ProjectController', ['$scope', '$stateParams', 'RTService', 'RenderService', function($scope, $stateParams, RTService, RenderService) {

	console.log('ProjectController');

	$scope.RTService = RTService;
	$scope.currentProject = null;
	$scope.loadingState = false;
	$scope.selectedElemId = RTService.selectedElemId;
	console.log('ProjectController', '$scope.selectedElemId', $scope.selectedElemId);


	if ($stateParams.projectId) {
		console.log('$stateParams.projectId', $stateParams.projectId);
		$scope.loadingState = true;
		RTService.loaded()
		.then(function () {
			$scope.currentProject = $scope.RTService.projects.$getRecord($stateParams.projectId);
			console.log(' 1 $scope.currentProject', $scope.currentProject);
			$scope.loadingState = false;
		}, function (error) {
			$scope.loadingState = false;
		});
	}
	console.log(' 2 $scope.currentProject', $scope.currentProject);

	
	$scope.screenshoot = function () {
		console.log('screenshoot');

		RenderService.capture(document.getElementsByClassName('input-list'))
			.then(function (data) {
				console.log(data);
				downloadImg(null, 'Preview [Type].png', data);
			});
	}

	var downloadImg = function (a, filename, data) {
		if (!(!!a)) {
			a = document.createElement('a');
			a.style.display = 'none';
			document.body.appendChild(a);
		}

		filename = filename || 'download.png';

		/* Change MIME type to trick the browser to downlaod the file instead of displaying it */
	  var dt = data.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

	  /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
	  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=' + filename);

	  console.log(a);

	  a.download = filename;
		a.href = dt;
		a.click()
	}

	}])


