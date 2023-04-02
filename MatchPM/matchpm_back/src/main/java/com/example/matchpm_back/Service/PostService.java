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
        post.setPostLike(0);
        post.setPostDislike(0);
        //Board set
        board.setBoardSize(board.getBoardSize() + 1);
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

    public String deletePost(Integer id , Integer boardId){
        postRepository.deleteById(id);
        Board board = boardRepository.findById(boardId).get();
        board.setBoardSize(board.getBoardSize() - 1);
        boardRepository.save(board);
        return "SUCCESS";
    }

    public void updateLike(Integer id , String type){
        Post post = postRepository.findById(id).get();
        if(type.equals("like")) post.setPostLike(post.getPostLike()+1);
        else post.setPostDislike(post.getPostDislike()+1);
        postRepository.save(post);
    }

    public List<Post> bestPost() {
        List<Post> allPost = postRepository.findAll(Sort.by(Sort.Direction.DESC , "postLike"));
        if(allPost.size() <= 10) return allPost;
        else{
            return allPost.subList(0,10);
        }
    }

}
