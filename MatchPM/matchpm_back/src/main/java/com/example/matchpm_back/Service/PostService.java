package com.example.matchpm_back.Service;

import com.example.matchpm_back.DTO.PostDTO;
import com.example.matchpm_back.Entity.Board;
import com.example.matchpm_back.Entity.Post;
import com.example.matchpm_back.Entity.SiteUser;
import com.example.matchpm_back.Repository.BoardRepository;
import com.example.matchpm_back.Repository.PostRepository;
import com.example.matchpm_back.Repository.SiteUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    BoardRepository boardRepository;

    @Autowired
    SiteUserRepository siteUserRepository;

    public String writePost(PostDTO postDTO){
        Post post = new Post();
        Board board = boardRepository.findByBoardName(postDTO.getBoardName()).get();
        LocalDateTime localDateTime = LocalDateTime.now();
        String formated = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        SiteUser siteUser = siteUserRepository.findByUserId(postDTO.getUserId()).get();
        //Post set
        post.setPostTitle(postDTO.getPostTitle());
        post.setPostContent(postDTO.getPostContent());
        post.setBoard(board);
        post.setSiteUser(siteUser);
        post.setPostTime(formated);
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

    public String deletePost(Integer id){
        postRepository.deleteById(id);
        return "SUCCESS";
    }

}
