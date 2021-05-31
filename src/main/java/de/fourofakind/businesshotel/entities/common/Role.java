package de.fourofakind.businesshotel.entities.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * <p>This class implements an early version of a right management system. Currently there are 4 roles an actor of the system can inherit- three of which inherit one right each and the fourth
 * inheriting all rights, e.g. for administritative reasons. There will be more role models later which should be given by special personal.</p>
 */
@Entity(name="Role")
@Table(name="role")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Role
{
    //Attributes
    @Id
    private String RoleName;
    private boolean isEnabledToManageRooms;
    private boolean isEnabledToManageBookings;
    private boolean isEnabledToManageCustomerData;







}
