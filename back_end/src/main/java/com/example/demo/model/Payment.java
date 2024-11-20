package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer opId;

    private Integer userId;
    private Integer caseId;
    private String history;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private UserDetails user;

    public Payment(Integer opId, Integer userId, Integer caseId, String history, UserDetails user) {
        this.opId = opId;
        this.userId = userId;
        this.caseId = caseId;
        this.history = history;
        this.user = user;
    }

    public Payment() {
    }

    public Integer getOpId() {
        return opId;
    }

    public void setOpId(Integer opId) {
        this.opId = opId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCaseId() {
        return caseId;
    }

    public void setCaseId(Integer caseId) {
        this.caseId = caseId;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public UserDetails getUser() {
        return user;
    }

    public void setUser(UserDetails user) {
        this.user = user;
    }
}

