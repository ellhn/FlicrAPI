(function() {
  angular
    .module('myapp')  
	.directive('searchDirective', searchDirective)
    .directive('mainPhotoDirective', mainPhotoDirective)
	.directive('photoDirective', photoDirective)
	.directive('footerDirective', footerDirective);
  
  function searchDirective(){
	 return {
		 templateUrl:'frame1.html'	 
	 }
  } 
  
  function mainPhotoDirective(){
	 return {
		 templateUrl:'frame2.html'	 
	 }
  } 
  
  function photoDirective(){
	 return {
		 templateUrl:'frame3.html'	 
	 }
  } 
  
  function footerDirective(){
	 return {
		 
		 link: function(scope,elements,attributes){
			 function createDiv(content,cname){
				var new_div=document.createElement("div"); 
				new_div.innerHTML=content;
				new_div.className=cname;
				elements[0].appendChild(new_div); 
			 }
			 scope.$watch('gallery.total_pages', function() {
			   if (scope.gallery.total_pages<=7 && scope.gallery.total_pages!==undefined){
				  for (var i=scope.gallery.total_pages;i>=1;i--) {
					createDiv(i,"class-numbers");
				  }
			   } else if (scope.gallery.total_pages>7 && scope.gallery.total_pages!==undefined){
				   for (var i=scope.gallery.total_pages;i>=scope.gallery.total_pages-1;i--) {
				      createDiv(i,"class-numbers");
				   }
				   for (var i=4;i>=1;i--) {
					  createDiv(i,"class-numbers");
				   }
			   }
			 })
		 }
	 }
  } 
})();