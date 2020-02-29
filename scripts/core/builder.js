function Builder(){
    var _this = this;
	
	this.applyDataAdapter = function({container, adapter, data, contentLoader}){
		//hide loader
		contentLoader.remove();
		
		if(!data[0]){ //no data
			adapters.noData(container);
			return;
		};

		//loop over data
		for(var indData = 0; indData < data.length; indData++){
			//display adapter
			adapter(container, data[indData]);
		}
		
		//apply links
		Utils.setDynamicLinks(container);
	};

	//other
	this.addContentLoader = function(container, className = ""){
		var elem = container.addElement("div", {class:`contentLoader ${className}`});
		return {
			element: elem,
			remove: function(){elem.remove()}
		};
	};
} 