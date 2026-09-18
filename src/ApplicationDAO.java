import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ApplicationDAO {

    // ======================================================
    // SAVE APPLICATION
    // ======================================================

    public boolean saveApplication(Application application) {

        String sql =
            "INSERT INTO applications " +
            "(job_id, applicant_name, email, phone, qualification, " +
            "experience, resume, message) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try (
            Connection con = DBConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(sql)
        ) {

            ps.setInt(
                    1,
                    application.getJobId()
            );

            ps.setString(
                    2,
                    application.getApplicantName()
            );

            ps.setString(
                    3,
                    application.getEmail()
            );

            ps.setString(
                    4,
                    application.getPhone()
            );

            ps.setString(
                    5,
                    application.getQualification()
            );

            ps.setString(
                    6,
                    application.getExperience()
            );

            ps.setString(
                    7,
                    application.getResume()
            );

            ps.setString(
                    8,
                    application.getMessage()
            );

            int rows =
                    ps.executeUpdate();

            return rows > 0;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }


    // ======================================================
    // GET ALL APPLICATIONS
    // ======================================================

    public List<Application> getAllApplications() {

        List<Application> applications =
                new ArrayList<>();


        String sql =
                "SELECT a.*, " +
                "j.role AS job_role, " +
                "j.company AS job_company " +
                "FROM applications a " +
                "LEFT JOIN jobs j " +
                "ON a.job_id = j.job_id";


        try (
            Connection con =
                    DBConnection.getConnection();

            PreparedStatement ps =
                    con.prepareStatement(sql);

            ResultSet rs =
                    ps.executeQuery()
        ) {

            while (rs.next()) {

                Application application =
                        new Application(

                            rs.getInt(
                                    "job_id"
                            ),

                            rs.getString(
                                    "applicant_name"
                            ),

                            rs.getString(
                                    "email"
                            ),

                            rs.getString(
                                    "phone"
                            ),

                            rs.getString(
                                    "qualification"
                            ),

                            rs.getString(
                                    "experience"
                            ),

                            rs.getString(
                                    "resume"
                            ),

                            rs.getString(
                                    "message"
                            )
                        );


                // Set job details

                application.setJobRole(
                        rs.getString(
                                "job_role"
                        )
                );

                application.setCompany(
                        rs.getString(
                                "job_company"
                        )
                );


                applications.add(
                        application
                );
            }

        } catch (Exception e) {

            e.printStackTrace();
        }


        return applications;
    }
}