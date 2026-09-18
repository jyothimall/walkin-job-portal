import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

public class JobServer {

    public static void main(String[] args) throws Exception {

        int port = Integer.parseInt(
        System.getenv().getOrDefault("PORT", "8080")
);

        HttpServer server = HttpServer.create(
                new InetSocketAddress("0.0.0.0", port), 0
        );
        server.createContext(
                "/jobs",
                JobServer::handleJobs
        );
        server.createContext(
        "/",
        JobServer::handleHome
        );

        server.createContext(
                "/apply",
                JobServer::handleApplication
        );

        server.createContext(
                "/applications",
                JobServer::handleApplications
        );

        server.createContext(
                "/resume",
                JobServer::handleResume
        );

        // NEW: ADD JOB
        server.createContext(
                "/add-job",
                JobServer::handleAddJob
        );

        server.setExecutor(null);

        System.out.println("Server started!");
        System.out.println(
        "Server running on port: " + port
        );

        server.start();
    }


    // ======================================================
    // GET ALL JOBS
    // ======================================================

    private static void handleJobs(
            HttpExchange exchange)
            throws IOException {

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Origin",
                "*"
        );

        if (!exchange.getRequestMethod().equals("GET")) {

            exchange.sendResponseHeaders(
                    405,
                    -1
            );

            return;
        }

        JobDAO jobDAO = new JobDAO();

        List<Job> jobs =
                jobDAO.getAllJobs();

        StringBuilder json =
                new StringBuilder("[");

