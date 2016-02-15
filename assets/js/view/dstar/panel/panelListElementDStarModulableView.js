/**
 * @class Pannel with reflectors list
 * @memberOf RepNet.View.DStar.Panel
 * @extends RepNet.View.DStar.Panel.PanelListElementDStarView
 * @constructor
 * @param {Model} element Dstar model used to construct list element
 */
var PanelListElementDStarModulableView = function PanelListElementDStarModulableView(element)
{
	this.modules = new Map();
	this.modulesDOM;
	PanelListElementDStarView.call(this, element);
};

// extend View & List
Tools.extend(PanelListElementDStarModulableView, PanelListElementDStarView);

/**
 * Build graphic's element of the instance
 * @return {void}
 */
PanelListElementDStarModulableView.prototype.buildContent = function()
{

	PanelListElementDStarView.prototype.buildContent.call(this);

	this.modulesDOM = document.createElement('div');
	this.modulesDOM.className = 'modules';
	this.dom.appendChild(this.modulesDOM);

	this.element.modules().each(function(moduleName, module){
		var dom,
			mouse = new Mouse(), 
			linked = module.linkChilds.length || module.linkParent;

		dom = document.createElement('div');
		dom.className = 'module'+(linked?' linked' : '');
		dom.innerHTML = moduleName;
		this.modulesDOM.appendChild(dom);
		this.modules.set(moduleName, dom);

		// register mouse event
		mouse.on('click', this.trigger.bind(this, 'focus module', module), dom);

		// register module event
		module.on('link', this.updateModuleState.bind(this, module));
		module.on('linkTo', this.updateModuleState.bind(this, module));
		module.on('unlink', this.updateModuleState.bind(this, module));
		module.on('unlinkTo', this.updateModuleState.bind(this, module));

	}.bind(this));
}

/**
 * Set a module as linked
 * @return {void}
 */
PanelListElementDStarModulableView.prototype.setModuleLinked = function(moduleName)
{
	this.modules.get(moduleName).className = 'module linked'; 
}

/**
 * Set a module as luninked
* @return {void}
 */
PanelListElementDStarModulableView.prototype.setModuleUnlinked = function(moduleName)
{
	this.modules.get(moduleName).className = 'module'; 
}

/**
 * Update a module status (linked, active, unlinked,...)
* @return {void}
 */
PanelListElementDStarModulableView.prototype.updateModuleState = function(module)
{
	if ((module.linkChilds.length) || module.linkParent) {
		this.setModuleLinked(module.id)
	} else {
		this.setModuleUnlinked(module.id)
	}
}
