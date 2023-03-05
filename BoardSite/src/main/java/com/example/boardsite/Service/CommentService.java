package com.example.boardsite.Service;

import com.example.boardsite.Entity.Board;
import com.example.boardsite.Entity.Comment;
import com.example.boardsite.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public void write(Comment comment){
        commentRepository.save(comment);
    }

    public Comment commentView(Integer id) {
        return commentRepository.findById(id).get();
    }

    public Page<Comment> commentPage(Integer id , int page){
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("id"));
        Pageable pageable = PageRequest.of(page , 20 , Sort.by(sorts));
        return commentRepository.findByboard_id(pageable ,id);
    }

    public void commentDelete(Integer id){
        commentRepository.deleteById(id);
    }



}
