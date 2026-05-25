package com.ucr.videogame_store.model;
import jakarta.persistence.*;

@Entity
@Table(name = "CATEGORIA")
public class Category {

    @Id
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "Nombre", nullable = false, length = 20)
    private String name;

    @Column(name = "Detalle", nullable = false, length = 100)
    private String detail;

    public Category() {}

    public Category(Integer id, String name, String detail) {
        this.id = id;
        this.name = name;
        this.detail = detail;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    @Override
    public String toString() {
        return "Category [id=" + id + ", name=" + name + ", detail=" + detail + "]";
    }

    
}