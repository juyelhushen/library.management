package com.library.management.service;

import com.library.management.constant.LibConstants;
import com.library.management.repository.BooksRepository;
import com.library.management.model.Books;
import com.library.management.model.Category;
import com.library.management.utils.LibUtils;
import com.library.management.wrapper.BookRequest;
import com.library.management.wrapper.BooksWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    @Autowired
    private final BooksRepository repository;

    public ResponseEntity<String> addBook(BookRequest request) {
        try {
            if(validateBooks(request)) {
                repository.save(saveBooks(request));
               return LibUtils.getResponse("The book "+request.getTitle()+" has been added",HttpStatus.OK);
            } else {
                return LibUtils.getResponse(LibConstants.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Books saveBooks(BookRequest request) {
        Category category = new Category();
        category.setId(request.getCategoryId());
        return Books.builder()
                .title(request.getTitle())
                .category(category)
                .count(5)
                .price(request.getPrice())
                .author(request.getAuthor())
                .available(true)
                .ordered(true)
                .build();
    }

    private boolean validateBooks(BookRequest request) {
        return request.getAuthor() != null && request.getTitle() != null && request.getPrice() != 0;
    }

    public ResponseEntity<List<BooksWrapper>> getAllBooks() {
        try {
            List<BooksWrapper> books = repository.getAllBooks();
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<Books>> getBooks() {
        try {
            List<Books> books = repository.findAll();
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> deleteBook(int id) {
        try {
            Optional<Books> books = repository.findById(id);
            if (books.isPresent()) {
                repository.deleteById(id);
                return LibUtils.getResponse("Book id "+id+" has been removed.",HttpStatus.OK);
            } else {
                return LibUtils.getResponse("Book id " + id + " doesn't exist.",HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> updateBook(BookRequest request, int id) {
        try {
            Books books = repository.findById(id).get();
            books.setAuthor(request.getAuthor());
            books.setTitle(request.getTitle());
            books.setPrice(request.getPrice());
            repository.save(books);
            return LibUtils.getResponse("Book Successfully Updated",HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
