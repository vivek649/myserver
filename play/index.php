<?php
     error_reporting(0);
        $vidUrl = $_SERVER['REQUEST_URI'];
$videoVid = explode("vfy=", $vidUrl);
        $videoVid = $videoVid[1];
        $vidDeE = urldecode($videoVid);
        preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $vidDeE, $match);
$vidDe = $match[1];
        $vidEn = urlencode($videoVid);
$url = "https://vivekmasona.2.sg-1.fl0.io/hack?url=https://youtu.be/$vidDe";
if(!empty($vidDe)){
               
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
$resp = curl_exec($curl);
curl_close($curl);
 $jsonData = json_decode($resp);
//collecting basic data 
  
 $playLink = $jsonData->audioFormats[0]->url;
header("location:$playLink");              
}