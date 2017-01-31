myapp.component('sidebarRight', {

	bindings: {
		data: '<',
		selectedElemId: '<',
		projectId: '<'
	},
	controller: 'sidebarRightController as vm',
	templateUrl: "/app/templates/sidebarRight.html"

})

myapp.controller('sidebarRightController', ['RTService', function(RTService) {
	var vm = this;
	vm.RTService = RTService;

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


	vm.changeTextSize = function (textSize) {
		var index = vm.RTService.getSelectedElemId();
    console.log('** changeTextSize', 'vm.projectId', vm.projectId, 'index', index, 'textSize', textSize)
		vm.RTService.changeTextSizeFromElement(vm.projectId, index, textSize);
		vm.expandable(index);
	}

	vm.changeLineHeight = function (lineHeight) {
		var index = vm.RTService.getSelectedElemId();
    console.log('** changeLineHeight', 'vm.projectId', vm.projectId, 'index', index, 'lineHeight', lineHeight)
		vm.RTService.changeLineHeightFromElement(vm.projectId, index, lineHeight);
		vm.expandable(index);
	}

	vm.changeMarginTop = function (marginTop) {
		var index = vm.RTService.getSelectedElemId();
    console.log('** changeMarginTop', 'vm.projectId', vm.projectId, 'index', index, 'marginTop', marginTop)
		vm.RTService.changeMarginTopFromElement(vm.projectId, index, marginTop);
		// vm.expandable(index);
	}

	vm.changeMarginBottom = function (marginBottom) {
		var index = vm.RTService.getSelectedElemId();
    console.log('** changeMarginBottom', 'vm.projectId', vm.projectId, 'index', index, 'marginBottom', marginBottom)
		vm.RTService.changeMarginBottomFromElement(vm.projectId, index, marginBottom);
		// vm.expandable(index);
	}

	vm.changeFontFamily = function (fontFamily) {
		var index = vm.RTService.getSelectedElemId();
    console.log('** changeFontFamily', 'vm.projectId', vm.projectId, 'index', index, 'fontFamily', fontFamily)
		vm.RTService.changeFontFamilyFromElement(vm.projectId, index, fontFamily);
		vm.expandable(index);
	}

	vm.changeTextColor = function (color) {
		var index = vm.RTService.getSelectedElemId();
    console.log('** changeTextColor', 'vm.projectId', vm.projectId, 'index', index, 'color', color)
		vm.RTService.changeTextColorFromElement(vm.projectId, index, color);
		// vm.expandable(index);
	}

	vm.changeBgColor = function (color) {
		var index = vm.RTService.getSelectedElemId();
    console.log('** changeBgColor', 'vm.projectId', vm.projectId, 'index', index, 'color', color)
		vm.RTService.changeBgColorFromElement(vm.projectId, index, color);
		// vm.expandable(index);
	}

	vm.expandable = function(index) {
		var textarea = document.getElementById('elem-' + (index));
		// console.log('textarea', textarea);

		textarea.style.height = "";
		textarea.style.height = (textarea.scrollHeight + 10) + "px";
	};

}]);
