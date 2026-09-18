public class Job {

    private int jobId;
    private String state;
    private String city;
    private String role;
    private String company;
    private String date;
    private String time;
    private String qualification;
    private String experience;
    private String salary;
    private String skills;
    private String address;
    private String email;
    private String phone;
    private String applyLink;

    public Job() {
    }

    public Job(int jobId, String state, String city, String role,
               String company, String date, String time,
               String qualification, String experience, String salary,
               String skills, String address, String email,
               String phone, String applyLink) {

        this.jobId = jobId;
        this.state = state;
        this.city = city;
        this.role = role;
        this.company = company;
        this.date = date;
        this.time = time;
        this.qualification = qualification;
        this.experience = experience;
        this.salary = salary;
        this.skills = skills;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.applyLink = applyLink;
    }

    public int getJobId() {
        return jobId;
    }

    public String getState() {
        return state;
    }

    public String getCity() {
        return city;
    }

    public String getRole() {
        return role;
    }

    public String getCompany() {
        return company;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public String getQualification() {
        return qualification;
    }

    public String getExperience() {
        return experience;
    }

    public String getSalary() {
        return salary;
    }

    public String getSkills() {
        return skills;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getApplyLink() {
        return applyLink;
    }

    @Override
    public String toString() {
        return role + " - " + company + " - " + city;
    }
}
