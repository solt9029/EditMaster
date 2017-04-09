<!DOCTYPE html>
<html lang="ja">
<head>
    <?php echo $this->element("meta"); ?>
    <?php
    echo $this->Html->css("bootstrap");
    echo $this->Html->script("jquery");
    echo $this->Html->script("bootstrap");
    echo $this->Html->css("style");
    echo $this->Html->css("help");
    ?>
</head>
<body>
    <?php echo $this->element("nav",array("active"=>"help")); ?>
    
    <div class="container accordions">
        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                            どうやって再生するの？
                        </a>
                    </h4>
                </div>
                <div id="collapseOne" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>まず、YouTubeの動画IDとBPMとOFFSETが入力されていることを確認してください。</li>
                            <li>画面上にある再生エリアをクリックすると、再生されます。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                            どうやって譜面の行を増やすの？
                        </a>
                    </h4>
                </div>
                <div id="collapseTwo" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>画面左にある曲情報エリアの下の方に、「行を追加」というボタンがあります。</li>
                            <li>それをクリックすると1行増えます。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                            どうやって置く音符の種類を変えるの？
                        </a>
                    </h4>
                </div>
                <div id="collapseThree" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>画面右にある音符エリアの「種類」から置きたい音符をクリックします。</li>
                            <li>その後、先ほど選んだ音符が置けるようになります。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour">
                            何か裏技はあるの？
                        </a>
                    </h4>
                </div>
                <div id="collapseFour" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>ユーザ名の先頭に「@」をつけてTwitterIDを入力すると、作品一覧の画面でTwitterのアイコンが表示されます。</li>
                            <li>また、譜面の再生中にも画面中央の編集エリアにて、譜面の創作をリアルタイムで行うことができます。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseFive">
                            「太鼓さん次郎エクスポート」って何？
                        </a>
                    </h4>
                </div>
                <div id="collapseFive" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>太鼓さん次郎という太鼓シミュレーションソフトがあります。</li>
                            <li>"創作の達人"で創作した譜面を太鼓さん次郎でも楽しめるようにしてあります。</li>
                            <li>その際、YouTubeの曲動画などは各自、自己責任で太鼓さん次郎に入れてください。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseSix">
                            連打音符が細かく残って削除できない！
                        </a>
                    </h4>
                </div>
                <div id="collapseSix" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>音符エリアの「1小節あたりの分割数」で48を選ぶと細かいものもすべて削除できます。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseSeven">
                            譜面が多すぎるって警告が出てきたんだけど？
                        </a>
                    </h4>
                </div>
                <div id="collapseSeven" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>保存できる譜面の長さには限りがあります。</li>
                            <li>譜面を何行か削除してもう一度試してみてください。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseNine">
                            どうやって保存するの？
                        </a>
                    </h4>
                </div>
                <div id="collapseNine" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>画面最上にあるナビゲーションバーの右側に「保存」ボタンがあります。</li>
                            <li>それをクリックすると保存できます。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseTen">
                            シークバーは何に使うの？
                        </a>
                    </h4>
                </div>
                <div id="collapseTen" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>再生時間を巻き戻したり進めたり、コントロールできます。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseEleven">
                            スマートフォンには対応していないの？
                        </a>
                    </h4>
                </div>
                <div id="collapseEleven" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>現在は対応しておりません。</li>
                            <li>パソコンを用いての創作譜面を想定しています。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwelve">
                            使用しているAPI・ライブラリ・フレームワークは？
                        </a>
                    </h4>
                </div>
                <div id="collapseTwelve" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li>
                                SongleWidgetAPI
                                (<a href="https://widget.songle.jp/docs/v1">https://widget.songle.jp/docs/v1</a>)
                            </li>
                            <p>BPMやOFFSETを自動計算するために使用しています。</p>
                            <li>
                                YouTubePlayerAPI
                                (<a href="https://developers.google.com/youtube/js_api_reference?hl=ja">https://developers.google.com/youtube/js_api_reference?hl=ja</a>)
                            </li>
                            <p>YouTubeの曲を再生するために使用しています。</p>
                            <li>
                                YouTubeDataAPI
                                (<a href="https://developers.google.com/youtube/v3/getting-started?hl=ja">https://developers.google.com/youtube/v3/getting-started?hl=ja</a>)
                            </li>
                            <p>作品一覧にてYouTubeの動画タイトルを載せるために使用しています。</p>
                            <li>
                                BootStrap
                                (<a href="http://getbootstrap.com/">http://getbootstrap.com/</a>)
                            </li>
                            <p>レスポンシブデザインのために使用しています。</p>
                            <li>
                                CakePHP
                                (<a href="https://cakephp.org/">https://cakephp.org/</a>)
                            </li>
                            <p>全体的なサーバ側のアプリケーションはCakePHPで組まれています。</p>
                            <li>
                                Split-Pane
                                (<a href="https://github.com/shagstrom/split-pane">https://github.com/shagstrom/split-pane</a>)
                            </li>
                            <p>創作画面の可変要素を実現するために使用しています。</p>
                            <li>
                                ValidationEngine
                                (<a href="https://github.com/posabsolute/jQuery-Validation-Engine">https://github.com/posabsolute/jQuery-Validation-Engine</a>)
                            </li>
                            <p>フォームの即時バリデーションに使用しています。</p>
                            <li>
                                JQuery
                                (<a href="https://jquery.com/">https://jquery.com/</a>)
                            </li>
                            <p>クライアント側のアプリケーションは基本的にJQueryで組まれています。</p>
                            <li>
                                Minigrid
                                (<a href="http://minigrid.js.org/">http://minigrid.js.org/</a>)
                            </li>
                            <p>作品一覧のカードスタイルを並べるために使用しています。</p>
                            <li>
                                Exresize
                                (<a href="https://github.com/cyokodog/jquery.ex-resize">https://github.com/cyokodog/jquery.ex-resize</a>)
                            </li>
                            <p>要素がリサイズされたイベントを検知するために使用しています。</p>
                            <li>
                                JQueryUI
                                (<a href="https://jqueryui.com/">https://jqueryui.com/</a>)
                            </li>
                            <p>シークバーを実現するときに使用しています。</p>
                            <li>   
                                Ba-Throttle-Debounce
                                (<a href="https://www.npmjs.com/package/throttle-debounce">https://www.npmjs.com/package/throttle-debounce</a>)
                            </li>
                            <p>mousemoveイベントに遅延を加えるために使用しています。</p>
                            <li>
                                MaterialDesignLite
                                (<a href="https://getmdl.io/">https://getmdl.io/</a>)
                            </li>
                            <p>作品一覧のカードスタイルを実現するために使用しています。</p>
                            <li>
                                PhpQuery
                                (<a href="https://code.google.com/archive/p/phpquery/downloads">https://code.google.com/archive/p/phpquery/downloads</a>)
                            </li>
                            <p>Twitterアイコンをスクレイピングするために使用しています。</p>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php echo $this->element("footer"); ?>
</body>
</html>