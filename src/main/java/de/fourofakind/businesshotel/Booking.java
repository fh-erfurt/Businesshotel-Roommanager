package de.fourofakind.businesshotel;

public class Booking {


    public TimeFrame getTimeFrame() {
        return timeFrame;
    }
    public void setTimeFrame(TimeFrame timeFrame) {
        this.timeFrame = timeFrame;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public String getRoomCategory() {
        return roomCategory;
    }

    public String getSpecialWishes() {
        return specialWishes;
    }

    public float getPricing() {
        return pricing;
    }

    public int getEmpNo() {
        return empNo;
    }

    public boolean isBusinessCustomer() {
        return isBusinessCustomer;
    }


    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setRoomCategory(String roomCategory) {
        this.roomCategory = roomCategory;
    }

    public void setSpecialWishes(String specialWishes) {
        this.specialWishes = specialWishes;
    }

    public void setPricing(float pricing) {
        this.pricing = pricing;
    }

    public void setEmpNo(int empNo) {
        this.empNo = empNo;
    }

    public void setBusinessCustomer(boolean businessCustomer) {
        isBusinessCustomer = businessCustomer;
    }

    private TimeFrame timeFrame;

    public DateFrame getDateFrame() {
        return dateFrame;
    }

    public void setDateFrame(DateFrame dateFrame) {
        this.dateFrame = dateFrame;
    }

    private DateFrame dateFrame;
    private String bookingDate;
    private String roomCategory;
    private String specialWishes;

    private float pricing;
    private int empNo;

    private boolean isBusinessCustomer;




}
