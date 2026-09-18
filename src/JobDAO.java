import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class JobDAO {

    public List<Job> getAllJobs() {

        List<Job> jobs = new ArrayList<>();

        String sql = "SELECT * FROM jobs";

        try (
            Connection con = DBConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery()
        ) {

            while (rs.next()) {

                Job job = new Job(
                    rs.getInt("job_id"),
                    rs.getString("state"),
                    rs.getString("city"),
                    rs.getString("role"),
                    rs.getString("company"),
                    rs.getString("date"),
                    rs.getString("time"),
                    rs.getString("qualification"),
                    rs.getString("experience"),
                    rs.getString("salary"),
                    rs.getString("skills"),
                    rs.getString("address"),
                    rs.getString("email"),
                    rs.getString("phone"),
                    rs.getString("apply_link")
                );

                jobs.add(job);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return jobs;
    }

    // ======================================================
    // SAVE JOB
    // ======================================================

    public boolean saveJob(Job job) {

        String sql =
            "INSERT INTO jobs " +
            "(state, city, role, company, date, time, qualification, " +
            "experience, salary, skills, address, email, phone, apply_link) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (
            Connection con = DBConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(sql)
        ) {

            ps.setString(1, job.getState());
            ps.setString(2, job.getCity());
            ps.setString(3, job.getRole());
            ps.setString(4, job.getCompany());
            ps.setString(5, job.getDate());
            ps.setString(6, job.getTime());
            ps.setString(7, job.getQualification());
            ps.setString(8, job.getExperience());
            ps.setString(9, job.getSalary());
            ps.setString(10, job.getSkills());
            ps.setString(11, job.getAddress());
            ps.setString(12, job.getEmail());
            ps.setString(13, job.getPhone());
            ps.setString(14, job.getApplyLink());

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }
}
