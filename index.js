var inherits = require('inherits');

var JsonRpcError = function(message, code, data) {
  if (!(this instanceof JsonRpcError)) {
    return new JsonRpcError(message, code, data);
  }

  this.message = message;
  this.code = code;

  if (typeof data !== 'undefined') {
    this.data = data;
  }
};

inherits(JsonRpcError, Error);

var ParseError = function() {
  if (!(this instanceof ParseError)) {
    return new ParseError();
  }

  JsonRpcError.call(this, 'Parse error', -32700);
};

inherits(ParseError, JsonRpcError);

var InvalidRequest = function() {
  if (!(this instanceof InvalidRequest)) {
    return new InvalidRequest();
  }

  JsonRpcError.call(this, 'Invalid Request', -32600);
};

inherits(InvalidRequest, JsonRpcError);

var MethodNotFound = function() {
  if (!(this instanceof MethodNotFound)) {
    return new MethodNotFound();
  }

  JsonRpcError.call(this, 'Method not found' + method, -32601);
};

inherits(MethodNotFound, JsonRpcError);

var InvalidParams = function() {
  if (!(this instanceof InvalidParams)) {
    return new InvalidParams();
  }

  JsonRpcError.call(this, 'Invalid Params', -32602);
};

inherits(InvalidParams, JsonRpcError);

var InternalError = function(err) {
  if (!(this instanceof InternalError)) {
    return new InternalError(err);
  }

  JsonRpcError.call(this, err.message || 'Internal error', -32603);
};

inherits(InternalError, JsonRpcError);

var ServerError = function(code) {
  if (code < -32099 || code > -32000) {
    throw new Error('Invalid error code');
  }

  if (!(this instanceof ServerError)) {
    return new ServerError(code);
  }

  JsonRpcError.call(this, 'Server Error', code);
};

inherits(InternalError, JsonRpcError);

module.exports = {
  JsonRpcError: JsonRpcError,
  ParseError: ParseError,
  MethodNotFound: MethodNotFound,
  InvalidParams: InvalidParams,
  InternalError: InternalError,
  ServerError: ServerError
};
