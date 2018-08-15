var init={};
var def={};

console.time('init');
$('#main-loader').modal('show');
if(window.location.host.includes('googleusercontent')){
  get_init();
  get_nav()}
else{
  console.timeEnd('init');
  $('#main-loader').modal('hide')}
