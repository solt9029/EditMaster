<!DOCTYPE html>
<html>
<head>
	<?php echo $this->element("meta"); ?>
	<!-- phpとjsの変数の関連付け -->
	<script>
	const SAVE_URL="<?php echo $this->Html->url('/Scores/save'); ?>";
	const INDEX_URL="<?php echo $this->Html->url('/Scores/index'); ?>";
	const VIEW_URL="<?php echo $this->Html->url('/Scores/view'); ?>";
	let comment="<?php if(isset($comment))echo $comment; ?>";
	let userName="<?php if(isset($user_name))echo $user_name; ?>";
	let videoId="<?php if(isset($video_id))echo $video_id; ?>";
	let bpm="<?php if(isset($bpm))echo $bpm; ?>";
	let offset="<?php if(isset($offset))echo $offset; ?>";
	const COL_NUM=48;
	let nums=[];
	nums[0]=[];
	for(let c=0; c<COL_NUM; c++){
		nums[0][c]=0;
	}
	<?php
	if(isset($array_nums)){
		for($r=0; $r<count($array_nums); $r++){
			echo "nums[{$r}]=[];";
			for($c=0; $c<count($array_nums[0]); $c++){
				echo "nums[{$r}][{$c}]={$array_nums[$r][$c]};";
			}
		}
	}
	?>
	</script>

	<!-- libraries -->
	<?php 
	echo $this->Html->script("jquery"); 
	echo $this->Html->css("split-pane");
	echo $this->Html->css("pretty-split-pane");
	echo $this->Html->script("split-pane");
	echo $this->Html->css("bootstrap");
	echo $this->Html->script("bootstrap");
	echo $this->Html->script("jquery.exresize");
	echo $this->Html->css("jquery-ui");
	echo $this->Html->script("jquery-ui");
	echo $this->Html->css("validationEngine.jquery.css");
	echo $this->Html->script("jquery.validationEngine-en.js");
	echo $this->Html->script("jquery.validationEngine-ja.js");
	echo $this->Html->script("jquery.validationEngine.js");
	echo $this->Html->script("jquery.ba-throttle-debounce");
	?>
	<script src="https://www.youtube.com/iframe_api"></script>
	<!-- libraries -->

	<?php
	echo $this->Html->css("style");
	echo $this->Html->css("edit");
	echo $this->Html->script("Note");
	echo $this->Html->script("Editor");
	echo $this->Html->script("Player");
	echo $this->Html->script("Shot");
	echo $this->Html->script("edit");
	?>

