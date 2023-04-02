package com.example.matchpm_back.Service;

import com.example.matchpm_back.Entity.Board;
import com.example.matchpm_back.Entity.Post;
import com.example.matchpm_back.Repository.BoardRepository;
import com.example.matchpm_back.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private PostRepository postRepository;

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

    public Page<Post> getPosts(String boardName , int page, String keyword , String key){
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("id"));
        Pageable pageable = PageRequest.of(page, 10 ,Sort.by(sorts));
        int boardId = boardRepository.findByBoardName(boardName).get().getId();
        if(key.equals("title")){ //제목으로 찾기
            return postRepository.findByBoardIdAndPostTitleContaining(boardId , pageable , keyword);
        }
        else if(key.equals("content")){
            return postRepository.findByBoardIdAndPostContentContaining(boardId, pageable , keyword);
        }
        else {
            return postRepository.findByBoardIdAndPostTitleContainingOrBoardIdAndPostContentContaining(boardId  , pageable , keyword , boardId, keyword);
        }
    }



}
