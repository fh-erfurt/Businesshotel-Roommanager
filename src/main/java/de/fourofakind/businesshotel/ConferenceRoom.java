package de.fourofakind.businesshotel;

public class ConferenceRoom extends Room{

    public ConferenceRoom (int roomNo, String category, int areaInSqrMetre, int maxAmountOfParticipants)
    {
        super(roomNo, category, areaInSqrMetre);
        this.maxAmountOfParticipants = maxAmountOfParticipants;
    }

    public int getMaxAmountOfParticipants () {
        return maxAmountOfParticipants;
    }

    public void setMaxAmountOfParticipants(int maxAmountOfParticipants) {
        this.maxAmountOfParticipants = maxAmountOfParticipants;
    }

    private int maxAmountOfParticipants;
}
