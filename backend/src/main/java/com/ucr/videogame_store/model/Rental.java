package com.ucr.videogame_store.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ALQUILER")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Secuencia")
    private Integer sequence;

    @ManyToOne
    @JoinColumn(name = "CedulaCliente", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "ConsecutivoCopia", nullable = false)
    private Copy copy;

    @Column(
        name = "FechaPrestamo",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private LocalDateTime loanDate;

    @Column(name = "CantidadDias", nullable = false)
    private Integer days;

    @Column(name = "FechaDevolucion")
    private LocalDateTime returnDate;

    @Column(name = "DetalleDevolucion", length = 200)
    private String returnDetails;

    public Rental() {}

    public Rental(Client client, Copy copy, Integer days) {
        this.client = client;
        this.copy = copy;
        this.days = days;
    }
    
    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Copy getCopy() {
        return copy;
    }

    public void setCopy(Copy copy) {
        this.copy = copy;
    }

    public LocalDateTime getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(LocalDateTime loanDate) {
        this.loanDate = loanDate;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public LocalDateTime getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDateTime returnDate) {
        this.returnDate = returnDate;
    }

    public String getReturnDetails() {
        return returnDetails;
    }

    public void setReturnDetails(String returnDetails) {
        this.returnDetails = returnDetails;
    }
}
