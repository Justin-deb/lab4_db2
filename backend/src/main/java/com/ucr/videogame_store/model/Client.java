package com.ucr.videogame_store.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CLIENTE")
public class Client {
    @Id
    @Column(nullable = false, name = "Cedula")
    private String id;

    @Column(name = "Nombre", nullable = false)
    private String name;

    @Column(name = "Apellido", nullable = false)
    private String lastName;

    @Column(name = "Telefono", nullable = false)
    private String phoneNumber;

    @Column(name = "Correo")
    private String email;

    @Column(name = "Direccion", nullable = false)
    private String address;

    @Column(name = "FechaRegistro", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateRegistered;

    public Client() {
    }

    public Client(String id, String name, String lastName, String phoneNumber, String email, String address,
            LocalDateTime dateRegistered) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.dateRegistered = dateRegistered;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getDateRegistered() {
        return dateRegistered;
    }

    public void setDateRegistered(LocalDateTime dateRegistered) {
        this.dateRegistered = dateRegistered;
    }

    @Override
    public String toString() {
        return "Client [id=" + id + ", name=" + name + ", lastName=" + lastName + ", phoneNumber=" + phoneNumber
                + ", email=" + email + ", address=" + address + ", dateRegistered=" + dateRegistered + "]";
    }
}
