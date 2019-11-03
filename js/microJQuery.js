function microJQuery (selector, context = document){
	this.elements = Array.from(context.querySelectorAll(selector));
	return this;
}

microJQuery.prototype.each = function (fn){
	this.elements.forEach((element, index) => fn.call(element, element, index));
	return this;
}

microJQuery.prototype.click = function(fn){
  this.each(element => element.addEventListener('click', fn));
  return this;
}

microJQuery.prototype.html = function(html_text){
  if (html_text === undefined)
  {
    this.each(element => html_text = element.innerHTML);
    return html_text;
  }
  else
  {
    this.each(element => element.innerHTML = html_text);
    return this;
  }
}

microJQuery.prototype.text = function(text){
  if (text === undefined)
  {
    this.each(element => text = element.textContent);
    return text;
  }
  else
  {
    this.each(element => element.textContent = text);
    return this;
  }
}

microJQuery.prototype.class = function(classname){
  if (classname === undefined)
  {
    this.each(element => classname = element.className);
    return classname;
  }
  else
  {
    this.each(element => element.className = classname);
    return this;
  }
}

microJQuery.prototype.val = function(val){
  if (val === undefined)
  {
    this.each(element => val = element.value);
    return val;
  }
  else
  {
    this.each(element => element.value = val);
    return this;
  }
}

microJQuery.prototype.cssText = function(cssText){
  if (cssText === undefined)
  {
    this.each(element => cssText = element.style.cssText);
    return cssText;
  }
  else
  {
    this.each(element => element.style.cssText = cssText);
    return this;
  }
}

const $ = (e) => new microJQuery(e);
