package com.ucr.videogame_store.controller;

import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.videogame_store.service.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping("/allCategories")
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllCategories());
    }

    @PostMapping("/createCategory")
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        try {
            categoryService.createCategory(category);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
        
    }
    
    
}
