package com.example.demo.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserRequest {

    private String userName;

    private String passWord;

    private String fullName;

}
