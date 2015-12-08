/**
 * @class ThreeELementView Three js view base class
 * @memberOf RepNet.View.Three
 * @interface
 * @constructor
 * @param {DOMElement} dom Dom where to display view
 */
var ThreeElementView = function ThreeElementView(dom)
{
	View.call(this, dom);

	/**
	 * Element's UUID
	 * @type {String}
	 */
	this.uuid = Tools.generateUUID();

	/**
	 * Main elemen'ts graphic component's container
	 * @type {THREE.Group}
	 */
	this.threeElement = new THREE.Group();

	/**
	 * Main elemen'ts graphic component's container
	 * @type {DOM}
	 */
	this.domElement = document.createElement('div');

	/**
	 * Child's container
	 * @type {THREE.Group}
	 */
	this.threeChilds = new THREE.Group();

	/**
	 * Child's container
	 * @type {DOM}
	 */
	this.domChilds = document.createElement('div');

	/**
	 * Element parent
	 * @type {ThreeElementView}
	 */
	this.parent = null;

	/**
	 * Childs list
	 * @type {Map}
	 */
	this.childs = new Map();

	// build element content
	this.threeElement.add(this.threeChilds);
	this.domElement.appendChild(this.domChilds);
	
	this.buildContent();
}

// Extend view
Tools.extend(ThreeElementView, View);

ThreeElementView.prototype = 
/** @lends  ThreeElementView */
{
	/**
	 * Build graphic's element of the instance
 	* @return {void}
	 */
	buildContent : function()
	{
	},

	/**
	 * Append a ThreeElementView as child of the current one
	 * @param  {ThreeElementView} child Child to append
	 * @param {Boolean} fromRecursive Is function call recursivly?
	 * @return {void}
	 */
	append : function(child, fromRecursive)
	{
		if (!this.childs.exist(child.uuid)) {
			if (!fromRecursive) {
				child.appendTo(this, true);
			}			
			this.childs.set(child.uuid, child);
		}
	},

	/**
	 * Remove a child of
	 * @param  {ThreeElementView} child Child to remove
	 * @param {Boolean} fromRecursive Is function call recursivly?
	 * @return {void}
	 */
	unappend : function(child, fromRecursive)
	{
		if (this.childs.exist(child.uuid)) {
			if (!fromRecursive) {
				child.unappendTo(true);
			}
			this.childs.remove(child.uuid);
		}
	},

	/**
	 * Define the parent of the ThreeElementView
	 * @param  {ThreeElementView} child Child to append
	 * @param {Boolean} fromRecursive Is function call recursivly?
	 * @return {void}
	 */
	appendTo : function(parent, fromRecursive)
	{
		if (this.parent) {
			if (this.parent.uuid == parent.uuid) {
				return;
			}
			this.unappendTo();
		}

		if (!fromRecursive) {
			parent.append(this, true);
		}

		this.parent = parent;
	},

	/**
	 * Remove the ThreeElementView from the parent
	 * @param {Boolean} fromRecursive Is function call recursivly?
	 * @return {void}
	 */
	unappendTo : function(fromRecursive)
	{
		if (this.parent) {
			if (!fromRecursive) {
				this.parent.unappend(this, true);
			}
			this.parent = null;
		}
	},

	/**
	 * Set the element as visible
	 * @return {void}
	 */
	show : function()
	{
		this.parent.threeChilds.add(this.threeElement);
		this.parent.domChilds.appendChild(this.domElement);
	},

	/**
	 * Set the element as visible
	 * @return {void}
	 */
	hide : function()
	{
		this.parent.threeChilds.remove(this.threeElement);
		this.parent.domChilds.removeChild(this.domElement);
	},

	/**
	 * Update view
	 * @return {void}
	 */
	update : function()
	{
		this.childs.each(function(index, child){
			child.update();
		});
	},

	/**
	 * Set position of the element
	 * @param {Number|false} x X axis, let the current value if false 
	 * @param {Number|false} y Y axis, let the current value if false 
	 * @param {Number|false} z Z axis, let the current value if false 
	 */
	setPosition : function(x, y, z)
	{
		if (typeof x != "undefined" && x !== false) {
			this.threeElement.position.x = x;
		}
		if (typeof y != "undefined" && y !== false) {
			this.threeElement.position.y = y;
		}
		if (typeof z != "undefined" && z !== false) {
			this.threeElement.position.z = z;
		}
	},

	/**
	 * Set rotation of the element
	 * @param {Number|false} x X axis, let the current value if false 
	 * @param {Number|false} y Y axis, let the current value if false 
	 * @param {Number|false} z Z axis, let the current value if false 
	 */
	setRotation : function(x, y, z)
	{
		if (typeof x != "undefined" && x !== false) {
			this.threeElement.rotation.x = x;
		}
		if (typeof y != "undefined" && y !== false) {
			this.threeElement.rotation.y = y;
		}
		if (typeof z != "undefined" && z !== false) {
			this.threeElement.rotation.z = z;
		}
	}
};
