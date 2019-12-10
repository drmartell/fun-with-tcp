module.exports = rawRequest => {
  const requestObj = {};
  const head = rawRequest.toString().split('\r\n\r')[0];
  let body = rawRequest.toString().split('\r\n\r')[1];
  requestObj.method = head.toString().split(' ')[0];
  requestObj.path = head.toString().split(' ')[1];
  if(body) requestObj.body = body.trim();
  return requestObj;
};
