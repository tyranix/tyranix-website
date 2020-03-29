function Adapters(){
    this.youtubeVideo = function(container, data){
        var elem = container.addElement("div", {class: "youtubeVideoAdapter", 'data-videoId': data.id});
        if(data.id){
            var iframe = elem.addElement('iframe', {class: 'videoFrame', src: `https://www.youtube.com/embed/${data.id}`, allowfullscreen: true});
        }else{
            var iframe = elem.addElement('iframe', {class: 'videoFrame'});            
        }
            // var thumbnail = elem.addElement("div", {class: "videoThumbnail", style: `background-image: url(${data.thumbnails.default.url})`});
        var sideSection = elem.addElement("div", {class: 'videoSideSection'});
        var title = sideSection.addElement("a", {class:"videoTitle", href:`https://www.youtube.com/watch?v=${data.id}`, _textContent: data.title});
        var description = sideSection.addElement("p", {class: "videoDescription", _textContent: data.description});
        return elem;
    }
    
	//adapter for when there is no data to display.
	this.noData = function(container, data){
		var box = container.addElement("div", {class:"noDataContainer"});
		var text = box.addElement("p");
		text.innerText = config.messageNoData;
		return box;
	};
}