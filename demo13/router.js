
function route(handle, pathname, response, request, postData) {
  console.log("About to route a request for " + pathname, ' handle:', handle);
  let ext = pathname.match(/(\.[^.]+|)$/)[0];
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](response, request, postData);
  } else if (!ext) {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("404 Not found");
    response.end();
  } else {
    handle['/static'](response, request, ext);
  }
}

exports.route = route;