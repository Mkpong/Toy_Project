package com.example.matchpm_back.Service;

import com.example.matchpm_back.DTO.PostDTO;
import com.example.matchpm_back.Entity.Board;
import com.example.matchpm_back.Entity.Post;
import com.example.matchpm_back.Repository.BoardRepository;
import com.example.matchpm_back.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    BoardRepository boardRepository;

    public String writePost(PostDTO postDTO){
        Post post = new Post();
        Board board = boardRepository.findByBoardName(postDTO.getBoardName()).get();
        //Post set
        post.setPostTitle(postDTO.getPostTitle());
        post.setPostContent(postDTO.getPostContent());
        post.setBoard(board);
        //Board set
        int size = board.getBoardSize();
        board.setBoardSize(size+1);
        //Save
        boardRepository.save(board);
        postRepository.save(post);

        return "success";
    }

    public List<Post> allPost(){
        return postRepository.findAll();
    }

    public Post getPostById(Integer id){
        return postRepository.findById(id).get();
    }

}
