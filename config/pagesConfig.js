var pagesConfig = {
    error: {
        title: "Error"
    },
    welcome: {
        title: "Welcome"
    },
    stream: {
        pageTitle: "Stream",
        title: "Stream"
    },
    videos:{
        title: "Vidéos",
        pageTitle: "Vidéos",
        // refreshDataOnDisplay: true,
        data:{
            source: 'youtubeChannelVideos',
            container: '#videosContainer',
            adapter: 'youtubeVideo'
        }
    },
    contact:{
        pageTitle: "Contact",
        title: "Contact"
    },
};