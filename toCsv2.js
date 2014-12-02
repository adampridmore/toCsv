function toCsv(list){
	var lines = [];
	
	var getHeader = function(prefix, item){
		var header = [];
		for(var key in item){
			if (!item.hasOwnProperty(key)){
				continue;
			}
			if (typeof item[key] === 'object'){
				header.push(getHeader(key, item[key]));
			}else{
				if (prefix){
					header.push(prefix + "." + key);
				}else{
					header.push(key);
				}				
			}			
		}
		return header.join();
	};
	
	var getRow = function(item){
		var values = [];
		for(var key in item){
			if (!item.hasOwnProperty(key)){
				continue;
			}
			if (typeof(item[key]) === 'object'){
				values.push(getRow(item[key]));
			}else{
				values.push(item[key]);
			}			
		}
		return values.join();
	};
	
	var headerPrinted = false;	

	list.forEach(function(item){
		if(!headerPrinted){
			lines.push(getHeader("", item));
			headerPrinted = true;
		}	
		lines.push(getRow(item));
	});
	
	return lines.join('\r\n');
}
