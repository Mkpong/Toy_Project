package com.example.matchpm_back.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String boardName;

    @Column(name="size")
    private  int boardSize;
}
