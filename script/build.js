$('#form-modal').on('hidden.bs.modal',function(){
  var modal=$(this);
  modal.find('p.modal-title').html('&nbsp;');
  modal.find('div.modal-body').html('&nbsp;')});
  
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
	    $('<select class="form-control mb-1 text-uppercase" id="reg-organization" name="bu">').on('change select',build_bu_list_disabled)));
  modal.find('p.modal-title').html('User Registration');
  modal.find('div.modal-body').html(form.append(name).append(email).append(organization));
	organization.find('select').trigger('select')}
  
function build_bu_list_disabled(){
  var t=$(this);
  t.nextAll().not('p.help-block').remove();
  var val=t.val();
  if(val==null){
    t.append($('<option>').val('').html('.region'));
    get_bu_region().forEach(function(e){
      t.append($('<option>').val(e.id).html(e.bu))})}
  else if(val!=''){
    var res=get_bu_child(val);
    if(!res){if(val.substr(0,1)!='P'){
      t.after($('<p class="text-danger">').html('office has not be set in this organization.'))}}
    else{
	    var bu=res.filter(function(e){return e.id.substr(0,1)=='B'});
      var pro=res.filter(function(e){return e.id.substr(0,1)=='P'});
      var child=$('<select class="form-control mb-1 text-uppercase">').html(
		    $('<option>').val('').html('.organization')).on('change',bu_list);
      if(bu.length!=0){
		    var bl=bu.filter(function(e){return e.country==undefined});
		    if(bl.length!=0){
		      var group=$('<optgroup label=".business line/unit">');
		      bl.forEach(function(e){group.append($('<option>').val(e.id).html(e.bu))});
		      child.append(group)}
		    var cu=bu.filter(function(e){return e.country!=undefined});
		    if(cu.length!=0){
		      var group=$('<optgroup label=".country">');
		      cu.forEach(function(e){group.append($('<option>').val(e.id).html(def.country[e.country].country))});
		      child.append(group)}}
      if(pro.length!=0){
        var pro_group=$('<optgroup label=".office/project">');
        pro.forEach(function(e){pro_group.append($('<option>').val(e.id).html(e.project).prop('disabled',!e.status))});
        child.append(pro_group)}
      t.after(child)}}
  else{	
    if(t.siblings().not('p.help-block').length==0){
      if(t.children().length>1){t.children().first().siblings().remove()}
      get_bu_region().forEach(function(e){t.append($('<option>').val(e.id).html(e.bu))})}}}
