<?php
function youtube_info($id)
{
    $url = "http://youtube.com/get_video_info?video_id=".$id;
    parse_str(file_get_contents($url),$info);
    $info = json_decode($info["player_response"],true);
    $info = $info["videoDetails"];
    $data["title"] = $info["title"];
    $data["author"] = $info["author"];
    $data["chanel_id"] = $info["channelId"];
    return $data;
}

?>