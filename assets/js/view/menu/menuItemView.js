/**
 * @class Menu Item view
 * @memberOf RepNet.View.Menu
 * @extends RepNet.View.View
 * @constructor
 * @param {DOMElement} dom Dom where to display menu
 */
var MenuItemView = function MenuItemView(dom, icon, text)
{
	View.call(this, dom);

	/**
	 * Icon classname
	 * @type {String}
	 */
	this.icon = icon;

	/**
	 * Menu item text
	 * @type {String}
	 */
	this.text = text;

	// build dom and add event click on it
	this.domElement = document.createElement('div');
	this.domElement.onclick = this.click.bind(this);

	// build dom content
	this.buildContent();
};

// extend View
Tools.extend(MenuItemView, View);

/**
 * Click event
 * @return {void}
 */
MenuItemView.prototype.click = function()
/** @lends  MenuItemView */
{
	this.trigger('click');
};

/**
 * Set the current active menu
 * Call to previous active menuItems unactivate method
 * and activate method for the new one
 * Add class active to itself
 * @overrider
 * @return {void}
 */
MenuItemView.prototype.activate = function()
/** @lends  MenuItemView */
{
	this.trigger('activate');
	this.domElement.className += ' active';
};

/**
 * Unactive the current active menu
 * Remove class active to itself
 * @overrider
 * @return {void}
 */
MenuItemView.prototype.unactivate = function()
/** @lends  MenuItemView */
{
	this.trigger('unactivate');
	this.domElement.className = this.domElement.className.substring(0, this.domElement.className.length-7);
};

/**
 * Prepare DOMElement of the menuItem
 * @return {void}
 */
MenuItemView.prototype.buildContent = function()
/** @lends  MenuItemView */
{
	var domElement;

	this.domElement.className = 'item '+this.icon;

	domElement = document.createElement('div');
	domElement.className = 'icon icon-'+this.icon;
	this.domElement.appendChild(domElement);

	domElement = document.createElement('div');
	domElement.className = 'text';
	domElement.innerHTML = this.text;
	this.domElement.appendChild(domElement);

	this.dom.appendChild(this.domElement);
};
