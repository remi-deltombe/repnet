/**
 * @class Fixed pannel who display a list of element
 * @memberOf RepNet.View.Panel.List
 * @memberOf RepNet.View.Panel.Panel
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var PanelListView = function PanelListView(dom)
{
	PanelView.call(this,dom);
	this.childs = new Map();
};

// extend View & List
Tools.extend(PanelListView, PanelView);

/**
 * Append listEment to the list
 * @param {PanelListElementView} child child to append 
 * @return {void}
 */
PanelListView.prototype.append = function(child)
{
	if (!this.childs.exist(child.uuid)) {
		this.childs.set(child.uuid, child);
		this.buildList();
	}
}

/**
 * Remove listEment from the list
 * @param {PanelListElementView} child child to unappend 
 * @return {void}
 */
PanelListView.prototype.unappend = function(child)
{
	if (this.childs.exist(child.uuid)) {
		this.childs.remove(child.uuid);
		this.content.removeChild(child.dom);
	}
}

/**
 * Remove listEment from the list, based on the child's uuid
 * @param {PanelListElementView} child child to unappend 
 * @return {void}
 */
PanelListView.prototype.unappendWithUUID = function(uuid)
{
	var child;
	if (this.childs.exist(uuid)) {
		child = this.childs.get(uuid);
		this.content.removeChild(child.dom);
		this.childs.remove(uuid);
	}
}


/**
 * Build pannel html list
 * @return {void}
 */
PanelListView.prototype.buildList = function()
{
	this.setContent('');
	this.childs.each(function(id, child){
		this.content.appendChild(child.dom);
	}.bind(this));
}
