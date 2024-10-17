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
public class ResponseDataSuccsess <T> {
=======
public class ResponseDataSuccsess<T> {
>>>>>>> 7972adba186122b9f940efc943803b31c0f3eee9
    private int status;
    private String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

<<<<<<< HEAD
    public ResponseDataSuccsess(int status, String message) {
        this.status = status;
=======
    public ResponseDataSuccsess(int stauts, String message) {
        this.status = stauts;
>>>>>>> 7972adba186122b9f940efc943803b31c0f3eee9
        this.message = message;
    }
}
