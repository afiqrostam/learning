$('#form-modal').on('hidden.bs.modal',function(){
  var modal=$(this);
	modal.find('div.modal-dialog').removeClass('modal-lg');
  modal.find('p.modal-title').html('&nbsp;');
  modal.find('div.modal-body').html('&nbsp;');
  modal.find('div.modal-footer').html(
	$('<button type="button" class="btn btn-outline-dark" data-dismiss="modal">').html('close'))});
$('.nav-item>a[data-toggle="modal"]').on('click',build_user_registration);

function build_user_profile(){
	var user=get_employee_registration(init.us.email);
	var profile=$('.profile-status');
	profile.empty();
	if(!user){profile.append('&nbsp;')}
	else{
		profile.append(
			$('<span class="lead my-0 mr-3 p-0 text-capitalize">').html(user.employee));
		if(init.us.photo!=undefined){
			var image=$('<img class="rounded-circle d-none d-lg-inline" alt="profile-photo" style="width:32px">');
            profile.append(image)
			image[0].src=init.us.photo}
	else{profile.append($('<span class="my-0 d-none d-lg-inline-block">').html('<i class="fas fa-2x fa-user-circle"></i>'))}}}

  
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
				var child=$('<select class="form-control mb-1 text-lowercase">').html(
					$('<option>').val('').html('.organization')).on('change select',function(){build_bu_list({t:$(this),p:param})});
				var bl=$('<optgroup label=".business line/unit">');
				var cu=$('<optgroup label=".country">');
				var pr=$('<optgroup label=".office/project">');
				if(param.select_disable){
					res.forEach(function(e){
						if(e.id.substr(0,1)=='B'){
							if(e.country==undefined){bl.append($('<option>').val(e.id).html(e.bu))}
							else{cu.append($('<option>').val(e.id).html(def.country[e.country].country))}}
						else{pr.append($('<option>').val(e.id).html(e.project))}})}
				else if(param.show_disabled){
					res.forEach(function(e){
						if(e.id.substr(0,1)=='B'){
							if(e.country==undefined){bl.append($('<option>').val(e.id).html(e.bu).prop('disabled',!e.status))}
							else{cu.append($('<option>').val(e.id).html(def.country[e.country].country).prop('disabled',!e.status))}}
						else{pr.append($('<option>').val(e.id).html(e.project).prop('disabled',!e.status))}})}
				else{
					res.filter(function(e){return e.status==1}).forEach(function(e){
						if(e.id.substr(0,1)=='B'){
							if(e.country==undefined){bl.append($('<option>').val(e.id).html(e.bu))}
							else{cu.append($('<option>').val(e.id).html(def.country[e.country].country))}}
						else{pr.append($('<option>').val(e.id).html(e.project))}})}
				if(bl.children().length!=0){child.append(bl)}
				if(cu.children().length!=0){child.append(cu)}
				if(pr.children().length!=0){child.append(pr)}
				if(child.children().length==2){
					child.children('option').html(child.children('optgroup').attr('label'));
					child.children('optgroup').children().each(function(){child.append($(this))});
					child.children('optgroup').remove()}
				t.after(child)}}}
	else{
		if(t.siblings().not('p.help-block').length==0){
			if(t.children().length>1){t.children().first().siblings().remove()}
		if(param.select_disable){get_bu_region().forEach(function(e){t.append($('<option>').val(e.id).html(e.bu))})}
		else if(param.show_disabled){get_bu_region().forEach(function(e){t.append($('<option>').val(e.id).html(e.bu).prop('disabled',!e.status))})}
		else{get_bu_region().filter(function(e){return e.status==1}).forEach(function(e){t.append($('<option>').val(e.id).html(e.bu))})}}}}

function build_side_container(){
	var block=$('<div class="col order-first order-lg-last">').html(
		$('<div class="container mb-1 p-3 bg-dark rounded text-right text-light">'));
	var des="I see I Act (ISIA) is designed to encourage the staff at all levels to participate in H&S management at the workplace; by acting on all unsafe acts and unsafe conditions that come into notice, right before unintended incident could happen.";
	var user=get_employee_registration(init.us.email);
	var button=$('<button class="btn btn-outline-light btn-lg font-weight-light" type="button" data-toggle="modal" data-target="#form-modal">');
	if(!user){var user_welcome='Hi there!';button.html('sign up »').on('click',build_user_registration)}
	else{var user_welcome='Welcome back, '+user.employee+'!';button.html('new submission »')}
	var container=block.find('div.container');
	container.html($('<p class="h2 pt-5 font-weight-light">').html(user_welcome));
	container.append($('<p class="text-justify lead">').html(des));
	container.append($('<p class="pt-3">').html(button))
	return block}

