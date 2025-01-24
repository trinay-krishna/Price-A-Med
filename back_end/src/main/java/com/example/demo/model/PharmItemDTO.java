package com.example.demo.model;


public class PharmItemDTO {

    Integer userID;

    Long pharID;
    Long medID;

    public PharmItemDTO(Long pharID, Long medID) {
        this.pharID = pharID;
        this.medID = medID;
    }

    public PharmItemDTO(Integer userID, Long pharID, Long medID) {
        this.userID = userID;
        this.pharID = pharID;
        this.medID = medID;
    }

    public Integer getUserID() {
        return userID;
    }


    public Long getPharID() {
        return pharID;
    }

    public Long getMedID() {
        return medID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public void setMedID(Long medID) {
        this.medID = medID;
    }

    public void setPharID(Long pharID) {
        this.pharID = pharID;
    }

}
