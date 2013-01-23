package dto;

import com.farata.dto2extjs.annotations.JSClass;
import com.farata.dto2extjs.annotations.JSGeneratedId;

@JSClass
public class Person {

	@JSGeneratedId
	private Integer id;
	private String firstName;
	private String lastName;
	private String ssn;
	private String phone;

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Person [id=");
		builder.append(id);
		builder.append(", firstName=");
		builder.append(firstName);
		builder.append(", lastName=");
		builder.append(lastName);
		builder.append(", ssn=");
		builder.append(ssn);
		builder.append("]");
		return builder.toString();
	}

	public Person(Integer id, String firstName, String lastName, String ssn) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.ssn = ssn;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
