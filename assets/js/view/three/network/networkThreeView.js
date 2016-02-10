/**
 * @class NetworkThreeView network view container
 * @memberOf RepNet.View.Three.Network
 * @extends RepNet.View.Three.ThreeElementView
 * @constructor
 * @param {DOMElement} dom Dom where to display view
 */
var NetworkThreeView = function(dom)
{
	ThreeElementView.call(this, dom);

	/**
	 * 3D Scene
	 * @type {THREE.Scene}
	 */
	this.scene = new THREE.Scene();

	/**
	 * 3D Camera
	 * @type {THREE.PerspectiveCamera}
	 */
	this.camera = new THREE.PerspectiveCamera( 45, this.dom.offsetWidth / this.dom.offsetHeight, 1, 1000 );

	/**
	 * 3D Renderer
	 * @type {THREE.WebGLRenderer}
	 */
	this.renderer = new THREE.WebGLRenderer();

	/**
	 * 3D light point
	 * @type {Array}
	 */
	this.lights = [];

	// build lights
	this.lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
	this.lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
	this.lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );
	
	this.lights[0].position.set( 0, 200, 0 );
	this.lights[1].position.set( 100, 200, 100 );
	this.lights[2].position.set( -100, -200, -100 );

	this.scene.add( this.lights[0] );
	this.scene.add( this.lights[1] );
	this.scene.add( this.lights[2] );

	// append renderer
	this.renderer.setSize( this.dom.offsetWidth, this.dom.offsetHeight );
	this.dom.appendChild( this.renderer.domElement );

	this.dom.appendChild(this.domElement);
	this.scene.add(this.threeElement);
};

// Extend ThreeElementView
Tools.extend(NetworkThreeView, ThreeElementView);

/**
 * remove possibility to set parent 
 * @lends  NetworkThreeView 
 * @override
 */
NetworkThreeView.prototype.unappendTo = function(){};

/** 
 * remove possibility to set parent
 * @lends  NetworkThreeView 
 * @override
 */
NetworkThreeView.prototype.appendTo = function(){};

/**
 * Update view and render it
 * @return {void}
 */
NetworkThreeView.prototype.update = function()
/** @lends  NetworkThreeView */
{
	ThreeElementView.prototype.update.call(this);

	// render
	this.renderer.render( this.scene, this.camera );
	requestAnimationFrame( this.update.bind(this) );
};
