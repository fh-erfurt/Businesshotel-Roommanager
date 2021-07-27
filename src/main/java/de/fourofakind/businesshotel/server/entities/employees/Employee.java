package de.fourofakind.businesshotel.server.entities.employees;

import de.fourofakind.businesshotel.server.entities.bookings.Booking;
import de.fourofakind.businesshotel.server.entities.common.AccountDetails;
import de.fourofakind.businesshotel.server.entities.common.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.NoSuchElementException;


/**
 * This is the main actor in our application for now. It maintains Bookings and Rooms and interacts with Customers. Employees can acquire several roles and there fore inherit rights to do different
 * tasks each. Later there will be different employee specializations for different jobs inside the company using the software.
 */
@Entity(name="Employee")
@Table(name="employee")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Employee
{
    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="emp_no")
    private Integer empNo;
    private String empName;
    @Column(name="given_role")
    private String givenRole;
    @Column(name="account_id")
    private Integer accountID;

    //Mapping

    @OneToOne(optional = false)
    @JoinColumn(name="account_id",insertable = false,updatable = false)
    private AccountDetails accountDetails;
    @ManyToOne
    @JoinColumn(name="given_role",referencedColumnName = "role_name", insertable = false, updatable = false)
    private Role role;
    @OneToMany(mappedBy = "employee")
    private List<Booking> bookings;

    //Constructors
    public Employee (String empName, int accountID) //Employee without any Rights
    {
        this.accountID=accountID;
        this.empName = empName;
    }

    public Employee (String empName, String givenRole, int accountID)
    {
        this.accountID=accountID;
        this.givenRole = givenRole;
        this.empName = empName;
    }

    //Setter/Getter
    //managed by Lombok




}
