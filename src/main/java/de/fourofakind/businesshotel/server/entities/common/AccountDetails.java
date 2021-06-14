package de.fourofakind.businesshotel.server.entities.common;

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
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="account_id")
    Integer accountID;
    String username;
    String passwordHash;

    //Mapping
    @OneToOne(mappedBy = "accountDetails")
    private Employee employee;
    @OneToOne(mappedBy = "accountDetails")
    private Customer customer;


    //Constructors
    public AccountDetails (String username, String passwordHash)
    {
        this.username = username;
        this.passwordHash = passwordHash;
    }
}
