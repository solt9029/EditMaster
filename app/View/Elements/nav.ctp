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
            <?php echo $this->Html->link("創作の達人","/Scores/index",array('class'=>'navbar-brand')); ?>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <?php if($active=="edit"){echo "<li class='active'>";}else{echo "<li>";} ?>
                    <?php echo $this->Html->link("創作","/Scores/edit"); ?>
                </li>
                <?php if($active=="view"){echo "<li class='active'>";}else{echo "<li>";} ?>
                    <?php echo $this->Html->link("作品一覧","/Scores/view"); ?> 
                </li>
                <?php if($active=="help"){echo "<li class='active'>";}else{echo "<li>";} ?>
                    <?php echo $this->Html->link("ヘルプ","/Scores/help"); ?> 
                </li>
            </ul>
        </div>
    </div>
</nav>