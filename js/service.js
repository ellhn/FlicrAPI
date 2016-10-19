(function() {
  angular
    .module('myapp',[])  
    .service('GalleryService', GalleryService);
  
  GalleryService.$inject = ['$http'];
  
  function GalleryService($http){
	var url = "https://api.flickr.com/services/rest/";
	var self=this;
	 
//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c4e2f731926eefa6fe1d3e9c2c9f9449&tags=chocolate&per_page=15&page=2&format=json&jsoncallback=JSON_CALLBACK
	this.getPhotos=function(choice,page) {
	  var params_value={	
		api_key:'c4e2f731926eefa6fe1d3e9c2c9f9449',
		per_page:15,
		page:page,
		format:'json',
		jsoncallback:'JSON_CALLBACK'
	  };
	  if (choice==='' || choice===undefined) {
		params_value.method= 'flickr.photos.getRecent'; 
	  } else {
		 params_value.tags=choice;
		 params_value.method='flickr.photos.search'; 
	  }
	  return $http.jsonp(url, {
		params: params_value
	  }).then(handleResponse,handleError);
	};
	
	function handleResponse(response) {	
	  self.photos = retrievePhotoURLs(response.data);
	  self.total_photos_number=response.data.photos.total;
	}  
	
	function handleError() {
	  console.log('Error retrieving JSON data');	
	}
	
	function retrievePhotoURLs(data) {
		return data.photos.photo.map(constructLink);
	}
	
	function constructLink(element){
		//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
		return "http://farm"+element.farm+".staticflickr.com/"+element.server+"/"+element.id+"_"+element.secret+".jpg";
	}
  }
})();