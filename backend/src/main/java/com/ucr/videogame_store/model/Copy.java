package com.ucr.videogame_store.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "COPIA")
public class Copy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Consecutivo")
    private Integer serialNumber;

    @ManyToOne
    @JoinColumn(name = "CodigoVideojuego", nullable = false)
    private Videogame videogame;

    @ManyToOne
    @JoinColumn(name = "NumeroSucursal", nullable = false)
    private Office office;

    @Column(
        name = "FechaIngreso",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private LocalDateTime entryDate;

    @Column(name = "Disponibilidad", nullable = false, length = 1)
    private String availability;

    @Column(name = "Estado", length = 200)
    private String condition;

    public Copy() {}

    public Copy(Videogame videogame, Office office,
                String availability, String condition) {
        this.videogame = videogame;
        this.office = office;
        this.availability = availability;
        this.condition = condition;
    }

    public Integer getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(Integer serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Videogame getVideoGame() {
        return videogame;
    }

    public void setVideoGame(Videogame videoGame) {
        this.videogame = videoGame;
    }

    public Office getBranch() {
        return office;
    }

    public void setBranch(Office office) {
        this.office = office;
    }

    public LocalDateTime getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDateTime entryDate) {
        this.entryDate = entryDate;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    @Override
    public String toString() {
        return "Copy [serialNumber=" + serialNumber + ", videogame=" + videogame + ", office=" + office + ", entryDate="
                + entryDate + ", availability=" + availability + ", condition=" + condition + "]";
    }
}
