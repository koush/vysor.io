var uglifyeval = (function() {

  function Scope(parent) {
    this.variables = {};
    this.parent = parent;
  }
  
  Scope.prototype.getVariableScope = function(name) {
    if (name in this.variables || !this.parent)
      return this;
    return this.parent.getVariableScope(name);
  }

  Scope.prototype.set = function(name, value) {
    this.variables[name] = value;
  }

  Scope.prototype.get = function(name) {
    return this.variables[name];
  }

  Scope.prototype.has = function(name) {
    return name in this.variables;
  }

  var evaluators = {};

  function evalNow(ast, scope) {
    var evaluator = evaluators[ast[0]];
    if (!evaluator) {
      console.log('wtf is', ast)
    }
    else {
      return evaluator(ast, scope);
    }
  }

  evaluators['stat'] = function(ast, scope) {
    return evalNow(ast[1], scope);
  }
  evaluators['call'] = function(ast, scope) {
    var callTarget = evalNow(ast[1], scope);
    var callThis;
    if (ast[1][0] == 'dot')
      callThis = evalNow(ast[1][1], scope);
    else
      callThis = null;
    var callArgs = [];
    for (var a in ast[2]) {
      callArgs.push(evalNow(ast[2][a], scope));
    }
    return callTarget.apply(callThis, callArgs);
  }
  evaluators['dot'] = function(ast, scope) {
    var dotSource = evalNow(ast[1], scope);
    if (dotSource == null) {
      console.log('error null target', ast[1]);
    }
    return dotSource[ast[2]]
  }
  evaluators['name'] = function(ast, scope) {
    var name = ast[1];
    if (name == 'true')
      return true;
    if (name == 'false')
      return false;
    var nameScope = scope.getVariableScope(name);
    if (nameScope.has(name))
      return nameScope.get(name);
    throw new Error(name + ' not found in scope');
  }
  evaluators['string'] = function(ast, scope) {
    return ast[1];
  }
  evaluators['num'] = function(ast, scope) {
    return ast[1];
  }
  evaluators['assign'] = function(ast, scope) {
    var val = evalNow(ast[3], scope);
    var assignee = ast[2];
    if (assignee[0] == 'sub') {
      var dict = evalNow(assignee[1], scope);
      dict[evalNow(assignee[2], scope)] = val;
    }
    else if (assignee[0] == 'name') {
      var name = assignee[1];
      var nameScope = scope.getVariableScope(name);
      nameScope.set(name, val);
    }
    return val;
  }
  evaluators['object'] = function(ast, scope) {
    var ret = {};
    var vars = ast[1];
    for (var o in vars) {
      o = vars[o];
      ret[o[0]] = evalNow(o[1], scope);
    }
    return ret;
  }
  evaluators['binary'] = function(ast, scope) {
    if (ast[1] == '+') {
      var ret = evalNow(ast[2], scope) + evalNow(ast[3], scope);
      return ret;
    }
    else if (ast[1] == '*') {
      var ret = evalNow(ast[2], scope) * evalNow(ast[3], scope);
      return ret;
    }
    else if (ast[1] == '/') {
      var ret = evalNow(ast[2], scope) / evalNow(ast[3], scope);
      return ret;
    }
    else if (ast[1] == '-') {
      var ret = evalNow(ast[2], scope) - evalNow(ast[3], scope);
      return ret;
    }
    else if (ast[1] == '||') {
      var ret = evalNow(ast[2], scope) || evalNow(ast[3], scope);
      return ret;
    }
    else {
      console.log('wtf is binary', ast[1]);
    }
  }
  evaluators['if'] = function(ast, scope) {
    if (evalNow(ast[1], scope)) {
      return evalNow(ast[2], scope);
    }
    if (ast[3])
      return evalNow(ast[3], scope);
  }

  function evalBlock(block, scope) {
    var lastRet;
    for (var arg in block) {
      arg = block[arg];
      if (arg[0] == 'return') {
        if (arg[1])
          return evalNow(arg[1], scope);
        return;
      }
      lastRet = evalNow(arg, scope)
    }
    return lastRet;
  }

  evaluators['block'] = function(ast, scope) {
    return evalBlock(ast[1], scope);
  }
  evaluators['function'] = 
  evaluators['defun'] =
  function(ast, scope) {
    var newScope = new Scope(scope);
    var funName = ast[1];

    var fun = function() {
      var i = 0;
      for (var arg in ast[2]) {
        arg = ast[2][arg];
        newScope.set(arg, arguments[i++]);
      }

      var ret = evalBlock(ast[3], newScope);
      return ret;
    }
    
    if (funName)
      scope.set(funName, fun);
  
    return fun;
  }


  return function(str) {
    var ast = Uglify.parse(str);
    var global = new Scope();
    global.set('console', console);

    if (ast[0] == 'toplevel') {
      var lastRet;
      for (var i in ast[1]) {
        lastRet = evalNow(ast[1][i], global);
      }
      return lastRet;
    }
    else {
      console.log('wtf is ' + ast[0])
    }
  }

})();