        for (int i = 0;
             i < jobs.size();
             i++) {

            Job job = jobs.get(i);

            json.append("{")

                .append("\"jobId\":")
                .append(job.getJobId())
                .append(",")

                .append("\"state\":\"")
                .append(escape(job.getState()))
                .append("\",")

                .append("\"city\":\"")
                .append(escape(job.getCity()))
                .append("\",")

                .append("\"role\":\"")
                .append(escape(job.getRole()))
                .append("\",")

                .append("\"company\":\"")
                .append(escape(job.getCompany()))
                .append("\",")

                .append("\"date\":\"")
                .append(escape(job.getDate()))
                .append("\",")

                .append("\"time\":\"")
                .append(escape(job.getTime()))
                .append("\",")

                .append("\"qualification\":\"")
                .append(escape(job.getQualification()))
                .append("\",")

                .append("\"experience\":\"")
                .append(escape(job.getExperience()))
                .append("\",")

                .append("\"salary\":\"")
                .append(escape(job.getSalary()))
                .append("\",")

                .append("\"skills\":\"")
                .append(escape(job.getSkills()))
                .append("\",")

                .append("\"address\":\"")
                .append(escape(job.getAddress()))
                .append("\",")

                .append("\"email\":\"")
                .append(escape(job.getEmail()))
                .append("\",")

                .append("\"phone\":\"")
                .append(escape(job.getPhone()))
                .append("\",")

                .append("\"applyLink\":\"")
                .append(escape(job.getApplyLink()))
                .append("\"")

                .append("}");

            if (i < jobs.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");

        byte[] response =
                json.toString()
                        .getBytes(
                                StandardCharsets.UTF_8
                        );

        exchange.getResponseHeaders().set(
                "Content-Type",
                "application/json"
        );

        exchange.sendResponseHeaders(
                200,
                response.length
        );

        try (
            OutputStream os =
                    exchange.getResponseBody()
        ) {
            os.write(response);
        }
    }


    // ======================================================
    // ADD JOB
    // ======================================================

    private static void handleAddJob(
            HttpExchange exchange)
            throws IOException {

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Origin",
                "*"
        );

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Methods",
                "POST, OPTIONS"
        );

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Headers",
                "Content-Type"
        );


        // OPTIONS request

        if (exchange.getRequestMethod().equals("OPTIONS")) {

            exchange.sendResponseHeaders(
                    204,
                    -1
            );

            return;
        }


        // Only POST allowed

        if (!exchange.getRequestMethod().equals("POST")) {

            sendResponse(
                    exchange,
                    "{\"success\":false,\"message\":\"POST method required\"}"
            );

            return;
        }


        // Read form data

        byte[] data =
                exchange.getRequestBody()
                        .readAllBytes();


        String body =
                new String(
                        data,
                        StandardCharsets.UTF_8
                );


        System.out.println(
                "Add Job Data: " + body
        );


        // Get values

        String state =
                getFormValue(body, "state");

        String city =
                getFormValue(body, "city");

        String role =
                getFormValue(body, "role");

        String company =
                getFormValue(body, "company");

        String date =
                getFormValue(body, "date");

        String time =
                getFormValue(body, "time");

        String qualification =
                getFormValue(body, "qualification");

        String experience =
                getFormValue(body, "experience");

        String salary =
                getFormValue(body, "salary");

        String skills =
                getFormValue(body, "skills");

        String address =
                getFormValue(body, "address");

        String email =
                getFormValue(body, "email");

        String phone =
                getFormValue(body, "phone");


        // Create Job object

        Job job =
                new Job(
                        0,
                        state,
                        city,
                        role,
                        company,
                        date,
                        time,
                        qualification,
                        experience,
                        salary,
                        skills,
                        address,
                        email,
                        phone,
                        "#"
                );


        // Save job

        JobDAO dao =
                new JobDAO();

        boolean saved =
                dao.saveJob(job);


        if (saved) {

            sendResponse(
                    exchange,
                    "{\"success\":true,\"message\":\"Job added successfully\"}"
            );

        } else {

            sendResponse(
                    exchange,
                    "{\"success\":false,\"message\":\"Failed to add job\"}"
            );
        }
    }


    // ======================================================
    // GET FORM VALUE
    // ======================================================

    private static String getFormValue(
            String body,
            String fieldName) {

        String[] pairs =
                body.split("&");

        for (String pair : pairs) {

            String[] parts =
                    pair.split("=", 2);

            if (parts.length == 2) {

                String key =
                        URLDecoder.decode(
                                parts[0],
                                StandardCharsets.UTF_8
                        );

                if (key.equals(fieldName)) {

                    return URLDecoder.decode(
                            parts[1],
                            StandardCharsets.UTF_8
                    );
                }
            }
        }

        return "";
    }


    // ======================================================
    // ESCAPE JSON TEXT
    // ======================================================

    private static String escape(
            String text) {

        if (text == null) {
            return "";
        }

        return text
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }


    // ======================================================
    // SAVE APPLICATION
    // ======================================================

    private static void handleApplication(
            HttpExchange exchange)
            throws IOException {

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Origin",
                "*"
        );

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Methods",
                "POST, OPTIONS"
        );

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Headers",
                "Content-Type"
        );


        if (exchange.getRequestMethod().equals("OPTIONS")) {

            exchange.sendResponseHeaders(
                    204,
                    -1
            );

            return;
        }


        if (!exchange.getRequestMethod().equals("POST")) {

            exchange.sendResponseHeaders(
                    405,
                    -1
            );

            return;
        }


        String contentType =
                exchange.getRequestHeaders()
                        .getFirst("Content-Type");


        System.out.println(
                "Content-Type: "
                + contentType
        );


        if (contentType == null ||
                !contentType.contains(
                        "multipart/form-data")) {

            sendResponse(
                    exchange,
                    "{\"success\":false,\"message\":\"Invalid form data\"}"
            );

            return;
        }


        String boundary =
                contentType.substring(
                        contentType.indexOf(
                                "boundary="
                        ) + 9
                );


        if (boundary.startsWith("\"")) {

            boundary =
                    boundary.substring(
                            1,
                            boundary.length() - 1
                    );
        }


        byte[] data =
                exchange.getRequestBody()
                        .readAllBytes();


        String body =
                new String(
                        data,
                        StandardCharsets.ISO_8859_1
                );


        String applicantName =
                getMultipartValue(
                        body,
                        "applicantName"
                );


        String email =
                getMultipartValue(
                        body,
                        "email"
                );


        String phone =
                getMultipartValue(
                        body,
                        "phone"
                );


        String qualification =
                getMultipartValue(
                        body,
                        "qualification"
                );


        String experience =
                getMultipartValue(
                        body,
                        "experience"
                );


        String message =
                getMultipartValue(
                        body,
                        "message"
                );


        String jobIdText =
                getMultipartValue(
                        body,
                        "jobId"
                );


        String resumeFileName =
                getMultipartFileName(
                        body,
                        "resume"
                );


        int jobId =
                Integer.parseInt(jobIdText);


        System.out.println(
                "Applicant: "
                + applicantName
        );

        System.out.println(
                "Resume: "
                + resumeFileName
        );


        File resumeFolder =
                new File("resumes");


        if (!resumeFolder.exists()) {
            resumeFolder.mkdirs();
        }


        String savedResumeName =
                "";


        if (!resumeFileName.isEmpty()) {

            String extension = "";


            int dot =
                    resumeFileName.lastIndexOf(".");


            if (dot >= 0) {

                extension =
                        resumeFileName.substring(dot);
            }


            savedResumeName =
                    UUID.randomUUID().toString()
                    + extension;


            int fileStart =
                    body.indexOf(
                            "\r\n\r\n",
                            body.indexOf(
                                    "name=\"resume\""
                            )
                    );


            if (fileStart >= 0) {

                fileStart += 4;


                int fileEnd =
                        body.indexOf(
                                "\r\n--"
                                + boundary,
                                fileStart
                        );


                if (fileEnd >= 0) {

                    String fileContent =
                            body.substring(
                                    fileStart,
                                    fileEnd
                            );


                    byte[] fileBytes =
                            fileContent.getBytes(
                                    StandardCharsets.ISO_8859_1
                            );


                    File outputFile =
                            new File(
                                    resumeFolder,
                                    savedResumeName
                            );


                    try (
                        FileOutputStream fos =
                                new FileOutputStream(
                                        outputFile
                                )
                    ) {

                        fos.write(fileBytes);
                    }


                    System.out.println(
                            "Resume saved: "
                            + outputFile
                                    .getAbsolutePath()
                    );
                }
            }
        }


        Application application =
                new Application(
                        jobId,
                        applicantName,
                        email,
                        phone,
                        qualification,
                        experience,
                        savedResumeName,
                        message
                );


        ApplicationDAO dao =
                new ApplicationDAO();


        boolean saved =
                dao.saveApplication(
                        application
                );


        if (saved) {

            sendResponse(
                    exchange,
                    "{\"success\":true,\"message\":\"Application saved successfully\"}"
            );

        } else {

            sendResponse(
                    exchange,
                    "{\"success\":false,\"message\":\"Failed to save application\"}"
            );
        }
    }


    // ======================================================
    // GET ALL APPLICATIONS
    // ======================================================

    private static void handleApplications(
            HttpExchange exchange)
            throws IOException {

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Origin",
                "*"
        );


        if (!exchange.getRequestMethod().equals("GET")) {

            exchange.sendResponseHeaders(
                    405,
                    -1
            );

            return;
        }


        ApplicationDAO dao =
                new ApplicationDAO();


        List<Application> applications =
                dao.getAllApplications();


        StringBuilder json =
                new StringBuilder("[");


        for (int i = 0;
             i < applications.size();
             i++) {

            Application app =
                    applications.get(i);


            json.append("{")

                .append("\"jobId\":")
                .append(app.getJobId())
                .append(",")
                .append("\"jobRole\":\"")
                .append(
                        escape(
                                app.getJobRole()
                        )
                )
                .append("\",")

                .append("\"company\":\"")
                .append(
                        escape(
                                app.getCompany()
                        )
                )
                .append("\",")

                .append("\"applicantName\":\"")
                .append(
                        escape(
                                app.getApplicantName()
                        )
                )
                .append("\",")

                .append("\"email\":\"")
                .append(
                        escape(
                                app.getEmail()
                        )
                )
                .append("\",")

                .append("\"phone\":\"")
                .append(
                        escape(
                                app.getPhone()
                        )
                )
                .append("\",")

                .append("\"qualification\":\"")
                .append(
                        escape(
                                app.getQualification()
                        )
                )
                .append("\",")

                .append("\"experience\":\"")
                .append(
                        escape(
                                app.getExperience()
                        )
                )
                .append("\",")

                .append("\"resume\":\"")
                .append(
                        escape(
                                app.getResume()
                        )
                )
                .append("\",")

                .append("\"message\":\"")
                .append(
                        escape(
                                app.getMessage()
                        )
                )
                .append("\"")

                .append("}");


            if (i < applications.size() - 1) {
                json.append(",");
            }
        }


        json.append("]");


        byte[] response =
                json.toString()
                        .getBytes(
                                StandardCharsets.UTF_8
                        );


        exchange.getResponseHeaders().set(
                "Content-Type",
                "application/json"
        );


        exchange.sendResponseHeaders(
                200,
                response.length
        );


        try (
            OutputStream os =
                    exchange.getResponseBody()
        ) {

            os.write(response);
        }
    }


    // ======================================================
    // GET MULTIPART TEXT VALUE
    // ======================================================

    private static String getMultipartValue(
            String body,
            String fieldName) {

        String search =
                "name=\"" + fieldName + "\"";


        int fieldStart =
                body.indexOf(search);


        if (fieldStart == -1) {
            return "";
        }


        int valueStart =
                body.indexOf(
                        "\r\n\r\n",
                        fieldStart
                );


        if (valueStart == -1) {
            return "";
        }


        valueStart += 4;


        int valueEnd =
                body.indexOf(
                        "\r\n",
                        valueStart
                );


        if (valueEnd == -1) {
            return "";
        }


        return body.substring(
                valueStart,
                valueEnd
        ).trim();
    }


    // ======================================================
    // GET MULTIPART FILE NAME
    // ======================================================

    private static String getMultipartFileName(
            String body,
            String fieldName) {

        String search =
                "name=\"" + fieldName + "\"";


        int fieldStart =
                body.indexOf(search);


        if (fieldStart == -1) {
            return "";
        }


        int fileNameStart =
                body.indexOf(
                        "filename=\"",
                        fieldStart
                );


        if (fileNameStart == -1) {
            return "";
        }


        fileNameStart += 10;


        int fileNameEnd =
                body.indexOf(
                        "\"",
                        fileNameStart
                );


        if (fileNameEnd == -1) {
            return "";
        }


        return body.substring(
                fileNameStart,
                fileNameEnd
        );
    }


    // ======================================================
    // OPEN RESUME
    // ======================================================

    private static void handleResume(
            HttpExchange exchange)
            throws IOException {

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Origin",
                "*"
        );


        if (!exchange.getRequestMethod().equals("GET")) {

            exchange.sendResponseHeaders(
                    405,
                    -1
            );

            return;
        }


        String path =
                exchange.getRequestURI()
                        .getPath();


        String fileName =
                path.substring(
                        "/resume/".length()
                );


        if (fileName.contains("..") ||
                fileName.contains("/") ||
                fileName.contains("\\")) {

            exchange.sendResponseHeaders(
                    400,
                    -1
            );

            return;
        }


        File resumeFile =
                new File(
                        "resumes",
                        fileName
                );


        if (!resumeFile.exists() ||
                !resumeFile.isFile()) {

            exchange.sendResponseHeaders(
                    404,
                    -1
            );

            return;
        }


        String contentType =
                "application/octet-stream";


        if (fileName.toLowerCase()
                .endsWith(".pdf")) {

            contentType =
                    "application/pdf";

        } else if (fileName.toLowerCase()
                .endsWith(".doc")) {

            contentType =
                    "application/msword";

        } else if (fileName.toLowerCase()
                .endsWith(".docx")) {

            contentType =
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        }


        exchange.getResponseHeaders().set(
                "Content-Type",
                contentType
        );


        byte[] fileData =
                java.nio.file.Files.readAllBytes(
                        resumeFile.toPath()
                );


        exchange.sendResponseHeaders(
                200,
                fileData.length
        );


        try (
            OutputStream os =
                    exchange.getResponseBody()
        ) {

            os.write(fileData);
        }
    }


    // ======================================================
    // SEND JSON RESPONSE
    // ======================================================

    private static void sendResponse(
            HttpExchange exchange,
            String response)
            throws IOException {

        exchange.getResponseHeaders().set(
                "Content-Type",
                "application/json"
        );


        byte[] data =
                response.getBytes(
                        StandardCharsets.UTF_8
                );


        exchange.sendResponseHeaders(
                200,
                data.length
        );


        try (
            OutputStream os =
                    exchange.getResponseBody()
        ) {

            os.write(data);
        }
    }
    private static void handleHome(
        HttpExchange exchange)
        throws IOException {

    File file = new File("index.html");

    if (!file.exists()) {
        exchange.sendResponseHeaders(404, -1);
        return;
    }

    byte[] data = java.nio.file.Files.readAllBytes(
            file.toPath()
    );

    exchange.getResponseHeaders().set(
            "Content-Type",
            "text/html"
    );

    exchange.sendResponseHeaders(
            200,
            data.length
    );

    try (
        OutputStream os = exchange.getResponseBody()
    ) {
        os.write(data);
    }
}
}