package com.example.matchpm_back.Controller;

import com.example.matchpm_back.Entity.Board;
import com.example.matchpm_back.Entity.Post;
import com.example.matchpm_back.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class BoardController {

    @Autowired
    private BoardService boardService;


    @GetMapping("/api/board/boardlist")
    public List<Board> getBoardlist(){
        return boardService.getBoardlist();
    } // 모든 board를 list로 반환

    @PostMapping("/api/board/create") //Board 생성 (이때 Board에는 boardname밖에 없음)
    public String createBoard(@RequestBody Board board){
        return boardService.createBoard(board);
    } //Board를 받아서 DB에새로운 board 생성

    @PostMapping("/api/post/getposts") //boardName의 게시판에서 게시글 가져오기
    public Page<Post> getPosts(@RequestBody Map<String, String> boardName ,
                               @RequestParam(value="page" , defaultValue="0") int page,
                               @RequestParam(value="keyword" ,defaultValue = "") String keyword,
                               @RequestParam(value="key" , defaultValue = "") String key){
        System.out.println("key : " + key);
        return boardService.getPosts(boardName.get("boardName") , page , keyword , key);
    }

}
