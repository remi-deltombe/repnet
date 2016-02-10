/**
 * @class Mouse Manage user mouse, Singleton
 * @memberOf RepNet.Input
 * @extends RepNet.Event.Emitter
 * @constructor
 */
var Mouse = function Mouse()
{
	if (typeof Mouse._instance == 'undefined') {
		Mouse._instance = this;
		Emitter.call(this);

		// bind dom event
		window.onclick = this.onClick.bind(this);
		window.oncontextmenu = this.onContextMenu.bind(this);
		window.ondblclick = this.onDoubleClick.bind(this);
		window.onmousedown = this.onMouseDown.bind(this);
		window.onmouseenter = this.onMouseEnter.bind(this);
		window.onmouseleave = this.onMouseLeave.bind(this);
		window.onmousemove = this.onMouseMove.bind(this);
		window.onmouseover = this.onMouseOver.bind(this);
		window.onmouseout = this.onMouseOut.bind(this);
		window.onmouseup = this.onMouseUp.bind(this);
		
		// mouse wheel compatibility
		if (window.addEventListener) {
			// IE9, Chrome, Safari, Opera
			window.addEventListener("mousewheel", this.onScroll.bind(this), false);
			// Firefox
			window.addEventListener("DOMMouseScroll", this.onScroll.bind(this), false);
		}
		// IE 6/7/8
		else window.attachEvent("onmousewheel", this.onScroll.bind(this));

		/**
		 * Current position of the mouse into the page
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
	}
	return Mouse._instance;
};

// extend Emitter
Tools.extend(Mouse, Emitter);

Mouse.prototype.onClick = function()
{
	this.trigger('click');
}

Mouse.prototype.onContextMenu = function(evt)
{
	this.trigger('contextMenu');
}

Mouse.prototype.onDoubleClick = function()
{
	this.trigger('doubleClick');
}

Mouse.prototype.onMouseDown = function()
{
	this.positionOnDown.x = this.position.x;
	this.positionOnDown.y = this.position.y;
	this.isDown = true;
	this.trigger('mouseDown');
}

Mouse.prototype.onMouseEnter = function()
{
	this.trigger('mouseEnter');
}

Mouse.prototype.onMouseLeave = function()
{
	this.trigger('mouseLeave');
}

Mouse.prototype.onMouseMove = function(evt)
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

Mouse.prototype.onMouseOver = function()
{
	this.trigger('mouseOver');
}

Mouse.prototype.onMouseOut = function()
{
	this.trigger('mouseOut');
}

Mouse.prototype.onMouseUp = function()
{
	this.positionOnDown.x = false;
	this.positionOnDown.y = false;
	this.isDown = false;
	this.trigger('mouseUp');
}

Mouse.prototype.onScroll = function(evt)
{
	this.trigger('scroll', evt.wheelDeltaY);
}
