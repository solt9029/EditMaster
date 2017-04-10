function onYouTubeIframeAPIReady(){
	$(window).on('load',function(){
		const SONGLE_URL="https://widget.songle.jp/api/v1/song/beat.json?url=www.youtube.com/watch?v=";

		$('div.split-pane').splitPane();

		window.requestAnimationFrame=window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(cb){setTimeout(cb,1);};
		let editor=new Editor("editCanvas");
		let ytPlayer=new YT.Player("video",{
			videoId:"PqJNc9KVIZE",
		});
		let player=new Player("playCanvas",editor,"slider",ytPlayer);

		//クエリでidが指定されていた場合の初期設定
		$("#comment").val(comment);
		$("#userName").val(userName);
		//player.loadVideoId(videoId);//ロードにするとなんかエラー出る
		//ロードしてないから最初だけシークバーの長さがおかしい、
		$("#videoId").val(videoId);player.videoId=videoId;
		$("#bpm").val(bpm);player.bpm=bpm;
		$("#offset").val(offset);player.offset=offset;
		editor.setNotesFromNums(nums);

		//大きさを合わせる
		editor.fit("inner-left-component-inner");
		player.fit("top-component-inner");
		fitInnerRightComponent();

		$("#noscriptAlert").html("");//このスクリプトが起動していなかった場合の警告文を消す

		/***** kindとdividerのボタンについての処理 *****/
		let kind="1";//デフォルトはどん
		$("#kind1").css("opacity","0.3");
		let divider="16";//デフォルトは16分音符
		$("#divider16").css("opacity","0.3");
		const KIND_NUM=8;//譜面の種類数
		let dividers=[12,16,24,48];

		for(let i=0; i<KIND_NUM; i++){
			$("#kind"+i).click(function(){
				kind=i+"";
				//すべてのopacityを元に戻す
				for(let j=0; j<KIND_NUM; j++){
					$("#kind"+j).css("opacity","1.0");
				}
				//選択された奴だけ暗くする
				$("#kind"+i).css("opacity","0.3");
			});
		}

		for(let i=0; i<dividers.length; i++){
			$("#divider"+dividers[i]).click(function(){
				divider=dividers[i];
				for(let j=0; j<dividers.length; j++){
					$("#divider"+dividers[j]).css("opacity","1.0");
				}
				$("#divider"+dividers[i]).css("opacity","0.3");
			});
		}
		/***** kindとdividerのボタンについての処理 *****/


		$("#editCanvas").mousedown(function(e){
			if(e.which==1){
				editor.putNote(kind,divider);
			}else{
				editor.putNote(0,divider);//空白を置く
			}
			editor.fit("inner-left-component-inner");
		});

		//コンテクストメニューの非表示化
		$("#editCanvas").bind("contextmenu",function(e){
			return false;
		});

		//currentPositionをエディット画面に出すため
		$("#editCanvas").mousemove($.throttle(130,function(e){
			editor.fit("inner-left-component-inner");
			editor.drawCurrentPosition(e.offsetX,e.offsetY,divider);
			editor.mouseX=e.offsetX;
			editor.mouseY=e.offsetY;
			if(!player.playing)player.pause();
		}));

		$("#editCanvas").hover(function(){
		},function(){
			//hoverされていないときの処理
			editor.mouseX=-1;
			editor.mouseY=-1;
		});

		//フォームにフォーカスされたらマウス座標を－１にする
		$('input').focusin(function(e) {
      		editor.mouseX=-1;
      		editor.mouseY=-1;
    	});

		//あとから、getRow,putNote,drawCurrentPositionとかにはX座標Y座標の引数は必要ないかも
		$("body").keydown(function(e){
			if(e.keyCode>48 && e.keyCode<56){
				//0~7までの値を受け付ける
				let keyKind=(e.keyCode-48)+"";
				editor.putNote(keyKind,divider);
			}else if(e.keyCode==67){
				//Cが押されたとき
				editor.clipboard=editor.copyRow(editor.mouseY);
			}else if(e.keyCode==86 || e.keyCode==80){
				//VまたはPが押されたとき
				if(editor.clipboard.length==editor.COL_NUM){
					editor.pasteRow(editor.mouseY,editor.clipboard);
				}
			}
			editor.fit("inner-left-component-inner");
		});

		//プレイヤーの部分のcanvasをクリックしたら再生状態・停止状態をスイッチする
		$("#playCanvas").click(function(e){
			player.switch();
		});

		//エディタの行を追加する
		$("#addRow").click(function(){
			editor.addRow();
			editor.fit("inner-left-component-inner");
		});

		$("#delRow").click(function(){
			editor.delRow();
			editor.fit("inner-left-component-inner");
		});

		$("#download").click(function(){
			player.download("download");
		});

		$("#userName").keyup(function(){
			userName=$("#userName").val();
		});	

		$("#comment").keyup(function(){
			comment=$("#comment").val();
		});

		$("#videoId").keyup(function(){
			player.loadVideoId($("#videoId").val());

			//BPMとOFFSETを自動計算
			$.getJSON(SONGLE_URL+player.videoId).success(function(data){
				let offset=(data.bars[0].start-140.0)/1000.0;
				player.offset=offset;
				$("#offset").val(player.offset);
				//4小節目の3拍目から2小節目の0拍目までの間を平均する
				let interval=(data.bars[5].beats[3].start-data.bars[2].beats[0].start)/15.0;
				let bpm=60000.0/interval;
				player.bpm=bpm;
				$("#bpm").val(player.bpm);
			}).error(function(data){

			});
		});

		$("#bpm").keyup(function(){
			player.bpm=$("#bpm").val();
			player.fit("top-component-inner");
		});

		$("#offset").keyup(function(){
			player.offset=$("#offset").val();
			player.fit("top-component-inner");
		});

		$("#save").click(function(){
			let req={
				"username":userName,
				"comment":comment,
				"videoid":player.videoId,
				"bpm":player.bpm,
				"offset":player.offset,
				"nums":editor.getNumsFromNotes()
			};

			//すべての情報を保存するためにPOSTでTests/saveアクションにajax通信
			$.ajax({
			    type:"POST",
			    url:SAVE_URL,
			    data:JSON.stringify(req),
			    contentType:"json",
			    dataType:"text",
			    success:function(res){
			    	//何もエラーがなければ何か表示したあとリダイレクトみたいな感じが良いかなあ。livedoorブログみたいな感じがベスト   
			        if(res.indexOf("success")!=-1){
			        	$("#modal").modal();
			        	let id=res.substr(7);
			        	$("#tweet").click(function(){
			        		let tweetText="創作譜面をしました！";
			        		let tweetUrl=location.href.replace(/\?.*$/,"")+"?id="+id;
			        		let hashtags="創作の達人";
			        		let newWin=window.open("","child","width=600, height=300");
			        		newWin.location.href=("https://twitter.com/share?text="+tweetText+"&hashtags="+hashtags+"&url="+tweetUrl+"&count=none&lang=ja");
			        	});
			        }else{
			        	alert(res);
			        }
			    },
			    error:function(){
			        console.log("server error");
			    }
			});
		});

		$("#form").validationEngine();

		//スライダーの変化を読み取って、それに合わせてプレイ画面の背景を変更する
		let isSliderDragging=false;
		$("#slider").mousedown(function(){
			isSliderDragging=true;
		});	
		$("body").mousemove(function(){
			if(isSliderDragging && !player.playing){
				editor.fit("inner-left-component-inner");
				player.pause();
			}
		});
		$("body").mouseup(function(){
			isSliderDragging=false;
		});

		//ペインのリサイズに合わせてCanvasの幅・高さ変化
		$("#top-component-inner").exResize({
			api:true,
			callback:function(){
				player.fit("top-component-inner");
			}
		});

		$("#inner-left-component-inner").exResize({
			api:true,
			callback:function(){
				editor.fit("inner-left-component-inner");
			}
		});

		$("#inner-right-component").exResize({
			api:true,
			callback:fitInnerRightComponent
		});

		function fitInnerRightComponent(){
			const TWO_COL_W=250;
			const ONE_COL_W=150;
			let width=$("#inner-right-component").width();
			if(width<ONE_COL_W){
				$(".kind").removeClass("col-xs-6").removeClass("col-xs-3").addClass("col-xs-12");
				$(".divider").removeClass("col-xs-6").removeClass("col-xs-3").addClass("col-xs-12");
			}else if(width<TWO_COL_W){
				$(".kind").removeClass("col-xs-3").removeClass("col-xs-12").addClass("col-xs-6");
				$(".divider").removeClass("col-xs-3").removeClass("col-xs-12").addClass("col-xs-6");
			}else{
				$(".kind").removeClass("col-xs-6").removeClass("col-xs-12").addClass("col-xs-3");
				$(".divider").removeClass("col-xs-6").removeClass("col-xs-12").addClass("col-xs-3");
			}
		}
	});
}