/**
 * @class Pannel with reflectors list
 * @memberOf RepNet.View.DStar.Panel
 * @extends RepNet.View.Panel.List.PanelListElementView
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var PanelListElementDStarView = function PanelListElementDStarView(element)
{
	PanelListElementView.call(this,element.id);
	this.uuid = element.uuid;
};

// extend View & List
Tools.extend(PanelListElementDStarView, PanelListElementView);
