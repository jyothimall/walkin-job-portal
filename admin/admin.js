const API_URL = "http://localhost:8080";


// ======================================================
// STATES AND CITIES
// ======================================================

const stateCities = {

    "Andhra Pradesh": [
        "Visakhapatnam",
        "Vijayawada",
        "Tirupati",
        "Guntur",
        "Nellore"
    ],

    "Arunachal Pradesh": [
        "Itanagar",
        "Naharlagun"
    ],

    "Assam": [
        "Guwahati",
        "Dibrugarh",
        "Silchar"
    ],

    "Bihar": [
        "Patna",
        "Gaya",
        "Muzaffarpur"
    ],

    "Chhattisgarh": [
        "Raipur",
        "Bhilai",
        "Bilaspur"
    ],

    "Goa": [
        "Panaji",
        "Vasco da Gama"
    ],

    "Gujarat": [
        "Ahmedabad",
        "Surat",
        "Vadodara",
        "Rajkot"
    ],

    "Haryana": [
        "Gurugram",
        "Faridabad",
        "Panipat"
    ],

    "Himachal Pradesh": [
        "Shimla",
        "Dharamshala"
    ],

    "Jharkhand": [
        "Ranchi",
        "Jamshedpur",
        "Dhanbad"
    ],

    "Karnataka": [
        "Bengaluru",
        "Mysuru",
        "Mangaluru",
        "Hubballi",
        "Belagavi"
    ],

    "Kerala": [
        "Thiruvananthapuram",
        "Kochi",
        "Kozhikode",
        "Thrissur"
    ],

    "Madhya Pradesh": [
        "Bhopal",
        "Indore",
        "Jabalpur",
        "Gwalior"
    ],

    "Maharashtra": [
        "Mumbai",
        "Pune",
        "Nagpur",
        "Nashik",
        "Aurangabad"
    ],

    "Manipur": [
        "Imphal"
    ],

    "Meghalaya": [
        "Shillong"
    ],

    "Mizoram": [
        "Aizawl"
    ],

    "Nagaland": [
        "Kohima",
        "Dimapur"
    ],

    "Odisha": [
        "Bhubaneswar",
        "Cuttack",
        "Rourkela"
    ],

    "Punjab": [
        "Chandigarh",
        "Ludhiana",
        "Amritsar",
        "Jalandhar"
    ],

    "Rajasthan": [
        "Jaipur",
        "Jodhpur",
        "Udaipur",
        "Kota"
    ],

    "Sikkim": [
        "Gangtok"
    ],

    "Tamil Nadu": [
        "Chennai",
        "Coimbatore",
        "Madurai",
        "Salem",
        "Tiruchirappalli"
    ],

    "Telangana": [
        "Hyderabad",
        "Warangal",
        "Nizamabad"
    ],

    "Tripura": [
        "Agartala"
    ],

    "Uttar Pradesh": [
        "Lucknow",
        "Noida",
        "Kanpur",
        "Agra",
        "Varanasi"
    ],

    "Uttarakhand": [
        "Dehradun",
        "Haridwar",
        "Nainital"
    ],

    "West Bengal": [
        "Kolkata",
        "Howrah",
        "Durgapur",
        "Siliguri"
    ]
};


// ======================================================
// LOAD JOBS
// ======================================================

async function loadJobs() {

    try {

        const response =
            await fetch(API_URL + "/jobs");

        const jobs =
            await response.json();

        document.getElementById("jobCount")
            .textContent = jobs.length;

        displayJobs(jobs);

    } catch (error) {

        console.error(
            "Error loading jobs:",
            error
        );
    }
}


// ======================================================
// DISPLAY JOBS
// ======================================================

