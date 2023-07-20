package com.example.backend.Repository;

import com.example.backend.Entity.recode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface recodeRepository extends JpaRepository<recode, Integer> {
}
