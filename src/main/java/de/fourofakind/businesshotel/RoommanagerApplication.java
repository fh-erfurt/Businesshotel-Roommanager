package de.fourofakind.businesshotel;


import de.fourofakind.businesshotel.entities.common.AccountDetails;
import de.fourofakind.businesshotel.entities.common.Role;
import de.fourofakind.businesshotel.entities.employees.Employee;
import de.fourofakind.businesshotel.repositories.AccountDetailsRepository;
import de.fourofakind.businesshotel.repositories.EmployeeRepository;
import de.fourofakind.businesshotel.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Sort;


@SpringBootApplication
public class RoommanagerApplication
{
    public static void main (String[] args)
    {
        SpringApplication.run(RoommanagerApplication.class,args);
    }

    @Bean
    CommandLineRunner commandLineRunner (EmployeeRepository employeeRepository, RoleRepository roleRepository, AccountDetailsRepository accountDetailsRepository)
    {
        return args->{
            AccountDetails NumberOne=new AccountDetails("maxiking","1234asdf");
            accountDetailsRepository.save(NumberOne);
            Integer accountID=accountDetailsRepository.findAll(Sort.by(Sort.Direction.DESC, "accountID")).get(0).getAccountID();
            Employee MaxMustermann=new Employee("Max Mustermann", accountID);
            employeeRepository.save(MaxMustermann);
            Role Babo = new Role("Babo",true, true, true);
            roleRepository.save(Babo);
            MaxMustermann.setGivenRole(Babo.getRoleName());
            employeeRepository.save(MaxMustermann);
        };
    }
}
