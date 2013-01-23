Ext.define('episode_1_crud.controller.SampleController',{
	extend: 'Ext.app.Controller',
	stores:	['episode_1_crud.store.dto.PersonStore'], 
    refs: [{
       ref: 'ThePanel',
       selector: 'samplegridpanel'
    }],
		
	init: function(){
		this.control({
			'samplegridpanel button[action=load]':{
				click: this.onLoad
			},			
			'samplegridpanel button[action=add]':{
				click: this.onAdd
			},				
			'samplegridpanel button[action=remove]':{
				click: this.onRemove
			},				
			'samplegridpanel button[action=sync]':{
				click: this.onSync
			}
		});
	},
		
	onLoad:	function(){
		var store = this.getStore('episode_1_crud.store.dto.PersonStore');
		store.load();
	},
	onAdd: function()	{
		var store = this.getStore('episode_1_crud.store.dto.PersonStore'),
			record = store.createModel({});
			
		//record.setId(store.getLocalIdentity());
		return store.add(record);	    	
	},	
	onRemove: function(){
		var store = this.getStore('episode_1_crud.store.dto.PersonStore'),
			panel = this.getThePanel(),
            view = panel.getView(),
            selectionModel = view.getSelectionModel(),
            selectedRecords = selectionModel.getSelection();
		store.remove(selectedRecords);    		
	},	
	onSync:	function(){
		var store = this.getStore('episode_1_crud.store.dto.PersonStore');
		store.sync();
	}		
});
	