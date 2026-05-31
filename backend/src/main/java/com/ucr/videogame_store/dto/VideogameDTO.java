package com.ucr.videogame_store.dto;

import java.time.LocalDate;

public class VideogameDTO {
    private Integer code;
    private String name;
    private String description;
    private String developer;
    private LocalDate releaseDate;
    private Integer categoryId;
    
    public VideogameDTO(Integer code, String name, String description, String developer, LocalDate releaseDate,
            Integer categoryId) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.developer = developer;
        this.releaseDate = releaseDate;
        this.categoryId = categoryId;
    }
    public Integer getCode() {
        return code;
    }
    public void setCode(Integer code) {
        this.code = code;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getDeveloper() {
        return developer;
    }
    public void setDeveloper(String developer) {
        this.developer = developer;
    }
    public LocalDate getReleaseDate() {
        return releaseDate;
    }
    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }
    public Integer getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    
}
