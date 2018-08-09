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

$('.modal').on('show.bs.modal',function(){$('main').hide()});
$('.modal').on('hidden.bs.modal',function(){$('main').show()});

function get_init(){
	def={};init={};var f=arguments.callee.name;console.time(f);
	if($('#main-loader').css('display')=='none'){$('#main-loader').modal('show')}
	google.script.run.withSuccessHandler(
		function(e,f){
			if(e.s){
				init=e.res;console.timeEnd(f);get_ready();
				google.script.run.withSuccessHandler(function(e){if(e.s){init.us.photo=e.res[0].photo}}).get_users(init.us.email);
				google.script.url.getLocation(function(g){Object.getOwnPropertyNames(g).forEach(function(h){init.we.param[h]=g[h]})})}
			else{console.timeEnd(f);$('#main-loader').modal('hide')}}).withUserObject(f).get_var('init')}

function get_ready(){
  def.f_n=arguments.callee.name;console.time(def.f_n);
  google.script.run.withSuccessHandler(
    function(e,f){
    if(e.s){
      init.sp.settings.ranges.forEach(function(a,b){
				a.header=$.extend(true,[],e.res[b].values[0]);
				f[a.name]=get_2D(e.res[b].values,a)});
	    init_bu();init_project();console.timeEnd(f.f_n);delete f.f_n;get_employees()}
    else{
      console.log(e.con);console.timeEnd(f.f_n);delete f.f_n;
	    $('#main-loader').modal('hide')}}).withUserObject(def).get_batch_data_list({
		sheet_id:init.sp.settings.id,
		sheet_range:init.sp.settings.ranges.map(function(e){return e.sheet+'!'+e.range})})}

function get_employees(){
  def.f_n=arguments.callee.name;console.time(def.f_n);
  google.script.run.withSuccessHandler(
    function(e,f){
    if(e.s){
      init.sp.employee.ranges.forEach(function(a){
				a.header=$.extend(true,[],e.res[0]);
				f[a.name]=get_2D(e.res,a)});
      console.timeEnd(f.f_n);delete f.f_n;$('#main-loader').modal('hide')}
    else{
      console.log(e.con);console.timeEnd(f.f_n);delete f.f_n;
	    $('#main-loader').modal('hide')}}).withUserObject(def).get_data_list({
		sheet_id:init.sp.employee.id,
		sheet_name:init.sp.employee.ranges.map(function(e){return e.sheet+'!'+e.range})[0]})}

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

function get_employee_registration(email){
	console.time(arguments.callee.name);
	if(email==undefined){console.error('email not defined');console.timeEnd(arguments.callee.name);return false}
	else{
		var find=Object.getOwnPropertyNames(def.employee).filter(function(e){return def.employee[e].email==email});
		if(find.length==0){console.error('user not registered');console.timeEnd(arguments.callee.name);return false}
		else{console.timeEnd(arguments.callee.name);return find.map(function(e){return def.employee[e]})[0]}}}
