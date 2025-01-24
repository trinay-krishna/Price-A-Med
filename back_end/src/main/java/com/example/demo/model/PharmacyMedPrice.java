package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pharmacy_med_price") // Specifies the table name as 'pharmacy_med_price'
public class PharmacyMedPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pharmacy_id", nullable = false)
    private Pharmacy pharmacy;

    @ManyToOne
    @JoinColumn(name = "medication_id", nullable = false)
    private Medication medication;

    private double unitPrice;

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for pharmacy
    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    // Setter for pharmacy
    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    // Getter for medication
    public Medication getMedication() {
        return medication;
    }

    // Setter for medication
    public void setMedication(Medication medication) {
        this.medication = medication;
    }

    // Getter for unitPrice
    public double getUnitPrice() {
        return unitPrice;
    }

    // Setter for unitPrice
    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }
}
