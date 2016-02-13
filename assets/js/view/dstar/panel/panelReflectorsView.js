/**
 * @class Pannel with reflectors list
 * @memberOf RepNet.View.DStar.Panel
 * @extends RepNet.View.Panel.List.PanelListView
 * @extends RepNet.View.Dstar.DStarView
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var panelReflectorsView = function panelReflectorsView(dom)
{
	PanelListView.call(this,dom);
	DStarView.call(this,dom);

	this.setTitle('Reflectors');
};

// extend View & List
Tools.extend(panelReflectorsView, PanelListView);
Tools.extend(panelReflectorsView, DStarView);


/**
 * Add a reflector to the view
 * @param {Reflector} reflector Reflector to add
 * @return {void}
 */
panelReflectorsView.prototype.addReflector = function(reflector)
{
	var listElement = new PanelListElementDStarView(reflector);
	this.append(listElement);
};

/**
 * Remove a reflector from the view
 * @param {Reflector} reflector Reflector to remove
 * @return {void}
 */
panelReflectorsView.prototype.removeReflector = function(reflector)
{
	this.unappendWithUUID(reflector.uuid);
};