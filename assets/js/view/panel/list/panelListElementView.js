/**
 * @class List element for PannelList
 * @memberOf RepNet.View.Panel.List
 * @memberOf RepNet.View.View
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var PanelListElementView = function PanelListElementView(content)
{
	View.call(this);

	/**
	 * Element's UUID
	 * @type {String}
	 */
	this.uuid = Tools.generateUUID();

	/**
	 * Dom of element
	 * @type {DOMElement}
	 */
	this.dom = document.createElement('div');

	this.setContent(content);
	this.buildContent();
};

// extend View & List
Tools.extend(PanelListElementView, View);


/**
 * Build graphic's element of the instance
	* @return {void}
 */
PanelListElementView.prototype.buildContent = function()
{
	this.dom.className += 'panel-list-element'
}

/**
 * Set the content of the pannel
 * @param {string|DOMElement} content content to set
 * @return {void}
 */
PanelListElementView.prototype.setContent = function(content)
{
	try {
		this.dom.innerHTML = '';
		this.dom.appendChild(content);
	} catch (e) {
		this.dom.innerHTML = content;
	}
}