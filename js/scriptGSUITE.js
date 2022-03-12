//Exports list as a csv that the user can open up in excel
function obj1ToCSV(obj) {
    let names = "";

    //Take care of headers
    names = names.concat("Email Address,Name\n");

    //Take care of rows
    for (let i = 0; i < obj["Employees"].Name.length; i++) {
        names = names.concat(obj["Employees"].UserName[i] + "," + obj["Employees"].Name[i] + `\n`);
    }
    return names;
}
//For those who are employed but who have never logged in. 
function obj2ToCSV(obj) {
    let names = "";

    //Take care of headers
    names = names.concat("UserName,Name\n");

    //Take care of rows
    for (let i = 0; i < obj["notLoggedIn"].Name.length; i++) {
        names = names.concat(obj["notLoggedIn"].UserName[i] + "," + obj["notLoggedIn"].Name[i] + `\n`);
    }
    return names;
}

//Lists the people who shouldn't have accounts in a table. 
function createTable(userArr, nameArr) {
    function createTableCell(str) {
        let cell = document.createElement('td');
        cell.innerHTML = str;
        return cell;
    }
    let title = document.getElementById('titleOfTable');
    title.innerHTML = `<h3>Employees that shouldn't have an active Account:</h3>`;
    let table = document.getElementById('table1');
    let leftTitle = createTableCell("UserName");
    let rightTitle = createTableCell("Name");
    let tHead = document.createElement('THEAD');
    let firstRow = document.createElement('TR');
    tHead.appendChild(firstRow);
    firstRow.appendChild(leftTitle);
    firstRow.appendChild(rightTitle);
    firstRow.style.fontWeight = 'bold';
    firstRow.style.fontSize = "xx-large";
    table.appendChild(firstRow);
    let tBody = document.createElement('TBODY');
    for (let i = 0; i < userArr.length; i++) {
        let row = document.createElement('TR');
        row.appendChild(createTableCell(userArr[i]));
        row.appendChild(createTableCell(nameArr[i]));
        tBody.appendChild(row);
    }    
    table.appendChild(tBody);
}

//lists the people who have never logged in but are employed here
function createTable2(userArr, nameArr) {
    function createTableCell(str) {
        let cell = document.createElement('td');
        cell.innerHTML = str;
        return cell;
    }
    let title = document.getElementById('titleOfUltiTable');
    title.innerHTML = `<h3>Employees that have never logged in:</h3>`;
    let table = document.getElementById('table2');
    let leftTitle = createTableCell("Username");
    let midTitle = createTableCell("Name");
    let tHead = document.createElement('THEAD');
    let firstRow = document.createElement('TR');
    tHead.appendChild(firstRow);
    firstRow.appendChild(leftTitle);
    firstRow.appendChild(midTitle);
    firstRow.style.fontWeight = 'bold';
    firstRow.style.fontSize = "xx-large";
    table.appendChild(firstRow);
    let tBody = document.createElement('TBODY');
    for (let i = 0; i < userArr.length; i++) {
        let row = document.createElement('TR');
        row.appendChild(createTableCell(nameArr[i]));
        row.appendChild(createTableCell(userArr[i]));
        tBody.appendChild(row);
    }    
    table.appendChild(tBody);
}

//This will standardize the case of each name. 
function standardName(str) {
    if ((typeof str) == 'string') {
        str = str.replaceAll(" ","");
        str = str.toLowerCase();
        str = str.split();
        str = str[0].charAt(0).toUpperCase() + str[0].slice(1);
        return str;
    }
    else if ((typeof str == 'object')) {
        str = str.toString();
        str = str.toLowerCase();
        str = str.split();
        str = str[0].charAt(0).toUpperCase() + str[0].slice(1);
        return str;
    }
}

//This Function lists an array in HTML
function listString(arr) {
    if (arr.length != 0) {
        let title = document.getElementById('titleOfList');
        title.innerHTML = `<h3>Employees that shouldn't have an active Account:</h3>`;
        function createLI(listItem) {
            let li = document.createElement(`LI`);    
            li.innerHTML = listItem;
            return li;
        }
        let theList = document.getElementById('list');
        for (let i = 0; i < arr.length; i++) {
            theList.appendChild(createLI(arr[i]));
        }
        let explanation = document.getElementById('explanation');
        explanation.innerHTML = `These people may not have first names. This is because they are not listed in the Account Active Employee List with First Names. <br>
                                All of these accounts ought to be de-activated since they are no longer employed here. <br>
                                (Their name could also just not be spelled correctly in the Account List. If this is the case please fix the spelling.)`;
    }
    else {
        let div = getElementByID('titleOfList');
        div.innerHTML = `<h1>Current Account List is Accurate!</h1>`;
    }
}

//replaceAt() method
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
}

