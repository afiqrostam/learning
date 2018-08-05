function array_unique(arr){
	tm=[];
	arr.forEach(function(e){if(tm.indexOf(e)==-1){tm.push(e)}});
	return tm}

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
      init.sp.settings.ranges.forEach(function(a,b){f[a.name]=get_2D(e.res[b].values,a)});
			init_bu();
			init_project();
      console.timeEnd(f.f_n);
      delete f.f_n;
      get_alert({id:'feed_success',type:'primary',msg:'load data..success',feed:true});
      $('#feed_success').on('closed.bs.alert',function(){$('#main').addClass('show')})}
    else{
      console.log(e.con);
      console.timeEnd(f.f_n);
      delete f.f_n;
      get_alert({id:'feed_fail',type:'danger',msg:'load data..fail',feed:true});
    $('#feed_fail').on('closed.bs.alert',function(){$('#main').addClass('show')})}}).withUserObject(def).get_batch_data_list({
		sheet_id:init.sp.settings.id,
		sheet_range:init.sp.settings.ranges.map(function(e){return e.sheet})})}

function get_2D(dt,st){
  console.time(arguments.callee.name);
  var lt={};
  var hd=dt.shift();
  dt.forEach(function(z){
    var ip={};
    z.map(function(y,x){if(y!=""){
			if(hd[x]=="status"){return ip[hd[x]]=parseInt(y,10)}
			else{
				if(!st.trunc){return ip[hd[x]]=y}
				else{if(hd[x]!='username'&&hd[x]!='timestamp'){return ip[hd[x]]=y}}}}});
        lt[ip[st.key]]=ip});
    console.timeEnd(arguments.callee.name);
    return lt}
