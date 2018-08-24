var init={};
var def={};

function array_unique(a){
	t=[];
	a.forEach(
		function(e){
			if(t.indexOf(e)==-1){t.push(e)}});
	return t}

function init_bu(){
	Object.keys(def.bu).forEach(
		function(e){
			def.bu[e].has_child=get_bu_child(e);
			def.bu[e].add_project=get_bu_project(e)})}

function get_bu_region(){
	return Object.keys(def.bu).filter(
		function(e){return def.bu[e].root==undefined}).map(
		function(e){return def.bu[e]})}
      
function get_bu_child(id){
  if(id==undefined){console.error('ID not defined');return false}
  else if(id.substr(0,1)!='B'){console.error('invalid ID type');return false}
  else if(def.bu[id]==undefined){console.error('invalid ID');return false}
  else{
	  if(def.bu[id].has_child!=undefined){return def.bu[id].has_child}
		else{
			var find_bu=Object.keys(def.bu).filter(
				function(e){return def.bu[e].root==id}).map(
				function(e){return def.bu[e]});
			var find_project=Object.keys(def.project).filter(
				function(e){return def.project[e].root.split(',').indexOf(id)!=-1}).map(
				function(e){return def.project[e]});
			if(find_bu.length!=0&&find_project.length!=0){return find_bu.concat(find_project)}
			else if(find_bu.length!=0){return find_bu}
			else if(find_project.length!=0){return find_project}
			else{console.error('no futher child found');return false}}}}

function get_bu_project(id){
  if(id==undefined){console.error('ID not defined');return false}
  else if(id.substr(0,1)!='B'){console.error('invalid ID type');return false}
  else if(def.bu[id]==undefined){console.error('invalid ID');return false}
  else{
		var find=def.bu[id];
		if(find.add_project!=undefined){return find.add_project}
		else{
			if(find.country!=undefined){var country=[find.country]}else{var country=[]}
			while(find.root!=undefined){
				find=def.bu[find.root];
				if(find.country!=undefined){country.push(find.country)}}
			if(country.length==0){console.error('no country found');return false}
			else if(country.length>1){console.error('unexpected outcome');return false}
			else{return country[0]}}}}

function init_project(){
	Object.keys(def.project).forEach(
		function(e){def.project[e].country=get_project_country(e)})}
         
function get_country_current(){
  return array_unique(Object.keys(def.project).map(
    function(e){return def.project[e].country})).map(
      function(e){return def.country[e]})}

function get_country_child(id){
	if(id==undefined){console.error('ID not defined');return false}
  else if(id.substr(0,1)!='C'){console.error('invalid ID type');return false}
  else{
    var find_project=Object.keys(def.project).filter(
			function(e){return def.project[e].country==id}).map(
			function(e){return def.project[e]});
    if(find_project.length!=0){return find_project}
    else{console.error('no futher child found');return false}}}

function get_project_country(id){
	if(id==undefined){console.error('ID not defined');return false}
  else if(id.substr(0,1)!='P'){console.error('invalid ID type');return false}
  else if(def.project[id]==undefined){console.error('invalid ID');return false}
	else{
		if(def.project[id].country!=undefined){return def.project[id].country}
		else{
			var root=def.project[id].root.split(',');
			var find_root=root.filter(function(f){return def.bu[f].country!=undefined});
			if(find_root.length==0){
				while(find_root.length==0){
					var new_root=root.map(function(f){
						if(def.bu[f].root!=undefined){return def.bu[f].root}else{return f}});
					if(new_root!=root){root=new_root}else{break}
					var find_root=root.filter(function(f){return def.bu[f].country!=undefined})}
				if(find_root.length==0){console.error('country not found');return false}}
			find_root=find_root.map(function(f){return def.bu[f].country});
			var trim=array_unique(find_root);	
			if(trim.length>1){console.error('country not found');return false}
		else{return trim[0]}}}}
		
function get_2D(dt,st){
	var hd=dt.shift();
	if(st.key!=undefined){var lt={}}
	else{var lt=[]}
	dt.forEach(
		function(z,i){
			var ip={r:i+2};
			z.map(function(y,x){
				if(y!=""){
					if(hd[x]=="status"){
						return ip[hd[x]]=parseInt(y,10)}
					else{
						if(!st.trunc){
							return ip[hd[x]]=y}
						else{
							if(hd[x]!='username'&&hd[x]!='timestamp'){
								return ip[hd[x]]=y}}}}});
			if(st.key!=undefined){lt[ip[st.key]]=ip}
			else{lt.push(ip)}});
	return lt}

function get_init(){
	def={q:{}};
	init={};
	var f=arguments.callee.name;
	console.time(f);
	show_main_loader()
	google.script.run.withSuccessHandler(
		function(e,f){
			if(e.s){
				init=e.res;
				console.timeEnd(f);
				get_ready();
				get_employees();
				google.script.run.withSuccessHandler(
					function(g){
						if(g.s){init.us.photo=g.res[0].photo}}).get_users(init.us.email)}
			else{
				console.timeEnd(f);
				hide_main_loader()}}).withUserObject(f).get_var('init')}

function get_ready(){
  var f=arguments.callee.name;
	def.q[arguments.callee.name]={}
	console.time(f);
	show_main_loader();
  google.script.run.withSuccessHandler(
    function(e,f){
			if(e.s){
				init.sp.settings.ranges.forEach(
					function(a,b){
						a.header=$.extend(true,[],e.res[b].values[0]);
						def[a.name]=get_2D(e.res[b].values,a)});
				init_bu();
				init_project();
				console.timeEnd(f);
				delete def.q[f];
				q_check(hide_main_loader())}
    else{
			console.log(e.con);
			console.timeEnd(f);
			delete def.q[f];
			q_check(hide_main_loader())}}).withUserObject(f).get_batch_data_list({
		sheet_id:init.sp.settings.id,
		sheet_range:init.sp.settings.ranges.map(
			function(e){return e.sheet})})}

function get_employees(){
  var f=arguments.callee.name;
	def.q[arguments.callee.name]={}
	console.time(f);
	show_main_loader();
  google.script.run.withSuccessHandler(
    function(e,f){
			if(e.s){
				init.sp.employee.ranges.forEach(
					function(a){
						a.header=$.extend(true,[],e.res[0]);
						def[a.name]=get_2D(e.res,a)});
				console.timeEnd(f);
				delete def.q[f];
				q_check(hide_main_loader())}
    else{
			console.log(e.con);
			console.timeEnd(f);
			delete def.q[f];
			q_check(hide_main_loader())}}).withUserObject(f).get_data_list({
		sheet_id:init.sp.employee.id,
		sheet_name:init.sp.employee.ranges.map(
			function(e){return e.sheet})[0]})}

function q_check(fn){
	if(Object.keys(def.q).length==0){fn}}

function hide_main_loader(){
	$('#main-loader').addClass('hide');
	$('#app').removeClass('hide')}}

function show_main_loader(){
	$('#main-loader').removeClass('hide');
	$('#app').addClass('hide')}

console.time('init');
if(window.location.host.includes('googleusercontent')){
  console.timeEnd('init');
	get_init()}
else{
  console.timeEnd('init');
  hide_main_loader()}
