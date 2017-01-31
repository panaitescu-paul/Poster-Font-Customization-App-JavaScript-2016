var myapp = angular.module('Application', ['firebase', 'ui.router']);



myapp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('overview', {
    url: "/overview",
    views: {
      "overviewView": {
        templateUrl: 'app/views/overviewView.html',
        controller: 'OverviewController',
      }
    }
  })
  .state('project', {
    url: "/project/:projectId", 
    views: {
      "projectView": {
        templateUrl: 'app/views/projectView.html',
        controller: 'ProjectController',
      }
    }
  });
  $urlRouterProvider.otherwise('/overview');
  console.log($stateProvider);
}]);

console.log('app.js');

/* -------------------------------------- SERVICE ---------------------------------------------------*/


myapp.service('RenderService', function ($firebaseArray, $q) {
  return {
    capture: function (elem) {
      var p = $q.defer();

      html2canvas(elem, {
        onrendered: function(canvas) {
          var img = canvas.toDataURL("image/png");
          p.resolve(img);
        }
      });

      return p.promise;
    }
  };
});

myapp.service('RTService', function ($firebaseArray, $q) {

  function RT (APIHandle) {
    var self = this;

    this.isLoaded = $q.defer();
    this.selectedProjectId = null;
    this.selectedElemId = null;
    this.elementStyleChange = false;
    this.ref = new Firebase('https://' + APIHandle + '.firebaseio.com');

    this.projects = $firebaseArray(this.ref.child('projects'));
    this.projects.$loaded()
    .then(function(x) {
      console.log('X', x)
        self.isLoaded.resolve();
      })
    .catch(function(error) {
      console.log("Error:", error);
      self.isLoaded.reject();
    });
  };

  RT.prototype.loaded = function() {
    return this.isLoaded.promise;
  };

  RT.prototype.addProject = function(obj) {
    var p = $q.defer();
    var ref = this.projects.$ref();
    var list = $firebaseArray(ref);
    list.$add(obj).then(function(ref) {
      var id = ref.key();
      console.log("added record with id " + id);
      console.log("location in the array " + list.$indexFor(id));
      p.resolve(id);
    }, p.reject);
    return p.promise;
  };

  RT.prototype.addElementToProject = function(projectId, elemIndex, elem) {
    console.log(this.projects, projectId);
    console.log(this.projects.$getRecord(projectId));
    console.log(elemIndex);
    console.log(elem);

    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    projectRef.elements = Array.isArray(projectRef.elements)
      ? projectRef.elements
      : [];
    projectRef.elements.splice(elemIndex + 1, 0, elem);
    // END OPERATION

    // save
    return this.projects.$save(projectRef);
  };

  RT.prototype.updateElementFromProject = function(projectId, elemIndex, elem) {
    console.log(this.projects, projectId, this.projects.$getRecord(projectId), elem);

    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    projectRef.elements[elemIndex] = elem;
    // END OPERATION

    // save
    return this.projects.$save(projectRef);
  };


  RT.prototype.removeElementFromProject = function(projectId, elemIndex) {
    console.log('=== ',projectId, 'INDEX', elemIndex)
    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    console.log('=== length1' , projectRef.elements.length)
    projectRef.elements.splice(elemIndex, 1);
    console.log('=== length2' , projectRef.elements.length)
    // END OPERATION

    // save
    var self = this;
    return this.projects.$save(projectRef);
  };

  RT.prototype.changeTextSizeFromElement = function(projectId, elemIndex, textSize) {
    console.log('changeTextSizeFromElement', 'elemIndex', elemIndex, 'textSize', textSize)
    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    console.log('=== size 1' , projectRef.elements[elemIndex].style.text_size);
    projectRef.elements[elemIndex].style.text_size = textSize;
    console.log('=== size 2' , projectRef.elements[elemIndex].style.text_size)
    this.elementStyleChange = true;
    // END OPERATION

    // save
    var self = this;
    return this.projects.$save(projectRef);
  };

  RT.prototype.changeLineHeightFromElement = function(projectId, elemIndex, lineHeight) {
    console.log('changeLineHeightFromElement', 'elemIndex', elemIndex, 'lineHeight', lineHeight)
    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    console.log('=== size 1' , projectRef.elements[elemIndex].style.line_height);
    projectRef.elements[elemIndex].style.line_height = lineHeight;
    console.log('=== size 2' , projectRef.elements[elemIndex].style.line_height)
    this.elementStyleChange = true;
    // END OPERATION

    // save
    var self = this;
    return this.projects.$save(projectRef);
  };

  RT.prototype.changeMarginTopFromElement = function(projectId, elemIndex, marginTop) {
    console.log('changeMarginTopFromElement', 'elemIndex', elemIndex, 'marginTop', marginTop)
    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    console.log('=== size 1' , projectRef.elements[elemIndex].style.margin_top);
    projectRef.elements[elemIndex].style.margin_top = marginTop;
    console.log('=== size 2' , projectRef.elements[elemIndex].style.margin_top)
    this.elementStyleChange = true;
    // END OPERATION

    // save
    var self = this;
    return this.projects.$save(projectRef);
  };

  RT.prototype.changeMarginBottomFromElement = function(projectId, elemIndex, marginBottom) {
    console.log('changeMarginBottomFromElement', 'elemIndex', elemIndex, 'marginBottom', marginBottom)
    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    console.log('=== size 1' , projectRef.elements[elemIndex].style.margin_bottom);
    projectRef.elements[elemIndex].style.margin_bottom = marginBottom;
    console.log('=== size 2' , projectRef.elements[elemIndex].style.margin_bottom)
    this.elementStyleChange = true;
    // END OPERATION

    // save
    var self = this;
    return this.projects.$save(projectRef);
  };

  RT.prototype.changeFontFamilyFromElement = function(projectId, elemIndex, fontFamily) {
    console.log('changeFontFamilyFromElement', 'elemIndex', elemIndex, 'fontFamily', fontFamily)
    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    console.log('=== size 1' , projectRef.elements[elemIndex].style.font_family);
    projectRef.elements[elemIndex].style.font_family = fontFamily;
    console.log('=== size 2' , projectRef.elements[elemIndex].style.font_family);
    this.elementStyleChange = true;
    // END OPERATION

    // save
    var self = this;
    return this.projects.$save(projectRef);
  };

  RT.prototype.changeTextColorFromElement = function(projectId, elemIndex, color) {
    console.log('changeTextColorFromElement', 'elemIndex', elemIndex, 'color', color)
    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    console.log('=== size 1' , projectRef.elements[elemIndex].style.color);
    projectRef.elements[elemIndex].style.color = color;
    console.log('=== size 2' , projectRef.elements[elemIndex].style.color);
    this.elementStyleChange = true;
    // END OPERATION

    // save
    var self = this;
    return this.projects.$save(projectRef);
  };

  RT.prototype.changeBgColorFromElement = function(projectId, elemIndex, color) {
    console.log('changeBgColorFromElement', 'elemIndex', elemIndex, 'color', color)
    // get obj
    var projectRef = this.projects.$getRecord(projectId);

    // OPERATION
    console.log('=== size 1' , projectRef.elements[elemIndex].style.bg_color);
    projectRef.elements[elemIndex].style.bg_color = color;
    console.log('=== size 2' , projectRef.elements[elemIndex].style.bg_color);
    this.elementStyleChange = true;
    // END OPERATION

    // save
    var self = this;
    return this.projects.$save(projectRef);
  };

  RT.prototype.selectElemId = function(id) {
    this.selectedElemId = id;
    console.log('this.selectedElemId', this.selectedElemId);
  };

  RT.prototype.getSelectedElemId = function() {
    if (this.selectedElemId === null) {
      return null;
    } else return this.selectedElemId;
  };

  RT.prototype.getSelectedElemStyleChange = function() {

    if (this.elementStyleChange === true) {
      return true;
    } else return false;
  };


  var service = new RT('reengineertype');
  return service;
});





