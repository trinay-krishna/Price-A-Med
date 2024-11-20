package com.example.demo.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "user_details", uniqueConstraints = @UniqueConstraint(columnNames = "username"))
public class UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String username;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String email;
    private String password;

    // Enum for Role
    public enum Role {
        CONSUMER, STORE_AGENT, DOCTOR
    }

    public UserDetails(Integer userId, String password, String email, Role role, String username) {
        this.userId = userId;
        this.password = password;
        this.email = email;
        this.role = role;
        this.username = username;
    }

    public UserDetails() {
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
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
}

