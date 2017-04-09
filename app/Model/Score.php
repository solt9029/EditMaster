<?php
class Score extends AppModel{
	public function checkSaveData($save_data){
		$message="";

		if($save_data["username"]=="" || mb_strlen($save_data["username"])>20){
    		$message.="ユーザ名は必須項目です。20文字以内で入力してください。\n";
    	}

    	if(mb_strlen($save_data["comment"])>140){
    		$message.="コメントは140文字以内で入力してください。\n";
    	}

    	if($save_data["videoid"]=="" || $save_data["videoid"]=="error" || mb_strlen($save_data["videoid"])>60){
    		$message.="YouTubeの動画IDは必須項目です。間違えの無いよう入力してください。\n";
    	}

    	if(!is_numeric($save_data["bpm"]) || $save_data["bpm"]==""){
    		$message.="BPMは必須項目です。数字で入力してください。\n";
    	}

    	if(!is_numeric($save_data["offset"]) || $save_data["offset"]==""){
    		$message.="OFFSETは必須項目です。数字で入力してください。\n";
    	}

    	if(mb_strlen($save_data["nums"])>65535){
    		$message.="譜面の量が多すぎます。\n";
    	}

    	return $message;
	}
}