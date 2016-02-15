/**
 * @class Pannel with reflectors list
 * @memberOf RepNet.View.DStar.Panel
 * @extends RepNet.View.Panel.List.PanelListElementView
 * @constructor
 * @param {Model} element Dstar model used to construct list element
 */
var PanelListElementDStarView = function PanelListElementDStarView(element)
{
	this.uuid = element.uuid;
	this.element = element;
	PanelListElementView.call(this,element.id);
};

// extend View & List
Tools.extend(PanelListElementDStarView, PanelListElementView);

/**
 * Build graphic's element of the instance
 * @return {void}
 */
PanelListElementDStarView.prototype.buildContent = function()
{
	var mouse = new Mouse();
	PanelListElementView.prototype.buildContent.call(this);
	mouse.on('click', this.trigger.bind(this, 'focus', this.element), this.dom);
}