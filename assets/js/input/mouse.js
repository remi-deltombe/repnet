/**
 * @class Mouse Manage user mouse, Singleton
 * @memberOf RepNet.Input
 * @constructor
 */
var Mouse = function Mouse()
{
	if (typeof Mouse._instance == 'undefined') {
		Mouse._instance = this;

		this.emitters = new Map(MouseEmitter)
		MouseEmitter.call(this, window);
	}
	return Mouse._instance;
};

Tools.extend(Mouse, MouseEmitter);

/**
 * Register mouse event on a dom element
 * @param  {string}   eventName event name
 * @param  {Function} callback  callback triggered by event
 * @param  {DOMElement}   dom   Dom to register, default as window
 * @return {void}            
 */
Mouse.prototype.on = function(eventName, callback, dom)
{
	if (typeof dom == 'undefined') {
		return MouseEmitter.prototype.on.call(this, eventName, callback);
	} else {
		return this.emitter(dom).on(eventName, callback);
	}
}

/**
 * Return a dom emitter
 * @param  {DOMElement} dom DOM
 * @return {MouseEmitter}     emitter
 */
Mouse.prototype.emitter = function(dom)
{
	var e;
	if (typeof dom.uuid == 'undefined') dom.uuid = Tools.generateUUID(); 
	if (!this.emitters.exist(dom.uuid)) {
		e = new MouseEmitter(dom);
		this.emitters.set(dom.uuid, e);
	}
	return this.emitters.get(dom.uuid);
}

