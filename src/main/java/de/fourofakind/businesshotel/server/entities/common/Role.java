package de.fourofakind.businesshotel.server.entities.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import de.fourofakind.businesshotel.server.entities.employees.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * <p>This class implements an early version of a right management system. Currently there are 4 roles an actor of the system can inherit- three of which inherit one right each and the fourth
 * inheriting all rights, e.g. for administritative reasons. There will be more role models later which should be given by special personal.</p>
 */
@Entity(name = "Role")
@Table(name = "role")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Role
{

    //Attributes
    @Id
    @Column(name = "role_name")
    private String roleName;
    private boolean isEnabledToManageRooms;
    private boolean isEnabledToManageBookings;
    private boolean isEnabledToManageCustomerData;
    private boolean isEnabledToManageEmployeeData;


    //Mappings
    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<Employee> employee;

    //Constructors
    public Role (String roleName, boolean isEnabledToManageRooms, boolean isEnabledToManageBookings, boolean isEnabledToManageCustomerData, boolean isEnabledToManageEmployeeData)
    {
        this.roleName = roleName;
        this.isEnabledToManageRooms = isEnabledToManageRooms;
        this.isEnabledToManageBookings = isEnabledToManageBookings;
        this.isEnabledToManageCustomerData = isEnabledToManageCustomerData;
        this.isEnabledToManageEmployeeData = isEnabledToManageEmployeeData;
    }

    //Setter/Getter
    //managed by Lombok
}
