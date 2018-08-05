var init;
var def={};
get_alert({id:'feed_load',type:'secondary',msg:'initialising..',feed:true});
if(window.location.host.includes('googleusercontent')){
  google.script.run.withSuccessHandler(
    function(e){
      if(e.s){
        get_alert({id:'feed_success',type:'primary',msg:'initialising..success',feed:true});
        $('#feed_success').on('closed.bs.alert',function(){
          init=e.res;
          $('#main').addClass('show');
          get_alert({id:'feed_load',type:'secondary',msg:'load data..',feed:true});
          get_ready();
        })}
      else{
        get_alert({id:'feed_fail',type:'danger',msg:'initialising..fail',feed:true});
        $('#feed_fail').on('closed.bs.alert',function(){$('#main').addClass('show')})}}).get_var('init')}
else{
  get_alert({id:'feed_fail',type:'danger',msg:'initialising..fail',feed:true});
  $('#feed_fail').on('closed.bs.alert',function(){$('#main').addClass('show')})}
