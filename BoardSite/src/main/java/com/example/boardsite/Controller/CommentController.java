package com.example.boardsite.Controller;

import com.example.boardsite.Entity.Board;
import com.example.boardsite.Entity.Comment;
import com.example.boardsite.Service.BoardService;
import com.example.boardsite.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Controller
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private BoardService boardService;

    private LocalDateTime dateTime;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");



    @PostMapping("/comment/write/{id}")
    public String boardComment(Model model , @PathVariable("id") Integer id, @RequestParam String comment , @AuthenticationPrincipal User user){
        Board board = this.boardService.boardView(id);
        dateTime = LocalDateTime.now();
        Comment ncomment = new Comment();
        ncomment.setComment(comment);
        ncomment.setBoard(board);
        ncomment.setName(user.getUsername());
        ncomment.setTime(dateTime.format(formatter));
        this.commentService.write(ncomment);
        return String.format("redirect:/board/view/%s" , board.getId());
    }

    @GetMapping("/comment/delete")
    public String commentDelete(Integer id){
        Comment comment = commentService.commentView(id);
        int board_id = comment.getBoard().getId();
        commentService.commentDelete(id);
        return String.format("redirect:/board/view/%s" , board_id);
    }
}
