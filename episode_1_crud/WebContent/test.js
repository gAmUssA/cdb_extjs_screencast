Ext.Loader.setConfig({
    disableCaching: false,
    enabled: true,
    paths: {
    	Clear: 'clear',
    	Test: 'test',
    	episode_1_crud:'app'	
    }
});

Ext.syncRequire('episode_1_crud.init.InitDirect');

var Application = null;

Ext.onReady(function() {
    Application = Ext.create('Ext.app.Application', {
        name: 'episode_1_crud',
        requires: [
           'Clear.override.ExtJSOverrider',
           'Test.spec.AllSpecs'
        ],
        controllers: [
          'HelloController'
        ],
        launch: function() {
            jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
            jasmine.getEnv().execute();
        }
    //,autoCreateViewport:true
    });
});

