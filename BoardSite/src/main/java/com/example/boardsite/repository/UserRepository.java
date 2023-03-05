package com.example.boardsite.repository;

import com.example.boardsite.Entity.Board;
import com.example.boardsite.Entity.SiteUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<SiteUser, Integer> {
    Optional<SiteUser> findByusername(String username);
    Page<SiteUser> findAll(Pageable pageable);

}
