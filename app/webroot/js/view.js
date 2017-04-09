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
})();