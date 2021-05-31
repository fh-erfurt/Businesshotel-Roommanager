package de.fourofakind.businesshotel;


import de.fourofakind.businesshotel.entities.employees.Employee;
import de.fourofakind.businesshotel.repositories.EmployeeRepository;
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
    CommandLineRunner commandLineRunner (EmployeeRepository employeeRepository)
    {
        return args->{
            Employee MaxMustermann=new Employee("Max Mustermann");
            employeeRepository.save(MaxMustermann);
        };
    }
}
