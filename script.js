// ======================================================
// STATE → CITY DATA
// ======================================================

const stateCities = {

    "Andhra Pradesh": [
        "Visakhapatnam", "Vijayawada", "Guntur", "Nellore",
        "Kurnool", "Tirupati", "Rajahmundry", "Kakinada"
    ],

    "Arunachal Pradesh": [
        "Itanagar", "Naharlagun", "Tawang", "Pasighat"
    ],

    "Assam": [
        "Guwahati", "Dibrugarh", "Silchar", "Jorhat",
        "Tezpur", "Nagaon", "Tinsukia"
    ],

    "Bihar": [
        "Patna", "Gaya", "Bhagalpur", "Muzaffarpur",
        "Purnia", "Darbhanga", "Ara"
    ],

    "Chhattisgarh": [
        "Raipur", "Bhilai", "Bilaspur", "Korba",
        "Durg", "Rajnandgaon", "Jagdalpur"
    ],

    "Goa": [
        "Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda"
    ],

    "Gujarat": [
        "Ahmedabad", "Surat", "Vadodara", "Rajkot",
        "Gandhinagar", "Bhavnagar", "Jamnagar", "Junagadh"
    ],

    "Haryana": [
        "Gurugram", "Faridabad", "Panipat", "Ambala",
        "Hisar", "Karnal", "Rohtak", "Sonipat"
    ],

    "Himachal Pradesh": [
        "Shimla", "Dharamshala", "Solan", "Mandi",
        "Kullu", "Manali", "Baddi"
    ],

    "Jharkhand": [
        "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro",
        "Deoghar", "Hazaribagh"
    ],

    "Karnataka": [
        "Bengaluru", "Mysuru", "Mangaluru", "Hubballi",
        "Dharwad", "Belagavi", "Kalaburagi", "Davangere",
        "Ballari", "Shivamogga", "Tumakuru", "Udupi",
        "Hassan", "Raichur", "Vijayapura"
    ],

    "Kerala": [
        "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur",
        "Kollam", "Kannur", "Alappuzha", "Palakkad", "Kottayam"
    ],

    "Madhya Pradesh": [
        "Bhopal", "Indore", "Jabalpur", "Gwalior",
        "Ujjain", "Sagar", "Dewas", "Satna"
    ],

    "Maharashtra": [
        "Mumbai", "Pune", "Nagpur", "Nashik", "Thane",
        "Aurangabad", "Navi Mumbai", "Kolhapur",
        "Solapur", "Amravati"
    ],

    "Manipur": [
        "Imphal", "Thoubal", "Bishnupur", "Churachandpur"
    ],

    "Meghalaya": [
        "Shillong", "Tura", "Jowai", "Nongpoh"
    ],

    "Mizoram": [
        "Aizawl", "Lunglei", "Champhai", "Kolasib"
    ],

    "Nagaland": [
        "Kohima", "Dimapur", "Mokokchung", "Tuensang"
    ],

    "Odisha": [
        "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur",
        "Sambalpur", "Puri", "Balasore"
    ],

    "Punjab": [
        "Ludhiana", "Amritsar", "Jalandhar", "Patiala",
        "Bathinda", "Mohali", "Pathankot"
    ],

    "Rajasthan": [
        "Jaipur", "Jodhpur", "Udaipur", "Kota",
        "Ajmer", "Bikaner", "Alwar", "Bharatpur"
    ],

    "Sikkim": [
        "Gangtok", "Namchi", "Gyalshing", "Mangan"
    ],

    "Tamil Nadu": [
        "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli",
        "Salem", "Tiruppur", "Erode", "Vellore",
        "Thoothukudi", "Tirunelveli"
    ],

    "Telangana": [
        "Hyderabad", "Warangal", "Nizamabad", "Karimnagar",
        "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda"
    ],

    "Tripura": [
        "Agartala", "Udaipur", "Dharmanagar", "Kailasahar"
    ],

    "Uttar Pradesh": [
        "Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi",
        "Prayagraj", "Noida", "Meerut", "Bareilly",
        "Aligarh", "Moradabad", "Gorakhpur"
    ],

    "Uttarakhand": [
        "Dehradun", "Haridwar", "Rishikesh", "Haldwani",
        "Nainital", "Roorkee", "Rudrapur"
    ],

    "West Bengal": [
        "Kolkata", "Howrah", "Durgapur", "Asansol",
        "Siliguri", "Darjeeling", "Kharagpur", "Malda"
    ]
};


