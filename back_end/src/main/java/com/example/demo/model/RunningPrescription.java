package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class RunningPrescription {
    @Id
    private Integer uploadId;

    private Boolean status;

    @OneToOne
    @JoinColumn(name = "uploadId", insertable = false, updatable = false)
    private Uploads upload;

    public RunningPrescription(Integer uploadId, Boolean status, Uploads upload) {
        this.uploadId = uploadId;
        this.status = status;
        this.upload = upload;
    }

    public RunningPrescription() {
    }

    public Integer getUploadId() {
        return uploadId;
    }

    public void setUploadId(Integer uploadId) {
        this.uploadId = uploadId;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Uploads getUpload() {
        return upload;
    }

    public void setUpload(Uploads upload) {
        this.upload = upload;
    }
}

