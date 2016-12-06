(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
	  myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
	/*
  list.cookiesInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
  */
}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItCtrl = this;
  
  narrowItCtrl.title = "Found List";
  
  narrowItCtrl.narrowItDown = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function (response) {
	  narrowItCtrl.found = response;
    })
    .catch(function (error) {
      console.log(error);
    })
  };
  
  narrowItCtrl.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + narrowItCtrl.found[itemIndex].name;
	console.log("lastRemoved: " + this.lastRemoved);
    narrowItCtrl.found.splice(itemIndex, 1);
  };

}

/**
* Service to retrieve list item 
*/
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  /**
  * Get list item that match to searchTerm
  */
  service.getMatchedMenuItems = function (searchTerm) {
	return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {
		//Filtering the response items by searchTerm
		var foundItems = [];
		var menuItemsLength = response.data.menu_items.length;
		//console.log("menuItemsLength: " + menuItemsLength);
		for (var i = 0; i < menuItemsLength; i++) {
			var item = response.data.menu_items[i];
			if (item.description.indexOf(searchTerm) !== -1) {
				//console.log("matched: " + item.description + " == " + searchTerm);
				foundItems.push(item);
			}
		};
		return foundItems;
    });
  };

}

})();
