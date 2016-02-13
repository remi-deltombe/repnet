/**
 * @class NetworkNodeThreeView network node in network view container
 * @memberOf RepNet.View.Three.Network
 * @extends RepNet.View.Three.ThreeElementView
 * @constructor
 */
var NetworkNodeThreeView = function()
{	
	ThreeElementView.call(this);

	this.speed = 0;
	this.angle = 0;
	this.distance = 0;
}

// Extend ThreeElementView
Tools.extend(NetworkNodeThreeView, ThreeElementView);

/**
 * Build graphic's element of the instance
 * @return {void}
 */
NetworkNodeThreeView.prototype.buildContent = function()
{
	var geometry,material;

	// line
	geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	material = new THREE.LineBasicMaterial( { color:0xFFFFFF } ); 
	this.threeLine = new THREE.Line(geometry, material);

	// sphere
	geometry = new THREE.SphereGeometry(1, 20, 20);
	material = new THREE.MeshBasicMaterial({color:0xFFFFFF, wireframe: true});
	this.threeSphere = new THREE.Mesh(geometry, material);

	// label
	this.domLabel = document.createElement('div');
	this.domLabel.style.position = 'absolute';
	this.domLabel.style.color = '#fff';
	this.domLabel.style.font = '12px/15px Arial';
	this.domLabel.style.marginTop = -80;

	// append Element
	this.threeChilds.add(this.threeSphere);
	this.threeElement.add(this.threeLine);
	this.domElement.appendChild(this.domLabel);
};

/**
 * Set color of the ball and the line
 * @param {Number} color New color
 */
NetworkNodeThreeView.prototype.setColor = function(color)
{
	this.threeSphere.material.color.setHex(color);
	this.threeLine.material.color.setHex(color);
};

/**
 * Set scale of the ball
 * @param {Number|false} scale new Scale
 */
NetworkNodeThreeView.prototype.setScale = function(scale)
{
	this.threeSphere.scale.x = scale;
	this.threeSphere.scale.y = scale;
	this.threeSphere.scale.z = scale;
	this.domLabel.style.marginTop = -80 + 60*(1-scale);
};

/**
 * Set quality of the node
 * --
 * Quality : 
 *  0 : invisible
 * 	1 : very poor
 * 		- Line is not render
 * 		- Label is not render
 * 		- Ball is render with 3x2
 * 	2 : poor
 * 		- Line is render
 * 		- Label is render
 * 		- Ball is render with 5x5
 * 	3 : middle
 * 		- Line is render
 * 		- Label is render
 * 		- Ball is render with 10x10
 * 	4 : good
 * 		- Line is render
 * 		- Label is render
 * 		- Ball is render with 25x25
 * 	5 : Xtreme yolo render
 * 		- Line is render
 * 		- Label is render
 * 		- Ball is render with 40x40
 * --
 * @param {Number} New quality
 */
NetworkNodeThreeView.prototype.setQuality = function(quality)
{
	var geometry, i,j;

	if (quality == 0) {
		this.hide();
	}

	this.threeElement.remove(this.threeLine);
	if (quality > 1) {
		this.threeElement.add(this.threeLine);
	}

	i=3;
	j=2;

	switch (quality)
	{
		case 2:
			i=j=5;
			break;
		case 3:
			i=j=10;
			break;
		case 4:
			i=j=20;
			break;
		case 4:
			i=j=30;
			break;
	}

	geometry = new THREE.SphereGeometry(1, i, j);
	this.threeSphere.geometry = geometry;
};

/**
 * Set distance of the element's sphere from the middle
 * @param {Number} distance New distance
 */
NetworkNodeThreeView.prototype.setDistance = function(distance)
{
	this.distance = distance;
};

/**
 * Set the rotation's speed of the element's sphere from the middle
 * @param {Number} speed New speed
 */
NetworkNodeThreeView.prototype.setSpeed = function(speed)
{
	this.speed = speed;
};

/**
 * Set label text
 * @param {Number} speed New speed
 */
NetworkNodeThreeView.prototype.setLabel = function(label)
{
	this.domLabel.innerHTML = label;
	setTimeout(function() {
		this.domLabel.style.marginLeft = -this.domLabel.offsetWidth/ 2 ;
	}.bind(this),1);
};

/**
 * Set orbit of the element's sphere
 * @param {Number} delta First angle used to define orbit
 * @param {Number} gama Second angle used to define orbit
 */
NetworkNodeThreeView.prototype.setOrbit = function(delta, gamma)
{
	this.angle = gamma;
	this.threeElement.rotation.x = delta;
};

/**
 * Return x and y coordonate of sphere in screen
 * @return {Object} {x:..., y:... }
 */
NetworkNodeThreeView.prototype.offsetPosition = function()
{
	var camera, parent, widthHalf, heightHalf, vector;

	// Get camera in parent tree
	camera = null;
	parent = this.parent;

	while (typeof parent.camera == 'undefined' && typeof parent.parent != 'undefined') {
		parent = parent.parent;
	}

	camera = parent.camera || null; 

	if (!camera) {
		return {"x":0,"y":0};
	}

	// calculate offset
	widthHalf = window.innerWidth / 2;
	heightHalf = window.innerHeight / 2;

	vector = new THREE.Vector3();
	vector.setFromMatrixPosition( this.threeSphere.matrixWorld )
	vector.project( camera );

	vector.x = ( vector.x * widthHalf ) + widthHalf;
	vector.y = - ( vector.y * heightHalf ) + heightHalf;
	return {
		x:vector.x,
		y:vector.y
	}
};

/**
 * Set orbit of the element's sphere
 * @param {Number|false} x X axis, let the current value if false 
 * @param {Number|false} y Y axis, let the current value if false 
 * @param {Number|false} z Z axis, let the current value if false 
 */
NetworkNodeThreeView.prototype.setOrbitPosition = function(x, y, z)
{
	var position;

	// sphere and childs
	if (typeof x != "undefined" && x !== false) {
		this.threeChilds.position.x = x;
	}
	if (typeof y != "undefined" && y !== false) {
		this.threeChilds.position.y = y;
	}
	if (typeof z != "undefined" && z !== false) {
		this.threeChilds.position.z = z;
	}

	// line
    this.threeLine.geometry.vertices[1].x = this.threeChilds.position.x;
    this.threeLine.geometry.vertices[1].y = this.threeChilds.position.y;
    this.threeLine.geometry.vertices[1].z = this.threeChilds.position.z;
    this.threeLine.geometry.verticesNeedUpdate = true;

    // label
    position = this.offsetPosition();
    this.domLabel.style.top = position.y;
    this.domLabel.style.left = position.x;
};

/**
 * Update view
 * @return {void}
 */
NetworkNodeThreeView.prototype.update = function()
{

	ThreeElementView.prototype.update.call(this);

	this.angle += this.speed;

	//rotate sphere
	this.threeSphere.rotation.y += this.speed;

	//rotate orbit
	this.setOrbitPosition(
		Math.cos(this.angle) * this.distance, // x
		false, 								  // y
		Math.sin(this.angle) * this.distance  // z
	);
};


