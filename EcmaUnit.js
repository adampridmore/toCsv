// Version 1.2.3

var ecmaUnit = ecmaUnit || {};

ecmaUnit.Runner = function (){
  this.run = function(testFixture, options){

    var isFunction = function(func){
      return (typeof func === 'function');
    };

    var shouldRunTest = function(options, testName){
      if (options && options.runSingleTest){
        if (options.runSingleTest === testName){
          return true;
        }else{
          return false;
        }
      }
      return true;
    }

    var runTest = function(test, fixtureResult, testName, options){
      var testResult = {
        testName: testName
      };

      fixtureResult.testResults.push(testResult);

      if (shouldRunTest(options, testName)){
        try{
          test();
          testResult.result = 'pass';
          fixtureResult.passCount++;
        }catch(exception){
          testResult.result = 'fail';
          testResult.exception = exception;
          fixtureResult.failCount++;
        }
      }else{
        testResult.result = 'skipped'
        fixtureResult.skippedCount++;
      }
    };

    var runFixtureInternal = function(testFixture, options){
      var fixtureResult = new ecmaUnit.FixtureResult();

      for(property in testFixture){
        var test = testFixture[property];
        if (isFunction(test)){
          runTest(test, fixtureResult, property,options);
        }
      }

      fixtureResult.setPassedFlag();

      return fixtureResult;
    };

    return runFixtureInternal(testFixture, options);
  }
};

ecmaUnit.FixtureResult = function(){
  var that = this;
  this.testResults = [];
  this.passCount = 0;
  this.failCount = 0;
  this.skippedCount = 0;
  
  this.stringify = function(){
    var lines = [];
    lines.push('Test Results');
    lines.push('============');
    lines.push('Ran');
    that.testResults.forEach(function(testResult){
      var line = testResult.testName + '\t-\t' + testResult.result;
      lines.push(line);

      if (testResult.result === 'fail'){
        lines.push('\tException: \'' + testResult.exception + '\'');
        if (testResult.exception.stack){
          lines.push('\tAt: ' + testResult.exception.stack);
        }        
      }
    });

    return lines.join('\n');
  };

  this.setPassedFlag = function(fixtureResult){
    if (that.failCount === 0){
      that.passed = true;
    } else {
      that.passed = false;
    }
  };
};

var assert = assert || {};

assert.areEqual = function(expected, actual, message){
  var isDate = function(value){
    if (typeof(value) === "object"){
      if (value.getTime){
        return true;
      }
    }

    return false;
  };

  var isEqual = function(v1, v2){
    if (v1 === null && v2 === null){
      return true;
    }

    if (isDate(v1) && isDate(v2)){
      return (v1.getTime() === v2.getTime());
    }

    return expected === actual;
  }
  
  if (isEqual(expected, actual)){
    return;
  }else{
    var errorMessage = "Expected '" + expected + "' but was '" + actual + "'";
    if (message){
      errorMessage += '\nMessage: ' + message;
    }

    throw new Error(errorMessage);
  }
};

assert.fail = function(message){
  throw new Error('Fail: ' + message);
};

assert.stringContains = function(string, match){
  if (string.indexOf(match) === -1){
    throw new Error('String "' + string + '" did not contain "' + match + '"');
  }
};

assert.isTrue = function(value){
  if(!value){
    throw new Error('Expected truthy, but was: ' + value);
  }
};

assert.isFalse = function(value){
  if(value){
    throw new Error('Expected falsy, but was: ' + value);
  }
};


// Export the module for nodejs
var module = module || null;
if (module){
  module.exports= {
    ecmaUnit: ecmaUnit,
    assert: assert
  }
}