/**
 * @class Pannel with stations list
 * @memberOf RepNet.View.DStar.Panel
 * @extends RepNet.View.Panel.PanelView
 * @extends RepNet.View.Dstar.DStarView
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var panelStationsView = function panelStationsView(dom)
{
	PanelView.call(this,dom);
	DStarView.call(this,dom);

	this.title.innerHTML = 'Stations';
};

// extend View & List
Tools.extend(panelStationsView, PanelView);
Tools.extend(panelStationsView, DStarView);



/**
 * Remove a station to the view
 * @param {Station} station Station to add
 * @return {void}
 */
panelStationsView.prototype.addStation = function(station)
{
	this.content.innerHTML += 'ADD STATION['+station.id+']<br>';
};

/**
 * Remove a station to the view
 * @param {Station} station Station to remove
 * @return {void}
 */
panelStationsView.prototype.removeStation = function(station)
{
	this.content.innerHTML += 'ADD STATION['+station.id+']<br>';
};