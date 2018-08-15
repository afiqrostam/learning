var init={};
var def={};

function get_nav(){
  $('.nav-link:contains("Home")').on('click',page_home);
  $('.dropdown-item:contains("Announcement")').on('click',page_announcement)}

console.time('init');
$('#main-loader').modal('show');
if(window.location.host.includes('googleusercontent')){
  get_init();
  get_nav()}
else{
  console.timeEnd('init');
  $('#main-loader').modal('hide')}
