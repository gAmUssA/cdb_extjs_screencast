package service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import com.google.gson.Gson;

import clear.data.ChangeObject;

import dto.Person;
import service.generated.*;

public class PersonServiceImpl extends _PersonServiceImpl {

	@Override
	public List<Person> getPersons() {
		List<Person> result = new ArrayList<>();
		AtomicInteger id = new AtomicInteger();
		result.add(new Person(id.incrementAndGet() , "Joe", "Doe", "111-11-1111"));
		result.add(new Person(id.incrementAndGet() , "Joe", "Doe", "111-11-1111"));
		result.add(new Person(id.incrementAndGet() , "Joe", "Doe", "111-11-1111"));
		result.add(new Person(id.incrementAndGet() , "Joe", "Doe", "111-11-1111"));
		result.add(new Person(id.incrementAndGet() , "Joe", "Doe", "111-11-1111"));
		result.add(new Person(id.incrementAndGet() , "Joe", "Doe", "111-11-1111"));
		result.add(new Person(id.incrementAndGet() , "Joe", "Doe", "111-11-1111"));		
		return result;
	}

	@Override
	public void getPersons_doCreate(ChangeObject changeObject) {
		Gson gson = new Gson();
		Person person = (Person)gson.fromJson(changeObject.getNewVersion().toString(), Person.class);
		System.out.println("new  person: " + person.toString());		
	}
	
	
}
