package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Uploads {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uploadId;

    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private UserDetails user;

    public Uploads(Integer uploadId, Integer userId, UserDetails user) {
        this.uploadId = uploadId;
        this.userId = userId;
        this.user = user;
    }

    public Uploads() {
    }

    public Integer getUploadId() {
        return uploadId;
    }

    public void setUploadId(Integer uploadId) {
        this.uploadId = uploadId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public UserDetails getUser() {
        return user;
    }

    public void setUser(UserDetails user) {
        this.user = user;
    }
}

