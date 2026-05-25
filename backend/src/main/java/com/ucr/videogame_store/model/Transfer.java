package com.ucr.videogame_store.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "TRASLADO")
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NumeroOperacion")
    private Integer operationNumber;

    @ManyToOne
    @JoinColumn(name = "ConsecutivoCopia", nullable = false)
    private Copy copy;

    @Column(
        name = "FechaTraslado",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private LocalDateTime transferDate;

    @ManyToOne
    @JoinColumn(name = "SucursalOrigen", nullable = false)
    private Office originOffice;

    @ManyToOne
    @JoinColumn(name = "SucursalDestino", nullable = false)
    private Office destinationOffice;

    @Column(name = "Comentarios", length = 100)
    private String comments;

    public Transfer() {}

    public Transfer(Copy copy, Office originOffice,
                    Office destinationOffice, String comments) {
        this.copy = copy;
        this.originOffice = originOffice;
        this.destinationOffice = destinationOffice;
        this.comments = comments;
    }

    public Integer getOperationNumber() {
        return operationNumber;
    }

    public void setOperationNumber(Integer operationNumber) {
        this.operationNumber = operationNumber;
    }

    public Copy getCopy() {
        return copy;
    }

    public void setCopy(Copy copy) {
        this.copy = copy;
    }

    public LocalDateTime getTransferDate() {
        return transferDate;
    }

    public void setTransferDate(LocalDateTime transferDate) {
        this.transferDate = transferDate;
    }

    public Office getOriginOffice() {
        return originOffice;
    }

    public void setOriginOffice(Office originOffice) {
        this.originOffice = originOffice;
    }

    public Office getDestinationOffice() {
        return destinationOffice;
    }

    public void setDestinationOffice(Office destinationOffice) {
        this.destinationOffice = destinationOffice;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
    
}
