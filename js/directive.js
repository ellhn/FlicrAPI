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
  
  function footerDirective($compile){
	  return {
		 templateUrl:'frame4.html'	 
	 }
  } 
})();