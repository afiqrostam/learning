function init_bu(){
	console.time(arguments.callee.name);
	Object.getOwnPropertyNames(def.bu).forEach(
		function(e){
			def.bu[e].has_child=get_bu_child(e);
			def.bu[e].add_project=get_bu_project(e)});
	console.timeEnd(arguments.callee.name)}

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
  else if(def.bu[id]==undefined){
    console.error('invalid ID');
    console.timeEnd(arguments.callee.name);
    return false}
  else{
	  if(def.bu[id].has_child!=undefined){console.timeEnd(arguments.callee.name);return def.bu[id].has_child}
		else{
        var find_bu=Object.getOwnPropertyNames(def.bu).filter(
          function(e){return def.bu[e].root==id}).map(
            function(e){return def.bu[e]});
        var find_project=Object.getOwnPropertyNames(def.project).filter(
          function(e){return def.project[e].root.split(',').indexOf(id)!=-1}).map(
            function(e){return def.project[e]});
        if(find_bu.length!=0&&find_project.length!=0){
          console.timeEnd(arguments.callee.name);
          return find_bu.concat(find_project)}
        else if(find_bu.length!=0){
          console.timeEnd(arguments.callee.name);
          return find_bu}
        else if(find_project.length!=0){
          console.timeEnd(arguments.callee.name);
          return find_project}
        else{
          console.error('no futher child found');
          console.timeEnd(arguments.callee.name);
          return false}}}}

function get_bu_project(id){
  console.time(arguments.callee.name);
  if(id==undefined){
    console.error('ID not defined');
    console.timeEnd(arguments.callee.name);
    return false}
  else if(id.substr(0,1)!='B'){
    console.error('invalid ID type');
    console.timeEnd(arguments.callee.name);
    return false}
  else if(def.bu[id]==undefined){
    console.error('invalid ID');
    console.timeEnd(arguments.callee.name);
    return false}
  else{
		var find=def.bu[id];
		if(find.add_project!=undefined){
			console.timeEnd(arguments.callee.name);
			return find.add_project}
		else{
        if(find.country!=undefined){var country=[find.country]}else{var country=[]}
        while(find.root!=undefined){
            find=def.bu[find.root];
            if(find.country!=undefined){country.push(find.country)}}
        if(country.length==0){
            console.error('no country found');
            console.timeEnd(arguments.callee.name);
            return false}
        else if(country.length>1){
            console.error('unexpected outcome');
            console.timeEnd(arguments.callee.name);
            return false}
        else{console.timeEnd(arguments.callee.name);return country[0]}}}}

function init_project(){
	console.time(arguments.callee.name);
	Object.getOwnPropertyNames(def.project).forEach(function(e){def.project[e].country=get_project_country(e)});
	console.timeEnd(arguments.callee.name)}
         
function get_country_current(){
  return array_unique(Object.getOwnPropertyNames(def.project).map(
    function(e){return def.project[e].country})).map(
      function(e){return def.country[e]})}

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
      console.timeEnd(arguments.callee.name);
      return trim[0]}}}}
