/**
 * @class DStarView Base view 
 * @memberOf RepNet.View
 * @extends RepNet.Event.Emitter
 * @constructor
 * @param {DOMElement} dom Dom where to display view
 */
var View = function View(dom)
{
	/**
	 * DOM main container
	 * @type {DOMElement}
	 */
	this.dom = dom;

	Emitter.call(this);
};

// extend Emitter
Tools.extend(View, Emitter);

/**
 * Show the view
 * @return {void}
 */
View.prototype.show = function()
/** @lends  View */
{
};

/**
 * Hide the view
 * @return {void}
 */
View.prototype.hide = function()
/** @lends  View */
{
};