package de.fourofakind.businesshotel.entities.common;

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
    Integer accountID;
    String username;
    String passwordHash;

    public AccountDetails (String username, String passwordHash)
    {
        this.username = username;
        this.passwordHash = passwordHash;
    }
}