function displayJobs(jobs) {
    const content =
        document.getElementById("contentSection");

    content.innerHTML =
        "<h2>Jobs</h2>";

    if (jobs.length === 0) {
        content.innerHTML +=
            "<p>No jobs found.</p>";
        return;
    }

    jobs.forEach(function(job) {

        const div =
            document.createElement("div");

        div.className = "job-item";

        const mapLink =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(
                job.address + ", " +
                job.city + ", " +
                job.state
            );

        div.innerHTML = `
            <h3>${job.role}</h3>

            <p>
                <strong>Company:</strong>
                ${job.company}
            </p>

            <p>
                <strong>Location:</strong>
                ${job.city}, ${job.state}
            </p>

            <p>
                <strong>Walk-in Date:</strong>
                ${job.date}
            </p>

            <p>
                <strong>Walk-in Time:</strong>
                ${job.time}
            </p>

            <p>
                <strong>Qualification:</strong>
                ${job.qualification}
            </p>

            <p>
                <strong>Experience:</strong>
                ${job.experience}
            </p>

            <p>
                <strong>Salary:</strong>
                ${job.salary}
            </p>

            <p>
                <strong>Skills:</strong>
                ${job.skills}
            </p>

            <p>
                <strong>Address:</strong>
                ${job.address}
            </p>

            <p>
                <strong>HR Email:</strong>
                ${job.email}
            </p>

            <p>
                <strong>HR Phone:</strong>
                ${job.phone}
            </p>

            <p>
                <strong>Location Map:</strong>
            </p>

            <iframe
                src="https://www.google.com/maps?q=${encodeURIComponent(
                    job.address + ", " +
                    job.city + ", " +
                    job.state
                )}&output=embed"
                width="100%"
                height="300"
                style="border:0; border-radius:8px;"
                loading="lazy"
                allowfullscreen>
            </iframe>

            <p>
                <a href="${mapLink}"
                target="_blank"
                rel="noopener noreferrer">
                    📍 Open Exact Location in Google Maps
                </a>
            </p>
        `;

        content.appendChild(div);
    });
}


// ======================================================
// LOAD APPLICATIONS
// ======================================================

async function loadApplications() {

    try {

        const response =
            await fetch(
                API_URL + "/applications"
            );

        const applications =
            await response.json();

        document.getElementById(
            "applicationCount"
        ).textContent =
            applications.length;

        displayApplications(
            applications
        );

    } catch (error) {

        console.error(
            "Error loading applications:",
            error
        );
    }
}


// ======================================================
// DISPLAY APPLICATIONS
// ======================================================

function displayApplications(
    applications
) {

    const content =
        document.getElementById(
            "contentSection"
        );

    content.innerHTML =
        "<h2>Applications</h2>";

    if (applications.length === 0) {

        content.innerHTML +=
            "<p>No applications found.</p>";

        return;
    }

    applications.forEach(
        function(application) {

            const div =
                document.createElement("div");

            div.className =
                "application-item";

            div.innerHTML = `
                <h3>
                    ${application.applicantName}
                </h3>

                <p>
                    <strong>Job ID:</strong>
                    ${application.jobId}
                </p>

                <p>
                    <strong>Job Role:</strong>
                    ${application.jobRole}
                </p>

                <p>
                    <strong>Company:</strong>
                    ${application.company}
                </p>

                <p>
                    <strong>Email:</strong>
                    <a href="mailto:${application.email}">
                        ${application.email}
                    </a>
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${application.phone}
                </p>

                <p>
                    <strong>Qualification:</strong>
                    ${application.qualification}
                </p>

                <p>
                    <strong>Experience:</strong>
                    ${application.experience}
                </p>

                <p>
                    <strong>Resume:</strong>
                    <a
                        href="${API_URL}/resume/${encodeURIComponent(application.resume)}"
                        target="_blank">
                        ${application.resume}
                    </a>
                </p>

                <p>
                    <strong>Message:</strong>
                    ${application.message}
                </p>
            `;

            content.appendChild(div);
        }
    );
}


// ======================================================
// SHOW ADD JOB FORM
// ======================================================

