var init;
var def={};
console.time('init');
if(window.location.host.includes('googleusercontent')){
  google.script.run.withSuccessHandler(
    function(e){
      if(e.s){
        console.timeEnd('init');
        init=e.res;
        get_ready()}
      else{
        console.timeEnd('init');
        $('#main_loader').modal('hide');
        $('#main_loader').on('hidden.bs.modal',function(){$('#main').addClass('show')})}}).get_var('init')}
else{
  console.timeEnd('init');
  $('#main_loader').modal('hide');
  $('#main_loader').on('hidden.bs.modal',function(){$('#main').addClass('show')})}
