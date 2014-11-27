function main(){
	var a = {
		name : "dave",
		age: 33,
		address: {
			road: "The Street",
			postcode : "The Post Code"
		}
	};

	var list = [a,a];

	print(toCsv(list));
}

main();

function toCsv(list){
	var lines = [];
	
	var getHeader = function(item){
		header = [];
		for(var key in item){
			if (typeof item[key] === 'object'){
				header.push(getHeader(item[key]));
			}else{
				header.push(key);
			}			
		}
		return (header.join());
	}
	
	var getRow = function(item){
		values = [];
		for(var key in item){
			values.push(item[key]);
		}
		return(values.join());
	}
	
	var headerPrinted = false;	

	list.forEach(function(item){
		if(!headerPrinted){
			lines.push(getHeader(item));
			headerPrinted = true;
		}	
		lines.push(getRow(item));
	});
	
	return lines.join('\r\n');
}