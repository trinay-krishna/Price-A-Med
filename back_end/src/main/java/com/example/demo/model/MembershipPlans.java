package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class MembershipPlans {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer planId;

    @Enumerated(EnumType.STRING)
    private PlanName planName;

    public enum PlanName {
        HEALTH_STARTER, WELLNESS_PLUS, VITAL_CARE
    }

    // Getters and setters


    public MembershipPlans(Integer planId, PlanName planName) {
        this.planId = planId;
        this.planName = planName;
    }

    public MembershipPlans() {
    }

    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public PlanName getPlanName() {
        return planName;
    }

    public void setPlanName(PlanName planName) {
        this.planName = planName;
    }
}

