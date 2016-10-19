(function() {
  angular
    .module('myapp')  
    .controller('GalleryController', GalleryController);
  
  GalleryController.$inject = ['GalleryService'];
  
  function GalleryController(GalleryService){
	 var self=this;
	 self.current_page=1;      //page from JSON
	 self.active=false;
	 self.current_index=0;
	 
	 self.leftArrow=function(){
		 if (self.photos.length!==0){
		   if (self.current_index===0) {
			   self.current_index=self.photos.length-1;
		   } else {
			   self.current_index--;
		   }
		   self.selected_photo=self.photos[self.current_index];
		 }
	 };
	 
	 self.rightArrow=function(){
		 if (self.photos.length!==0){
		   if (self.current_index===self.photos.length-1) {
			   self.current_index=0;
		   } else {
			   self.current_index++;
		   }
		   self.selected_photo=self.photos[self.current_index];
		 }
	 };
	 
	 self.clickPhoto=function(index){
		self.current_index=index; 
		self.selected_photo=self.photos[index];
	 };
	 
	 self.clickPage=function(value){
		if (value==="...") {
		   return;
		} else if (value===">>") {
		   self.current_page+=10;
		   if (self.current_page>self.total_pages) {
			   self.current_page=self.total_pages;
		   }
		} else if (value==="<<") {
		   self.current_page-=10;
		   if (self.current_page<1) {
			 self.current_page=1;
		   }
		} else if (value==="Next") {
			self.current_page++;
		} else if (value==="Previous") {
			self.current_page--;
		} else {
			self.current_page=value; 
		}	 

		if (self.total_pages>6) {
		  if (self.current_page<self.total_pages-5) {
			  self.divs[8].content=self.current_page;
			  self.divs[7].content=self.current_page+1;
			  self.divs[6].content=self.current_page+2;
			  self.divs[5].content=self.current_page+3;
		  } else {
			  self.divs[8].content=self.total_pages-5;
			  self.divs[7].content=self.total_pages-4;
			  self.divs[6].content=self.total_pages-3;
			  self.divs[5].content=self.total_pages-2;
		  }
		}
		self.current_index=0;
		self.searchResults();
	 };
	 
	 function footerDivs(pages){
		if (pages>6) {
		   var divs=[
		   {content:">>",classname:"class-numbers"},
		   {content:"Next",classname:"class-numbers"},
		   {content:pages,classname:"class-numbers"},
		   {content:pages-1,classname:"class-numbers"},
		   {content:"...",classname:"class-points"},
		   {content:4,classname:"class-numbers"},
		   {content:3,classname:"class-numbers"},
		   {content:2,classname:"class-numbers"},
		   {content:1,classname:"class-numbers"},
		   {content:"Previous",classname:"class-numbers"},
		   {content:"<<",classname:"class-numbers"} ];
		} else {
		  var divs=[];	
		  for (var i=pages;i>0;i--) {
			  divs.push({content:i,classname:"class-numbers"});
		  }
		} 
		return divs;
	 }
	 
	 self.initialize=function(){
		self.searchResults().then(function() {
			self.current_index=0;   //as not to load temporarily the first image of the previous set
			self.current_page=1;
			var total=GalleryService.total_photos_number;
		    self.total_pages=total%15===0 ? total/15 : (total-total%15)/15+1;
			self.divs=footerDivs(self.total_pages);	
		});
		self.active=true;
		self.current_page=1;
	 };
	 
	 self.searchResults=function(){
		 return GalleryService.getPhotos(self.search_tag,self.current_page).then(function() {
			self.photos = GalleryService.photos;
			self.selected_photo=self.photos[0];
		 });
	 };
	 
	 self.searchResults().then(function(){
		 var total=GalleryService.total_photos_number;
		 self.total_pages=total%15===0 ? total/15 : (total-total%15)/15+1;
		 self.divs=footerDivs(self.total_pages);
	 });
  } 
})();