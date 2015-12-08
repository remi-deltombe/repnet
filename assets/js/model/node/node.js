/**
 * @class Node model
 * @extends RepNet.Model.Base.Modulable
 * @memberof RepNet.Model.Node
 * @constructor
 * @param {String} callsign Node's callsign
 */
var Node = function Node(callsign)
{
	Modulable.call(this, callsign, NodeModule);
};

// Extend Modulable
Tools.extend(Node, Modulable);

/**
 * Populate reflector with data
 * -
 * Data must be formated like :
 * "id" : node callsign,
 * "modules" : [
 *		{
 *			"id": node's module callsign,
 *			"parent": node callsign,
 *			"uuid": node's module uuid,
 *			//stations
 *			"childs": [
 *				{
 *					"id": "station callsign",
 *					"uuid": "station uuid"
 *				}
 *			]
 *		},...
 * ]
 * @param  {Object} data Formated data used to populate
 * @return {void}
 */
Node.prototype.populate = function (data)
/** @lends  Node */
{
	var  j, k, s, nm;

	// ---
	// reflector's data
	this.id = data.reflector || this.id;
	this.id = this.id.trim();

	// nodes linked
	for (j=0; j<data.modules.length; j++) {
		nm = data.modules[j];
		this.module(nm.id).uuid = nm.uuid;

		// stations linked
		for (k=0; k<nm.childs.length; k++) {
			s = StationFactory.instance().get(nm.childs[k].id);
			s.uuid = nm.childs[k].uuid;
			this.module(nm.id).link(s);
		}
	}
};