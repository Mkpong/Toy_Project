package com.example.boardsite.Controller;


import com.example.boardsite.Entity.Board;
import com.example.boardsite.Entity.Comment;
import com.example.boardsite.Entity.SiteUser;
import com.example.boardsite.Service.BoardService;
import com.example.boardsite.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private CommentService commentService;

    private LocalDateTime dateTime;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");



    @GetMapping("/board/list")
    //게시판에 작성된 글의 목록을 보여줌
    public String boardList(Model model ,@RequestParam(value="page", defaultValue="0") int page , @RequestParam(value = "keyword", defaultValue = "") String keyword){
        Page<Board> boardpage;
        int total = 0;
        if(keyword == null) {
            boardpage = this.boardService.boardPage(page);
            total = this.boardService.boardList().size();
        }
        else{
            boardpage = this.boardService.boardSearch(keyword , page);
            total = this.boardService.boardSearchList(keyword).size();
        }
        model.addAttribute("total" , total);
        model.addAttribute("board" , boardpage);
        model.addAttribute("keyword" , keyword);
        return "Board/list";
    }



    @GetMapping("/board/write")
    //게시판 작성하는 곳
    public String boardWrite(){
        return "Board/write";
    }


    @PostMapping("/board/write")
    //게시판에서 작성한 글을 DB에 전송
    public String boardWrite(Board board , Model model , @AuthenticationPrincipal User user){
        dateTime = LocalDateTime.now();
        board.setTime(dateTime.format(formatter));
        board.setName(user.getUsername());
        board.setCount(0);
        boardService.write(board);
        model.addAttribute("message" , "글 작성이 완료되었습니다.");
        model.addAttribute("searchUrl" , "/board/list");

        return "message";
    }



    @GetMapping("/board/view/{id}")
    //특정 게시판의 글의 상세내용을 보여줌
    public String boardView(Model model , @PathVariable("id") Integer id, @RequestParam(value="page", defaultValue="0") int page) {
        Board board = boardService.boardView(id);
        int count = board.getCount();
        count++;
        board.setCount(count);
        boardService.write(board);
        model.addAttribute("board", board);
        Page<Comment> comments = this.commentService.commentPage(id , page);
        model.addAttribute("comment" , comments);
        return "Board/view";
    }

    @GetMapping("/board/delete")
    //게시판의 글을 삭제
    public String boardDelete(Integer id , Model model){
        boardService.boardDelete(id);

        model.addAttribute("message" , "글 삭제가 완료되었습니다.");
        model.addAttribute("searchUrl" , "/board/list");
        return "message";
    }

    //글을 수정하는 메소드 구현
    @GetMapping("/board/modify/{id}")
    public String boardModify(@PathVariable("id") Integer id , Model model){
        model.addAttribute("board" , boardService.boardView(id));
        return "Board/modify";
    }

    @PostMapping("/board/update/{id}")
    public String boardUpdate(Model model , Board board , @PathVariable("id") Integer id ){

        Board boardTemp = boardService.boardView(id);
        boardTemp.setTitle(board.getTitle());
        boardTemp.setContent(board.getContent());

        boardService.write(boardTemp);

        model.addAttribute("message" , "글 수정이 완료되었습니다.");
        model.addAttribute("searchUrl" ,  "/board/list");

        return "message";
    }





}
