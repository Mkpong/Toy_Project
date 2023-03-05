package com.example.boardsite.Service;

import com.example.boardsite.Entity.Board;
import com.example.boardsite.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public void write(Board board){
        boardRepository.save(board);
    }

    public List<Board> boardList(){
        return boardRepository.findAll();
    }

    public Board boardView(Integer id){
        return boardRepository.findById(id).get();
    }

    public void boardDelete(Integer id){
        boardRepository.deleteById(id);
    }

    public Page<Board> boardPage(int page) {
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("id"));
        Pageable pageable = PageRequest.of(page, 10 , Sort.by(sorts));
        return this.boardRepository.findAll(pageable);
    }

    public Page<Board> boardSearch(String keyword , int page){
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("id"));
        Pageable pageable = PageRequest.of(page, 10 , Sort.by(sorts));
        return boardRepository.findBytitleContaining(pageable , keyword);
    }

    public List<Board> boardSearchList(String keyword){
        return boardRepository.findBytitleContaining(keyword);
    }




}
