(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItCtrl = this;

  narrowItCtrl.searchTerm='hola';
  
  narrowItCtrl.narrowItDown = function (description) {
	console.log("button narrowItDown pressed");
    var promise = MenuSearchService.getMatchedMenuItems(description);

    promise.then(function (response) {
	  narrowItCtrl.items = response.data.menu_items;
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


    /*
	  var menuItemsLength = response.data.menu_items.length;
	  console.log("menuItemsLength: " + menuItemsLength);
	  for (var i = 0; i < menuItemsLength; i++) {
		 var item = response.data.menu_items[i];
		 console.log("item name: " + item.description);
		 if (item.description.indexOf()) {
			 items.push(item);
		 }
		 
	  };
	  */

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (description) {
	var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
	console.log("match " + description);
	console.log(response.data.menu_items);
    return response;
	
	/*
	var foundItems = [];
	console.log(response.menu_items);
	var menuItemsLength = response.menu_items.length;
	console.log("menuItemsLength: " + menuItemsLength);
    for (var i = 0; i < menuItemsLength; i++) {
		var item = response.menu_items[i];
		console.log("item name: " + item.description);
		if (item.description.indexOf(description)) {
			console.log("matched");
			foundItems.push(item);
		}
		 
	};
	return foundItems;
	*/
	
  };

}

})();
