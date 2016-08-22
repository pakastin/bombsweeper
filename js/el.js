function el (tagName) {
  var el = document.createElement(tagName);

  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments[i];

    if (arg instanceof Node) {
      el.appendChild(arg);
    } else {
      for (var key in arg) {
        if (key === 'style') {
          var style = arg.style;

          for (var styleKey in style) {
            el.style[styleKey] = style[styleKey];
          }
        } else {
          el.setAttribute(key, arg[key]);
        }
      }
    }
  }

  return el;
}
