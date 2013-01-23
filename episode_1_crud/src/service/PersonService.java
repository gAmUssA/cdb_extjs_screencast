package service;

import java.util.List;

import clear.cdb.extjs.annotations.JSFillMethod;
import clear.cdb.extjs.annotations.JSGenerateSample;
import clear.cdb.extjs.annotations.JSGenerateStore;
import clear.cdb.extjs.annotations.JSService;

import dto.Person;

@JSService
public interface PersonService {

	@JSFillMethod
	@JSGenerateStore
	@JSGenerateSample
	List<Person> getPersons();
}
