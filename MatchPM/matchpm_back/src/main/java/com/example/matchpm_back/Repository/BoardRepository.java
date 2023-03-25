package com.example.matchpm_back.Repository;

import com.example.matchpm_back.Entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    Optional<Board> findByBoardName(String boardName);
}
