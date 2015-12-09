/**
 * @class Menu View
 * @memberOf RepNet.View.Menu
 * @extends RepNet.View.View
 * @extends RepNet.View.List
 * @constructor
 * @param {DOMElement} dom Dom where to display menu
 */
var MenuView = function MenuView(dom)
{
	View.call(this,dom);
	List.call(this);

	/**
	 * Current active item's index
	 * @type {Number}
	 */
	this.active = null;
};

// extend View & List
Tools.extend(MenuView, View);
Tools.extend(MenuView, List);

/**
 * Append menu item to the menu
 * listen menu item 'click' event' 
 * @param {MenuItemView} menuItem Menu item to add
 * @return {void}
 */
MenuView.prototype.add = function(menuItem)
/** @lends  MenuView */
{
	var index = List.prototype.add.call(this, menuItem);

	/**
	 * When menuitem is clicked,
	 * toogle activation
	 * @return {void}
	 */
	menuItem.on('click', function(index){
		if (this.active != index) {
			this.activate(index);
		} else {
			this.unactivate();
		}
	}.bind(this, index));
};

/**
 * Set the current active menu
 * Call to previous active menuItems unactivate method
 * and activate method for the new one
 * @return {void}
 */
MenuView.prototype.activate = function(index)
/** @lends  MenuView */
{
	if (this.exist(index) && this.active != index) {
		this.unactivate();
		this.get(index).activate();
		this.active = index;
	}
};

/**
 * Unactive the current active menu
 * @return {void}
 */
MenuView.prototype.unactivate = function()
/** @lends  MenuView */
{
	if (this.active !== null) {
		this.get(this.active).unactivate();
		this.active = null;
	}
};