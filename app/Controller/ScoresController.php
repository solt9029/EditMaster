<?php

class ScoresController extends AppController{

    public $paginate=array(
        "limit"=>10,
        "order"=>array("Score.id"=>"DESC")
    );

	//トップ画面
	public function index(){
	}

    //ヘルプ画面
    public function help(){
    }

	//編集画面
	public function edit(){
		$id=$this->request->query("id");
        $env=env("WEB_APP_ENV");
        $this->set("env",$env);
		if(isset($id)){
			//loadして表示
            $load_data=$this->Score->find("first",array("conditions"=>array("Score.id"=>$id)));
            //リクエストされたidの譜面が見つからなかった場合
            if($load_data==null){
                $this->redirect(array("action"=>"edit"));
            }
            $this->set("comment",$load_data["Score"]["comment"]);
            $this->set("user_name",$load_data["Score"]["username"]);
            $this->set("video_id",$load_data["Score"]["videoid"]);
            $this->set("bpm",$load_data["Score"]["bpm"]);
            $this->set("offset",$load_data["Score"]["offset"]);
            $serialized_array_nums=$load_data["Score"]["nums"];
            $array_nums=unserialize($load_data["Score"]["nums"]);
            $this->set("array_nums",$array_nums);
		}
	}

	//保存処理
	public function save(){
		//ajaxからのアクセスでなければindexを表示する
        if(!$this->request->is('ajax')){
        	$this->redirect(array("action"=>"index"));
        }

        $input_json_data=$this->request->input();//jsonデータ
        $input_object_data=json_decode($input_json_data);//objectデータに変更

        $save_data=array(
        	"username"=>$input_object_data->username,
        	"comment"=>$input_object_data->comment,
        	"videoid"=>$input_object_data->videoid,
        	"bpm"=>$input_object_data->bpm,
        	"offset"=>$input_object_data->offset,
        	"nums"=>serialize($input_object_data->nums),
        	"date"=>date("Ymd")
        );

        $message=$this->Score->checkSaveData($save_data);

    	//何もバリデーションチェックに引っかからなかった場合保存する
    	if($message==""){
            $this->Score->save($save_data);
            $score=$this->Score->find("first",array("fields"=>"MAX(Score.id) as max_id"));
            $message="success".$score[0]["max_id"];
        }

        $this->response->body($message);

        return $this->response;
	}

	//一覧画面
	public function view(){
        $this->loadModel("YouTubeData");
        $this->loadModel("Twitter");
        $scores=$this->paginate("Score");

        for($i=0; $i<count($scores); $i++){
            //YouTubeのビデオタイトルを取得するのが遅いから今のところ中止
            //$scores[$i]["Score"]["videotitle"]=$this->YouTubeData->getTitle($scores[$i]["Score"]["videoid"]);

            //ユーザ名が＠から始まる場合はそのIDからTwitterのアイコンを取得する
            $first_letter=mb_substr($scores[$i]["Score"]["username"],0,1);
            $scores[$i]["Score"]["iconurl"]="http://editmaster.solt9029.com/img/don.png";//デフォルトのアイコン画像はどん
            if($first_letter==="@" || $first_letter==="＠"){
                $scores[$i]["Score"]["iconurl"]=$this->Twitter->getIcon(mb_substr($scores[$i]["Score"]["username"],1));
            }
        }

        $this->set("scores",$scores);
	}
}
?>