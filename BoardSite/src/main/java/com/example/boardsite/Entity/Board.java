package com.example.boardsite.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String content;
    private int count;
    private String name;
    private String time;

    @OneToMany(mappedBy = "board" ,cascade = CascadeType.REMOVE)
    private List<Comment> commentList;

}
