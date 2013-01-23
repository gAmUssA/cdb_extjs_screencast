Ext.define('episode_1_crud.view.SampleGridPanel',{

	extend: 'Ext.grid.Panel',
	store:	'episode_1_crud.store.dto.PersonStore',
	alias:	'widget.samplegridpanel',
	plugins : [ 
		{ptype : 'cellediting'} 
	],
				
	columns : [
		{ 
		header:'firstName', 
		dataIndex: 'firstName',
		flex:1
		,editor:{xtype:'textfield'} 
		
		},
		{ 
		header:'id', 
		dataIndex: 'id',
		flex:1
		},
		{ 
		header:'lastName', 
		dataIndex: 'lastName',
		flex:1
		,editor:{xtype:'textfield'} 
		
		},
		{ 
		header:'phone', 
		dataIndex: 'phone',
		flex:1
		,editor:{xtype:'textfield'} 
		
		},
		{ 
		header:'ssn', 
		dataIndex: 'ssn',
		flex:1
		,editor:{xtype:'textfield'} 
		
		}],
		
	tbar : [ 
		{text : 'Load'}, 
		{text : 'Add'}, 
		{text : 'Delete'}, 
		{text : 'Save'} 
	]
});
	