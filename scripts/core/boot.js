//constants


//memory
var globalMemory = {};
var elements = {};

//instanciate managers
var pagesManager = new PagesManager();
var apiManager = new ApiManager();
var websocket = new WebsocketManager();
var builder = new Builder();
var adapters = new Adapters();
var actions = new Actions();
var dataSources = new DataSources();

document.addEventListener("DOMContentLoaded", function(domEvt){
	actions.onBeforeBoot();
	
	//elements
	elements.pagesContainer = document.querySelector(config.pagesContainerSelector);
	elements.globalLoader = false;
    Utils.setDynamicLinks(document.body); //add links to template

	//manage landing page
	pagesManager.manageLanding();
	
	//load views
	if(config.preloadAllViews){
		pagesManager.preloadViews();
	}
	//preload css
	if(config.preloadAllCSS){
		pagesManager.preloadCSS();
	}

	//popstate event for history manipulation
	window.addEventListener("popstate", pagesManager.managePopState);

	actions.onAfterBoot();

	console.log("init complete");
});