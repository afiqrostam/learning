var init={};
var def={};

//Common Utillities
function a_uni(a){var b=[];a.forEach(function(c){if(b.indexOf(c)==-1){b.push(c)}});return b}
function a_len(a,b){if(a.length==b){return true}return false}
function u_def(a){if(a==undefined){return true}return false}
function c_err(a){console.error(a);return false}
function s_sub(a,b){if(a.substr(0,1)!=b){return true}return false}

//BU Utillities
// return BU keys
function b_k(){return Object.keys(def.bu)}
// return BU by ID
function b_g(a){
	if(u_def(a)){return c_err('ID not defined')}
	if(s_sub(a,'B')){return c_err('invalid ID')}
	var b=def.bu[a];
	if(u_def(b)){return c_err('invalid ID')}
	return b}
// filter & map BU; f:filter; m:map
function b_f(a){
	var b=b_k();
	var c=function(d){return b_g(d)};
	if(u_def(a)){return b.map(c)}
	if(u_def(a.m)){return b.filter(a.f).map(c)}
	if(u_def(a.f)){return b.map(a.m)}
	return b.filter(a.f).map(a.m)}
// return BU child
function b_g_c(a){
	var b=b_g(a);
	if(!b){return b}
	if(!u_def(b.has_child)){return b.has_child}
	var bc=b_f({f:function(c){return b_g(c).root==a}});
	var pc=p_f({f:function(c){return p_g(c).root.split(',').indexOf(a)!=-1}});
	if(a_len(bc,0)&&a_len(pc,0)){return c_err('no child found')}
	return bc.concat(pc)}
// return BU project status
function b_g_p(a){
	var b=b_g(a);
	if(!b){return b}
	if(!u_def(b.add_project)){return b.add_project}
	var c=[];
	if(!u_def(b.country)){c.push(b.country)}
	while(!u_def(b_g(b.root))){
		b=b_g(b.root);
		if(!u_def(b.country)){c.push(b.country)}}
	if(!a_len(c,1)){return c_err('no country found')}
	return c.pop()}
// initialize BU
function b_i(){b_k().forEach(function(e){b_g(e).has_child=b_g_c(e);b_g(e).add_project=b_g_p(e)})}

//Project Utillities
// return Project keys
function p_k(){return Object.keys(def.project)}
// return Project by ID
function p_g(a){
	if(u_def(a)){return c_err('ID not defined')}
	if(s_sub(a,'P')){return c_err('invalid ID')}
	var b=def.project[a];
	if(u_def(b)){return c_err('invalid ID')}
	return b}
// filter & map Project; f:filter; m:map
function p_f(a){
	var b=p_k();
	var c=function(d){return p_g(d)};
	if(u_def(a)){return b.map(c)}
	if(u_def(a.m)){return b.filter(a.f).map(c)}
	if(u_def(a.f)){return b.map(a.m)}
	return b.filter(a.f).map(a.m)}
// return Project country
function p_g_c(a){
	var b=p_g(a);
	if(!b){return b}
	if(u_def(b.country)){return b.country}
	var c=b.root.split(',');
	var d=c.filter(function(e){return !u_def(b_g(e).country)});
	if(a_len(d,0)){
		while(a_len(d,0)){
			var f=c.map(function(e){var g=b_g(e);if(!u_def(g.root)){return g.root}return e});
			if(f!=c){c=f}else{break}
			var d=c.filter(function(e){return !u_def(b_g(e).country)})}
		if(a_len(d,0)){return c_err('country not found')}}
	d=d.map(function(e){return b_g(e).country});
	var h=a_uni(d);	
	if(h.length>1){return c_err('country not found')}
	return h.pop()}
// initialize Project
function init_project(){p_k().forEach(function(e){p_g(e).country=p_g_c(e)})}

//Country Utillities
// return Country keys
function c_k(){return Object.keys(def.country)}
// return Country by ID
function c_g(a){
	if(u_def(a)){return c_err('ID not defined')}
	if(s_sub(a,'C')){return c_err('invalid ID')}
	var b=def.country[a];
	if(u_def(b)){return c_err('invalid ID')}
	return b}
// filter & map Country; f:filter; m:map
function c_f(a){
	var b=c_k();
	var c=function(d){return c_g(d)};
	if(u_def(a)){return b.map(c)}
	if(u_def(a.m)){return b.filter(a.f).map(c)}
	if(u_def(a.f)){return b.map(a.m)}
	return b.filter(a.f).map(a.m)}
// return current Country
function c_c(){return a_uni(p_f({m:function(e){return p_g(e).country}}).map(function(e){return c_g(e)}))}
// return Country child
function c_g_c(a){
	var b=c_g(a);
	if(!b){return b}
	var pc=p_f({f:function(c){return p_g(c).country==a}});
	if(a_len(pc,0)){return c_err('no child found')}
	return pc}
		
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
				b_i();
				p_i();
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
	$('#app').removeClass('hide')}

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
