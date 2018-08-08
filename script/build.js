$('#form-modal').on('hidden.bs.modal',function(){
  var modal=$(this);
  modal.find('p.modal-title').html('&nbsp;');
  modal.find('div.modal-body').html('&nbsp;')});
$('.nav-item>a[data-toggle="modal"]').on('click',build_user_registration)
  
function build_user_registration(){
  var modal=$('#form-modal');
  var form=$('<form>');
  var name=$('<div class="form-group row">').append(
	  $('<label for="reg-name" class="col-md-3 col-form-label">').html('Name')).append(
	  $('<div class="col-md-9">').append(
	  $ ('<input type="text" class="form-control" id="reg-name" placeholder="name" name="employee">')));
  var email=$('<div class="form-group row">').append(
	  $('<label for="reg-email" class="col-md-3 col-form-label">').html('E-mail')).append(
	  $('<div class="col-md-9">').append(
	    $('<input type="email" class="form-control" id="reg-email" placeholder="veolia e-mail" name="email">')));
  var organization=$('<div class="form-group row">').append(
	  $('<label for="reg-organization" class="col-md-3 col-form-label">').html('Organization')).append(
	  $('<div class="col-md-9">').append(
	    $('<select class="form-control mb-1 text-lowercase" id="reg-organization">').on('change select',
			function(){
				var settings={t:$(this),p:{return_bu_pr_combo:true}}
				build_bu_list(settings)})));
  modal.find('p.modal-title').html('User Registration');
  modal.find('div.modal-body').html(form.append(name).append(email).append(organization));
	organization.find('select').trigger('select')}
  
function build_bu_list(x){
	var t=x.t;
	var param=x.p;
	t.nextAll().not('p.help-block').remove();
	var val=t.val();
	if(val==null){
		t.append($('<option>').val('').html('.regions'));
		if(param.select_disable){
			get_bu_region().forEach(function(e){t.append($('<option>').val(e.id).html(e.bu))})}
		else if(param.show_disabled){
			get_bu_region().forEach(function(e){t.append($('<option>').val(e.id).html(e.bu).prop('disabled',!e.status))})}
		else{
			get_bu_region().filter(function(e){return e.status==1}).forEach(
				function(e){t.append($('<option>').val(e.id).html(e.bu))})}}
	else if(val!=''){
		if(val.substr(0,1)=='P'&&param.return_bu_pr_combo){
			var id=t.siblings().first().attr('id');
			var prev_val=t.siblings().last().val();
			if(def.bu[prev_val].country==undefined){var prev_name=def.bu[prev_val].bu}
			else{var prev_name=def.country[def.bu[prev_val].country].country}
			var btn=$('<button type="button" class="btn btn-outline-secondary btn-block text-left text-lowercase mb-1" id="'+id+'">').html(prev_name+'>'+def.project[val].project).append(
					$('<input type="hidden" name="bu">').val(prev_val)).append(
					$('<input type="hidden" name="project">').val(val));
			Object.getOwnPropertyNames(param).forEach(function(e){btn.attr('data-'+e,param[e])});
			btn.on('click',function(){
				var id=$(this).attr('id');
				var par=$(this).data();
				var select=$('<select class="form-control mb-1 text-lowercase" id="'+id+'">');
				Object.getOwnPropertyNames(par).forEach(function(e){select.attr('data-'+e,par[e])});
				select.on('change select',function(){build_bu_list({t:$(this),p:$(this).data()})});
				$(this).parent().html(select);
				$('[id="'+id+'"]').trigger('change')});
			t.parent().html(btn).append($('<p class="text-muted">').html($('<small>').html('click to change selection')))}
		else{
			var res=get_bu_child(val);
			if(!res){
				if(val.substr(0,1)!='P'){
					t.after($('<p class="text-danger">').html($('<small>').html('office has not be set in this organization.')))}}
			else{
				var bu=res.filter(function(e){return e.id.substr(0,1)=='B'});
				var pro=res.filter(function(e){return e.id.substr(0,1)=='P'});
				var child=$('<select class="form-control mb-1 text-lowercase">').html(
					$('<option>').val('').html('.organization')).on('change select',function(){build_bu_list({t:$(this),p:param})});
				if(bu.length!=0){
					var bl=bu.filter(function(e){return e.country==undefined});
					if(bl.length!=0){
						var group=$('<optgroup label=".business line/unit">');
						if(param.select_disable){
							bl.forEach(function(e){group.append($('<option>').val(e.id).html(e.bu))})}
						else if(param.show_disabled){
							bl.forEach(function(e){group.append($('<option>').val(e.id).html(e.bu).prop('disabled',!e.status))})}
						else{
							bl.filter(function(e){return e.status==1}).forEach(
								function(e){group.append($('<option>').val(e.id).html(e.bu))})}
						child.append(group)}
					var cu=bu.filter(function(e){return e.country!=undefined});
					if(cu.length!=0){
						var group=$('<optgroup label=".country">');
						if(param.select_disable){
							cu.forEach(function(e){group.append($('<option>').val(e.id).html(def.country[e.country].country))})}
						else if(param.show_disabled){
							cu.forEach(function(e){group.append($('<option>').val(e.id).html(def.country[e.country].country).prop('disabled',!e.status))})}
						else{
							cu.filter(function(e){return e.status==1}).forEach(
								function(e){group.append($('<option>').val(e.id).html(def.country[e.country].country))})}
						child.append(group)}}
				if(pro.length!=0){
					var pro_group=$('<optgroup label=".office/project">');
					if(param.select_disable){
						pro.forEach(function(e){pro_group.append($('<option>').val(e.id).html(e.project))})}
					else if(param.show_disabled){
						pro.forEach(function(e){pro_group.append($('<option>').val(e.id).html(e.project).prop('disabled',!e.status))})}
					else{
						pro.filter(function(e){return e.status==1}).forEach(
							function(e){pro_group.append($('<option>').val(e.id).html(e.project))})}
					child.append(pro_group)}
				t.after(child)}}}
	else{
		if(t.siblings().not('p.help-block').length==0){
			if(t.children().length>1){t.children().first().siblings().remove()}
		if(param.select_disable){
			get_bu_region().forEach(function(e){t.append($('<option>').val(e.id).html(e.bu))})}
		else if(param.show_disabled){
			get_bu_region().forEach(function(e){t.append($('<option>').val(e.id).html(e.bu).prop('disabled',!e.status))})}
		else{
			get_bu_region().filter(function(e){return e.status==1}).forEach(
				function(e){t.append($('<option>').val(e.id).html(e.bu))})}}}}

function build_side_container(){
	var block=$('<div class="col order-first order-lg-last">').html(
		$('<div class="jumbotron bg-dark rounded">').html(
			$('<div class="container text-right text-light">')));
	var des="I see I Act (ISIA) is designed to encourage the staff at all levels to participate in H&S management at the workplace; by acting on all unsafe acts and unsafe conditions that come into notice, right before unintended incident could happen.";
	var user=get_employee_registration(init.us.email);
	var button=$('<button class="btn btn-outline-light btn-lg font-weight-light" type="button" data-toggle="modal" data-target="#form-modal">');
	if(!user){var user_welcome='Hi there!';button.html('sign up »').on('click',build_user_registration)}
	else{var user_welcome='Welcome back, '+user.employee+'!';button.html('new submission »')}
	var container=block.find('div.container');
	container.html($('<p class="h1 font-weight-light mb-5">').html(user_welcome));
	container.append($('<p class="text-justify lead mb-5">').html(des));
	container.append($('<p class="mb-5">').html(button))
	return block}
