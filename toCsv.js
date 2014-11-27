var myList = [];

myList.push({
	name: "dave",
	age: 31,
	address: {
		name: "home"
	}
});

myList.push({
	name: "bob",
	age: 30
});

var csv = toCsv(myList);

print(csv);

function toCsv(list){
	if (list.length === 0){
		return null;
	}

	var lines = [];

	var header = [];
	for (key in list[0]) {
    	if (list[0].hasOwnProperty(key)) {
       		header.push(key);
    	}
	}

	lines.push(header.join());
	
	myList.forEach(function(row){
		var line = []

		for (key in row) {
    		if (row.hasOwnProperty(key)) {
        		var val = row[key];
        		line.push(val);
    		}
		}

		var lineText = line.join();

		lines.push(lineText);
	});

	return lines.join('\r\n');
}