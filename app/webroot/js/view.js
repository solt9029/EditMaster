(function(){
  var grid;
  function init() {
    grid = new Minigrid({
      container: '.cards',
      item: '.card',
      gutter: 12
    });
    grid.mount();
  }
  function update() {
    grid.mount();
  }
  document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('resize', update);

  var $container = $('#cards');
  $container.infinitescroll({
    navSelector  : '.next',    // selector for the paged navigation 
    nextSelector : '.next a',  // selector for the NEXT link (to page 2)
    itemSelector : '.card',     // selector for all items you'll retrieve
    debug     : true,
    dataType    : 'html',
    loading:{
      finishedMsg:'',
      img:"../img/loading.png",//loading.pngは１ｐｘの何もない画像です。なんか指定しないとデフォルトの変な画像が出ちゃうのでこれで仕方なく回避
      msgText:""
    }
  },function(){
    init();
  });

})();