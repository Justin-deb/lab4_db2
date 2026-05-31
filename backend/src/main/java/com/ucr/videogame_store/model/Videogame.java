package com.ucr.videogame_store.model;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "VIDEOJUEGO")
public class Videogame {

    @Id
    @Column(name = "Codigo", nullable = false)
    private Integer code;

    @Column(name = "Nombre", nullable = false, length = 50)
    private String name;

    @Column(name = "Descripcion", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "Desarrollador", nullable = false, length = 30)
    private String developer;

    @Column(name = "FechaLanzamiento", nullable = false)
    private LocalDate releaseDate;

    @ManyToOne
    @JoinColumn(name = "IdCategoria", nullable = false)
    private Category category;

    public Videogame() {}

    public Videogame(Integer code, String name, String description,
                     String developer, LocalDate releaseDate, Category category) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.developer = developer;
        this.releaseDate = releaseDate;
        this.category = category;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Videogame [code=" + code + ", name=" + name + ", description=" + description + ", developer="
                + developer + ", releaseDate=" + releaseDate + ", category=" + category + "]";
    }

    
}