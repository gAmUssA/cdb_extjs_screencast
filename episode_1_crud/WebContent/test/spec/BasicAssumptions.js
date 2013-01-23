Ext.define('Test.spec.BasicAssumptions' ,{}, function () {
 	describe("Basic Assumptions", function() {

	    it("has ExtJS4 loaded", function() {
	        expect(Ext).toBeDefined();
	        expect(Ext.getVersion()).toBeTruthy();
	        expect(Ext.getVersion().major).toEqual(4);
	    });

	    it("has loaded episode_1_crud code",function(){
	        expect(episode_1_crud).toBeDefined();
	    });
	});	
});
