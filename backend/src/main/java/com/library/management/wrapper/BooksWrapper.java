package com.library.management.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BooksWrapper {

    private int id;
    private String title;
    private int categoryId;
    private String categoryName;
    private String subcategory;
    private double price;
    private boolean available;
    private boolean ordered;
    private int count;
    private String author;




}
