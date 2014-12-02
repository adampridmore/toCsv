load('./EcmaUnit/EcmaUnit.js');
load('toCsv2.js');

var fixture = {
  simpleToCsv: function(){
	
	var list = [{
		name: "dave",
		age: 31
	}];
	
	var text = toCsv(list);
	
	var lines = text.split('\r\n');
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
	
	print(text);
	
	var lines = text.split('\r\n');
	assert.areEqual(2, lines.length);	
	assert.areEqual("name,address.road,address.postcode", lines[0]);	
	assert.areEqual("dave,theRoad,thePostcode", lines[1]);	
  }
};

var runner = new ecmaUnit.Runner();
//var options = {runSingleTest: "subDocumentToCsv"};
var result = runner.run(fixture);
print(result.stringify());