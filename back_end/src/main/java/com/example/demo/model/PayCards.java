package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class PayCards {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cardId;

    private String cardNo;
    private String expDate;
    private Integer cvv;

    // Getters and setters

    public PayCards(Integer cardId, String cardNo, String expDate, Integer cvv) {
        this.cardId = cardId;
        this.cardNo = cardNo;
        this.expDate = expDate;
        this.cvv = cvv;
    }

    public PayCards() {
    }

    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getExpDate() {
        return expDate;
    }

    public void setExpDate(String expDate) {
        this.expDate = expDate;
    }

    public Integer getCvv() {
        return cvv;
    }

    public void setCvv(Integer cvv) {
        this.cvv = cvv;
    }
}

