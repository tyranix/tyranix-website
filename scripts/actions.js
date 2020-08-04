"use strict"
function Actions(){
    var _this = this;
    this.onHeadButtonClick = function(evt){
        pagesManager.changePage(globalMemory.headButtonTarget, {path:globalMemory.headButtonTargetPath});
    };
    //-------------------------------------------------------------------------------------
    //page actions on load
    //-------------------------------------------------------------------------------------
    this.onPageLoad = {};
    this.onPageLoad.welcome = function(){
        //mario go boooom
        marioQuality.addEventListener("click", blowUpMario);
        toyooo.addEventListener("click", blowUpMario);
        function blowUpMario(){
            marioQuality.addEventListener("load", explosionImageLoaded);
            toyooo.addEventListener("load", explosionImageLoaded);
            var srcSring = `/images/explosion.gif?cache=${Math.random()}`;
            marioQuality.src = srcSring;
            toyooo.src = srcSring;
            function explosionImageLoaded(evt){
                setTimeout(() => {
                    this.classList.add("none");
                    this.removeEventListener("load", explosionImageLoaded);
                }, 800);
            }
        }
    };
    this.onPageLoad.contact = function(){
        //images preloader
        var imagesToPreload = ["youtube.png", "twitch.png", "twitter.png", "instagram.png", "email.png"];
        imagesToPreload.forEach(img => {
            fetch(`/images/icons/${img}`);
        });
        contactForm.addEventListener("submit", evt => {
            evt.preventDefault();
            var email = "contact@tyranixtv.ch";
            var body = contactMessage.value
            var subject = `Demande de contact de ${contactName.value}`;
            var href=`mailto:${email}?${Utils.encodeQuery({subject, body})}`;
            window.location.href = href;
        });
    };
    //-------------------------------------------------------------------------------------
    //page actions on display
    //-------------------------------------------------------------------------------------
    this.onPageDisplay = {};
    this.onPageDisplay.error = function(){
        errorStatusCode.innerText = globalMemory.error.code;
        errorClientMsg.innerText = globalMemory.error.msg;
    };
    
    //page action on ANY page display
    this.onAnyPageDisplay = function({pageName = false, pageConfig = false}){
        //title
        pageTitle.textContent = (pageConfig.pageTitle || "TyranixTV");
        //menu select
        document.querySelectorAll("[data-selected-when]").forEach(elem => {
            if(elem.dataset.selectedWhen == pageName){
                elem.classList.add("selected");
            }else{
                elem.classList.remove("selected");
            }
        })
}

    //-------------------------------------------------------------------------------------
    //page actions on data
    //-------------------------------------------------------------------------------------
    this.onPageData = {};
    this.onPageData.welcome = function(){
        
    }
    
    //-------------------------------------------------------------------------------------
    //page specific methods
    //-------------------------------------------------------------------------------------
    this.pageMethods = {};
    this.pageMethods.welcome = function(){

    };

    //-------------------------------------------------------------------------------------
    //other actions
    //-------------------------------------------------------------------------------------
    this.onBeforeBoot = function () {
        //HTTPS check
        if(window.isSecureContext){
            return;
        }
		console.warn("insecure connection detected");
        const httpsWhitlelist = ["localhost", "127.0.0.1"];
		var isWhitelistedUrl = false;
		httpsWhitlelist.forEach(val=>{
			isWhitelistedUrl = (isWhitelistedUrl || window.location.href.includes(val));
		});
        if(!isWhitelistedUrl){
            console.warn("redirecting to https");
			if(window.location.href.includes("http:")){
				window.location = window.location.href.replace("http:", "https:");
			}else{
				window.location = `https://${document.location.href}`;
			}
        }
    };
    this.onAfterBoot = function () {
        menuToggler.addEventListener("click", evt => {
            evt.stopPropagation();
            document.body.classList.toggle("menu-open");
        });
        document.body.addEventListener("click", evt => {
            document.body.classList.remove("menu-open");
        });
        rightMenu.addEventListener("click", evt => {
            console.log(evt.target.nodeName == "A")
            if(evt.target.nodeName != "A"){
                evt.stopPropagation();
            }
        });
    };
    this.onWebsocketConnection = function () {
        
    };
}