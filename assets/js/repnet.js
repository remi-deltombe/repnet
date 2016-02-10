
// Namespaces definition

/**
 * RepNet
 * @namespace RepNet
 */

/**
 * Data store
 * @namespace Collection
 * @memberOf RepNet
 */

/**
 * Controller layout
 * @namespace Controller
 * @memberOf RepNet
 */

/**
 * Event layout
 * @namespace Event
 * @memberOf RepNet
 */

/**
 * Programming utils
 * @namespace Helper
 * @memberOf RepNet
 */

/**
 * Data abstration layout
 * @namespace Model
 * @memberOf RepNet
 */

/**
 * Model's basic class template
 * @namespace Base
 * @memberOf RepNet.Model
 */

/**
 * Node Dstar
 * @namespace Node
 * @memberOf RepNet.Model
 */

/**
 * Reflector Dstar
 * @namespace Reflector
 * @memberOf RepNet.Model
 */

/**
 * Station Dstar
 * @namespace Station
 * @memberOf RepNet.Model
 */

/**
 * View layout
 * @namespace View
 * @memberOf RepNet
 */

/**
 * Dstar network views container
 * @namespace DStar
 * @memberOf RepNet.View
 */

/**
 * Panel view with dstar view relation
 * @namespace Panel
 * @memberOf RepNet.View.DStar
 */

/**
 * 3D View layout
 * @namespace Three
 * @memberOf RepNet.View
 */

/**
 * 3D View of network ( like galaxy )
 * @namespace Network
 * @memberOf RepNet.View.Three
 */

/**
 * 3D View of DStar network
 * @namespace DStar
 * @memberOf RepNet.View.Three
 */

/**
 * Menu view
 * @namespace Menu
 * @memberOf RepNet.View
 */

/**
 * Panel view
 * @namespace Panel
 * @memberOf RepNet.View
 */


// ------------------------
// 
/**
 * @class RepNet App laucher
 * @memberOf RepNet
 * @constructor
 * @param {String} url Relative or absolute url of application
 */
var RepNet = function RepNet(url)
{
    /**
     * Url of app
     * @type {String}
     */
    this.url = url;

    /**
     * App controllers
     * @type {Map}
     */
    this.controllers = new Map();

    // init controllers
    //this.controllers.set('debug', new DebugCtrl());
    this.controllers.set('socket', new SocketCtrl(this.url));
    this.controllers.set('dstar', new DStarCtrl(this.url));
};





window.onload = function()
{
    var repnet = new RepNet('');
    new Mouse();
};