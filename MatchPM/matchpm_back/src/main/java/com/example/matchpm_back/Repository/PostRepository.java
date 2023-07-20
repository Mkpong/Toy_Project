package com.example.matchpm_back.Repository;

import com.example.matchpm_back.Entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    Page<Post> findByBoardIdAndPostContentContaining(int BoardId , Pageable pageable , String keyword); //게시글 내용으로 찾기
    Page<Post> findByBoardIdAndPostTitleContaining(int BoardId , Pageable pageable , String keyword); //게시글 제목으로 찾기
    Page<Post> findByBoardIdAndPostTitleContainingOrBoardIdAndPostContentContaining(int BoardId , Pageable pageable , String keyword ,int BoardId2, String keyword2); //제목+내용으로 찾기
    List<Post> findAll(Sort sort); //모든 게시글 반환
    Page<Post> findBySiteUserIdAndPostTitleContainingOrSiteUserIdAndPostContentContaining(int UserId , Pageable pageable , String keyword1, int UserId2 ,String keyword2); // 특정 유저가 작성한 게시글 반환

    Page<Post> findByPostTitleContainingOrPostContentContaining(Pageable pageable , String titleKeyword , String ContentKeyword);


}
