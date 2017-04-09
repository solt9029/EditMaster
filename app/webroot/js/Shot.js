class Shot{
	constructor(x,y,num,player){	
		this.time=0;//経過した時間
		this.LIMIT_TIME=10;//寿命
		this.x=x;//x座標
		this.y=y;//y座標
		this.vx=player.canvas.width/90;//x速さ
		this.vy=-player.canvas.height/9;//y速さ
		this.g=player.canvas.height/90;//重力的なもの
		this.num=num;//譜面番号
		this.player=player;
	}
	move(){
		this.x+=this.vx;
		this.y+=this.vy;
		this.vy+=this.g;
		this.time+=1;
	}
	draw(){
		switch(this.num){
			case "1":this.player.drawNote(this.x,this.y,this.player.NORMAL_SIZE,this.player.DON_COLOR);break;
			case "2":this.player.drawNote(this.x,this.y,this.player.NORMAL_SIZE,this.player.KA_COLOR);break;
			case "3":this.player.drawNote(this.x,this.y,this.player.BIG_SIZE,this.player.DON_COLOR);break;
			case "4":this.player.drawNote(this.x,this.y,this.player.BIG_SIZE,this.player.KA_COLOR);break;
			case "5":this.player.drawNote(this.x,this.y,this.player.NORMAL_SIZE,this.player.RENDA_COLOR);break;
			case "6":this.player.drawNote(this.x,this.y,this.player.BIG_SIZE,this.player.RENDA_COLOR);break;
			case "7":this.player.drawNote(this.x,this.y,this.player.NORMAL_SIZE,this.player.DON_COLOR);break;
			default:break;
		}
		
	}
}