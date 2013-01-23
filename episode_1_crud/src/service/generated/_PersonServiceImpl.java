	
package service.generated;

import java.util.*;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.*;

import clear.transaction.*;
import clear.transaction.identity.IdentityRack;
import clear.cdb.utils.SessionFactoryUtils;
import clear.data.ChangeObject;

import com.google.gson.Gson;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

		
public class _PersonServiceImpl implements _IPersonServiceImpl {
			
	@DirectMethod
	public java.util.List<dto.Person> getPersons() {
		return null;
	}
		
 	@DirectMethod
	public List<ChangeObject> getPersons_insertItems(List<ChangeObject> items) throws Exception {
        List<ChangeObject> list = new ArrayList<ChangeObject>();
    	Iterator<ChangeObject> iterator = items.iterator();
		while (iterator.hasNext()) {
			clear.data.ChangeObject co = (clear.data.ChangeObject)deserializeObject((Map<String, String>)iterator.next(),clear.data.ChangeObject.class);
            if(co.isCreate()) {
            	getPersons_doCreate(co);
            	list.add(co);
            }	       	
        }					
		return list;				
	} 	

	@DirectMethod
	public List<ChangeObject> getPersons_updateItems(List<ChangeObject> items) throws Exception {
        List<ChangeObject> list = new ArrayList<ChangeObject>();
        
    	Iterator<ChangeObject> iterator = items.iterator();
		while (iterator.hasNext()) {
			clear.data.ChangeObject co = (clear.data.ChangeObject)deserializeObject((Map<String, String>)iterator.next(),clear.data.ChangeObject.class);
			if(co.isUpdate()) {
				getPersons_doUpdate(co);
				list.add(co);
			}	       	
		}						
		return list;		
	} 	

	@DirectMethod
	public List<ChangeObject> getPersons_deleteItems(List<ChangeObject> items) throws Exception {
		List<ChangeObject> list = new ArrayList<ChangeObject>();
		Iterator<ChangeObject> iterator = items.iterator();
		while (iterator.hasNext()) {
			clear.data.ChangeObject co = (clear.data.ChangeObject)deserializeObject((Map<String, String>)iterator.next(),clear.data.ChangeObject.class);
			if (co.isDelete()) {
            	getPersons_doDelete(co);
            	list.add(co);
            }	       	
        }					
		return list;
	} 	

	public void getPersons_doCreate(ChangeObject changeObject) {
	}
	
	public void getPersons_doUpdate(ChangeObject changeObject) {
	}

	public void getPersons_doDelete(ChangeObject changeObject) {
	}
		
	protected Object deserializeObject(Map<String, String> map, Class<?> clazz){
		Gson gson = new Gson();
		String jsonItem = gson.toJson(map);
		return gson.fromJson(jsonItem, clazz);
	}
}
	