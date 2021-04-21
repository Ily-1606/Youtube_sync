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
function get_info_channel($id){
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://www.youtube.com/channel/$id/channels?flow=grid&view=0&pbj=1",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    'X-YouTube-Client-Name: 1',
    'X-YouTube-Client-Version: 2.20201021.03.00',
    'accept-language: en-US,en;q=0.9',
    'Cookie: GPS=1; VISITOR_INFO1_LIVE=A8_UJw5gweU; YSC=zX3xYRWjAyU'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
return $response;
}
?>