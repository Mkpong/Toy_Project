package com.example.matchpm_back.Service;

import com.example.matchpm_back.Entity.Board;
import com.example.matchpm_back.Entity.Post;
import com.example.matchpm_back.Repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public List<Board> getBoardlist(){
        return boardRepository.findAll();
    }

    public String createBoard(Board board){
        board.setBoardSize(0);
        Optional<Board> op_board= boardRepository.findByBoardName(board.getBoardName());
        if(!op_board.isEmpty()) return "fail";
        else{
            boardRepository.save(board);
            return "success";
        }
    } //boardname이 중복되면 board생성 fail

    public List<Post> getPosts(String boardName){
        Board board = boardRepository.findByBoardName(boardName).get();
        return board.getPosts();
    }



}
