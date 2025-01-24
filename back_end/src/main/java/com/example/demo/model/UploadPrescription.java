// package com.example.demo.model;

// import jakarta.persistence.*;

// @Entity
// public class UploadPrescription {
//     @Id
//     private Integer uploadId;

//     private String diseaseName;
//     private String startDate;
//     private String doctorName;
//     private String hospitalName;
//     private String hospitalAddress;

//     @Lob
//     private byte[] prescriptionFile;

//     @OneToOne
//     @JoinColumn(name = "uploadId", insertable = false, updatable = false)
//     private Uploads upload;

//     public UploadPrescription(Integer uploadId, String diseaseName, String startDate, String doctorName, String hospitalName, String hospitalAddress, byte[] prescriptionFile, Uploads upload) {
//         this.uploadId = uploadId;
//         this.diseaseName = diseaseName;
//         this.startDate = startDate;
//         this.doctorName = doctorName;
//         this.hospitalName = hospitalName;
//         this.hospitalAddress = hospitalAddress;
//         this.prescriptionFile = prescriptionFile;
//         this.upload = upload;
//     }

//     public UploadPrescription() {
//     }

//     public Integer getUploadId() {
//         return uploadId;
//     }

//     public void setUploadId(Integer uploadId) {
//         this.uploadId = uploadId;
//     }

//     public String getDiseaseName() {
//         return diseaseName;
//     }

//     public void setDiseaseName(String diseaseName) {
//         this.diseaseName = diseaseName;
//     }

//     public String getStartDate() {
//         return startDate;
//     }

//     public void setStartDate(String startDate) {
//         this.startDate = startDate;
//     }

//     public String getDoctorName() {
//         return doctorName;
//     }

//     public void setDoctorName(String doctorName) {
//         this.doctorName = doctorName;
//     }

//     public String getHospitalName() {
//         return hospitalName;
//     }

//     public void setHospitalName(String hospitalName) {
//         this.hospitalName = hospitalName;
//     }

//     public String getHospitalAddress() {
//         return hospitalAddress;
//     }

//     public void setHospitalAddress(String hospitalAddress) {
//         this.hospitalAddress = hospitalAddress;
//     }

//     public byte[] getPrescriptionFile() {
//         return prescriptionFile;
//     }

//     public void setPrescriptionFile(byte[] prescriptionFile) {
//         this.prescriptionFile = prescriptionFile;
//     }

//     public Uploads getUpload() {
//         return upload;
//     }

//     public void setUpload(Uploads upload) {
//         this.upload = upload;
//     }
// }

