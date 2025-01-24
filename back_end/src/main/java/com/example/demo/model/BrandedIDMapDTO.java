package com.example.demo.model;

public class BrandedIDMapDTO {

    long medID;
    long altMedID;
    
    public BrandedIDMapDTO(long medID, long altMedID) {
        this.medID = medID;
        this.altMedID = altMedID;
    }

    public long getAltMedID() {
        return altMedID;
    }

    public long getMedID() {
        return medID;
    }


    public void setAltMedID(long altMedID) {
        this.altMedID = altMedID;
    }

    public void setMedID(long medID) {
        this.medID = medID;
    }

}