// ======================================================
// WALK-IN LISTINGS
// ======================================================

let walkins = [];


// ======================================================
// CURRENT SELECTED JOB
// ======================================================

let selectedJobId = null;


// ======================================================
// GET HTML ELEMENTS
// ======================================================

const stateSelect =
    document.getElementById("state");

const citySelect =
    document.getElementById("city");

const jobsContainer =
    document.getElementById("jobs");

const resultText =
    document.getElementById("result-text");


// ======================================================
// LOAD ALL STATES
// ======================================================

Object.keys(stateCities).forEach(state => {

    const option =
        document.createElement("option");

    option.value = state;

    option.textContent = state;

    stateSelect.appendChild(option);
});


// ======================================================
// LOAD JOBS FROM JAVA BACKEND
// ======================================================

async function loadJobs() {

    try {

        const response =
            await fetch("http://localhost:8080/jobs");

        if (!response.ok) {
            throw new Error("Unable to load jobs");
        }

        walkins =
            await response.json();

        console.log(
            "Jobs loaded from Java backend:",
            walkins
        );

    } catch (error) {

        console.error(
            "Error loading jobs:",
            error
        );

        resultText.textContent =
            "Unable to connect to the job server.";

        jobsContainer.innerHTML = `

            <div class="no-jobs">

                <div class="no-jobs-icon">
                    ⚠️
                </div>

                <h3>
                    Server Not Connected
                </h3>

                <p>
                    Please make sure the Java
                    backend server is running.
                </p>

            </div>

        `;
    }
}


// ======================================================
// STATE SELECTION
// ======================================================

stateSelect.addEventListener("change", function () {

    const selectedState = this.value;

    citySelect.innerHTML =
        '<option value="">Select City</option>';

    jobsContainer.innerHTML = `
        <div class="initial-message">

            <div class="message-icon">
                🏙️
            </div>

            <h3>
                Select a City
            </h3>

            <p>
                Choose a city to see available
                walk-in interviews.
            </p>

        </div>
    `;

    resultText.textContent =
        "Select a city to see available walk-ins.";

    if (!selectedState) {

        citySelect.disabled = true;

        return;
    }

    citySelect.disabled = false;

    const cities =
        stateCities[selectedState];

    cities.forEach(city => {

        const option =
            document.createElement("option");

        option.value = city;

        option.textContent = city;

        citySelect.appendChild(option);

    });

});


// ======================================================
// CITY SELECTION
// ======================================================

citySelect.addEventListener("change", async function () {

    const selectedState =
        stateSelect.value.trim();

    const selectedCity =
        this.value.trim();

    if (!selectedCity) {

        jobsContainer.innerHTML = `
            <div class="initial-message">

                <div class="message-icon">
                    🔍
                </div>

                <h3>
                    Select a City
                </h3>

                <p>
                    Select a city to see
                    available walk-ins.
                </p>

            </div>
        `;

        resultText.textContent =
            "Select a city to see available walk-ins.";

        return;
    }

    if (walkins.length === 0) {

        await loadJobs();
    }

    console.log(
        "Selected State:",
        selectedState
    );

    console.log(
        "Selected City:",
        selectedCity
    );

    console.log(
        "Jobs:",
        walkins
    );

    const filteredJobs =
        walkins.filter(function (job) {

            return (
                String(job.state).trim().toLowerCase() ===
                selectedState.toLowerCase()

                &&

                String(job.city).trim().toLowerCase() ===
                selectedCity.toLowerCase()
            );

        });

    console.log(
        "Filtered Jobs:",
        filteredJobs
    );

    displayJobs(
        filteredJobs,
        selectedCity
    );

});


// ======================================================
// DISPLAY JOBS
// ======================================================

