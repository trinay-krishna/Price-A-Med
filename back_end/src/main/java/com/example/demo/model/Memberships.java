package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Memberships {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer membershipId;

    private Integer userId;

    @Enumerated(EnumType.STRING)
    private MembershipPlan membershipPlan;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private UserDetails user;

    // Enum for Membership Plan
    public enum MembershipPlan {
        HEALTH_STARTER, WELLNESS_PLUS, VITAL_CARE
    }

    public Memberships(Integer membershipId, Integer userId, MembershipPlan membershipPlan, UserDetails user) {
        this.membershipId = membershipId;
        this.userId = userId;
        this.membershipPlan = membershipPlan;
        this.user = user;
    }

    public Memberships() {
    }

    public Integer getMembershipId() {
        return membershipId;
    }

    public void setMembershipId(Integer membershipId) {
        this.membershipId = membershipId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public MembershipPlan getMembershipPlan() {
        return membershipPlan;
    }

    public void setMembershipPlan(MembershipPlan membershipPlan) {
        this.membershipPlan = membershipPlan;
    }

    public UserDetails getUser() {
        return user;
    }

    public void setUser(UserDetails user) {
        this.user = user;
    }
}

