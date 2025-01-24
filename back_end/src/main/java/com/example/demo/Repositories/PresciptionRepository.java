package com.example.demo.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Prescription;

import java.util.List;
import java.util.Optional;

@Repository
public interface PresciptionRepository extends JpaRepository<Prescription, Long> {
    

    List<Prescription> findByUserId(Long userId);

    Optional<Prescription> findById(Long id);
}
