var init;
get_alert({id:'feed_load',type:'secondary',msg:'loading data.',feed:true});
if(window.location.host.includes('googleusercontent')){
  google.script.run.withSuccessHandler(
    function(e){
      if(e.status){
        get_alert({id:'feed_success',type:'primary',msg:'load data success.',feed:true});
        $('#feed_success').on('closed.bs.alert',function(){
          init=e.content;
          $('#main').addClass('show')})}
      else{
        get_alert({id:'feed_fail',type:'danger',msg:'load data fail.',feed:true});
        $('#feed_fail').on('closed.bs.alert',function(){$('#main').addClass('show')})}}).get_var('init')}
else{
  get_alert({id:'feed_fail',type:'danger',msg:'load data fail.',feed:true});
  $('#feed_fail').on('closed.bs.alert',function(){$('#main').addClass('show')})}
