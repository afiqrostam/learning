var init={};
var def={};

function get_nav(){
  $('.nav-link:contains("Home")').on('click',
    function(e){
      e.preventDefault();
      page_home();
      display_update(def.news[def.news.length-1],def.news.length-1)})}

console.time('init');
$('#main-loader').modal('show');
if(window.location.host.includes('googleusercontent')){
  get_init();
  get_nav()}
else{
  console.timeEnd('init');
  $('#main-loader').modal('hide')}
