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
      init.sp.settings.ranges.map(function(a){return a.name}).forEach(function(a,b){f[a]=get_2D(e.res[b].values)});
      console.timeEnd(f.f_n);
      delete f.f_n;
      get_alert({id:'feed_success',type:'primary',msg:'load data..success',feed:true})}
    else{
      console.log(e.con);
      console.timeEnd(f.f_n);
      delete f.f_n;
      get_alert({id:'feed_fail',type:'danger',msg:'load data..fail',feed:true})}}).withUserObject(def).get_batch_data_list({
		sheet_id:init.sp.settings.id,
		sheet_range:init.sp.settings.ranges.map(function(e){return e.sheet})})}

function get_2D(dt){
  console.time(arguments.callee.name);
  var lt={};
  var hd=dt.shift();
  dt.forEach(function(z){
    var ip={};
    z.map(function(y,x){
			if(y!=""){
				if(hd[x]=="status"){return ip[hd[x]]=parseInt(y,10)}
				else{return ip[hd[x]]=y}}});
        if(ip.id.substr(0,1)=='P'){
            var root=ip.root.split(',');
                var find_root=root.filter(function(f){return def.bu[f].country!=undefined});
                if(find_root.length==0){
                    while(find_root.length==0){
                        var new_root=root.map(function(f){if(def.bu[f].root!=undefined){return def.bu[f].root}else{return f}});
                        if(new_root!=root){root=new_root}else{break}
                        var find_root=root.filter(function(f){return def.bu[f].country!=undefined})}}
                if(find_root.length!=0){
                    find_root=find_root.map(function(f){return def.bu[f].country});
                    var trim=array_unique(find_root);	
                    if(trim.length==1){ip.country=trim[0]}}}
        lt[ip.id]=ip});
    console.timeEnd(arguments.callee.name);
    return lt}
