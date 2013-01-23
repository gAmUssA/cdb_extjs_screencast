Ext.Loader.setConfig({
    disableCaching: false,
    enabled: true,
    paths: {
    	episode_1_crud: 'app',
    	Clear: 'clear'
    }
});

Ext.syncRequire('episode_1_crud.init.InitDirect');

// Launch the application 
Ext.application({
    name: 'episode_1_crud',
    requires: [
        'Clear.override.ExtJSOverrider'
    ],
    controllers: [
        'HelloController'          
    ],
    autoCreateViewport: true
});