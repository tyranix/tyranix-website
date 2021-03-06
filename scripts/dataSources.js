"use strict";
function DataSources() {
    this.youtubeChannelVideos = async function() {
        if (config.dev_no_internet) {
            return Array(20).fill({
                id: false,
                title: "sample title",
                description: "sample description",
                date: new Date(),
                thumbnails: false
            });
        }
        var res = await apiManager.call(
            "www.googleapis.com/youtube/v3/search",
            {
                urlParams: {
                    key: "AIzaSyBE0Z6KyM_EKvPrOYvO5ZhNnZUYQaTgJsU",
                    channelId: "UCNOddurlcb_LQ_eag1mgVSg",
                    part: "snippet,id",
                    order: "date",
                    maxResults: 50
                }
            }
        );
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
                thumbnails: item.snippet.thumbnails
            };
        });
        console.log("videos", videos);
        return videos;
    };
}
