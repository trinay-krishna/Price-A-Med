package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pharmacy") // Specifies the table name as 'pharmacy'
public class Pharmacy {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private boolean homeDelivery;
    private double rating;
    private int supplyDays;


    private double latitude;  // Latitude of the pharmacy
    private double longitude;

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for name
    public String getName() {
        return name;
    }

    // Setter for name
    public void setName(String name) {
        this.name = name;
    }

    // Getter for homeDelivery
    public boolean isHomeDelivery() {
        return homeDelivery;
    }

    // Setter for homeDelivery
    public void setHomeDelivery(boolean homeDelivery) {
        this.homeDelivery = homeDelivery;
    }

    public double getRating() {
        return this.rating;
    }

    public void setRating( double rating ) {
        this.rating = rating;
    }

    public int getSupplyDays() {
        return supplyDays;
    }

    // Setter for supplyDays
    public void setSupplyDays(int supplyDays) {
        this.supplyDays = supplyDays;
    }

    public double getLatitude() {
        return latitude;
    }

    // Setter for latitude
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    // Getter for longitude
    public double getLongitude() {
        return longitude;
    }

    // Setter for longitude
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}