function displayJobs(jobs, city) {

    jobsContainer.innerHTML = "";

    if (jobs.length === 0) {

        resultText.textContent =
            `No walk-ins currently available in ${city}.`;

        jobsContainer.innerHTML = `

            <div class="no-jobs">

                <div class="no-jobs-icon">
                    📭
                </div>

                <h3>
                    No Walk-ins Found
                </h3>

                <p>
                    There are currently no walk-in
                    interviews listed for ${city}.
                </p>

            </div>

        `;

        return;
    }

    resultText.textContent =
        `${jobs.length} walk-in opportunity${jobs.length > 1 ? "ies" : ""} found in ${city}.`;

    jobs.forEach(job => {

        const card =
            document.createElement("div");

        card.className =
            "job-card";

        const interviewAddress =
            job.address ||
            `${job.city}, ${job.state}`;

        const mapLink =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(
                interviewAddress + ", " +
                job.city + ", " +
                job.state
            );

        card.innerHTML = `

            <h3>
                ${job.role}
            </h3>

            <p class="company">
                🏢 ${job.company}
            </p>

            <p class="job-info">
                📍 <strong>Interview Location:</strong>
                ${interviewAddress}
            </p>

            <a
                href="${mapLink}"
                target="_blank"
                rel="noopener noreferrer"
                class="map-btn">

                🗺️ View on Maps

            </a>

            <p class="job-info">
                📅 <strong>Date:</strong>
                ${job.date || "Not specified"}
            </p>

            <p class="job-info">
                ⏰ <strong>Time:</strong>
                ${job.time || "Not specified"}
            </p>

            <p class="job-info">
                🎓 <strong>Qualification:</strong>
                ${job.qualification || "Not specified"}
            </p>

            <p class="job-info">
                💰 <strong>Salary:</strong>
                ${job.salary || "Not specified"}
            </p>

            <div class="job-actions">
                <button
                    class="details-btn"
                    onclick="viewDetails(${job.jobId})">
                    View Details
                </button>

                <button
                    class="apply-btn"
                    onclick="viewDetails(${job.jobId}); setTimeout(applyNow, 100);">
                    Apply Now
                </button>

            </div>
        `;

        jobsContainer.appendChild(card);

    });

}


// ======================================================
// VIEW JOB DETAILS
// ======================================================

function viewDetails(jobId) {

    const job =
        walkins.find(item =>
            Number(item.jobId) === Number(jobId)
        );

    if (!job) {
        return;
    }

    selectedJobId =
        job.jobId;

    document.getElementById("modalRole").textContent =
        job.role;

    document.getElementById("modalCompany").textContent =
        job.company;

    document.getElementById("modalLocation").textContent =
        `${job.city}, ${job.state}`;

    document.getElementById("modalDate").textContent =
        job.date || "Not specified";

    document.getElementById("modalTime").textContent =
        job.time || "Not specified";

    document.getElementById("modalQualification").textContent =
        job.qualification || "Not specified";

    document.getElementById("modalExperience").textContent =
        job.experience || "Not specified";

    document.getElementById("modalSalary").textContent =
        job.salary || "Not specified";

    document.getElementById("modalSkills").textContent =
        job.skills || "Not specified";


    // ==================================================
    // INTERVIEW ADDRESS + MAP
    // ==================================================

    const interviewAddress =
        job.address ||
        `${job.city}, ${job.state}`;

    const mapLink =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
            interviewAddress + ", " +
            job.city + ", " +
            job.state
        );

    document.getElementById("modalAddress").innerHTML = `

        <div>
            ${interviewAddress}
        </div>

        <div style="margin-top: 15px;">

            <iframe
                src="https://www.google.com/maps?q=${encodeURIComponent(
                    interviewAddress + ", " +
                    job.city + ", " +
                    job.state
                )}&output=embed"
                width="100%"
                height="250"
                style="
                    border: 0;
                    border-radius: 8px;
                "
                loading="lazy"
                allowfullscreen>
            </iframe>

        </div>

        <div style="margin-top: 12px;">

            <a
                href="${mapLink}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                    display: inline-block;
                    padding: 9px 14px;
                    background: #2563eb;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 14px;
                ">

                📍 Open Exact Location in Google Maps

            </a>

        </div>

    `;

    document.getElementById("modalEmail").textContent =
        job.email || "Not provided";

    document.getElementById("modalPhone").textContent =
        job.phone || "Not provided";

    document.getElementById("jobModal").style.display =
        "block";
}


// ======================================================
// CLOSE JOB DETAILS MODAL
// ======================================================

function closeModal() {

    document.getElementById("jobModal").style.display =
        "none";
}


// ======================================================
// CLOSE WHEN CLICKING OUTSIDE
// ======================================================

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("jobModal");

    if (event.target === modal) {

        closeModal();

    }

});


// ======================================================
// APPLY NOW
// ======================================================

