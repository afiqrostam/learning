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
	build_user_profile()

		display_update(def.news[def.news.length-1],def.news.length-1)}
