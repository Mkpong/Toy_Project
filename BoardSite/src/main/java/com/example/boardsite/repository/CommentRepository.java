package com.example.boardsite.repository;

import com.example.boardsite.Entity.Board;
import com.example.boardsite.Entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Page<Comment> findByboard_id(Pageable pageable , Integer id);
}
