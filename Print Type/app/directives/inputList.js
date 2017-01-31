myapp.component('inputList', {

	bindings: {
		data: '<',
		projectId: '<',
		elemNumber: '=',
	},
	controller: 'InputListController as vm',
	templateUrl: "/app/templates/inputList.html"

})

myapp.controller('InputListController', ['RenderService', 'RTService', '$timeout', function(RenderService, RTService, $timeout) {
	var vm = this;

	this.$onInit = function () {
		// console.log('init',this);
	};

	this.$onChanges = function (changes) {
		// console.log('-- change', changes);
		vm._data = changes.data.currentValue;
	};

	this.$postLink  = function () {
		// console.log('plink',this);
	};

	vm.selectedElemId = 8;
	console.log('inputList', 'vm.selectedElemId', vm.selectedElemId);


	var DEFAULT_ELEM = {
		tag: 'h1',
		style: {
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Cormorant Infant', serif",
			line_height: '33',
			text_size: 20,
		},
		content: ' ',
	};

	vm.insert = function (index) {
		console.log('insert', index);
		RTService.addElementToProject(this.projectId, index, DEFAULT_ELEM)
		.then(function() {
			var elem = document.getElementById('elem-' + (index + 1));
			elem && elem.focus();
		});
	}

	vm.remove = function (index) {
		console.log('remove', index);
		RTService.removeElementFromProject(this.projectId, index)
		.then(function() {
			if (index > 0) {
				var elem = document.getElementById('elem-' + (index - 1));
			}
		});
	}

	vm.update = function (index) {
		console.log('index', index, this.projectId, vm._data[index]);
		RTService.updateElementFromProject(this.projectId, index, vm._data[index])
		.then(function() {
			var elem = document.getElementById('elem-' + (index));
				elem && elem.focus();
		});
	}

	vm.expandable = function(index) {
		var textarea = document.getElementById('elem-' + (index));
		textarea.style.height = "";
		textarea.style.height = (textarea.scrollHeight + 10) + "px";
	};

	$timeout(function() {
		for (var i = 0; i < vm.data.length; i++) {
			vm.expandable(i);
		}
	}, 1000);


	vm.keyup = function (key, index, charCount, elemCount) {
		console.log('keyup');
		console.log('key', key, 'index', index);
		if (key === 13) {
			console.log('insert');
			vm.insert(index);
		} 
		else if (key !== 13) {
		console.log('update');
			vm.update(index);
		}
	}

	vm.keydown = function (key, index, charCount, elemCount) {
		console.log('keydown');
		console.log(' ---------- ', 'key', key, 'index', index, 'charCount', charCount, 'elemCount', elemCount);
		if (key === 8 && charCount === 0 && elemCount > 1) {
		console.log('remove');
			vm.remove(index);

		} 
	}

	vm.focusElem = function (index) {
		RTService.selectElemId(index);
		vm.selectedElemId = RTService.getSelectedElemId();
	}

	
}]);
