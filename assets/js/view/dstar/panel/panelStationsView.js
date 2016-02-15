/**
 * @class Pannel with stations list
 * @memberOf RepNet.View.DStar.Panel
 * @extends RepNet.View.Panel.List.PanelListView
 * @extends RepNet.View.Dstar.DStarView
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var panelStationsView = function panelStationsView(dom)
{
	PanelListView.call(this,dom);
	DStarView.call(this,dom);

	this.setTitle('Stations');
};

// extend View & List
Tools.extend(panelStationsView, PanelListView);
Tools.extend(panelStationsView, DStarView);



/**
 * Remove a station to the view
 * @param {Station} station Station to add
 * @return {void}
 */
panelStationsView.prototype.linkStation = function(station)
{
	var listElement = new PanelListElementDStarView(station);
	listElement.on('focus', this.trigger.bind(this, 'focus station'));
	this.append(listElement);
};

/**
 * Remove a station to the view
 * @param {Station} station Station to remove
 * @return {void}
 */
panelStationsView.prototype.unlinkStation = function(station)
{
	this.unappendWithUUID(station.uuid);
};