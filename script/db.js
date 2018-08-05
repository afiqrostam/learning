function get_bu_region(){
	return Object.getOwnPropertyNames(def.bu).filter(
		function(e){return def.bu[e].root==undefined}).map(
			function(e){return def.bu[e]})}
      
function get_bu_child(id){
  console.time(arguments.callee.name);
  if(id==undefined){
    console.error('ID not defined');
    console.timeEnd(arguments.callee.name);
    return false}
  else if(id.substr(0,1)!='B'){
    console.error('invalid ID type');
    console.timeEnd(arguments.callee.name);
    return false}
  else{
    var find_bu=Object.getOwnPropertyNames(def.bu).filter(
      function(e){return def.bu[e].root==id}).map(
        function(e){return def.bu[e]});
    if(find_bu.length!=0){
      console.timeEnd(arguments.callee.name);
      return find_bu}
    else{
  	  var find_project=Object.getOwnPropertyNames(def.project).filter(
        function(e){return def.project[e].root.split(',').indexOf(id)!=-1}).map(
          function(e){return def.project[e]});
  	  if(find_project.length!=0){
        console.timeEnd(arguments.callee.name);
        return find_project}
  	  else{
        console.error('no futher child found');
        console.timeEnd(arguments.callee.name);
        return false}}}}
      
function get_project_country(id){
  console.time(arguments.callee.name);
  if(id==undefined){
	  console.timeEnd(arguments.callee.name);
    console.error('ID not defined');
    return false}
  else if(id.substr(0,1)!='P'){
    console.timeEnd(arguments.callee.name);
    console.error('invalid ID type');
    return false}
  else if(def.project[id]==undefined){
    console.timeEnd(arguments.callee.name);
    console.error('invalid ID');
    return false}
else{
	if(def.project[id].country!=undefined){
		console.timeEnd(arguments.callee.name);
		return def.project[id].country}
	else{
		var root=def.project[id].root.split(',');
		var find_root=root.filter(function(f){return def.bu[f].country!=undefined});
		if(find_root.length==0){
      while(find_root.length==0){
        var new_root=root.map(function(f){if(def.bu[f].root!=undefined){return def.bu[f].root}else{return f}});
        if(new_root!=root){root=new_root}else{break}
        var find_root=root.filter(function(f){return def.bu[f].country!=undefined})}
			if(find_root.length==0){
				console.timeEnd(arguments.callee.name);
				console.error('country not found');
				return false}}
		find_root=find_root.map(function(f){return def.bu[f].country});
		var trim=array_unique(find_root);	
		if(trim.length>1){
			console.timeEnd(arguments.callee.name);
			console.error('country not found');
			return false}
		else{
      def.project[id].country=trim[0];
      console.timeEnd(arguments.callee.name);
      return def.project[id].country}}}}
      
function get_country_child(id){
  console.time(arguments.callee.name);
  if(id==undefined){console.error('ID not defined');console.timeEnd(arguments.callee.name);return false}
  else if(id.substr(0,1)!='C'){console.error('invalid ID type');console.timeEnd(arguments.callee.name);return false}
  else{
    var find_project=Object.getOwnPropertyNames(def.project).filter(
          function(e){return def.project[e].country==id}).map(
              function(e){return def.project[e]});
    if(find_project.length!=0){console.timeEnd(arguments.callee.name);return find_project}
    else{console.error('no futher child found');console.timeEnd(arguments.callee.name);return false}}}
    
function get_country_current(){
  return array_unique(Object.getOwnPropertyNames(def.project).map(
    function(e){return def.project[e].country})).map(
      function(e){return def.country[e]})}
