<!DOCTYPE html>
<html>
<head>
	<?php echo $this->element("meta"); ?>
	<?php 
	echo $this->Html->script("jquery"); 
	echo $this->Html->css("bootstrap");
	echo $this->Html->script("bootstrap");
	echo $this->Html->script("minigrid");
	echo $this->Html->css("style");
	echo $this->Html->css("view");
	?>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
	<script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
</head>
<body>
	<?php echo $this->element("nav",array("active"=>"view")); ?>
	<div class="cards">
		<?php

		foreach($scores as $score){
			$video_id=h($score["Score"]["videoid"]);
			$user_name=h($score["Score"]["username"]);
			$comment=h($score["Score"]["comment"]);
			$video_title=$score["Score"]["videotitle"];
			$icon_url=$score["Score"]["iconurl"];
			$edit_link=$this->Html->link("VIEW AND RE-EDIT","/Scores/edit?id=".$score["Score"]["id"],array("class"=>"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"));

echo <<< END
		<div class="demo-card-square mdl-card mdl-shadow--2dp card">
	  		<div class="mdl-card__title mdl-card--expand" style="background:url('http://i.ytimg.com/vi/{$video_id}/mqdefault.jpg') no-repeat; background-size:100%">
	    		<h2 class="mdl-card__title-text">{$video_title}</h2>
	  		</div>
			<div class="contents">
		 		<div class="content username">
		  			<img class="icon" src="{$icon_url}">
		  			<span>{$user_name}</span>
		  		</div>
		  		<div class="content">{$comment}</div>
			</div>
	  		<div class="mdl-card__actions mdl-card--border">
	  			{$edit_link}
	  		</div>
		</div>
END;
		}

		?>
	</div>
	<div class="page">
		<?php echo $this->Paginator->prev("PREV"); ?>
		<?php echo $this->Paginator->numbers(); ?>
		<?php echo $this->Paginator->next("NEXT"); ?>
	</div>
	<?php echo $this->element("footer"); ?>
	<?php echo $this->Html->script("view"); ?>
</body>