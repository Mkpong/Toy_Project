package com.example.matchpm_back.Controller;

import com.example.matchpm_back.Entity.Board;
import com.example.matchpm_back.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BoardController {

    @Autowired
    private BoardService boardService;


    @GetMapping("/api/board/boardlist")
    public List<Board> getBoardlist(){
        return boardService.getBoardlist();
    } // 모든 board를 list로 반환

    @PostMapping("/api/board/create")
    public String createBoard(@RequestBody Board board){
        return boardService.createBoard(board);
    } //Board를 받아서 DB에새로운 board 생성

}
