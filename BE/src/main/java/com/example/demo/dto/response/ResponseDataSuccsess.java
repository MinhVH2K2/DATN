package com.example.demo.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
<<<<<<< HEAD
=======

>>>>>>> e04795b (update)
public class ResponseDataSuccsess <T> {
    private int status;
    private String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

<<<<<<< HEAD
=======

>>>>>>> e04795b (update)
    public ResponseDataSuccsess(int status, String message) {
        this.status = status;
        this.message = message;
    }
}


