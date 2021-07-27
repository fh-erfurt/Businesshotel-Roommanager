package de.fourofakind.businesshotel.server.entities.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import de.fourofakind.businesshotel.server.entities.customers.Customer;
import de.fourofakind.businesshotel.server.entities.employees.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name="AccountDetails")
@Table(name="account_details")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AccountDetails
{
    //Attributes
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="account_id")
    Integer accountID;
    String username;
    @Column(name="password_hash")
    String passwordHash;

    //Mappings
    @OneToOne(mappedBy = "accountDetails")
    @JsonIgnore
    private Employee employee;
    @OneToOne(mappedBy = "accountDetails")
    @JsonIgnore
    private Customer customer;


    //Constructors
    public AccountDetails (String username, String passwordHash)
    {
        this.username = username;
        this.passwordHash = passwordHash;
    }

    //Setter/Getter
    //managed by Lombok
}