function build_announcement(){
  var modal=$('#form-modal');
  var form=$('<form>');
	modal.find('div.modal-dialog').addClass('modal-lg');
  var message=$('<div class="form-row">').append(
	  $('<label for="announce-message" class="col-xl-12 col-form-label">').html('Message')).append(
	  $('<div class="col-xl-12">').append(
	    $('<textarea rows="10" class="form-control" id="announce-message" name="content">')));
  var type=$('<div class="form-row">').append(
		$('<div class="col-lg-6 form-group">').append(
			$('<label for="announce-type">').html('Type')).append(
			$('<select class="form-control mb-1 text-lowercase" id="announce-type" name="type">').append(
				$('<option>').html('changelog')).append(
				$('<option>').html('news'))));
  modal.find('p.modal-title').html('New Post');
  modal.find('div.modal-body').html(form.append(type).append(message));
  $('#announce-message').summernote({
	dialogsInBody: true,
	disableDragAndDrop: true,
	shortcuts: false,
	toolbar: 
		[['style', ['bold', 'italic', 'underline']],
		 ['font', ['strikethrough', 'superscript', 'subscript']],
		 ['para', ['ul', 'ol', 'paragraph','style']]],
	placeholder:"An mea esse nostrud. Ea dico nulla errem nec, eu quando reprimique eam. Affert postulant qui cu, cu sea everti eruditi, cum primis maluisset referrentur eu. Probo aliquid pri at, ne detraxit definiebas est. Eu maluisset definiebas contentiones eum, nec ad persecuti theophrastus. Ne ubique feugait accumsan vel, tota falli id cum, cu nostrud delectus phaedrum ius."});
  $('#announce-message').summernote('insertParagraph');
  $('#announce-message').summernote('formatPara');
  modal.find('div.modal-footer').append(
	$('<button type="button" class="btn btn-dark">').html('post').on('click',post_announcement))}

function post_announcement(){
  var modal=$('#form-modal');
  var form=modal.find('form');
  form.hide()
  modal.find('div.modal-footer').hide();
  form.before($('<p style="min-height:400px">').append('posting..'))
  var data={};
  form.serializeArray().forEach(function(e){data[e.name]=e.value});
  var input=init.sp.news.ranges[0].header.filter(
    function(e){return e!='timestamp'&&e!='username'}).map(
      function(e){if(data[e]!=undefined){return data[e]}else{return ''}});
  google.script.run.withSuccessHandler(
    function(e){
      var modal=$('#form-modal');
      var p=modal.find('.modal-body').find('p');
      if(e.s){
		p.append('success!');
        modal.find('form').remove();
        modal.find('div.modal-footer').find('.btn-dark').remove();
        p.append('<br>updating content..');
        google.script.run.withSuccessHandler(
          function(e,f){
            var modal=$('#form-modal');
            var p=modal.find('.modal-body').find('p');
            if(e.s){
              init.sp.news.ranges.forEach(function(a){a.header=$.extend(true,[],e.res[0]);f[a.name]=get_2D(e.res,a)});
			  display_update(def.news[def.news.length-1],def.news.length-1);
              p.append('success!');
              modal.find('div.modal-footer').show()}
            else{
			  p.append('failed!');
			  modal.find('div.modal-footer').show()}}).withUserObject(def).get_data_list({
          sheet_id:init.sp.news.id,
          sheet_name:init.sp.news.ranges.map(function(e){return e.sheet+'!'+e.range})[0]})}
      else{
		p.append('failed!');
		p.attr('style','')
		modal.find('form').show();
		modal.find('div.modal-footer').show()}}).post_data_list({
    sheet_id:init.sp.news.id,
    sheet_name:init.sp.news.ranges[0].sheet,
    input:input})}
