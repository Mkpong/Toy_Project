package com.example.matchpm_back.Repository;

import com.example.matchpm_back.Entity.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface SiteUserRepository extends JpaRepository<SiteUser , Integer> {

    Optional<SiteUser> findByUserId(String userId);
}