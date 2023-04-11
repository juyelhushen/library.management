package com.library.management.service;

import com.library.management.constant.LibConstants;
import com.library.management.repository.CategoryRepository;
import com.library.management.model.Category;
import com.library.management.utils.LibUtils;
import com.library.management.wrapper.CategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private final CategoryRepository repository;


    public ResponseEntity<List<Category>> getCategory() {
        try {
            List<Category> categories = repository.findAll();
            return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> addCategory(CategoryRequest request) {
        try {
            if (isValidCategory(request)) {
                Category category = new Category();
                category.setName(request.getName());
                category.setSubcategory(request.getSubcategory());
                repository.save(category);
                return LibUtils.getResponse("Category successfully added", HttpStatus.OK);
            } else {
                return LibUtils.getResponse(LibConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean isValidCategory(CategoryRequest request) {
        return request.getName() != null && request.getSubcategory() != null;
    }

    public ResponseEntity<String> delete(int id) {
        try {
            Optional<Category> category = repository.findById(id);
            if (category.isPresent()) {
                repository.deleteById(id);
                return LibUtils.getResponse("Category has been deleted successfully.", HttpStatus.OK);
            } else {
                return LibUtils.getResponse("Category with " + id + " not exits", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> update(CategoryRequest request, int id) {
        try {
            Category category = repository.findById(id).get();
            category.setName(request.getName());
            category.setSubcategory(request.getSubcategory());
            repository.save(category);
            return LibUtils.getResponse("Successfully updated category", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
