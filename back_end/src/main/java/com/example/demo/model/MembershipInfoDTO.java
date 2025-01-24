package com.example.demo.model;

import java.util.List;

public class MembershipInfoDTO {
    
    Membership membership;

    List<String> membershipBenefits;

    public Membership getMembership() {
        return membership;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
    }

    public List<String> getMembershipBenefits() {
        return membershipBenefits;
    }

    public void setMembershipBenefits(List<String> membershipBenefits) {
        this.membershipBenefits = membershipBenefits;
    }


}
