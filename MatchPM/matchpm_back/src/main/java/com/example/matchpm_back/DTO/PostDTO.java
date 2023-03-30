package com.example.matchpm_back.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {

    private String postTitle;
    private String postContent;
    private String boardName;
    private String userId;


}
