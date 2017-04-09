<?php
class YouTubeData extends AppModel{
    //動画IDからタイトルを得る
	public function getTitle($video_id){
        $video_json_data=file_get_contents("https://www.googleapis.com/youtube/v3/videos?id=".$video_id."&key=".Configure::read("youtube_key")."&fields=items(id,snippet(channelTitle,title,thumbnails),statistics)&part=snippet,contentDetails,statistics");
        $video_object_data=json_decode($video_json_data);
        if(isset($video_object_data->items[0]->snippet->title)){
        	return $video_object_data->items[0]->snippet->title;
        }
        return "";
    }
}