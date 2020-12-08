package de.fourofakind.businesshotel;

//
public class ContactDetails {

    enum contactDetails {
        firstName, lastName, address, phoneNumber, mailAddress, iban
    }

    public ContactDetails(String firstName, String lastName, String address, String mailAddress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.mailAddress = mailAddress;
    }

    public void set(contactDetails cd, String data){
        switch (cd) {
            case firstName:
                this.firstName = data;
                break;
            case lastName:
                this.lastName = data;
                break;
            case address:
                this.address = data;
                break;
            case phoneNumber:
                this.phoneNumber = data;
                break;
            case mailAddress:
                this.mailAddress = data;
                break;
            case iban:
                this.iban = data;
                break;
        }
    }

    public String get(contactDetails cd) {
        String data;
        switch (cd) {
            case firstName:
                data = this.firstName;
                break;
            case lastName:
                data = this.lastName;
                break;
            case address:
                data = this.address;
                break;
            case phoneNumber:
                data = this.phoneNumber;
                break;
            case mailAddress:
                data = this.mailAddress;
                break;
            case iban:
                data = this.iban;
                break;
            default:
                data = "error";
                break;
        }
        return data;
    }


    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber = "";
    private String mailAddress;
    private String iban = "";
}
