package com.example.boardsite.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String comment;

    private String name;

    private String time;

    @ManyToOne
    private Board board;




}
