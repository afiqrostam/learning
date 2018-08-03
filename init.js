var init;
get_alert({id:'feed_load',type:'secondary',msg:'loading data.',feed:true});
google.script.run.withSuccessHandler(
  function(e){
    if(e.status){
      get_alert({id:'feed_success',type:'primary',msg:'load data success.',feed:true});
      init=e.content;
      $('#main').show()}
    else{get_alert({id:'feed_fail',type:'danger',msg:'load data fail.',feed:true})}}).get_var('init')
