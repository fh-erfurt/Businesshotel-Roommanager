package de.fourofakind.businesshotel;

public class ConferenceRoom extends Room{

    public ConferenceRoom(Category category, int areaInSqrMetre, int roomNo) {
        super(category, areaInSqrMetre, roomNo);
    }

    public int getMaxAmountOfParticipants() {
        return maxAmountOfParticipants;
    }

    public void setMaxAmountOfParticipants(int maxAmountOfParticipants) {
        this.maxAmountOfParticipants = maxAmountOfParticipants;
    }


    private int maxAmountOfParticipants;
}
