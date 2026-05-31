package com.ucr.videogame_store.dto;

import java.time.LocalDateTime;

public class CopyDTO {
    private Integer serialNumber;
    private Integer videogameId;
    private Integer officeId;
    private LocalDateTime entryDate;
    private String availability;
    private String condition;

    public CopyDTO() {}

    public CopyDTO(Integer videogameId, Integer officeId,String availability, String condition) {
        this.videogameId = videogameId;
        this.officeId = officeId;
        this.availability = availability;
        this.condition = condition;
    }

    public Integer getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(Integer serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Integer getVideoGameId() {
        return videogameId;
    }

    public void setVideoGameId(Integer videoGameId) {
        this.videogameId = videoGameId;
    }

    public Integer getOfficeId() {
        return officeId;
    }

    public void setOfficeId(Integer officeId) {
        this.officeId = officeId;
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
        return "Copy [serialNumber=" + serialNumber + ", videogame=" + videogameId + ", office=" + officeId + ", entryDate="
                + entryDate + ", availability=" + availability + ", condition=" + condition + "]";
    }
}
