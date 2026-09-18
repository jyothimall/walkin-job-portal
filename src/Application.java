public class Application {

    private int jobId;
    private String applicantName;
    private String email;
    private String phone;
    private String qualification;
    private String experience;
    private String resume;
    private String message;

    // NEW
    private String jobRole;
    private String company;


    // ======================================================
    // CONSTRUCTOR
    // ======================================================

    public Application(
            int jobId,
            String applicantName,
            String email,
            String phone,
            String qualification,
            String experience,
            String resume,
            String message) {

        this.jobId = jobId;
        this.applicantName = applicantName;
        this.email = email;
        this.phone = phone;
        this.qualification = qualification;
        this.experience = experience;
        this.resume = resume;
        this.message = message;
    }


    // ======================================================
    // GETTERS
    // ======================================================

    public int getJobId() {
        return jobId;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getQualification() {
        return qualification;
    }

    public String getExperience() {
        return experience;
    }

    public String getResume() {
        return resume;
    }

    public String getMessage() {
        return message;
    }


    // NEW GETTERS

    public String getJobRole() {
        return jobRole;
    }

    public String getCompany() {
        return company;
    }


    // ======================================================
    // SETTERS FOR JOB DETAILS
    // ======================================================

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public void setCompany(String company) {
        this.company = company;
    }
}