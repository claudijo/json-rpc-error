var assert = require('assert');

var JsonRpcError = require('../../lib/errors');

describe('JSON RPC 2.0 Error', function() {
  var message = 'some message';
  var code = -1;
  var data = {some: 'data'};

  it('should create base JSON RPC error', function () {
    var err = new JsonRpcError.JsonRpcError(message, code, data);
    assert(err.message === message);
    assert(err.code === code);
    assert(err.data === data);
  });

  it('should create base JSON RPC error without data member', function () {
    var err = new JsonRpcError.JsonRpcError(message, code);
    for (var prop in err) {
      assert(prop !== 'data');
    }
  });

  it('should create base JSON RPC error without using `new` keyword', function () {
    var err = JsonRpcError.JsonRpcError(message, code, data);
    assert(err instanceof JsonRpcError.JsonRpcError);
  });

  it('should create base JSON RPC error as instance of native error', function () {
    var err = new JsonRpcError.JsonRpcError(message, code, data);
    assert(err instanceof Error);
  });

  it('should create parse error', function () {
    var err = new JsonRpcError.ParseError();
    assert(err.message === 'Parse error');
    assert(err.code === -32700);
  });

  it('should create parse error without using `new` keyword', function () {
    var err = JsonRpcError.ParseError();
    assert(err instanceof JsonRpcError.ParseError);
  });

  it('should create parse error as instance of base JSON RPC error', function () {
    var err = JsonRpcError.ParseError();
    assert(err instanceof JsonRpcError.JsonRpcError);
  });

  it('should create invalid request error', function () {
    var err = new JsonRpcError.InvalidRequest();
    assert(err.message === 'Invalid Request');
    assert(err.code === -32600);
  });

  it('should create invalid request error without using `new` keyword', function () {
    var err = JsonRpcError.InvalidRequest();
    assert(err instanceof JsonRpcError.InvalidRequest);
  });

  it('should create invalid request error as instance of base JSON RPC error', function () {
    var err = JsonRpcError.InvalidRequest();
    assert(err instanceof JsonRpcError.JsonRpcError);
  });

  it('should create method not found error', function () {
    var err = new JsonRpcError.MethodNotFound();
    assert(err.message === 'Method not found');
    assert(err.code === -32601);
  });

  it('should create method not found error without using `new` keyword', function () {
    var err = JsonRpcError.MethodNotFound();
    assert(err instanceof JsonRpcError.MethodNotFound);
  });

  it('should create method not found error as instance of base JSON RPC error', function () {
    var err = JsonRpcError.MethodNotFound();
    assert(err instanceof JsonRpcError.JsonRpcError);
  });

  it('should create invalid params error', function () {
    var err = new JsonRpcError.InvalidParams();
    assert(err.message === 'Invalid params');
    assert(err.code === -32602);
  });

  it('should create invalid params error without using `new` keyword', function () {
    var err = JsonRpcError.InvalidParams();
    assert(err instanceof JsonRpcError.InvalidParams);
  });

  it('should create invalid params error as instance of base JSON RPC error', function () {
    var err = JsonRpcError.InvalidParams();
    assert(err instanceof JsonRpcError.JsonRpcError);
  });

  it('should create internal error', function () {
    var err = new JsonRpcError.InternalError();
    assert(err.message === 'Internal error');
    assert(err.code === -32603);
  });

  it('should create internal error from native error', function() {
    var err = new JsonRpcError.InternalError(new Error(message));
    assert(err.message === message);
  });

  it('should create internal error without using `new` keyword', function () {
    var err = JsonRpcError.InternalError();
    assert(err instanceof JsonRpcError.InternalError);
  });

  it('should create internal error from native error without using `new` keyword', function() {
    var err = JsonRpcError.InternalError(Error(message));
    assert(err.message === message);
  });

  it('should create internal error as instance of base JSON RPC error', function () {
    var err = JsonRpcError.InternalError();
    assert(err instanceof JsonRpcError.JsonRpcError);
  });

  it('should create server error', function () {
    var err = new JsonRpcError.ServerError(-32000);
    assert(err.message === 'Server error');
    assert(err.code === -32000);
  });

  it('should throw if creating server error with invalid error code (too low)', function() {
    var rangeError;

    try {
      new JsonRpcError.ServerError(-32100);
    } catch(err) {
      rangeError = err;
    }

    assert(rangeError);
  });

  it('should throw if creating server error with invalid error code (too high)', function() {
    var rangeError;

    try {
      new JsonRpcError.ServerError(-31999);
    } catch(err) {
      rangeError = err;
    }

    assert(rangeError);
  });

  it('should create server error without using `new` keyword', function () {
    var err = JsonRpcError.ServerError(-32000);
    assert(err instanceof JsonRpcError.ServerError);
  });

  it('should create server error as instance of base JSON RPC error', function () {
    var err = new JsonRpcError.ServerError(-32000);
    assert(err instanceof JsonRpcError.JsonRpcError);
  });
});