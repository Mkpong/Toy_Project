package com.example.boardsite.repository;

import com.example.boardsite.Entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
    Page<Board> findAll(Pageable pageable);
    Page<Board> findBytitleContaining(Pageable pageable , String keyword);
    List<Board> findBytitleContaining(String keyword);
}
