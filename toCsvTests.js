load('EcmaUnit.js');
load('toCsv.js');

var fixture = {
  simpleToCsv: function(){
	
	var list = [{
		name: "dave",
		age: 31
	}];
	
	var text = toCsv(list);
	
	var lines = text.split('\n');
	assert.areEqual(2, lines.length);	
	assert.areEqual("name,age", lines[0]);	
	assert.areEqual("dave,31", lines[1]);	
  },
  subDocumentToCsv: function(){
	var list = [{
		name: "dave",
		address:{
			road: "theRoad",
			postcode: "thePostcode"
		}
	}];
	
	var text = toCsv(list);
	
	//print(text);
	
	var lines = text.split('\n');
	assert.areEqual(2, lines.length);	
	assert.areEqual("name,address.road,address.postcode", lines[0]);
	assert.areEqual("dave,theRoad,thePostcode", lines[1]);
  },
  dateTime_rendered: function(){
	var list = [{
		myDate: new ISODate('2014-01-01T12:45:10.123Z'),
	}];
	
	var text = toCsv(list);

	//printjson({test: text});
	
	var lines = text.split('\n');
	assert.areEqual(2, lines.length);	
	assert.areEqual("myDate", lines[0]);
	assert.areEqual("2014-01-01T12:45:10.123Z", lines[1]);
  },
};

var runner = new ecmaUnit.Runner();
//var options = {runSingleTest: "subDocumentToCsv"};
var result = runner.run(fixture);
print(result.stringify());