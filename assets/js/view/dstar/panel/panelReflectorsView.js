/**
 * @class Pannel with reflectors list
 * @memberOf RepNet.View.DStar.Panel
 * @extends RepNet.View.Panel.PanelView
 * @extends RepNet.View.Dstar.DStarView
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var panelReflectorsView = function panelReflectorsView(dom)
{
	PanelView.call(this,dom);
	DStarView.call(this,dom);

	this.title.innerHTML = 'Reflectors';
};

// extend View & List
Tools.extend(panelReflectorsView, PanelView);
Tools.extend(panelReflectorsView, DStarView);


/**
 * Add a reflector to the view
 * @param {Reflector} reflector Reflector to add
 * @return {void}
 */
panelReflectorsView.prototype.addReflector = function(reflector)
{
	this.content.innerHTML += 'REF ADD ['+reflector.id+']<br>';
};

/**
 * Remove a reflector from the view
 * @param {Reflector} reflector Reflector to remove
 * @return {void}
 */
panelReflectorsView.prototype.removeReflector = function(reflector)
{
	this.content.innerHTML += 'REF REMOVE ['+reflector.id+']<br>';
};