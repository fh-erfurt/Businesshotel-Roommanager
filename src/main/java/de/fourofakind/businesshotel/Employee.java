package de.fourofakind.businesshotel;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.ArrayList;

import static de.fourofakind.businesshotel.StartingClass.*;


/**
 * This is our main actor in our application for now. It maintains Bookings and Rooms and interacts with Customers.
 */

public class Employee
{
    DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime currentDateTime = LocalDateTime.now();    //simple implementation of the current datetime, won't be present when working with a
    // database

    public Employee (String empName) //Employee without any Rights
    {
        this.givenRole = null;
        this.empNo = EmployeeList.size();
        this.empName = empName;
    }

    public Employee (String empName, Role givenRole)
    {
        this.givenRole = givenRole;
        this.empNo = EmployeeList.size();
        this.empName = empName;
    }



    /**
     * <p>Implementation of the Employee's ability to create Bookings for Customers
     * uses getEmpNo to automatically add the employee's number and always the current date to ensure the right date is stored to bookingDate.
     * Role BookingManager is needed.
     * </p>
     *
     * @param roomNo             Number of the Room which is used as well as its position inside RoomList
     * @param timeFrame          the time span in which the corresponding room will be used;
     *                           should contain fixed time spans for hotel rooms and variable time spans for conference rooms
     * @param dateFrame          the date span for one or multiple days, of which a room is blocked;
     *                           should allow variable date spans for both types of rooms as a conference room could be used for a congress for multiple days
     *                           and a hotel room can be used for one or multiple nights
     * @param bookingType        indicates if the booking is a HotelRoomBooking or a ConferenceRoomBooking
     * @param roomCategory       Description of the time of room, should be Suite, Single Room or Double Room for hotel rooms or Little Group or Big Group
     *                           for conference rooms
     * @param specialWishes      contains any special wishes made by a customer, could be an extra bed, room service or wake up service in the morning
     * @param pricing            is bound to the room and the amount of time it is used for;
     *                           will be generated when creating a booking by the corresponding getPricing method of the Booking class
     * @param isBusinessCustomer marks the booking to be requested by a business customer or for personal use;
     *                           important for generation of bills and taxes to be used
     * @return returns the Booking created just now
     */
    public Booking createBooking (int roomNo, TimeFrame timeFrame, DateFrame dateFrame, Booking.BookingType bookingType, String roomCategory, String specialWishes,
                                  float pricing, Booking.IsBusinessCustomer isBusinessCustomer)
    {
        if (this.getGivenRole().isEnabledToManageBookings()) //checks for Rights to manage Bookings
        {
            LocalDateTime currentDateTime = LocalDateTime.now();
            int bookingNo = BookingList.size();

            Booking createdBooking = null;

            if (bookingType == Booking.BookingType.HotelRoomBooking)
            {
                createdBooking = new HotelRoomBooking(bookingNo, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, pricing, this.getEmpNo(), isBusinessCustomer);
            }
            if (bookingType == Booking.BookingType.ConferenceRoomBooking)
            {
                createdBooking = new ConferenceRoomBooking(bookingNo, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, pricing, this.getEmpNo(), isBusinessCustomer);
            }

            RoomList.get(roomNo).setUsed(true);
            BookingList.add(createdBooking);
            return createdBooking;
        }
        return null;
    }


    /**
     * <p>Implementation of the Employee's ability to change one or multiple attributes of a Booking
     * same params as createBooking, but some can be null-like values, if they should not be changed.
     * Role BookingManager is needed.</p>
     *
     * @param bookingNo          Number of the Booking as well as its position inside BookingList
     * @param roomNo             Number of the Room which is used as well as its position inside RoomList
     * @param timeFrame          the time span in which the corresponding room will be used;
     *                           should contain fixed time spans for hotel rooms and variable time spans for conference rooms
     * @param dateFrame          the date span for one or multiple days, of which a room is blocked;
     *                           should allow variable date spans for both types of rooms as a conference room could be used for a congress for multiple days
     *                           and a hotel room can be used for one or multiple nights
     * @param specialWishes      contains any special wishes made by a customer, could be an extra bed, room service or wake up service in the morning
     * @param pricing            is bound to the room and the amount of time it is used for;
     *                           will be generated when creating a booking by the corresponding getPricing method of the Booking class
     * @param isBusinessCustomer marks the booking to be requested by a business customer or for personal use;
     *                           important for generation of bills and taxes to be used
     */
    public void changeBooking (int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String specialWishes, float pricing,
                               Booking.IsBusinessCustomer isBusinessCustomer)
    {
        if (this.getGivenRole().isEnabledToManageBookings()) //checks for Rights to manage Bookings
        {
            Booking toBeChangedBooking = BookingList.get(bookingNo); //"loads" the to be changed Booking into the function to work with the object
            if (roomNo != 0) toBeChangedBooking.setRoomNo(roomNo);
            if (timeFrame != null) toBeChangedBooking.setTimeFrame(timeFrame);
            if (dateFrame != null) toBeChangedBooking.setDateFrame(dateFrame);
            if (specialWishes != null) toBeChangedBooking.setSpecialWishes(specialWishes);
            if (pricing != 0.0f) toBeChangedBooking.setPricing(pricing);
            if (isBusinessCustomer != Booking.IsBusinessCustomer.NULL) toBeChangedBooking.setBusinessCustomer(isBusinessCustomer);
        }
    }