function showAddJobForm() {

    const content =
        document.getElementById(
            "contentSection"
        );


    // Create month options

    let monthOptions = `
        <option value="">Select Month</option>
    `;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    months.forEach(function(month) {

        monthOptions += `
            <option value="${month}">
                ${month}
            </option>
        `;
    });


    // Create date options

    let dateOptions = `
        <option value="">Select Date</option>
    `;

    for (let i = 1; i <= 31; i++) {

        dateOptions += `
            <option value="${i}">
                ${i}
            </option>
        `;
    }


    // Create year options

    let yearOptions = `
        <option value="">Select Year</option>
    `;

    for (
        let year = 2026;
        year <= 2035;
        year++
    ) {

        yearOptions += `
            <option value="${year}">
                ${year}
            </option>
        `;
    }


    // Create state options

    let stateOptions = `
        <option value="">Select State</option>
    `;

    Object.keys(stateCities).forEach(
        function(state) {

            stateOptions += `
                <option value="${state}">
                    ${state}
                </option>
            `;
        }
    );


    content.innerHTML = `

        <h2>Add New Job</h2>

        <div class="job-item">

            <form id="addJobForm">


                <!-- STATE -->

                <p>

                    <label>State</label><br>

                    <select
                        id="jobState"
                        required>

                        ${stateOptions}

                    </select>

                </p>


                <!-- CITY -->

                <p>

                    <label>City</label><br>

                    <select
                        id="jobCity"
                        required>

                        <option value="">
                            Select City
                        </option>

                    </select>

                </p>


                <!-- JOB ROLE -->

                <p>

                    <label>Job Role</label><br>

                    <input
                        type="text"
                        id="jobRole"
                        required>

                </p>


                <!-- COMPANY -->

                <p>

                    <label>Company</label><br>

                    <input
                        type="text"
                        id="jobCompany"
                        required>

                </p>


                <!-- WALK-IN DATE -->

                <p>

                    <label>Walk-in Date</label><br>

                    <select
                        id="jobMonth"
                        required>

                        ${monthOptions}

                    </select>


                    <select
                        id="jobDate"
                        required>

                        ${dateOptions}

                    </select>


                    <select
                        id="jobYear"
                        required>

                        ${yearOptions}

                    </select>

                </p>


                <!-- WALK-IN TIME -->

                <p>

                    <label>Walk-in Time</label><br>

                    <select id="jobStartTime" required>

                        <option value="">
                            Select Start Time
                        </option>

                        <option value="12:00 AM">12:00 AM</option>
                        <option value="1:00 AM">1:00 AM</option>
                        <option value="2:00 AM">2:00 AM</option>
                        <option value="3:00 AM">3:00 AM</option>
                        <option value="4:00 AM">4:00 AM</option>
                        <option value="5:00 AM">5:00 AM</option>
                        <option value="6:00 AM">6:00 AM</option>
                        <option value="7:00 AM">7:00 AM</option>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>

                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                        <option value="11:00 PM">11:00 PM</option>

                    </select>

                    <span> to </span>


                    <select id="jobEndTime" required>

                        <option value="">
                            Select End Time
                        </option>

                            <option value="12:00 AM">12:00 AM</option>
                            <option value="1:00 AM">1:00 AM</option>
                            <option value="2:00 AM">2:00 AM</option>
                            <option value="3:00 AM">3:00 AM</option>
                            <option value="4:00 AM">4:00 AM</option>
                            <option value="5:00 AM">5:00 AM</option>
                            <option value="6:00 AM">6:00 AM</option>
                            <option value="7:00 AM">7:00 AM</option>
                            <option value="8:00 AM">8:00 AM</option>
                            <option value="9:00 AM">9:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:00 AM">11:00 AM</option>

                            <option value="12:00 PM">12:00 PM</option>
                            <option value="1:00 PM">1:00 PM</option>
                            <option value="2:00 PM">2:00 PM</option>
                            <option value="3:00 PM">3:00 PM</option>
                            <option value="4:00 PM">4:00 PM</option>
                            <option value="5:00 PM">5:00 PM</option>
                            <option value="6:00 PM">6:00 PM</option>
                            <option value="7:00 PM">7:00 PM</option>
                            <option value="8:00 PM">8:00 PM</option>
                            <option value="9:00 PM">9:00 PM</option>
                            <option value="10:00 PM">10:00 PM</option>
                            <option value="11:00 PM">11:00 PM</option>

                    </select>

                </p>
                <!-- QUALIFICATION -->

                <p>

                    <label>Qualification</label><br>

                    <input
                        type="text"
                        id="jobQualification"
                        placeholder="B.E / B.Tech - CSE"
                        required>

                </p>


                <!-- EXPERIENCE -->

                <p>

                    <label>Experience</label><br>

                    <input
                        type="text"
                        id="jobExperience"
                        placeholder="Fresher / 0-2 Years"
                        required>

                </p>


                <!-- SALARY -->

                <p>

                    <label>Salary</label><br>

                    <input
                        type="text"
                        id="jobSalary"
                        placeholder="₹3 - ₹6 LPA"
                        required>

                </p>


                <!-- SKILLS -->

                <p>

                    <label>Skills</label><br>

                    <input
                        type="text"
                        id="jobSkills"
                        placeholder="Java, SQL, JDBC"
                        required>

                </p>


                <!-- ADDRESS -->

                <p>

                    <label>Address</label><br>

                    <input
                        type="text"
                        id="jobAddress"
                        required>

                </p>


                <!-- HR EMAIL -->

                <p>

                    <label>HR Email</label><br>

                    <input
                        type="email"
                        id="jobEmail"
                        required>

                </p>


                <!-- HR PHONE -->

                <p>

                    <label>HR Phone</label><br>

                    <input
                        type="text"
                        id="jobPhone"
                        required>

                </p>


                <!-- SUBMIT -->

                <p>

                    <button type="submit">
                        Add Job
                    </button>

                </p>


            </form>

        </div>
    `;


    // ==================================================
    // STATE → CITY
    // ==================================================

    document
        .getElementById("jobState")
        .addEventListener(
            "change",
            function() {

                const selectedState =
                    this.value;

                const citySelect =
                    document.getElementById(
                        "jobCity"
                    );

                citySelect.innerHTML = `
                    <option value="">
                        Select City
                    </option>
                `;


                if (
                    selectedState &&
                    stateCities[selectedState]
                ) {

                    stateCities[selectedState]
                        .forEach(
                            function(city) {

                                const option =
                                    document.createElement(
                                        "option"
                                    );

                                option.value =
                                    city;

                                option.textContent =
                                    city;

                                citySelect.appendChild(
                                    option
                                );
                            }
                        );
                }
            }
        );


// ==================================================
// FORM SUBMIT
// ==================================================

document
    .getElementById("addJobForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const state =
                document.getElementById("jobState").value;

            const city =
                document.getElementById("jobCity").value;

            const role =
                document.getElementById("jobRole").value;

            const company =
                document.getElementById("jobCompany").value;

            const month =
                document.getElementById("jobMonth").value;

            const date =
                document.getElementById("jobDate").value;

            const year =
                document.getElementById("jobYear").value;

            const startTime =
                document.getElementById("jobStartTime").value;

            const endTime =
                document.getElementById("jobEndTime").value;

            const qualification =
                document.getElementById("jobQualification").value;

            const experience =
                document.getElementById("jobExperience").value;

            const salary =
                document.getElementById("jobSalary").value;

            const skills =
                document.getElementById("jobSkills").value;

            const address =
                document.getElementById("jobAddress").value;

            const email =
                document.getElementById("jobEmail").value;

            const phone =
                document.getElementById("jobPhone").value;


            // Create complete date and time

            const fullDate =
                date +
                " " +
                month +
                " " +
                year;

            const fullTime =
                startTime +
                " - " +
                endTime;


            // Prepare form data

            const formData =
                new URLSearchParams();

            formData.append("state", state);
            formData.append("city", city);
            formData.append("role", role);
            formData.append("company", company);
            formData.append("date", fullDate);
            formData.append("time", fullTime);
            formData.append(
                "qualification",
                qualification
            );
            formData.append(
                "experience",
                experience
            );
            formData.append("salary", salary);
            formData.append("skills", skills);
            formData.append("address", address);
            formData.append("email", email);
            formData.append("phone", phone);


            try {

                const response =
                    await fetch(
                        API_URL + "/add-job",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded"
                            },

                            body:
                                formData.toString()
                        }
                    );


                const result =
                    await response.json();


                if (result.success) {

                    alert(
                        "Job added successfully!"
                    );

                    event.target.reset();

                    document.getElementById(
                        "jobCity"
                    ).innerHTML =
                        `<option value="">
                            Select City
                        </option>`;

                    loadJobs();

                } else {

                    alert(
                        result.message
                    );
                }


            } catch (error) {

                console.error(error);

                alert(
                    "Unable to connect to server."
                );
            }

        }
    );
}

// ======================================================
// VIEW JOBS BUTTON
// ======================================================

document
    .getElementById("viewJobsBtn")
    .addEventListener(
        "click",
        loadJobs
    );


// ======================================================
// VIEW APPLICATIONS BUTTON
// ======================================================

document
    .getElementById("viewApplicationsBtn")
    .addEventListener(
        "click",
        loadApplications
    );


// ======================================================
// ADD JOB BUTTON
// ======================================================

document
    .getElementById("addJobBtn")
    .addEventListener(
        "click",
        showAddJobForm
    );


// ======================================================
// INITIAL LOAD
// ======================================================

loadJobs();