package com.library.management.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookRequest {

    private String title;
    private int categoryId;
    private double price;
    private boolean available;
    private boolean ordered;
    private String author;
}
