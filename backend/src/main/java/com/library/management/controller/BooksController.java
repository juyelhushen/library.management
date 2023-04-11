package com.library.management.controller;

import com.library.management.constant.LibConstants;
import com.library.management.repository.BooksRepository;
import com.library.management.model.Books;
import com.library.management.service.BookService;
import com.library.management.utils.LibUtils;
import com.library.management.wrapper.BookRequest;
import com.library.management.wrapper.BooksWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BooksController {

    @Autowired
    private final BookService service;
    private final BooksRepository repository;

    @GetMapping("/all")
    public ResponseEntity<List<BooksWrapper>> getBooks() {
        try {
            return service.getAllBooks();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Books>> getBookslist() {
        try {
            return service.getBooks();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addBook(@RequestBody BookRequest request) {
        try {
            return service.addBook(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //update

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateBook(@RequestBody BookRequest request,@PathVariable int id) {
        try {
            return service.updateBook(request,id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable int id) {
        try {
            return service.deleteBook(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
