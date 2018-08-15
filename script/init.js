var init={};
var def={};

function get_nav(){
  google.script.history.setChangeHandler(function (e) {
    if(e.hash!=''){
      if(e.hash=="home"){page_home()}}
      else if(e.hash=="announcement"){page_announcement()}});
  $('.nav-link:contains("Home")').on('click',
    function(e){
      e.preventDefault();
      google.script.history.push({timestamp:new Date().getTime()},{page:'index'},'home');
      page_home()});
  $('.dropdown-item:contains("Announcement")').on('click',
    function(e){
      e.preventDefault();
      google.script.history.push({timestamp:new Date().getTime()},{page:'index'},'announcement');
      page_announcement()})}

console.time('init');
$('#main-loader').modal('show');
if(window.location.host.includes('googleusercontent')){
  get_init();
  get_nav()}
else{
  console.timeEnd('init');
  $('#main-loader').modal('hide')}
