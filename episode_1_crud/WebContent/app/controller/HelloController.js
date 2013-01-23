Ext.define('episode_1_crud.controller.HelloController', {
    extend: 'Ext.app.Controller',   
    requires: ['Ext.window.MessageBox'],
    init: function() {
        this.control({
	        	'button[action=hello]': {
	        		click: this.doHello
	        	}
        });       
    },
	
    doHello: function() {
    		Ext.Msg.alert('Hello!', '...from episode_1_crud.controller.HelloController');
    },
});