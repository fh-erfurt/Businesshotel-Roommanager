package de.fourofakind.businesshotel.server;


import de.fourofakind.businesshotel.server.repositories.stock.AccountDetailsRepository;
import de.fourofakind.businesshotel.server.repositories.stock.EmployeeRepository;
import de.fourofakind.businesshotel.server.repositories.stock.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


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
//            AccountDetails NumberOne=new AccountDetails("maxiking","1234asdf");
//            accountDetailsRepository.save(NumberOne);
//            Employee MaxMustermann=new Employee("Max Mustermann", NumberOne.getAccountID());
//            employeeRepository.save(MaxMustermann);
//            Role Babo = new Role("Babo",true, true, true);
//            roleRepository.save(Babo);
//            MaxMustermann.setGivenRole(Babo.getRoleName());
//            employeeRepository.save(MaxMustermann);
        };
    }
}
