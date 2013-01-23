Ext.define('episode_1_crud.store.dto.generated._PersonStore',{

	extend: 'Clear.data.DirectStore',
	requires  : ['episode_1_crud.model.dto.PersonModel'],
	model:'episode_1_crud.model.dto.PersonModel',
		
	api: {
		create:episode_1_crud.direct.action.PersonServiceImpl.getPersons_insertItems,
		read : episode_1_crud.direct.action.PersonServiceImpl.getPersons,
		update:episode_1_crud.direct.action.PersonServiceImpl.getPersons_updateItems,
		destroy:episode_1_crud.direct.action.PersonServiceImpl.getPersons_deleteItems
    }

});
	