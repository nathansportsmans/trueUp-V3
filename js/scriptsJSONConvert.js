let allowedJobs = {
    "Oracle": [
        {
            "Title": [
                "A/P Associate",
                "Accounts Payable Lead",
                "A/P Assist Manager",
                "Admin Assistant S",
                "ATF Compliance Auditor",
                "Compliance Systems Mgr",
                "Controller",
                "Retail Systems Manager",
                "Manager FP&A",
                "Store Manager",
                "Office Manager S",
                "PIM Admin",
                "Tax Manager",
                "Category Mgr Fishing",
                "Category Mgr Footwear",
                "IT Compliance Program Mgr",
                "Demand Planning Mgr",
                "Sr Oracle Dvplr",
                "Sr Demand Planning Mgr",
                "Category Mgr Camp/Gift",
                "Help Desk Technician",
                "Tier 1 IT Support Spec",
                "IT Support Manager",
                "Chief HR Officer",
                "HR Manager",
                "HR Clerk H",
                "HR Generalist",
                "Merchant",
                "ECommerce Merchant",
                "Payroll Lead",
                "Payroll Manager",
                "Payroll Specialist",
                "PIM Administrator",
                "PIM Supervisor",
                "Pricing/Promotion Analyst",
                "Problem Resolution Asso",
                "Replenishment Analyst",
                "Senior Accountant ",
                "Sr Corp Investigator",
                "Sr. Solution Architect",
                "Staff Accountant H",
                "Tax & Treasury Analyst",
                "Used Gun Manager ",
                "Vendor Mgmt Analyst"
            ]
            
        }
    ]
}

function firstRun() {
    document.write(`
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 center">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active btn-success" href="./html/trueUp.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active btn-success" href="./index.html">JSON Converter</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active btn-success" href="./html/help.html">HELP</a>
                    </li>
                </ul>
                <image src="./css/sportsmans-logo.png"></image>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h1 class="text-center">.CSV to JSON converter</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
            <form id="myForm">
                <input type="file" id="csvFile" accept=".csv" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">    
                <input class="btn btn-lg btn-success" id="submit" type="submit" value="Submit" />    
            </div>
            </form>
             
        </div>
    </div>
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/scripts.js"></script>
    `);
    function csvToArray(str, delimiter = ",") {
        
        //clean up a little
        str = str.replaceAll(`"`,``);
        str = str.replaceAll(`;`,`,`);
        
        //Make sure there are no spaces in the header names
        let headerStr = str.split(" ").join("");
        
        // slice from start of text to the first \n index
        // use split to create an array from string by delimiter
        let headersTMP = headerStr.slice(0, str.indexOf("\n"));
        const headers = headersTMP.substring(0, headersTMP.length - 3).split(delimiter);

        // slice from \n index + 1 to the end of the text
        // use split to create an array of each csv value row
        let rows = str.slice(str.indexOf("\n") + 1).split("\n");

        // Map the rows
        // split values from each row into an array
        // use headers.reduce to create an object
        // object properties derived from headers:values
        // the object passed as an element of the array
        const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
        });

        // return the array
        return arr;
    }

    myForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = csvFile.files[0];
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const text = e.target.result;
          const data = csvToArray(text);
          //document.write(JSON.stringify(data));
          let json = JSON.stringify(data);
          
          //download the file to downloads folder
          let link = document.createElement('a');
          link.download = 'json.txt';
          let blob = new Blob([json], {type: "application/json"});
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        };
        reader.readAsText(input);
        
    });
}
firstRun();



