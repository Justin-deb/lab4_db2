package com.ucr.videogame_store.dto;

import java.time.LocalDateTime;

public class RentalDTO {
    private Integer sequence;
    private String clientId;
    private Integer copyId;
    private LocalDateTime loanDate;
    private Integer days;
    private LocalDateTime returnDate;
    private String returnDetails;

    public RentalDTO(String clientId, Integer copyId, Integer days) {
        this.clientId = clientId;
        this.copyId = copyId;
        this.days = days;
    }
    
    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public Integer getCopyId() {
        return copyId;
    }

    public void setCopyId(Integer copyId) {
        this.copyId = copyId;
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