//Removing double appostrophes
function removeAppos(str) {
    for (let i = 0; i < str.length; i++) {
        if ((str.charAt(i) == `"` && str.charAt(i+1) == `"`) && (str.charAt(i+2) != `:` && str.charAt(i+2) != `,` && str.charAt(i+2) != `}`)) {
            str = str.replaceAt(i, "");    
        }
    }
    return str;
}



//comparing function
function compare(json1, json2) {
    //make sure strings are in correct format
    json1 = json1.replaceAll(`\r`, "");
    json1 = json1.replaceAll(`\n`, "");
    json1 = json1.replaceAll(`,"":""`, "");
    json1 = json1.replaceAll(`,"AA":""`, "");
    json1 = removeAppos(json1);

    json2 = json2.replaceAll(`\r`, "");
    json2 = json2.replaceAll(`\n`, "");
    json2 = json2.replaceAll(`,"":""`, "");
    json2 = json2.replaceAll(`,"AA":""`, "");
    json2 = removeAppos(json2);
    
    let array1 = new String(json1);
    let array2 = new String(json2);

    let obj1 = JSON.parse(array1);
    let obj2 = JSON.parse(array2);

    //standardize the case on the last names (redundant)
    // for (let c = 0; c < obj2.length; c++) {
    //     obj2[c].LastName = standardName(obj2[c].LastName);
    // }

    let badPeople = {"Employees":{"Name":[],"UserName":[]},"notLoggedIn":{"Name":[],"UserName":[]}};
    //let nonEmployee = [];
    for (let i = 0; i < obj2.length; i++) {
        //Look at first and Last name in account list (obj2)
        let tmpFirst = standardName(obj2[i].FirstName);
        let tmpLast = standardName(obj2[i].LastName);
        let tmpUser = obj2[i].EmailAddress;
        let tmpSignIn = obj2[i].LastSignIn;
        let alreadyDone = false;
        
        //Check to see if this employee is active or suspended
        if (obj2[i].Status == "Active") {
            if (tmpFirst == "" && !alreadyDone) {
                badPeople["Employees"].Name.push(tmpFirst + " " + tmpLast);
                badPeople["Employees"].UserName.push(tmpUser);
                if (tmpSignIn == "Never logged in") {
                    badPeople["notLoggedIn"].Name.push(tmpFirst + " " + tmpLast);
                    badPeople["notLoggedIn"].UserName.push(tmpUser);
                }
                alreadyDone = true;

            }


            else {
                if (!alreadyDone) {
                    // Find that Last Name in the employee List
                    let isEmployed = false;
                    for (let b = 0; b < obj1.length; b++) {
                        if (!isEmployed) {
                            if (standardName(obj1[b].LastName) == tmpLast && standardName(obj1[b].FirstName) == tmpFirst) {
                                isEmployed = true;
                                if (tmpSignIn == "Never logged in") {
                                    badPeople["notLoggedIn"].Name.push(tmpFirst + " " + tmpLast);
                                    badPeople["notLoggedIn"].UserName.push(tmpUser);
                                }
                            }
                        }
                    }
                    if (!isEmployed) {
                        badPeople["Employees"].Name.push(tmpFirst + " " + tmpLast);
                        badPeople["Employees"].UserName.push(tmpUser);
                    }
                    
                    
                }
            } 
        }       
    }
    return badPeople; 
}

let string1 = "";
let string2 = "";
let employeeObject = {};
myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById('lists').style.display = 'flex';
    document.getElementById('button').style.display = 'block';
    document.getElementById('button2').style.display = 'block';
    const json1 = document.getElementById("JSONFile1");
    const json2 = document.getElementById("JSONFile2");
    const input1 = json1.files[0];
    const input2 = json2.files[0];
    const reader1 = new FileReader();
    const reader2 = new FileReader();
    reader1.onload = function (e) {
        string1 = e.target.result;
        // obj1 = JSON.stringify(obj1);
        //console.log(obj1);
        
    };
    reader1.readAsText(input1);
    
    reader2.onload = function (e) {
        string2 = e.target.result;
        //console.log(obj2);
    };
    reader2.readAsText(input2);
    employeeObject = compare(string1, string2);
    createTable(employeeObject["Employees"].UserName, employeeObject["Employees"].Name);
    createTable2(employeeObject["notLoggedIn"].UserName, employeeObject["notLoggedIn"].Name);
});

document.getElementById('button').addEventListener("click", function(obj) {
    let names = obj1ToCSV(employeeObject)
    let link = document.createElement('a');
    link.download = 'badAccounts_GSUITE.csv';
    let blob = new Blob([[names]], {type: "application/json"});
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
});

document.getElementById('button2').addEventListener("click", function(obj) {
    let names2 = obj2ToCSV(employeeObject)
    let link2 = document.createElement('a');
    link2.download = 'neverLoggedIn_GSUITE.csv';
    let blob2 = new Blob([[names2]], {type: "application/json"});
    link2.href = URL.createObjectURL(blob2);
    link2.click();
    URL.revokeObjectURL(link.href);
});