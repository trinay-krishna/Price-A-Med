package com.example.demo.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Membership;
import java.util.List;


@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {

    
    Optional<Membership> findById(Long id);

    List<Membership> findAll();

    

} 
