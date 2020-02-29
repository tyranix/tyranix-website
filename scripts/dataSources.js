"use strict";
function DataSources() {
    this.youtubeChannelVideos = async function () {
        var res = await apiManager.call("www.googleapis.com/youtube/v3/search", {
            urlParams: {
                key: 'AIzaSyBE0Z6KyM_EKvPrOYvO5ZhNnZUYQaTgJsU',
                channelId: 'UCNOddurlcb_LQ_eag1mgVSg',
                part: 'snippet,id',
                order: 'date'
            }
        });
        console.log(res);
        if (!res.ok) {
            console.warn("hmmmmmm", res);
            return false;
        }
        var items = res.data.items;
        var videos = items.map(item => {
            return {
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                date: new Date(item.snippet.publishedAt),
                thumbnails: item.snippet.thumbnails,
            }
        });
        console.log("videos", videos);
        return videos;
    }
}