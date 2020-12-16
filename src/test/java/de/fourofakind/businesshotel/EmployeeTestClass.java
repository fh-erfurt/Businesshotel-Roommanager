package de.fourofakind.businesshotel;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class EmployeeTestClass
{
    @Test
    public void should_output_Employee_name_when_successful()
    {
        //Given
        Employee MaxMustermann = new Employee("Max Mustermann");

        //When
        String result = MaxMustermann.getEmpName();

        //Then
        assertEquals("Max Mustermann",result,"If an Employee named Max Mustermann is created by its Constructor it should Output the Name");
    }

    @Test
    public void should_output_Employee_Number_when_successful()
    {
        //Given
        Employee MaxMustermann = new Employee("Max Mustermann");

        //When
        int result = MaxMustermann.getEmpNo();

        //Then
        assertEquals(0,result,"If an Employee is created by its Constructor as the first Employee ever, it should output '0' as its Employee Number, because the " +
                "arraylist is starting at 0 ");
    }
}
