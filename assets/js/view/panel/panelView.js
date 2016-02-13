/**
 * @class Fixed pannel who appear with slide effect
 * @memberOf RepNet.View.Panel
 * @extends RepNet.View.View
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var PanelView = function PanelView(dom)
{
	View.call(this,dom);

	/**
	 * Is currently open?
	 * @type {Boolean}
	 */
	this.active = null;

	this.buildContent();
};

// extend View & List
Tools.extend(PanelView, View);

/**
 * Build pannel html 
 * @return {void}
 */
PanelView.prototype.buildContent = function()
{
	this.title = document.createElement('div');
	this.title.classList.add('panel-title');
	this.dom.appendChild(this.title);

	this.content = document.createElement('div');
	this.content.classList.add('panel-content');
	this.dom.appendChild(this.content);
}

/**
 * Activate the panel
 * @return {void}
 */
PanelView.prototype.activate = function()
{
	this.dom.classList.add('active');
	this.trigger('activate');
}

/**
 * Unactivate the panel
 * @return {void}
 */
PanelView.prototype.unactivate = function()
{
	this.dom.classList.remove('active');
	this.trigger('unactivate');
}

/**
 * Set the title of the pannel
 * @param {string} title title to set
 * @return {void}
 */
PanelView.prototype.setTitle = function(title)
{
	this.title.innerHTML = title;
}

/**
 * Set the content of the pannel
 * @param {string|DOMElement} content content to set
 * @return {void}
 */
PanelView.prototype.setContent = function(content)
{
	try {
		this.content.innerHTML = '';
		this.content.appendChild(content);
	} catch (e) {
		this.content.innerHTML = content;
	}
}