    /**
     * <p>Implementation of the Employee's ability to delete a Booking by its booking number
     * does not use the remove method of the ArrayList to keep the relation of the position of a booking in BookingList  to its bookingNo.
     * Role BookingManager is needed.</p>
     *
     * @param bookingNo Number of the Booking as well as its position inside BookingList
     */
    public void deleteBooking (int bookingNo)
    {
        if (this.getGivenRole().isEnabledToManageBookings()) //checks for Rights to manage Bookings
        {
            int roomNumberOfRoomToBeFree = BookingList.get(bookingNo).getRoomNo();
            Room roomToBeFree = RoomList.get(roomNumberOfRoomToBeFree);
            roomToBeFree.setUsed(false);
            BookingList.set(bookingNo, null);    //instead of remove() to keep the relation of the position of a booking in BookingList to its bookingNo
        }
    }

    /**
     * <p>Implementation of the Employee's ability to change attributes of a room to save details of real world changes to the room
     * does not change the number of a room or its use case (hotel room or conference room).
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo Number of the room which is to be changed;
     *               provides the index of the room inside RoomList
     */
    public void changeRoomDetails (int roomNo, String category, int areaInSqrMetre)
    {
        if (this.getGivenRole().isEnabledToManageRooms()) //checks for Rights to manage Rooms
        {
            Room toBeChangedRoom = RoomList.get(roomNo);
            if (category != null) toBeChangedRoom.setCategory(category);
            if (areaInSqrMetre != 0) toBeChangedRoom.setAreaInSqrMetre(areaInSqrMetre);
        }
    }

    /**
     * <p>Implementation of the Employee's ability to create a room. Creates a new room according to the given details and adds it to the roomList.
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo
     * @param category
     * @param areaInSqrMetre
     */
    public void createRoom (int roomNo, String category, int areaInSqrMetre)
    {
        if (this.getGivenRole().isEnabledToManageRooms()) //checks for Rights to manage Rooms
        {
            Room newRoom = new Room(roomNo, category, areaInSqrMetre);
            RoomList.add(newRoom);
        }
    }

    /**
     * <p>Implementation of the Employee's ability to delete a room entirely. Ensures that unsuable rooms are deleted from the RoomList and can not be used for
     * bookings. Reasons could be a fusion of two or multiple rooms or the purpose of a room has changed entirely.
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo
     */
    public void deleteRoom (int roomNo)
    {
        if (this.getGivenRole().isEnabledToManageRooms()) //checks for Rights to manage Rooms
        {
            RoomList.set(roomNo, null);
        }
    }

    public ArrayList<Booking> findBooking (int BookingNo, int RoomNo, int empNo, DateFrame dateFrame, TimeFrame timeFrame, String bookingDate, String roomCategory,
                                String specialWishes, Booking.IsBusinessCustomer isBusinessCustomer)
    {

        ArrayList<Booking> searchResults = new ArrayList<>();

        if (BookingNo!=0)
        {
            searchResults.add(BookingList.get(BookingNo));
            return searchResults;
        }

        if (RoomNo!=0)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=0;
            while (wantedBooking.getRoomNo()!=RoomNo && indexOfBookingList!=BookingList.size())
            {

                wantedBooking=BookingList.get(indexOfBookingList);
                indexOfBookingList++;
            }
            searchResults.add(BookingList.get(indexOfBookingList));
        }

