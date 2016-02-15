/**
 * @class Mouse event manager
 * @param {DOMElement} dom DOM used to register event
 * @memberOf RepNet.Input
 * @extends RepNet.Event.Emitter
 * @constructor
 */
var MouseEmitter = function MouseEmitter(dom)
{
	Emitter.call(this);

	this.dom = dom;

	/**
	 * Current position of the mouse into the dom
	 * @type {Object}
	 */
	this.position = {
		x:false,
		y:false
	};

	/**
	 * Position of the mouse when left button was click 
	 * @type {Object}
	 */
	this.positionOnDown = {
		x:false,
		y:false
	};

	/**
	 * Is the left button down
	 * @type {Boolean}
	 */
	this.isDown = false;


	// bind dom event
	dom.onclick = this.onClick.bind(this);
	dom.oncontextmenu = this.onContextMenu.bind(this);
	dom.ondblclick = this.onDoubleClick.bind(this);
	dom.onmousedown = this.onMouseDown.bind(this);
	dom.onmouseenter = this.onMouseEnter.bind(this);
	dom.onmouseleave = this.onMouseLeave.bind(this);
	dom.onmousemove = this.onMouseMove.bind(this);
	dom.onmouseover = this.onMouseOver.bind(this);
	dom.onmouseout = this.onMouseOut.bind(this);
	dom.onmouseup = this.onMouseUp.bind(this);
	
	// mouse wheel compatibility
	if (dom.addEventListener) {
		// IE9, Chrome, Safari, Opera
		dom.addEventListener("mousewheel", this.onScroll.bind(this), false);
		// Firefox
		dom.addEventListener("DOMMouseScroll", this.onScroll.bind(this), false);
	}
	// IE 6/7/8
	else dom.attachEvent("onmousewheel", this.onScroll.bind(this));
};

// extend Emitter
Tools.extend(MouseEmitter, Emitter);

MouseEmitter.prototype.onClick = function()
{
	this.trigger('click');
}

MouseEmitter.prototype.onContextMenu = function(evt)
{
	this.trigger('contextMenu');
}

MouseEmitter.prototype.onDoubleClick = function()
{
	this.trigger('doubleClick');
}

MouseEmitter.prototype.onMouseDown = function()
{
	this.positionOnDown.x = this.position.x;
	this.positionOnDown.y = this.position.y;
	this.isDown = true;
	this.trigger('mouseDown');
}

MouseEmitter.prototype.onMouseEnter = function()
{
	this.trigger('mouseEnter');
}

MouseEmitter.prototype.onMouseLeave = function()
{
	this.trigger('mouseLeave');
}

MouseEmitter.prototype.onMouseMove = function(evt)
{
	this.position.x = evt.x;
	this.position.y = evt.y;
	this.trigger('mouseMove');
	if (this.isDown) {
		this.trigger('mouseMoveDown');
	} else {
		this.trigger('mouseMoveUp');
	}
}

MouseEmitter.prototype.onMouseOver = function()
{
	this.trigger('mouseOver');
}

MouseEmitter.prototype.onMouseOut = function()
{
	this.trigger('mouseOut');
}

MouseEmitter.prototype.onMouseUp = function()
{
	this.positionOnDown.x = false;
	this.positionOnDown.y = false;
	this.isDown = false;
	this.trigger('mouseUp');
}

MouseEmitter.prototype.onScroll = function(evt)
{
	this.trigger('scroll', evt.wheelDeltaY);
}
