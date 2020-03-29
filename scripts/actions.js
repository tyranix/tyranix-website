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
    this.onPageLoad.welcome = function(){};
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
            evt.stopPropagation();
        });
    };
    this.onWebsocketConnection = function () {
        
    };
}