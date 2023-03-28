package com.example.matchpm_back.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

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

    @JsonIgnore
    @OneToMany(mappedBy = "board")
    private List<Post> posts = new ArrayList<>();
}
