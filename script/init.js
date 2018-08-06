var init;
var def={};
console.time('init');
$('#main-loader').modal('show');
if(window.location.host.includes('googleusercontent')){
  google.script.run.withSuccessHandler(
    function(e){
      if(e.s){
        console.timeEnd('init');
        init=e.res;
        get_ready()}
      else{
        console.timeEnd('init');
        $('#main-loader').modal('hide')}}).get_var('init')}
else{
  console.timeEnd('init');
  $('#main-loader').modal('hide')}
