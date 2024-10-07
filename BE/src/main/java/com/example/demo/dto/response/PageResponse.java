package com.example.demo.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {

    private int pageNo;
    private int pageSize;
    private int totalPage;
    private T data;
}
