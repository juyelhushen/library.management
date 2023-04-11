package com.library.management.service;

import com.library.management.constant.LibConstants;
import com.library.management.repository.BooksRepository;
import com.library.management.repository.OrderRepository;
import com.library.management.model.Books;
import com.library.management.model.Order;
import com.library.management.users.model.User;
import com.library.management.wrapper.OrderRequest;
import com.library.management.wrapper.OrderResponse;
import com.library.management.wrapper.ReturnRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {


    @Autowired
    private OrderRepository repository;

    @Autowired
    private BooksRepository booksRepository;

    public ResponseEntity<String> bookOrder(OrderRequest request) {
        try {
            if (!Objects.isNull(request)) {
                repository.save(saveOrder(request));
                booksRepository.orderBook(request.getBookId());
                return new ResponseEntity<>("success", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Order saveOrder(OrderRequest request) {
        return Order.builder()
                .orderedOn(new Date(System.currentTimeMillis()))
                .returned(false)
                .user(new User(request.getUserId()))
                .books(new Books(request.getBookId()))
//                .bookId(request.getBookId())
//                .userId(request.getUserId())
                .build();
    }

    public ResponseEntity<List<OrderResponse>> orderList(int id) {
        try {
            List<OrderResponse> orderList = repository.orderList(id);
            return new ResponseEntity<List<OrderResponse>>(orderList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<OrderResponse>> allOrderList() {
        try {
            List<OrderResponse> orderList = repository.allOrderList();
            return new ResponseEntity<List<OrderResponse>>(orderList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> returnBook(ReturnRequest request) {
        try {
            if (validateBookReturn(request)) {
                Books books = booksRepository.findById(request.getBookId()).get();
                if (books.isOrdered()) {
                    repository.returnUpdate(request.getBookId(), request.getUserId());
                    booksRepository.updateBookAvailability(request.getBookId());
                    return new ResponseEntity<String>("You have successfully returned the book.", HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>("The book is already returned.", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(LibConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateBookReturn(ReturnRequest request) {
        return request.getBookId() != 0 && request.getUserId() != 0;
    }

}