function applyNow() {

    if (selectedJobId === null) {

        alert(
            "Please select a job first."
        );

        return;
    }

    const job =
        walkins.find(item =>
            Number(item.jobId) ===
            Number(selectedJobId)
        );

    if (!job) {

        alert(
            "Job information not found."
        );

        return;
    }

    const role =
        job.role || "Not specified";

    const company =
        job.company || "Not specified";

    const date =
        job.date || "Not specified";

    const time =
        job.time || "Not specified";

    const interviewAddress =
        job.address ||
        `${job.city}, ${job.state}`;

    const mapLink =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
            interviewAddress + ", " +
            job.city + ", " +
            job.state
        );

    document.getElementById("applicationJob").innerHTML = `

        <strong>
            ${role}
        </strong>

        <br>

        ${company}

        <div style="
            margin-top: 12px;
            font-size: 14px;
            text-align: left;
            line-height: 1.7;
        ">

            📅 <strong>Walk-in Date:</strong>
            ${date}

            <br>

            ⏰ <strong>Walk-in Time:</strong>
            ${time}

            <br>

            📍 <strong>Interview Address:</strong>
            ${interviewAddress}

            <br>

            <a
                href="${mapLink}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                    display: inline-block;
                    margin-top: 8px;
                    padding: 7px 11px;
                    background: #2563eb;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 13px;
                ">

                🗺️ Check Location on Maps

            </a>

        </div>

    `;

    document.getElementById("jobModal").style.display =
        "none";

    document.getElementById("applicationModal").style.display =
        "block";
}


// ======================================================
// CLOSE APPLICATION
// ======================================================

function closeApplication() {

    document.getElementById("applicationModal").style.display =
        "none";
}


// ======================================================
// SUBMIT APPLICATION
// ======================================================

document
    .getElementById("applicationForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "applicantName"
                ).value.trim();

            const email =
                document.getElementById(
                    "applicantEmail"
                ).value.trim();

            const phone =
                document.getElementById(
                    "applicantPhone"
                ).value.trim();

            const qualification =
                document.getElementById(
                    "applicantQualification"
                ).value;

            const experience =
                document.getElementById(
                    "applicantExperience"
                ).value;

            const resumeFile =
                document.getElementById(
                    "resume"
                ).files[0];

            const message =
                document.getElementById(
                    "applicantMessage"
                ).value.trim();


            // ==========================================
            // GET SELECTED JOB
            // ==========================================

            const job =
                walkins.find(function(item) {

                    return (
                        Number(item.jobId) ===
                        Number(selectedJobId)
                    );

                });


            if (!job) {

                console.error(
                    "Job not found:",
                    selectedJobId
                );

                alert(
                    "Job information not found."
                );

                return;
            }


            console.log(
                "Selected Job:",
                job
            );


            // ==========================================
            // APPLICATION OBJECT
            // ==========================================

            const application = {

                jobId:
                    job.jobId,

                applicantName:
                    name,

                email:
                    email,

                phone:
                    phone,

                qualification:
                    qualification,

                experience:
                    experience,

                resume:
                    resumeFile
                        ? resumeFile.name
                        : "",

                message:
                    message
            };


            console.log(
                "Sending application:",
                application
            );


            // ==========================================
            // FORM DATA
            // ==========================================

            const formData =
                new FormData();

            formData.append(
                "jobId",
                job.jobId
            );

            formData.append(
                "applicantName",
                name
            );

            formData.append(
                "email",
                email
            );

            formData.append(
                "phone",
                phone
            );

            formData.append(
                "qualification",
                qualification
            );

            formData.append(
                "experience",
                experience
            );

            formData.append(
                "message",
                message
            );


            if (resumeFile) {

                formData.append(
                    "resume",
                    resumeFile
                );

            }


            // ==========================================
            // SEND TO JAVA SERVER
            // ==========================================

            try {

                const response =
                    await fetch(
                        "http://localhost:8080/apply",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                console.log(
                    "Server response:",
                    response
                );


                const result =
                    await response.json();


                console.log(
                    "Server result:",
                    result
                );


                if (result.success) {

                    alert(
                        "Application submitted successfully!\n\n" +
                        "Thank you, " +
                        name +
                        "!"
                    );

                    this.reset();

                    closeApplication();

                } else {

                    alert(
                        result.message ||
                        "Unable to submit application."
                    );

                }


            } catch (error) {

                console.error(
                    "Application error:",
                    error
                );

                alert(
                    "Unable to connect to the server."
                );

            }

        }
    );


// ======================================================
// START
// ======================================================

loadJobs();