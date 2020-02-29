var pagesConfig = {
    error: {
        title: "Error"
    },
    welcome: {
        title: "Welcome"
    },
    stream: {
        title: "Stream"
    },
    videos:{
        title: "Vidéos",
        // refreshDataOnDisplay: true,
        data:{
            source: 'youtubeChannelVideos',
            container: '#videosContainer',
            adapter: 'youtubeVideo'
        }
    },
    contact:{
        title: "Contact"
    },
    connection:{
        title: "Connexion"
    }
};