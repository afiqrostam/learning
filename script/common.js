$('.modal').on('show.bs.modal',function(){$('main').hide()});
$('.modal').on('hidden.bs.modal',function(){$('main').show()});

function array_unique(a){t=[];a.forEach(function(e){if(t.indexOf(e)==-1){t.push(e)}});return t}
function get_init(){
	def={q:{}};init={};var f=arguments.callee.name;console.time(f);
	if($('#main-loader').css('display')=='none'){$('#main-loader').modal('show')}
	google.script.run.withSuccessHandler(
		function(e,f){if(e.s){init=e.res;console.timeEnd(f);get_ready();get_employees();get_news();
				google.script.run.withSuccessHandler(function(g){if(g.s){init.us.photo=g.res[0].photo}}).get_users(init.us.email);
				google.script.url.getLocation(function(g){Object.keys(g).forEach(function(h){init.we.param[h]=g[h]})})}
			else{console.timeEnd(f);$('#main-loader').modal('hide')}}).withUserObject(f).get_var('init')}

function get_ready(){
  var f=arguments.callee.name;
	def.q[arguments.callee.name]={}
	console.time(f);
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
				q_check()}
    else{
			console.log(e.con);
			console.timeEnd(f);
			delete def.q[f];
			q_check()}}).withUserObject(f).get_batch_data_list({
		sheet_id:init.sp.settings.id,
		sheet_range:init.sp.settings.ranges.map(
			function(e){return e.sheet})}

function get_employees(){
  var f=arguments.callee.name;
	def.q[arguments.callee.name]={}
	console.time(f);
  google.script.run.withSuccessHandler(
    function(e,f){
			if(e.s){
				init.sp.employee.ranges.forEach(
					function(a){
						a.header=$.extend(true,[],e.res[0]);
						def[a.name]=get_2D(e.res,a)});
				console.timeEnd(f);
				delete def.q[f];
				q_check()}
    else{
			console.log(e.con);
			console.timeEnd(f);
			delete def.q[f];
			q_check()}}).withUserObject(f).get_data_list({
		sheet_id:init.sp.employee.id,
		sheet_name:init.sp.employee.ranges.map(
			function(e){return e.sheet})[0]})}

function get_news(){
  var f=arguments.callee.name;
	def.q[arguments.callee.name]={}
	console.time(f);
  google.script.run.withSuccessHandler(
    function(e,f){
			if(e.s){
				init.sp.news.ranges.forEach(
					function(a){
						a.header=$.extend(true,[],e.res[0]);
						def[a.name]=get_2D(e.res,a)});
				console.timeEnd(f);
				delete def.q[f];
				q_check()}
			else{
				console.log(e.con);
				console.timeEnd(f);
				delete def.q[f];
				q_check()}}).withUserObject(f).get_data_list({
		sheet_id:init.sp.news.id,
		sheet_name:init.sp.news.ranges.map(
			function(e){return e.sheet)[0]})}

function q_check(){
	if(Object.keys(def.q).length==0){
		page_home();
		display_update(def.news[def.news.length-1],def.news.length-1);
		$('#main-loader').modal('hide')}}

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

function display_update(e,i){
	var entry=$('<div class="mb-5">').data('count',i);
	entry.append(
		$('<p class="lead m-0">').html(e.type+':'));
	entry.append(e.content);
	entry.append($('<p class="mb-3">').html(
		$('<small class="font-italic">').html(
			get_employee_registration(e.username).employee+' on '+new Date(e.timestamp))));
	var nav=$('<p>').html('&nbsp');
	var prev=$('<button class="btn mr-3 btn-sm btn-outline-dark">').html('Previous').on('click',function(){
				var i=$('.update-content').find('div').data('count');var e=def.news[i+1];display_update(e,i+1)});
	var next=$('<button class="btn float-right mr-3 btn-sm btn-outline-dark">').html('Next').on('click',function(){
				var i=$('.update-content').find('div').data('count');var e=def.news[i-1];display_update(e,i-1)})
	if(def.news.length-1==i){nav.append(next)}else if(i==0){nav.append(prev)}else{nav.append(prev).append(next)}
	if(def.news.length>1){entry.append(nav)}
	$('.update-content').html(entry)}

function get_employee_registration(email){
	if(email==undefined){
		console.error('email not defined');
		return false}
	else{
		var find=Object.keys(def.employee).filter(
			function(e){
				return def.employee[e].email==email});
		if(find.length==0){
			console.error('user not registered');
			return false}
		else{
			return find.map(
				function(e){
					return def.employee[e]})[0]}}}
