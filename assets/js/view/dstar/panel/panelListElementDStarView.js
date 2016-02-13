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
