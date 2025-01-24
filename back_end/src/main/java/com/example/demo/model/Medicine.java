package com.example.demo.model;

public class Medicine {
    private String name;
    private int days;
    private double price;

    public Medicine(String name, int days, double price) {
        this.name = name;
        this.days = days;
        this.price = price;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for days
    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    // Getter and Setter for price
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
