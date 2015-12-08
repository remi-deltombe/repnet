/**
 * @class Reflector model
 * @extends RepNet.Model.Base.Modulable
 * @memberof RepNet.Model.Reflector
 * @constructor
 * @param {String} callsign Reflector's callsign
 */
var Reflector = function Reflector(callsign)
{
	Modulable.call(this, callsign, ReflectorModule);
};

// Extend Modulable
Tools.extend(Reflector, Modulable);

/**
 * Populate reflector with data
 * -
 * Data must be formated like :
 * "id" : reflector callsign,
 * "modules" : [
 * 		{
 * 			"id": reflector's module name,
 * 			"parent": 'reflector's callsign',
 * 			"uuid": 'reflector's module uuid',
 * 			// nodes
 * 			"childs": [ 
 * 				{
 * 					"id": node's module callsign,
 * 					"parent": node callsign,
 * 					"uuid": node's module uuid,
 * 					//stations
 * 					"childs": [
 * 						{
 * 							"id": "station callsign",
 * 							"uuid": "station uuid"
 * 						}
 * 					]
 * 				},...
 * 			]
 *  	}, ...
 * ]
 * @param  {Object} data Formated data used to populate
 * @return {void}
 */
Reflector.prototype.populate = function (data)
/** @lends  Reflector */
{
	var i, j, k, n, s, rm, nm;

	// ---
	// reflector's data
	this.id = data.reflector || this.id;
	this.id = this.id.trim();

	//prepare each modules
	for (i=0; i<data.modules.length; i++) {
		rm = data.modules[i]
		this.module(rm.id).uuid = rm.uuid;
	}

	this.trigger('populate', this);

	// reflector's modules
	for (i=0; i<data.modules.length; i++) {
		rm = data.modules[i];
		// nodes linked
		for (j=0; j<rm.childs.length; j++) {
			nm = rm.childs[j];
			n = NodeFactory.instance().get(nm.parent);
			n.module(nm.id).uuid = nm.uuid;
			this.module(rm.id).link(n.module(nm.id));

			// stations linked
			for (k=0; k<nm.childs.length; k++) {
				s = StationFactory.instance().get(nm.childs[k].id);
				s.uuid = nm.childs[k].uuid;
				n.module(nm.id).link(s);
			}
		}
	} 
};
