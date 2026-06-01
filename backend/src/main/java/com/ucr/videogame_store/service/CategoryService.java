package com.ucr.videogame_store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ucr.videogame_store.model.Category;
import com.ucr.videogame_store.repository.CategoryRepository;


@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Transactional
    public List<Category> getAllCategories() {
        return categoryRepository.getAllCategoriesProcedure().get();
    }

    public Category getCategoryById(Integer id){
        return categoryRepository.findById(id).orElseThrow();
    }

    public void createCategory(Category category) throws Exception {
        categoryRepository.save(category);

    }
}
