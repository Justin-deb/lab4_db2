package com.ucr.videogame_store.model;

import jakarta.persistence.*;

@Entity
@Table(name = "SUCURSAL")
public class Office {

    @Id
    @Column(name = "Numero", nullable = false)
    private Integer number;

    @Column(name = "Nombre", nullable = false, length = 30)
    private String name;

    public Office() {}

    public Office(Integer number, String name) {
        this.number = number;
        this.name = name;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Office [number=" + number + ", name=" + name + "]";
    }

    
}
