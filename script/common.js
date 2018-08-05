function get_alert(e){
  if(e!=undefined){
    var alert=$('<div id="'+e.id+'" class="alert alert-'+e.type+' alert-dismissible fade show" role="alert">').append(
      $('<strong>').html('!!! ')).append(e.msg);
    if(e.feed){
      $('#feed').append(alert);
      setTimeout(function(){alert.alert('close')},500,alert)}
    else{return alert}}}

function get_ready(){
  def.f_n=arguments.callee.name;
  console.time(def.f_n);
  google.script.run.withSuccessHandler(
    function(e,f){
    if(e.s){
      init.sp.settings.ranges.map(function(a){return a.name}).forEach(
        function(a,b){f[a]=get_2D(e.res[b].values)});
      console.timeEnd(f.f_n);
      delete f.f_n;
      get_alert({id:'feed_success',type:'primary',msg:'load data..success',feed:true});
    }
    else{
      console.log(e.con);
      console.timeEnd(f.f_n);
      delete f.f_n;
      get_alert({id:'feed_fail',type:'danger',msg:'load data..fail',feed:true});
    }}).withUserObject(def).get_batch_data_list({
    sheet_id:init.sp.settings.id,
    sheet_range:init.sp.settings.ranges.map(function(e){return e.sheet})})}
