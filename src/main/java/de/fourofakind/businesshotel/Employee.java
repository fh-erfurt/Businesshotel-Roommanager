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
        this.empNo = Employees.size();
        this.empName = empName;
    }

    public Employee (String empName, Role givenRole)
    {
        this.givenRole = givenRole;
        this.empNo = Employees.size();
        this.empName = empName;
    }



    /**
     * <p>Implementation of the Employee's ability to create Bookings for Customers
     * uses getEmpNo to automatically add the employee's number and always the current date to ensure the right date is stored to bookingDate.
     * Role BookingManager is needed.
     * </p>
     *
     * @param roomNo             Number of the Room which is used as well as its position inside Rooms
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
        if (this.getGivenRole()==BookingsManager) //checks for Rights to manage Bookings
        {
            LocalDateTime currentDateTime = LocalDateTime.now();
            int bookingNo = Bookings.size();

            Booking createdBooking = null;

            if (bookingType == Booking.BookingType.HotelRoomBooking)
            {
                createdBooking = new HotelRoomBooking(bookingNo, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, pricing, this.getEmpNo(), isBusinessCustomer);
            }
            if (bookingType == Booking.BookingType.ConferenceRoomBooking)
            {
                createdBooking = new ConferenceRoomBooking(bookingNo, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, pricing, this.getEmpNo(), isBusinessCustomer);
            }

            Rooms.get(roomNo).setUsed(true);
            Bookings.add(createdBooking);
            return createdBooking;
        }
        return null;
    }


    /**
     * <p>Implementation of the Employee's ability to change one or multiple attributes of a Booking
     * same params as createBooking, but some can be null-like values, if they should not be changed.
     * Role BookingManager is needed.</p>
     *
     * @param bookingNo          Number of the Booking as well as its position inside Bookings
     * @param roomNo             Number of the Room which is used as well as its position inside Rooms
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
        currentDateTime = LocalDateTime.now();
        if (this.getGivenRole()==BookingsManager) //checks for Rights to manage Bookings
        {
            Booking toBeChangedBooking = Bookings.get(bookingNo); //"loads" the to be changed Booking into the function to work with the object
            if (roomNo != 0) toBeChangedBooking.setRoomNo(roomNo);
            if (timeFrame != null) toBeChangedBooking.setTimeFrame(timeFrame);
            if (dateFrame != null) toBeChangedBooking.setDateFrame(dateFrame);
            if (specialWishes != null) toBeChangedBooking.setSpecialWishes(specialWishes);
            if (pricing != 0.0f) toBeChangedBooking.setPricing(pricing);
            if (isBusinessCustomer != Booking.IsBusinessCustomer.NULL) toBeChangedBooking.setBusinessCustomer(isBusinessCustomer);
            toBeChangedBooking.setBookingDate(currentDateTime.toString());
        }
    }


    /**
     * <p>Implementation of the Employee's ability to delete a Booking by its booking number
     * does not use the remove method of the ArrayList to keep the relation of the position of a booking in Bookings  to its bookingNo.
     * Role BookingManager is needed.</p>
     *
     * @param bookingNo Number of the Booking as well as its position inside Bookings
     */
    public void deleteBooking (int bookingNo)
    {
        if (this.getGivenRole()==BookingsManager) //checks for Rights to manage Bookings
        {
            int roomNumberOfRoomToBeFree = Bookings.get(bookingNo).getRoomNo();
            Room roomToBeFree = Rooms.get(roomNumberOfRoomToBeFree);
            roomToBeFree.setUsed(false);
            Bookings.set(bookingNo, null);    //instead of remove() to keep the relation of the position of a booking in Bookings to its bookingNo
        }
    }

    /**
     * <p>Implementation of the Employee's ability to change attributes of a room to save details of real world changes to the room
     * does not change the number of a room or its use case (hotel room or conference room).
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo            Number of the room which is to be changed; provides the index of the room inside Rooms
     * @param category          category of the room if needed to be changed due to real world changes
     * @param areaInSqrMetre    area of the rumber if changed in real world
     */
    public void changeRoomDetails (int roomNo, String category, int areaInSqrMetre)
    {
        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
        {
            Room toBeChangedRoom = Rooms.get(roomNo);
            if (category != null) toBeChangedRoom.setCategory(category);
            if (areaInSqrMetre != 0) toBeChangedRoom.setAreaInSqrMetre(areaInSqrMetre);
        }
    }

    /**
     * <p>Implementation of the Employee's ability to create a conference room. Creates a new room according to the given details and adds it to the roomList.
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo                    Number of the room, that is created according to real world; index of the rumber in Rooms
     * @param category                  category of the room, depending on if it is a hotel room (suite, single room, double room) or conference room (big group, small group)
     * @param areaInSqrMetre            area of the room in square metres
     * @param maxAmountOfParticipants   maximal amount of people allowed in the room according to current corona guidelines, later depending on amount of seats
     */
    public void createConferenceRoom (int roomNo, String category, int areaInSqrMetre, int maxAmountOfParticipants)
    {
        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
        {
            Room newRoom = new ConferenceRoom(roomNo, category, areaInSqrMetre, maxAmountOfParticipants);
            Rooms.add(newRoom);
        }
    }

    /**
     * <p>Implementation of the Employee's ability to create a hotel room. Creates a new room according to the given details and adds it to the roomList.
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo            Number of the room, that is created according to real world; index of the rumber in Rooms
     * @param category          category of the room, depending on if it is a hotel room (suite, single room, double room) or conference room (big group, small group)
     * @param areaInSqrMetre    area of the room in square metres
     * @param bedCount          amount of beds in the hotel room
     */
    public void createHotelRoom (int roomNo, String category, int areaInSqrMetre, int bedCount)
    {
        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
        {
            Room newRoom = new HotelRoom(roomNo, category, areaInSqrMetre, bedCount);
            Rooms.add(newRoom);
        }
    }


    /**
     * <p>Implementation of the Employee's ability to delete a room entirely. Ensures that unsuable rooms are deleted from the Rooms and can not be used for
     * bookings. Reasons could be a fusion of two or multiple rooms or the purpose of a room has changed entirely.
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo    number of the room to be deleted
     */
    public void deleteRoom (int roomNo)
    {
        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
        {
            Rooms.set(roomNo, null);
        }
    }


    /**
     * @param BookingNo             number of the booking to be searched for as well as its position in Bookings
     * @param RoomNo                number of the room which is documented in the booking to be searched for
     * @param empNo                 number of the employee that created the booking to be searched for
     * @param dateFrame             dateframe of the booking to be searched for
     * @param timeFrame             timeframe of the booking to be searched for
     * @param bookingDate           date of the booking to be searched for
     * @param roomCategory          category of the room which is documented in the booking to be searched for
     * @param specialWishes         special wishes documented in the booking to be searched for
     * @param isBusinessCustomer    indicates if the booking to be searched for is from business customer or not
     * @return  returns all resulting Booking that match the search criteria
     */
    public ArrayList<Booking> findBooking (int BookingNo, int RoomNo, int empNo, DateFrame dateFrame, TimeFrame timeFrame, String bookingDate, String roomCategory,
                                String specialWishes, Booking.IsBusinessCustomer isBusinessCustomer)
    {

        ArrayList<Booking> searchResults = new ArrayList<>();

        if (BookingNo!=0)
        {
            searchResults.add(Bookings.get(BookingNo));
            return searchResults;
        }

        if (RoomNo!=0)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=1;
            if(indexOfBookingList< Bookings.size())
            {
                while (wantedBooking.getRoomNo()!=RoomNo && indexOfBookingList< Bookings.size())
                {

                    wantedBooking= Bookings.get(indexOfBookingList);
                    indexOfBookingList++;
                }
            searchResults.add(Bookings.get(indexOfBookingList));
            }
        }

        if (empNo!=0)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=1;
            if(indexOfBookingList< Bookings.size())
            {
                while (wantedBooking.getEmpNo() != empNo && indexOfBookingList < Bookings.size())
                {
                    wantedBooking = Bookings.get(indexOfBookingList);
                    indexOfBookingList++;
                }
                searchResults.add(Bookings.get(indexOfBookingList));
            }
        }

        if (dateFrame!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=1;
            if(indexOfBookingList< Bookings.size())
            {
                while (!wantedBooking.getDateFrame().equals(dateFrame) && indexOfBookingList < Bookings.size())
                {
                    wantedBooking = Bookings.get(indexOfBookingList);
                    indexOfBookingList++;
                }
                searchResults.add(Bookings.get(indexOfBookingList));
            }
        }

        if (timeFrame!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=1;
            if(indexOfBookingList< Bookings.size())
            {
                while (!wantedBooking.getTimeFrame().equals(timeFrame) && indexOfBookingList < Bookings.size())
                {
                    wantedBooking = Bookings.get(indexOfBookingList);
                    indexOfBookingList++;
                }
                searchResults.add(Bookings.get(indexOfBookingList));
            }
        }

        if (bookingDate!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=1;
            if(indexOfBookingList< Bookings.size())
            {
                while (!wantedBooking.getBookingDate().equals(bookingDate) && indexOfBookingList < Bookings.size())
                {
                    wantedBooking = Bookings.get(indexOfBookingList);
                    indexOfBookingList++;
                }
                searchResults.add(Bookings.get(indexOfBookingList));
            }
        }

        if (roomCategory!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=1;
            if(indexOfBookingList< Bookings.size())
            {
                while (!wantedBooking.getRoomCategory().equals(roomCategory) && indexOfBookingList < Bookings.size())
                {
                    wantedBooking = Bookings.get(indexOfBookingList);
                    indexOfBookingList++;
                }
                searchResults.add(Bookings.get(indexOfBookingList));
            }
        }

        if (specialWishes!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=1;
            if(indexOfBookingList< Bookings.size())
            {
                while (!wantedBooking.getSpecialWishes().equals(specialWishes) && indexOfBookingList < Bookings.size())
                {
                    wantedBooking = Bookings.get(indexOfBookingList);
                    indexOfBookingList++;
                }
                searchResults.add(Bookings.get(indexOfBookingList));
            }
        }

        if (isBusinessCustomer!=null)
        {
            Booking wantedBooking=null;
            int indexOfBookingList=1;
            if(indexOfBookingList< Bookings.size())
            {
                while (!wantedBooking.isBusinessCustomer().equals(isBusinessCustomer) && indexOfBookingList < Bookings.size())
                {
                    wantedBooking = Bookings.get(indexOfBookingList);
                    indexOfBookingList++;
                }
                searchResults.add(Bookings.get(indexOfBookingList));
            }
        }


        return searchResults;
    }


    /**
     * @return all Bookings inside Bookings
     */
    public StringBuilder showAllBookings ()
    {

        StringBuilder allBookings = new StringBuilder();

        for (Booking bookingEntry : Bookings)
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
        if (this.getGivenRole()==CustomerRelationshipManager)
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
        if (this.getGivenRole()==CustomerRelationshipManager)
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
        if (this.getGivenRole()==CustomerRelationshipManager)
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
