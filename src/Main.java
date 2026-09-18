import java.sql.Connection;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        // Test database connection
        Connection con = DBConnection.getConnection();

        if (con != null) {
            System.out.println("WalkIn Jobs backend is ready!");
        }

        // Get jobs from database
        JobDAO jobDAO = new JobDAO();

        List<Job> jobs = jobDAO.getAllJobs();

        System.out.println("\nJobs from MySQL:");

        for (Job job : jobs) {
            System.out.println(job);
        }
    }
}