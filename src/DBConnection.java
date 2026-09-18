import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    public static Connection getConnection() {

        Connection con = null;

        try {

            String host = System.getenv("MYSQLHOST");
            String port = System.getenv("MYSQLPORT");
            String database = System.getenv("MYSQLDATABASE");
            String user = System.getenv("MYSQLUSER");
            String password = System.getenv("MYSQLPASSWORD");

            String url = "jdbc:mysql://" + host + ":" + port + "/" + database;

            Class.forName("com.mysql.cj.jdbc.Driver");

            con = DriverManager.getConnection(
                    url,
                    user,
                    password
            );

            System.out.println("Database connected successfully!");

        } catch (Exception e) {

            e.printStackTrace();

        }

        return con;
    }
}