package com.example.demo.kafka;


public class Event {
    int id;
    String status;

    public Event() {}

    public Event(int id, String status) {
        this.id = id;
        this.status = status;
    }

    public int getID() {
        return this.id;
    }

    public String getStatus() {
        return this.status;
    }
}


