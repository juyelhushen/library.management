package com.library.management.controller;

import com.library.management.constant.LibConstants;
import com.library.management.service.OrderService;
import com.library.management.wrapper.OrderRequest;
import com.library.management.wrapper.OrderResponse;
import com.library.management.wrapper.ReturnRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<String> bookOrder(@RequestBody OrderRequest request) {
        try {
            return orderService.bookOrder(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/list/{id}")
    public  ResponseEntity<List<OrderResponse>> orderList(@PathVariable int id) {
        try {
            return orderService.orderList(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<List<OrderResponse>>(new ArrayList<>(),HttpStatus.OK);
    }

    @GetMapping("/list")
    public  ResponseEntity<List<OrderResponse>> allOrderList() {
        try {
            return orderService.allOrderList();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<List<OrderResponse>>(new ArrayList<>(),HttpStatus.OK);
    }

    @PostMapping("/return")
    public ResponseEntity<String> returnBook(@RequestBody ReturnRequest request) {
        try {
            return orderService.returnBook(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<> (LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
