//home
function display_update(e,i){
	var entry=$('<div class="mb-5">').data('count',i);
	entry.append(
		$('<p class="lead m-0">').html(e.type+':'));
	entry.append(e.content);
	entry.append($('<p class="mb-3">').html(
		$('<small class="font-italic">').html(
			get_employee_registration(e.username).employee+' on '+new Date(e.timestamp))));
	var nav=$('<p>').html('&nbsp');
	var prev=$('<button class="btn mr-3 btn-sm btn-dark">').html('Previous').on('click',function(){
		var i=$('.update-content').find('div').data('count');var e=def.news[i+1];display_update(e,i+1)});
	var next=$('<button class="btn float-right mr-3 btn-sm btn-dark">').html('Next').on('click',function(){
		var i=$('.update-content').find('div').data('count');var e=def.news[i-1];display_update(e,i-1)})
	if(def.news.length-1==i){nav.append(next)}else if(i==0){nav.append(prev)}else{nav.append(prev).append(next)}
	if(def.news.length>1){entry.append(nav)}
	$('.update-content').html(entry)}

function page_home(e){
	e.preventDefault();
  $('main').html(
    $('<div class="row">').html(
      $('<div class="col-lg-8 ">').html(
        $('<div class="jumbotron font-weight-light">').html(
          $('<div class="update-header my-2 mx-0 p-0">').html(
            $('<button class="float-right btn btn-outline-light rounded-circle" type="button" data-toggle="modal" data-target="#form-modal">').html('+').on('click',function(){build_announcement()})).append(
			$('<p class="display-4">').html('Updates:'))).append(
          $('<div class="update-content">').html('&nbsp;')).append(
          $('<div class="update-footer my-2 mx-0 p-0">').html(
            $('<p class="text-right">').html(
              $('<img src="https://afiqrostam.github.io/icons/always%20safe3.png" alt="always safe" style="max-height: 24px">')).append(
              '&nbsp;').append('&nbsp;').append(
              $('<img src="https://afiqrostam.github.io/icons/logo%2096.png" alt="aiming for zero accident" style="max-height: 64px">')))))).append(
            build_side_container()));
	build_user_profile();
	display_update(def.news[def.news.length-1],def.news.length-1)}

//announcement
function show_announcement(e,i){
	var body=$('main').find('div.body');
	body.html(
		$('<div class="mb-3">').data('header',true).html(
			$('<span class="badge badge-info mr-3">').html(e.type)).append(
			$('<span class="badge badge-info mr-3">').html(
				get_employee_registration(e.username).employee)).append(
			$('<div class="float-right btn-group">').append(
				$('<button type="button" class="btn btn-sm btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">')).append(
				$('<div class="dropdown-menu dropdown-menu-right">').append(
					$('<button class="dropdown-item" type="button" data-toggle="modal" data-target="#form-modal">').html('Update').data('count',i).on('click',function(){build_announcement($(this).data('count'))})).append(
					$('<button class="dropdown-item" type="button">').html('Delete'))))).append(
		$('<div>').data('content',true).html(
			$('<p>').html('Posted on '+new Date(e.timestamp))).append(e.content));
	var nav=$('main').find('div.footer');
	var prev=$('<button class="btn mr-3 btn-sm btn-dark">').html('Previous').on('click',function(){
		var i=$('.update-content').find('div').data('count');
		var e=def.news[i+1];show_announcement(e,i+1)});
	var next=$('<button class="btn float-right mr-3 btn-sm btn-dark">').html('Next').on('click',function(){
		var i=$('.update-content').find('div').data('count');
		var e=def.news[i-1];show_announcement(e,i-1)})
	if(def.news.length-1==i){nav.html(next)}
	else if(i==0){nav.html(prev)}
	else{nav.html(prev).append(next)}}

function page_announcement(e){
  e.preventDefault();
	$('main').html(
    $('<div class="row">').html(
      $('<div class="col-lg-8 mb-5">').html(
        $('<div class="list-group list-group-flush">').html(
          $('<div class="body list-group-item">').html('&nbsp;')).append(
          $('<div class="footer list-group-item">').html('&nbsp;')))).append(
            $('<div class="col order-first order-lg-last">').html(
	$('<div class="container mb-3 p-3 bg-dark rounded text-right text-light">').html(
		$('<p class="h2 pt-5 font-weight-light">').html('Announcement')).append(
		$('<p class="pt-3">').html(
			$('<button class="btn btn-outline-light btn-lg font-weight-light" type="button" data-toggle="modal" data-target="#form-modal">')
			.html('new announcement').on('click',function(){build_announcement()}))))));
show_announcement(def.news[def.news.length-1],def.news.length-1)}
