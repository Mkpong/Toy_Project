package com.example.matchpm_back.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String postTitle;

    @Column(name = "content")
    private String postContent;

    @Column(name = "time")
    private String postTime;

    @ManyToOne
    @JoinColumn(name="UserId")
    private SiteUser siteUser;

    @ManyToOne
    @JoinColumn(name="BoardId")
    private Board board;

}
