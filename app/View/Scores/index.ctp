<!DOCTYPE html>
<html lang="ja">
<head>
    <?php 
    echo $this->element("meta"); 
    echo $this->element('twitter_card');
    ?>
    <?php
    echo $this->Html->css("bootstrap");
    echo $this->Html->script("jquery");
    echo $this->Html->script("bootstrap");
    echo $this->Html->css("style");
    echo $this->Html->css("index");
    ?>
</head>
<body>
    <?php echo $this->element("nav",array("active"=>null)); ?>
    <div class="jumbotron">
        <div class="container">
            <h1>さあ、創作譜面を始めよう</h1>
            <div>
                <p>誰もが知っている太鼓ゲーム。実は譜面を叩くだけでなく、創作譜面も面白い。</p>
                <p>"創作の達人"でオリジナルの譜面を創作しよう。誰でも簡単に始められる、創作譜面支援アプリ。</p>
            </div>
            <div>
                <?php 
                echo $this->Html->link("創作譜面を始める","/Scores/edit",array('class'=>'btn btn-primary btn-lg')); 
               
                echo $this->Html->link("作品一覧","/Scores/view",array('class'=>'btn btn-warning btn-lg')); 
                ?>
            </div>
        </div>
    </div>

    <div class="container-fluid outline">
        <div class="row">
            <div class="col-xs-12">
                <h2>創作譜面支援アプリケーション</h2>
                <h2>『創作の達人』</h2>
                <div>
                    <p>"創作の達人"は好みのYouTubeの楽曲から太鼓の譜面を創作できるアプリです。</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-3">
                <h2 class="title">1.直感的インタフェース</h2>
                <?php echo $this->Html->image("1.png",array("class"=>"img-responsive")); ?>
                <div class="text">
                    <p>音符を置くには行をクリック。</p>
                    <p>直感的な創作譜面。</p>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
                <h2 class="title">2.好みのYouTubeの音楽</h2>
                <?php echo $this->Html->image("2.png",array("class"=>"img-responsive")); ?>
                <div class="text">
                    <p>曲の準備はYouTube動画IDの入力だけ。</p>
                    <p>有名な動画だとBPMなど自動計算も。</p>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
                <h2 class="title">3.曲を保存して共有</h2>
                <?php echo $this->Html->image("3.png",array("class"=>"img-responsive")); ?>
                <div class="text">
                    <p>創作した譜面は保存・共有。</p>
                    <p>みんなの譜面を見て再創作も。</p>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
                <h2 class="title">4.太鼓さん次郎との互換性</h2>
                <?php echo $this->Html->image("4.png",array("class"=>"img-responsive")); ?>
                <div class="text">
                    <p>創作した譜面はtjaファイルでダウンロード。</p>
                </div>
            </div>
        </div>
    </div>
    <?php echo $this->element("footer"); ?>
</body>
</html>