package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucr.videogame_store.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    
}