</head>
<body>
	<nav class="navbar navbar-default navbar-fixed-top banner">
  		<div class="container">
    		<div class="navbar-header">
      			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        			<span class="sr-only">Toggle navigation</span>
        			<span class="icon-bar"></span>
        			<span class="icon-bar"></span>
        			<span class="icon-bar"></span>
      			</button>
      			<?php echo $this->Html->link("","/Scores/index",array('class'=>array('navbar-brand',"logo"))); ?>
     			<a id="gotoIndex" class="navbar-brand">創作の達人</a>
    		</div>
    		<div id="navbar" class="collapse navbar-collapse">
      			<ul class="nav navbar-nav">
       				<li class="active"><a>創作</a></li>
       				<li><a id="gotoView">作品一覧</a></li>
       				<li><?php echo $this->Html->link("ヘルプ","/Scores/help",array("target"=>"_blank")); ?></li>
      			</ul>
      			<form class="navbar-form">
      				<a href="#" id="download" class="btn btn-md btn-info">太鼓さん次郎エクスポート</a>
				    <a id="save" class="btn btn-md btn-warning">保存</a>
				</form>
    		</div>
  		</div>
	</nav>

	<div class="modal fade" id="modal">
  		<div class="modal-dialog">
    		<div class="modal-content">
      			<div class="modal-header">
        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        				<span aria-hidden="true">&times;</span>
        			</button>
        			<h4 class="modal-title">保存が完了しました</h4>
      			</div>
      			<div class="modal-body">
      				<!-- サムネイル画像が入る -->
      				<?php echo $this->Html->image("modal.png",array("class"=>"img-responsive")); ?>
      			</div>
      			<div class="modal-footer">
        			<button type="button" class="btn btn-success btn-block" data-dismiss="modal">
        				続けて編集
        			</button>
        			<button id="tweet" class="btn btn-info btn-block">
        				ツイート
        			</button>
        			<a href="<?php echo $this->Html->url('/Scores/view'); ?>" class="btn btn-warning btn-block">
        				作品一覧
        			</a>
       			</div>
    		</div>
  		</div>
	</div>

	<div class="content">
		<div class="pretty-split-pane-frame">
			<div class="split-pane fixed-bottom">

				<div class="split-pane-component" id="top-component">
					<div class="pretty-split-pane-component-inner inner" id="top-component-inner">
						<span id="noscriptAlert">
							この文章が表示され続ける場合はリロードしてください。
						</span>
						<canvas id="playCanvas" width="480" height="400"></canvas>
						<div id="slider" height="13"></div>
					</div>
				</div>

				<div class="split-pane-divider" id="h-divider"></div>

				<div class="split-pane-component" id="bottom-component">
					<div class="split-pane fixed-left">
						<div class="split-pane-component" id="left-component">
							<div class="pretty-split-pane-component-inner inner">
								<div id="video" class="display-none"></div>
								<div id="form" class="form">
									<div class="form-group">
										<label>ユーザ名</label>
							            <input type="text" id="userName" class="validate[required,maxSize[20]] form-control" data-prompt-position="topLeft" placeholder="ユーザ名">
							        </div>
							        
							        <div class="form-group">
							        	<label>YouTubeの動画ID</label>
							        	<input type="text" id="videoId" value="JmoIu3NV5-w" class="validate[required,maxSize[60]] form-control" data-prompt-position="topLeft" placeholder="YouTubeの動画ID" value="PqJNc9KVIZE">
							        </div>

							        <div class="form-group">
							        	<label>BPM</label>
							        	<input type="text" id="bpm" value="138" class="validate[required] form-control" data-prompt-position="topLeft" placeholder="BPM" value="150">
							        </div>

							        <div class="form-group">
							        	<label>OFFSET</label>
							        	<input type="text" id="offset" value="4.15" class="validate[required] form-control" data-prompt-position="topLeft" placeholder="OFFSET(曲の始まりの時間)" value="12">
							        </div>

							        <div class="form-group">
							        	<label>コメント</label>
							        	<input type="text" id="comment" class="validate[maxSize[140]] form-control" data-prompt-position="topLeft" placeholder="コメント">
							        </div>

							        <div class="form-group">
								   		<button class="btn btn-success btn-lg btn-block" id="addRow">行を追加</button>
								   		<button class="btn btn-danger btn-lg btn-block" id="delRow">行を削除</button>
								   	</div>

							    </div>
							</div>
						</div>

						<div class="split-pane-divider" id="v0-divider"></div>

						<div class="split-pane-component" id="right-component">
							<div class="split-pane fixed-right">

								<div class="split-pane-component" id="inner-left-component">
									<div class="pretty-split-pane-component-inner inner" id="inner-left-component-inner">
										<canvas id="editCanvas" width="480" height="800"></canvas>
									</div>
								</div>

								<div class="split-pane-divider" id="v1-divider"></div>

								<div class="split-pane-component" id="inner-right-component">
									<div class="pretty-split-pane-component-inner inner" id="inner-right-component-inner">

										<div class="form form-top">

									        <label>種類</label>
									        
									        <div class="col-xs-3 kind">
									        	<button class="btn btn-danger btn-sm btn-block" id="kind1">
									        		どん
	 												<img class="card-img-top img-responsive" src="../img/don.png">
									        	</button>
									        </div>

									        <div class="col-xs-3 kind">
									        	<button class="btn btn-primary btn-sm btn-block" id="kind2">
									        	かっ
									        	<img class="card-img-top img-responsive" src="../img/ka.png">
									        	</button>
									        </div>

									        <div class="col-xs-3 kind">
									        	<button class="btn btn-danger btn-sm btn-block" id="kind3">
									        		大どん<img class="card-img-top img-responsive" src="../img/bigdon.png">
									        	</button>
									        </div>

									        <div class="col-xs-3 kind">
									        	<button class="btn btn-primary btn-sm btn-block" id="kind4">
									        	大かっ<img class="card-img-top img-responsive" src="../img/bigka.png">
									        	</button>
									        </div>

									        <div class="col-xs-3 kind">
									        	<button class="btn btn-warning btn-sm btn-block" id="kind5">
									        		連打
	 												<img class="card-img-top img-responsive" src="../img/renda.png">
									        	</button>
									        </div>

									        <div class="col-xs-3 kind">
									        	<button class="btn btn-warning btn-sm btn-block" id="kind6">
										        	大連打
										        	<img class="card-img-top img-responsive" src="../img/bigrenda.png">
									        	</button>
									        </div>

									        <div class="col-xs-3 kind">
									        	<button class="btn btn-danger btn-sm btn-block" id="kind7">
									        		風船
									        		<img class="card-img-top img-responsive" src="../img/balloon.png">
									        	</button>
									        </div>

									        <div class="col-xs-3 kind">
									        	<button class="btn btn-default btn-sm btn-block" id="kind0">
										        	空白
										        	<img class="card-img-top img-responsive" src="../img/space.png">
									        	</button>
									        </div>
									    </div>

									    <div class="form">
									    	<label>1小節当たりの分割数</label>
									        <div class="col-xs-3 divider">
									        	<button class="btn btn-default btn-lg btn-block ka-btn" id="divider12">
										        	12
									        	</button>
									        </div>
									        <div class="col-xs-3 divider">
									        	<button class="btn btn-default btn-lg btn-block ka-btn" id="divider16">
										        	16
									        	</button>
									        </div>
									        <div class="col-xs-3 divider">
									        	<button class="btn btn-default btn-lg btn-block ka-btn" id="divider24">
										        	24
									        	</button>
									        </div>
									        <div class="col-xs-3 divider">
									        	<button class="btn btn-default btn-lg btn-block ka-btn" id="divider48">
										        	48
									        	</button>
									        </div>
									    </div>

									    
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>

