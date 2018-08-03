var alert=function(e){
return $('<div id="'+e.id+'" class="alert alert-'+e.type+' alert-dismissible fade show" role="alert">').append(
  $('<strong>').html('!!! ')).append(e.msg)}
