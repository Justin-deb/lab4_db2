package com.ucr.videogame_store.dto;

import java.time.LocalDateTime;

public class TransferDTO {
    private Integer operationNumber;
    private Integer copyId;
    private LocalDateTime transferDate;
    private Integer originOfficeId;
    private Integer destinationOfficeId;
    private String comments;

    public TransferDTO(Integer copyId, Integer originOfficeId,
                    Integer destinationOfficeId, String comments) {
        this.copyId = copyId;
        this.originOfficeId = originOfficeId;
        this.destinationOfficeId = destinationOfficeId;
        this.comments = comments;
    }

    public Integer getOperationNumber() {
        return operationNumber;
    }

    public void setOperationNumber(Integer operationNumber) {
        this.operationNumber = operationNumber;
    }

    public Integer getCopyId() {
        return copyId;
    }

    public void setCopyId(Integer copyId) {
        this.copyId = copyId;
    }

    public LocalDateTime getTransferDate() {
        return transferDate;
    }

    public void setTransferDate(LocalDateTime transferDate) {
        this.transferDate = transferDate;
    }

    public Integer getOriginOfficeId() {
        return originOfficeId;
    }

    public void setOriginOffice(Integer originOfficeId) {
        this.originOfficeId = originOfficeId;
    }

    public Integer getDestinationOfficeId() {
        return destinationOfficeId;
    }

    public void setDestinationOffice(Integer destinationOfficeId) {
        this.destinationOfficeId = destinationOfficeId;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
