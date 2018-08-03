var init;
$('#main').hide();
$('#feed').html(get_alert({id:'feed_load',type:'secondary',msg:'loading data.'}));
google.script.run.withSuccessHandler(
  function(e){
    $('#feed_load').alert('close');
    if(e.status){
      $('#feed').html(get_alert({id:'feed_success',type:'primary',msg:'load data success.'}));
      setTimeout(function(){
        $('#feed_success').alert('close');
        init=e.content;
        $('#main').show()},1000,e)}
    else{$('#feed').html(get_alert({id:'feed_fail',type:'danger',msg:'load data fail.'}))}}).get_var('init')
