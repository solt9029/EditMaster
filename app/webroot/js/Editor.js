class Editor{
	constructor(canvasId){
		this.canvas=document.getElementById(canvasId);
		this.ctx=this.canvas.getContext("2d");

		this.NORMAL_SIZE=10;
		this.BIG_SIZE=15;
		this.DON_COLOR="rgb(255,0,0)";
		this.KA_COLOR="rgb(0,0,255)";
		this.RENDA_COLOR="rgb(255,255,0)";
		this.COL_NUM=48;//1小節当たりの譜面の数
		this.ROW_H=30;
		this.LINE_H=50;//rowとその上下10pxを含めた行のことをLineと呼ぶことにする
		this.CUR_POS_W=2;

		//譜面を全て0にする
		this.notes=[];
		this.notes[0]=[];
		for(let c=0; c<this.COL_NUM; c++){
			this.notes[0][c]=new Note(0);
			//this.notes[0][c].num="1";
		}

		this.mouseX=0;
		this.mouseY=0;

		this.clipboard=[];
	}

	drawNote(x,y,r,c){
		//外側の白色
		this.ctx.beginPath();
		this.ctx.strokeStyle="rgb(0,0,0)";
		this.ctx.fillStyle="rgb(255,255,255)";
		this.ctx.arc(x,y,r,0,2*Math.PI);
		this.ctx.fill();
		this.ctx.stroke();
		//内側の赤色
		this.ctx.beginPath();
		this.ctx.fillStyle=c;
		this.ctx.arc(x,y,r*4/5,0,2*Math.PI);//4/5が赤色
		this.ctx.fill();
		this.ctx.stroke();
	}

	drawRendaRect(x,y,w,h,c){
		this.ctx.beginPath();
		this.ctx.fillStyle=c;
		this.ctx.rect(x,y-h/2,w,h);
		this.ctx.fill();

		this.ctx.strokeStyle="rgb(0,0,0)";

		this.ctx.beginPath();
		this.ctx.moveTo(x,y-h/2);
		this.ctx.lineTo(x+w,y-h/2);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(x,y+h/2);
		this.ctx.lineTo(x+w,y+h/2);
		this.ctx.stroke();
	}

	drawFrontRenda(x,y,r,c){
		this.drawRendaRect(x,y,r,r*2,c);
		this.drawNote(x,y,r,c);
	}

	drawBackRenda(x,y,r,c){
		this.drawRendaRect(x-r,y,r,r*2,c);

		this.ctx.fillStyle=c;
		this.ctx.beginPath();
		this.ctx.arc(x,y,r,-Math.PI/2,Math.PI/2);
		this.ctx.fill();
		this.ctx.stroke();
	}

	drawMiddleRenda(x,y,r,c){
		this.drawRendaRect(x-r,y,r*2,r*2,c);
	}

	drawCurrentPosition(x,y,divider){
		x=Math.floor(x/(this.canvas.width/divider))*(this.canvas.width/divider)+this.canvas.width/this.COL_NUM;
		y=Math.floor(y/this.LINE_H)*this.LINE_H+this.LINE_H/2;
		this.ctx.beginPath();
		this.ctx.fillStyle="rgb(255,255,0)";
		this.ctx.rect(x-this.CUR_POS_W/2,y-this.ROW_H/2,this.CUR_POS_W,this.ROW_H);
		this.ctx.fill();
	}

	drawPlayPosition(floatIndex){
		var x=(floatIndex%this.COL_NUM)*(this.canvas.width/this.COL_NUM);
		var r=Math.floor(floatIndex/this.COL_NUM);
		var y=r*this.LINE_H+(this.LINE_H-this.ROW_H)/2;
		this.ctx.beginPath();
		this.ctx.fillStyle="rgb(255,0,0)";
		this.ctx.rect(x-this.CUR_POS_W/2,y,this.CUR_POS_W,this.ROW_H);
		this.ctx.fill();
	}

	drawLines(){
		for(let r=0; r<this.notes.length; r++){
			this.ctx.beginPath();
			this.ctx.fillStyle="rgb(200,200,200)";
			this.ctx.strokeStyle="rgb(0,0,0)";
			this.ctx.rect(0,r*this.LINE_H+(this.LINE_H-this.ROW_H)/2,this.canvas.width,this.ROW_H);
			this.ctx.fill();
			this.ctx.stroke();
			
			for(let p=0; p<4; p++){
				this.ctx.beginPath();
				this.ctx.fillStyle="rgb(255,255,255)";
				let x=p*this.canvas.width/4+this.canvas.width/this.COL_NUM;
				this.ctx.rect(x-this.CUR_POS_W/2,r*this.LINE_H+(this.LINE_H-this.ROW_H)/2,this.CUR_POS_W,this.ROW_H);
				this.ctx.fill();
			}
		}
	}

	drawRenda(posC,posR,x,y,radius,color,num){
		//前に５が存在するか判定
		if(posC<=0){
			if(posR<=0){
				//前マーク描画
				this.drawFrontRenda(x,y,radius,color);
				return;
			}else{
				if(this.notes[posR-1][this.COL_NUM-1].num!=num){
					//前マーク描画
					this.drawFrontRenda(x,y,radius,color);
					return;
				}
			}
		}else{
			if(this.notes[posR][posC-1].num!=num){
				//前マーク描画
				this.drawFrontRenda(x,y,radius,color);
				return;
			}
		}

		//後に５が存在するか判定
		if(posC>=this.COL_NUM-1){
			if(posR+1>=this.notes.length){
				//後マーク描画
				this.drawBackRenda(x,y,radius,color);
				return;
			}else{
				if(this.notes[posR+1][0].num!=num){
					//後マーク描画
					this.drawBackRenda(x,y,radius,color);
					return;
				}
			}
		}else{
			if(this.notes[posR][posC+1].num!=num){
				//後マーク描画
				this.drawBackRenda(x,y,radius,color);
				return;
			}
		}
		
		this.drawMiddleRenda(x,y,radius,color);
	}

	drawNotes(){
		for(let r=0; r<this.notes.length; r++){
			for(let c=this.COL_NUM-1; c>=0; c--){
				let x=(c+1)*this.canvas.width/this.COL_NUM;
				let y=r*this.LINE_H+this.LINE_H/2;
				let num=this.notes[r][c].num+"";//数値の場合があるから文字列に変換する
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

	drawAll(){
		this.drawLines();
		this.drawNotes();
	}

	//notesからnumだけの配列を得る
	getNumsFromNotes(){
		let nums=[];
		for(let r=0; r<this.notes.length; r++){
			nums[r]=[];
			for(let c=0; c<this.COL_NUM; c++){
				nums[r][c]=this.notes[r][c].num;
			}
		}
		return nums;
	}

	//notesのnumだけの配列からnotesをセットする
	//なんか表示されない・・・
	setNotesFromNums(nums){
		for(let r=0; r<nums.length; r++){
			this.notes[r]=[];
			for(let c=0; c<nums[r].length; c++){
				this.notes[r][c]=new Note(nums[r][c]);
			}
		}
	}

	//1行の情報を得る（コピーのため）クリップボードにいれる
	copyRow(y){
		if(y<0)return;//canvasの外にカーソルがあるときは無視
		let r=Math.floor(y/this.LINE_H);
		let numRow=[];
		for(let c=0; c<this.notes[r].length; c++){
			numRow[c]=this.notes[r][c].num;
		}
		return numRow;
	}

	//ある行に対して譜面を全部埋める（ペースト）
	pasteRow(y,numRow){
		if(y<0)return;
		let r=Math.floor(y/this.LINE_H);
		for(let c=0; c<this.notes[r].length; c++){
			this.notes[r][c]=new Note(numRow[c]);
		}

		//一番最後の行が押されると行が追加される
		if(r==this.notes.length-1)this.addRow();
	}

	//譜面を設置する
	putNote(num,divider){
		//canvasの外にカーソルがあるときは無視
		if(this.mouseX<0 || this.mouseY<0)return;

		let c=Math.floor(this.mouseX/(this.canvas.width/divider))*(this.COL_NUM/divider);//(800*16/800)*48/16
		let r=Math.floor(this.mouseY/this.LINE_H);

		//一番最後の行が押されると行が追加される
		if(r==this.notes.length-1)this.addRow();

		//canvasの端っこクリックすると反応してマイナスの値が入っちゃうから一応
		if(c>=0 && c<this.COL_NUM && r>=0){
			this.notes[r][c].num=num;
			if(num==5 || num==6 || num==7){
				for(let i=1; i<this.COL_NUM/divider; i++){
					this.notes[r][c+i].num=num;
				}
			}
		}
	}

	//行を追加する
	addRow(){
		this.notes[this.notes.length]=[];
		for(let c=0; c<this.COL_NUM; c++){
			this.notes[this.notes.length-1][c]=new Note(0);
		}
		this.canvas.height=this.notes.length*this.LINE_H;
	}

	delRow(){
		if(this.notes.length>1){
			this.notes.pop();
			this.canvas.height=this.notes.length*this.LINE_H;
		}
	}

	//大きさをあわせる
	fit(parentId){
		this.canvas.width=document.getElementById(parentId).clientWidth-2*parseInt($("body").css("fontSize"))-1;
		this.canvas.height=this.LINE_H*this.notes.length;
		this.drawAll();
	}
}