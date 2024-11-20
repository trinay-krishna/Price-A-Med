package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class UserFullDetails {
    @Id
    private Integer userId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fullDetailsId;

    @Enumerated(EnumType.STRING)
    private UserDetails.Role role;

    private String email;
    private String password;
    private String phoneNo;
    private String dob;
    private String address;

    @Lob
    private byte[] profilePic;

    @OneToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private UserDetails user;

    // Getters and setters

    public UserFullDetails(Integer userId, UserDetails user, byte[] profilePic, String address, String dob, String phoneNo, String password, String email, UserDetails.Role role, Integer fullDetailsId) {
        this.userId = userId;
        this.user = user;
        this.profilePic = profilePic;
        this.address = address;
        this.dob = dob;
        this.phoneNo = phoneNo;
        this.password = password;
        this.email = email;
        this.role = role;
        this.fullDetailsId = fullDetailsId;
    }

    public UserFullDetails() {
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFullDetailsId() {
        return fullDetailsId;
    }

    public void setFullDetailsId(Integer fullDetailsId) {
        this.fullDetailsId = fullDetailsId;
    }

    public UserDetails.Role getRole() {
        return role;
    }

    public void setRole(UserDetails.Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }

    public UserDetails getUser() {
        return user;
    }

    public void setUser(UserDetails user) {
        this.user = user;
    }
}

