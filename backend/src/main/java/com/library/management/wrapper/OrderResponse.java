package com.library.management.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private int id;
    private long userId;
    private String name;
    private int bookId;
    private String bookName;
    private Date orderedOn;
    private boolean returned;

    public OrderResponse(long userId, int bookId, Date orderedOn, boolean returned) {
        this.userId = userId;
        this.bookId = bookId;
        this.orderedOn = orderedOn;
        this.returned = returned;
    }
}
