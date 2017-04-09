class Player{
	constructor(canvasId,editor,sliderId,ytPlayer){
		this.canvas=document.getElementById(canvasId);
		this.ctx=this.canvas.getContext("2d");

		this.slider=$("#"+sliderId);

		this.editor=editor;//playerと同期する必要があるときのみこのプロパティを使用する

		this.NORMAL_SIZE=15;
		this.BIG_SIZE=20;
		this.DON_COLOR=this.editor.DON_COLOR;
		this.KA_COLOR=this.editor.KA_COLOR;
		this.RENDA_COLOR=this.editor.RENDA_COLOR;

		this.COL_NUM=this.editor.COL_NUM;//1小節当たりの譜面の数

		this.SLIDER_HEIGHT=14;

		this.scrollSpeed=10;

		this.offset=0;
		this.bpm=0;

		this.playing=false;

    	this.don=new Audio("../files/don.wav");
    	this.ka=new Audio("../files/ka.wav");

		this.notes=this.editor.notes;//editor内部の譜面とplayer内部の譜面を連動

		//とりあえず仮作成されるスライダー
		this.slider.slider({
			max:300,
			min:0,
			value:0,
			step:0.000001
		});

		this.ytPlayer=ytPlayer;//Youtubeプレイヤー
		this.videoId="error";//YoutubeのビデオID
		this.ytPlayer.addEventListener("onStateChange",this.adjustSlider.bind(this));
		this.ytPlayer.addEventListener("onError",this.isVideoIdValid.bind(this));

		this.loadingVideoId=false;

		this.shots=[];
		this.judgeTime=0;
	}

	isVideoIdValid(){
		this.videoId="error";
	}

	adjustSlider(event){
		if(!this.loadingVideoId)return;//新しいvideoIDの登録時以外はこのリスナは作動しない
		//event.dataが１のとき、再生
		if(event.data==1){
			this.slider.slider({
				max:this.ytPlayer.getDuration(),
				min:0,
				value:0,
				step:0.000001
			});
			this.ytPlayer.stopVideo();
			this.loadingVideoId=false;
		}
	}

	loadVideoId(videoId){
		this.loadingVideoId=true;
		this.videoId=videoId;
		//urlで書いてある場合でも対応できるように記述
		if(videoId.substr(0,4)=="http"){
			let startPos=videoId.indexOf("v=")+2;
			this.videoId=videoId.substr(startPos);
		}
		this.ytPlayer.loadVideoById({"videoId":this.videoId});
	}

	switch(){
		this.playing=!this.playing;
		if(this.playing){
			this.ytPlayer.loadVideoById({
				"videoId":this.videoId,
				"startSeconds":this.slider.slider("value")
			});
			this.play();
		}else{
			this.ytPlayer.stopVideo();
			//初期化
			for(let r=0; r<this.notes.length; r++){
				for(let c=0; c<this.COL_NUM; c++){
					this.notes[r][c].hit=false;
				}
			}
			this.pause();
		}
	}

	//ヒット判定部分の描画
	drawHitJudgePart(){
		//円の描画
        this.ctx.beginPath();
        this.ctx.strokeStyle="rgb(255,255,255)";
        this.ctx.arc(this.NORMAL_SIZE,this.canvas.height/2,this.NORMAL_SIZE,0,Math.PI*2,false);
        this.ctx.stroke();
        //プレイ中であれば一時停止マーク・停止中であればプレイマーク
        if(this.playing){
        	if(this.judgeTime>0){
        		//判定マークの枠線を黄色で太くする装飾
        		this.ctx.beginPath();
       			this.ctx.strokeStyle="rgb(255,255,0)";
       			this.ctx.arc(this.NORMAL_SIZE,this.canvas.height/2,this.NORMAL_SIZE,0,Math.PI*2,false);
       			this.ctx.lineWidth=5;
        		this.ctx.stroke();
        		this.ctx.lineWidth=1;

        		/*this.ctx.beginPath();
        		this.ctx.fillStyle="rgb(255,255,0)";
        		this.ctx.font="bold 22px 'ＭＳ Ｐゴシック'";
        		this.ctx.fillText("良",this.NORMAL_SIZE-11,this.canvas.height/2-22);*/

        		this.judgeTime--;
        	}
        	this.ctx.beginPath();
        	this.ctx.fillStyle="rgb(255,255,255)";
        	this.ctx.fillRect(this.NORMAL_SIZE*2/3,this.canvas.height/2-this.NORMAL_SIZE/2,this.NORMAL_SIZE/5,this.NORMAL_SIZE);
        	this.ctx.fillRect(this.NORMAL_SIZE*4/3-this.NORMAL_SIZE/5,this.canvas.height/2-this.NORMAL_SIZE/2,this.NORMAL_SIZE/5,this.NORMAL_SIZE);
        }else{
        	this.ctx.beginPath();
			let x=[];
			let y=[];
			for(let i=0; i<360; i+=120){
				x.push(this.NORMAL_SIZE+this.NORMAL_SIZE/2*Math.cos(i*Math.PI/180));
				y.push(this.canvas.height/2+this.NORMAL_SIZE/2*Math.sin(i*Math.PI/180));
			}
	        this.ctx.moveTo(x[0],y[0]);
	        this.ctx.lineTo(x[1],y[1]);
	        this.ctx.lineTo(x[2],y[2]);
	        this.ctx.closePath();
	        this.ctx.fillStyle="rgb(255,255,255)";
	        this.ctx.fill();
        }
	}

	drawRendaRect(x,y,w,h,c){
		this.editor.drawRendaRect.call(this,x,y,w,h,c);
	}

	drawFrontRenda(x,y,r,c){
		this.editor.drawFrontRenda.call(this,x,y,r,c);
	}

	drawBackRenda(x,y,r,c){
		this.editor.drawBackRenda.call(this,x,y,r,c);
	}

	drawMiddleRenda(x,y,r,c){
		this.editor.drawMiddleRenda.call(this,x,y,r,c);
	}

	drawRenda(posC,posR,x,y,radius,color,num){
		this.editor.drawRenda.call(this,posC,posR,x,y,radius,color,num);
	}

	drawNotes(time){
		let intIndex=this.getIntIndex(time);
		let floatIndex=this.getFloatIndex(time);
		
		//描画を開始するのは何行目か
		let startPosR=Math.floor(floatIndex/this.COL_NUM);
		if(startPosR<0)startPosR=0;

		//どこの行まで描画を行うか
		let endPosR=startPosR+this.canvas.width/this.scrollSpeed/this.COL_NUM+1;
		if(endPosR>this.notes.length)endPosR=this.notes.length;

        for(let r=startPosR; r<endPosR; r++){
        	for(let c=this.COL_NUM-1; c>=0; c--){
        		let x=(r*this.COL_NUM+c-floatIndex)*this.scrollSpeed+this.NORMAL_SIZE;
        		let y=this.canvas.height/2;

        		if(c==0){
        			this.ctx.beginPath();
        			this.ctx.moveTo(x,0);
        			this.ctx.lineTo(x,this.canvas.height);
        			this.ctx.strokeStyle="rgb(230,230,230)";
        			this.ctx.lineWidth="3";
        			this.ctx.stroke();
        			this.ctx.lineWidth="1";
        		}

        		if(this.notes[r][c].num==0 || this.notes[r][c].hit)continue;//空白か既に打たれたノーツだったらパス

        		let num=this.notes[r][c].num+"";

        		switch(num){
        			case "1":this.drawNote(x,y,this.NORMAL_SIZE,this.DON_COLOR);break;
					case "2":this.drawNote(x,y,this.NORMAL_SIZE,this.KA_COLOR);break;
					case "3":this.drawNote(x,y,this.BIG_SIZE,this.DON_COLOR);break;
					case "4":this.drawNote(x,y,this.BIG_SIZE,this.KA_COLOR);break;
					case "5":this.drawRenda(c,r,x,y,this.NORMAL_SIZE,this.RENDA_COLOR,this.notes[r][c].num);break;
					case "6":this.drawRenda(c,r,x,y,this.BIG_SIZE,this.RENDA_COLOR,this.notes[r][c].num);break;
					case "7":this.drawRenda(c,r,x,y,this.NORMAL_SIZE,this.DON_COLOR,this.notes[r][c].num);break;
        			default:break;
        		}
        	}
        }
	}

	drawNote(x,y,r,c){
		this.editor.drawNote.call(this,x,y,r,c);
	}

	//ポーズ画面の描画
	pause(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);//全体をクリアする
		this.drawHitJudgePart();
		let time=this.slider.slider("value");
		this.drawNotes(time);

		let floatIndex=this.getFloatIndex(time);
		//this.editor.drawPlayPosition(floatIndex);
	}

	//プレイ中の動作
	play(){
		if(!this.playing)return;

		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);//全体をクリアする
		this.drawHitJudgePart();
		let time=this.ytPlayer.getCurrentTime();
		this.drawNotes(time);

        //音を鳴らす
        let intIndex=this.getIntIndex(time);
		let floatIndex=this.getFloatIndex(time);
        if(intIndex>=0 && intIndex<this.notes.length*this.COL_NUM){
        	let r=Math.floor(intIndex/this.COL_NUM);
        	let c=intIndex%this.COL_NUM;
        	let num=this.notes[r][c].num+"";
        	if(!this.notes[r][c].hit && num!="0"){
        		switch(num){
        			case "1":this.triggerDon();this.notes[r][c].hit=true;break;
        			case "2":this.triggerKa();this.notes[r][c].hit=true;break;
        			case "3":this.triggerDon();this.notes[r][c].hit=true;break;
        			case "4":this.triggerKa();this.notes[r][c].hit=true;break;
        			case "5":this.triggerDon();break;
        			case "6":this.triggerDon();break;
        			case "7":this.triggerDon();break;
        			default:break;
        		}
        		this.shots.push(new Shot(this.BIG_SIZE,this.canvas.height/2,num,this));
        		this.judgeTime=5;
        	} 
        }

        for(let i=0; i<this.shots.length; i++){
        	this.shots[i].move();
        	this.shots[i].draw();
        	if(this.shots[i].time>this.shots[i].LIMIT_TIME){
        	    this.shots.splice(i,1);
        	}
        }

        this.slider.slider("value",this.ytPlayer.getCurrentTime());//スライダーを動かす

        //消した方がよさげ。この処理重すぎる
        //this.editor.drawAll();
        //this.editor.drawPlayPosition(floatIndex);//エディタに現在地を示す

        //今後実装予定
        //this.editor.drawCurrentPosition(this.editor.mouseX,this.editor.mouseY,this.editor.divider);

        requestAnimationFrame(this.play.bind(this));
	}

	triggerDon(){
		this.don.currentTime=0;
		this.don.play();
	}

	triggerKa(){
		this.ka.currentTime=0;
		this.ka.play();
	}

	fit(parentId){
		this.canvas.width=document.getElementById(parentId).clientWidth-1-parseInt($("body").css("fontSize"));
		this.canvas.height=document.getElementById(parentId).clientHeight-this.SLIDER_HEIGHT;
		if(!this.playing)this.pause();
	}

	getIntIndex(time){
		return Math.floor(this.getFloatIndex(time));
	}

	getFloatIndex(time){
		return (time-this.offset)*(this.bpm*this.COL_NUM)/(60*4);
	}
	/* -this.offset*this.bpm*this.COL_NUM/60*4 */

	//ダウンロードする処理
	download(downloadId){
		let line=[];
		let jiroOffset=-(parseFloat(this.offset)+0.15);
		line[0]="TITLE:"+this.videoId;
		line[1]="BPM:"+this.bpm;
		line[2]="WAVE:music.ogg";
		line[3]="OFFSET:"+jiroOffset;
		line[4]="COURSE:oni";
		line[5]="LEVEL:8";
		line[6]="#START";
		for(let r=0; r<this.notes.length; r++){
			line[7+r]="";
			for(let c=0; c<this.COL_NUM; c++){
				line[7+r]+=this.notes[r][c].num;
			}
			line[7+r]+=",";
		}
		line[7+this.notes.length]="#END";

		let content="";

		for(let i=0; i<line.length; i++){
			content+=line[i];
			content+="\n";
		}
		
        let blob=new Blob([content],{"type":"tja/plain"});
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(blob,this.videoId+".tja");
            window.navigator.msSaveOrOpenBlob(blob,this.videoId+".tja");
        }else{
        	$("#"+downloadId).attr("download",this.videoId+".tja").attr("href",window.URL.createObjectURL(blob));
        }
	}
}