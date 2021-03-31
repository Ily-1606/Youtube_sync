<?PHP
//$id = "QGV14x_8-eQ";
$id = "qiEid8TeDyU";
$data = youtube_info($id);
echo json_encode($data);
function youtube_info($id)
	{
		$vformat = "video/mp4"; 				// The MIME type of the video. e.g. video/mp4, video/webm, etc.
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