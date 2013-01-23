Ext.Loader.setConfig({
	disableCaching: false,
	enabled: true,
	paths: {
		episode_1_crud: 'app', 
		Clear: 'clear'
	}
});

Ext.syncRequire('episode_1_crud.init.InitDirect');
// Define GridPanel
Ext.define('episode_1_crud.view.SampleGridPanel',{
	extend: 'Ext.grid.Panel',
	store:	'episode_1_crud.store.dto.PersonStore',
	alias:	'widget.samplegridpanel',
	plugins : [ 
		{ ptype : 'cellediting'} 
	],				
	columns : [
		{ header:'firstName', dataIndex: 'firstName', editor:{xtype:'textfield'}, flex:1}, 
		{ header:'id', dataIndex: 'id', flex:1}, 
		{ header:'lastName', dataIndex: 'lastName', editor:{xtype:'textfield'}, flex:1}, 
		{ header:'phone', dataIndex: 'phone', editor:{xtype:'textfield'}, flex:1}, 
		{ header:'ssn', dataIndex: 'ssn', editor:{xtype:'textfield'}, flex:1}
	],		
	tbar : [ 
		{text : 'Load', action: 'load'}, 
		{text : 'Add', action:'add'}, 
		{text : 'Remove', action:'remove'}, 
		{text : 'Sync', action:'sync'} 
	]
});
// Launch the application 
Ext.application({
    name: 'episode_1_crud',
    requires: [
        'Clear.override.ExtJSOverrider'
    ],
    controllers: [
         'SampleController'
    ],
    launch:function() {
         Ext.create('Ext.container.Viewport', {
			items: [
				{ xtype: 'samplegridpanel' }
			]
         });
    }
});
	