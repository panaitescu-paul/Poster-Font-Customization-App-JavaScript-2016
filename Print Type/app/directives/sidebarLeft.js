myapp.component('sidebarLeft', {

	bindings: {
		data: '<',
		selectedElemId: '<',
		projectId: '<'
	},
	controller: 'sidebarLeftController as vm',
	templateUrl: "/app/templates/sidebarLeft.html"

})

myapp.controller('sidebarLeftController', ['RTService', '$timeout', function(RTService, $timeout) {
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


	vm.LAYER_STYLES = [
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Cormorant SC', serif",
			line_height: '75',
			text_size: 70,
			text: 'Cormorant SC',
		},
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Josefin Slab', serif",
			line_height: '42',
			text_size: 32,
			text: 'Josefin Slab',
		},
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Anton', sans-serif",
			line_height: '65',
			text_size: 40,
			text: 'Anton',
		},
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Abril Fatface', cursive",
			line_height: '95',
			text_size: 70,
			text: 'Abril',
		},
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Cormorant Infant', serif",
			line_height: '33',
			text_size: 20,
			text: 'Cormorant Infant',
		},
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Gravitas One', cursive",
			line_height: '66',
			text_size: 38,
			text: 'Gravitas One',
		},
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Cinzel', serif",
			line_height: '50',
			text_size: 26,
			text: 'Cinzel',
		},
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Reem Kufi', sans-serif",
			line_height: '34',
			text_size: 18,
			text: 'Reem Kufi',
		},
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Cormorant Garamond', serif",
			line_height: '44',
			text_size: 24,
			text: 'Cormorant Garamond',
		},
		{
			bg_color: '#ffffff',
			color: '#000000',
			font_family: "'Poiret One', cursive",
			line_height: '105',
			text_size: 75,
			text: 'Poiret One',
		},
	];

	vm.changeStyle = function (styleIndex) {
		var index = vm.RTService.getSelectedElemId();
    console.log('** changeStyle', 'vm.projectId', vm.projectId, 'index', index, 'styleIndex', styleIndex)

		var textSize = vm.LAYER_STYLES[styleIndex].text_size;
		var lineHeight = vm.LAYER_STYLES[styleIndex].line_height;
		var fontFamily = vm.LAYER_STYLES[styleIndex].font_family;
		var color = vm.LAYER_STYLES[styleIndex].color;
		var bg_color = vm.LAYER_STYLES[styleIndex].bg_color;
		vm.RTService.changeTextSizeFromElement(vm.projectId, index, textSize);
		vm.RTService.changeLineHeightFromElement(vm.projectId, index, lineHeight);
		vm.RTService.changeFontFamilyFromElement(vm.projectId, index, fontFamily);
		vm.RTService.changeTextColorFromElement(vm.projectId, index, color);
		vm.RTService.changeBgColorFromElement(vm.projectId, index, bg_color);

		$timeout(function() {
			vm.expandable(index);
		}, 10);
	}

	vm.expandable = function(index) {
		var textarea = document.getElementById('elem-' + (index));
		console.log('expandable shange styles - sidebar Left');
		console.log('textarea', textarea);

		textarea.style.height = "";
		textarea.style.height = (textarea.scrollHeight + 10) + "px";
	};

}]);