        if (empNo!=0)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=0;
            while (wantedBooking.getEmpNo()!=empNo && indexOfBookingList!=BookingList.size())
            {
                wantedBooking=BookingList.get(indexOfBookingList);
                indexOfBookingList++;
            }
            searchResults.add(BookingList.get(indexOfBookingList));
        }

        if (dateFrame!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=0;
            while (wantedBooking.getDateFrame()!=dateFrame && indexOfBookingList!=BookingList.size())
            {
                wantedBooking=BookingList.get(indexOfBookingList);
                indexOfBookingList++;
            }
            searchResults.add(BookingList.get(indexOfBookingList));
        }

        if (timeFrame!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=0;
            while (wantedBooking.getTimeFrame()!=timeFrame && indexOfBookingList!=BookingList.size())
            {
                wantedBooking=BookingList.get(indexOfBookingList);
                indexOfBookingList++;
            }
            searchResults.add(BookingList.get(indexOfBookingList));
        }

        if (bookingDate!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=0;
            while (wantedBooking.getBookingDate()!=bookingDate && indexOfBookingList!=BookingList.size())
            {
                wantedBooking=BookingList.get(indexOfBookingList);
                indexOfBookingList++;
            }
            searchResults.add(BookingList.get(indexOfBookingList));
        }

        if (roomCategory!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=0;
            while (wantedBooking.getRoomCategory()!=roomCategory && indexOfBookingList!=BookingList.size())
            {
                wantedBooking=BookingList.get(indexOfBookingList);
                indexOfBookingList++;
            }
            searchResults.add(BookingList.get(indexOfBookingList));
        }

        if (specialWishes!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=0;
            while (wantedBooking.getSpecialWishes()!=specialWishes && indexOfBookingList!=BookingList.size())
            {
                wantedBooking=BookingList.get(indexOfBookingList);
                indexOfBookingList++;
            }
            searchResults.add(BookingList.get(indexOfBookingList));
        }

        if (isBusinessCustomer!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=0;
            while (wantedBooking.isBusinessCustomer()!=isBusinessCustomer && indexOfBookingList!=BookingList.size())
            {
                wantedBooking=BookingList.get(indexOfBookingList);
                indexOfBookingList++;
            }
            searchResults.add(BookingList.get(indexOfBookingList));
        }


        return searchResults;
    }


    public StringBuilder showAllBookings ()
    {

        StringBuilder allBookings = new StringBuilder();

        for (Booking bookingEntry : BookingList)
        {
            allBookings.append(bookingEntry);
        }


        return allBookings;
    }

    public void manageBookingRequests ()
    {

        for (BookingRequest bookingRequest : BookingRequests)
        {
            //TODO:
            //annahme oder ablehnung von buchungsanfragen und entsprechend löschen der request und ggf anlegen einer buchung
            //--> möglicherweise momentan zufallsbasiert
        }
    }

    public void createCustomer (String firstName, String lastName, String streetName, String streetNumber, String postalCode, String cityName, String mailAddress,
                                Customer.paymentMethods paymentMethod, String iban)
    {
        if (this.getGivenRole().isEnabledToManageCustomerData())
        {
            int customerID = Customers.size() - 1;

            ContactData contactData = new ContactData(firstName, lastName, streetName, streetNumber, postalCode, cityName, mailAddress);

            if (paymentMethod == Customer.paymentMethods.debit)
            {
                contactData.setIban(iban);
            }

            Customer newCustomer = new Customer(customerID, contactData, paymentMethod);

            Customers.add(newCustomer);
        }
    }

    public void changeCustomer (int customerID, String key, String value)
    {
        if (this.getGivenRole().isEnabledToManageCustomerData())
        {

            Customer fetchedCustomer = Customers.get(customerID);
            ContactData fetchedContactData = fetchedCustomer.getContactData();

            switch (key)
            {
                case "firstName":
                    fetchedContactData.setFirstName(value);
                case "lastName":
                    fetchedContactData.setLastName(value);
                case "streetName":
                    fetchedContactData.setStreetName(value);
                case "streetNumber":
                    fetchedContactData.setStreetNumber(value);
                case "postalCode":
                    fetchedContactData.setPostalCode(value);
                case "cityName":
                    fetchedContactData.setCityName(value);
                case "mailAddress":
                    fetchedContactData.setMailAddress(value);
                case "paymentMethod":
                    fetchedCustomer.setPaymentMethod(value);
                case "iban":
                    fetchedContactData.setIban(value);
            }

            Customers.set(customerID, fetchedCustomer);
        }


    }

    public void deleteCustomer (int customerID)
    {
        if (this.getGivenRole().isEnabledToManageCustomerData())
        {
            Customers.set(customerID, null);
        }

    }

    //TODO
    //Rollen in Tests zuweisen


    public int getEmpNo ()
    {
        return empNo;
    }

    public void setEmpNo (int empNo)
    {
        this.empNo = empNo;
    }

    public String getEmpName ()
    {
        return empName;
    }

    public void setEmpName (String empName)
    {
        this.empName = empName;
    }

    public Role getGivenRole ()
    {
        return givenRole;
    }

    public void setGivenRole (Role givenRole)
    {
        this.givenRole = givenRole;
    }

    private int empNo;
    private String empName;
    private Role givenRole;
}
