HTMLElement.prototype.hasClass = function(className) {
  return this.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}
HTMLElement.prototype.addClass = function(className){
  var name = " "+className;
  if (!this.hasClass(className)){
    this.className += name;
  }
}
HTMLElement.prototype.removeClass = function(className){
  if (this.hasClass(className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    this.className = this.className.replace(reg, " ");
  }
}
HTMLElement.prototype.closest = function(selector){
  var el = this;
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}
HTMLElement.prototype.siblings = function(selector){
  var el = this;
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.nextElementSibling;
  }
  if(el === null){
    el = this;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        break;
      }
      el = el.previousElementSibling;
    }
  }
  return el;
}
HTMLElement.prototype.isHidden = function(){
  return (this.style.display === "none");
}
HTMLElement.prototype.hide = function(){
  this.style.display = "none";
}
HTMLElement.prototype.show = function(){
  this.style.display = "block";
}
