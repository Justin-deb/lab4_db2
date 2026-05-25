package com.ucr.videogame_store.service;

import java.util.Locale.Category;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.repository.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public @Nullable Object getAllCategories() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllCategories'");
    }

    public void createCategory(Category category) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createCategory'");
    }
}
