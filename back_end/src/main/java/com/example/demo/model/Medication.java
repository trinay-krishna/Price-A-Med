package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "medication") // Specifies the table name as 'medication'
public class Medication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String dosageForm;

    @ManyToOne
    @JoinColumn(name = "altMedId")
    private Medication alternativeMedication; // Self-referencing relationship

    private String manufacturer;
    private String category;
    private String strength;
    private String description;
    private String image;

    @Column(name = "supply_days")
    private int supplyDays;

    public int getSupplyDays() { return supplyDays; }
    public void setSupplyDays(int supplyDays) { this.supplyDays = supplyDays; }

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

    // Getter for dosageForm
    public String getDosageForm() {
        return dosageForm;
    }

    // Setter for dosageForm
    public void setDosageForm(String dosageForm) {
        this.dosageForm = dosageForm;
    }

    // Getter for supplyDays


    // Getter for alternativeMedication
    public Medication getAlternativeMedication() {
        return alternativeMedication;
    }

    // Setter for alternativeMedication
    public void setAlternativeMedication(Medication alternativeMedication) {
        this.alternativeMedication = alternativeMedication;
    }

    // Getter for manufacturer
    public String getManufacturer() {
        return manufacturer;
    }

    // Setter for manufacturer
    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    // Getter for category
    public String getCategory() {
        return category;
    }

    // Setter for category
    public void setCategory(String category) {
        this.category = category;
    }

    // Getter for strength
    public String getStrength() {
        return strength;
    }

    // Setter for strength
    public void setStrength(String strength) {
        this.strength = strength;
    }

    // Getter for description
    public String getDescription() {
        return description;
    }

    // Setter for description
    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }



}

