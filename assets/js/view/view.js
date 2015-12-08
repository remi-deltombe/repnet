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

View.prototype = 
/** @lends  View */
{
	/**
	 * Show the view
	 * @return {void}
	 */
	show : function()
	{
	}, 

	/**
	 * Hide the view
	 * @return {void}
	 */
	hide : function()
	{
	},
};
