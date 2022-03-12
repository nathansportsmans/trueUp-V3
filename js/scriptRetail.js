let storesArr = [`Site Number &#9660`,'All',1,102,103,104,105,106,108,114,117,118,119,120,121,123,126,132,137,138,139,145,148,149,152,155,158,159,163,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,193,194,195,196,197,198,199,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,263,264,400,500,601,602,603,604,605,606,607,608,609,610,611,612];
let testArr = [1,2]

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


function populateDrop(arr) {
    function createOption(val, i) {
        let option = document.createElement('div');
        option.className = "option";
        option.id = `${i}`
        option.innerHTML = `${val}`;
        return option;
    }
    let drop = document.getElementById('dropdown-content');
    for (let i = 0; i < arr.length; i++) {
        drop.appendChild(createOption(arr[i], i));
    }
}
populateDrop(storesArr);


$('.option').click(function () {
    let index = $('.option').index($(this));
    let option = document.getElementById(`${index}`);
    let button = document.getElementById("dropbtn");
    button.innerHTML = option.innerHTML;
});

//Exports list as a csv that the user can open up in excel
function obj1ToCSV(obj) {
    let names = "";

    //Take care of headers
    names = names.concat("UserName,Name,SiteNumber\n");

    //Take care of rows
    for (let i = 0; i < obj["Employees"].Name.length; i++) {
        names = names.concat(obj["Employees"].UserName[i] + "," + obj["Employees"].Name[i] + "," + obj["Employees"].SiteNumber[i] + `\n`);
    }
    return names;
}
function obj2ToCSV(obj) {
    let names = "";

    //Take care of headers
    names = names.concat("UserName,Name,SiteNumber,UltiPro ID to Add\n");

    //Take care of rows
    for (let i = 0; i < obj["notHaveUltipro"].Name.length; i++) {
        names = names.concat(obj["notHaveUltipro"].UserName[i] + "," + obj["notHaveUltipro"].Name[i] + "," + obj["notHaveUltipro"].SiteNumber[i] + "," + obj["notHaveUltipro"].CorrectID[i] +`\n`);
    }
    return names;
}


//Lists the people who shouldn't have accounts in a table. 
function createTable(userArr, nameArr, siteArr) {
    function createTableCell(str) {
        let cell = document.createElement('td');
        cell.innerHTML = str;
        return cell;
    }
    let title = document.getElementById('titleOfTable');
    title.innerHTML = `<h3>Employees that shouldn't have an active Account:</h3>`;
    let table = document.getElementById('table1');
    let leftTitle = createTableCell("Username");
    let midTitle = createTableCell("Name");
    let rightTitle = createTableCell("Site #");
    let tHead = document.createElement('THEAD');
    let firstRow = document.createElement('TR');
    tHead.appendChild(firstRow);
    firstRow.appendChild(leftTitle);
    firstRow.appendChild(midTitle);
    firstRow.appendChild(rightTitle);
    firstRow.style.fontWeight = 'bold';
    firstRow.style.fontSize = "xx-large";
    table.appendChild(firstRow);
    let tBody = document.createElement('TBODY');
    for (let i = 0; i < userArr.length; i++) {
        let row = document.createElement('TR');
        row.appendChild(createTableCell(nameArr[i]));
        row.appendChild(createTableCell(userArr[i]));
        row.appendChild(createTableCell(siteArr[i]));
        tBody.appendChild(row);
    }    
    table.appendChild(tBody);
}

//lists the people who do not have ultipro ID's in a table
function createTable2(userArr, nameArr, siteArr, IDArr) {
    function createTableCell(str) {
        let cell = document.createElement('td');
        cell.innerHTML = str;
        return cell;
    }
    let title = document.getElementById('titleOfUltiTable');
    title.innerHTML = `<h3>Employees that don't have an ultipro ID:</h3>`;
    let table = document.getElementById('table2');
    let leftTitle = createTableCell("Username");
    let midTitle = createTableCell("Name");
    let rightTitle = createTableCell("Site #");
    let right2Title = createTableCell("ID to Add");
    let tHead = document.createElement('THEAD');
    let firstRow = document.createElement('TR');
    tHead.appendChild(firstRow);
    firstRow.appendChild(leftTitle);
    firstRow.appendChild(midTitle);
    firstRow.appendChild(rightTitle);
    firstRow.appendChild(right2Title);
    firstRow.style.fontWeight = 'bold';
    firstRow.style.fontSize = "xx-large";
    table.appendChild(firstRow);
    let tBody = document.createElement('TBODY');
    for (let i = 0; i < userArr.length; i++) {
        let row = document.createElement('TR');
        row.appendChild(createTableCell(nameArr[i]));
        row.appendChild(createTableCell(userArr[i]));
        row.appendChild(createTableCell(siteArr[i]));
        row.appendChild(createTableCell(IDArr[i]));
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


    //console.log(obj2);

    //standardize the case on the last names (redundant)
    // for (let c = 0; c < obj2.length; c++) {
    //     obj2[c].LastName = standardName(obj2[c].LastName);
    // }

    let badPeople = {"Employees":{"Name":[],"UserName":[],"SiteNumber":[]},"notHaveUltipro":{"Name":[],"UserName":[],"CorrectID":[],"SiteNumber":[]}}; 
    //let nonEmployee = [];
    for (let i = 0; i < obj2.length; i++) {
        //Look at first and Last name in oracle list (obj2)
        let tmpFirst = standardName(obj2[i].FIRST_NAME);
        let tmpLast = standardName(obj2[i].LAST_NAME);
        let tmpUser = obj2[i].USER_NAME;
        let tmpStore = obj2[i].PRIMARY_SITE_NO;
        let buttonVal = document.getElementById("dropbtn").innerHTML;
        let alreadyDone = false;

        //Only look at people in that store
        if (tmpStore == buttonVal || (buttonVal == "All" || buttonVal == "Site Number &#9660")) {

            for (let x = 0; x < badPeople["Employees"].length; x++){
                if (!alreadyDone) {
                    if (tmpFirst != badPeople["Employees"][x].FirstName && tmpLast != badPeople["Employees"][x]) {
                        alreadyDone = false;
                    }
                    else {
                        alreadyDone = true;
                    }
                }
            }
            if (tmpFirst == "") {
                if (!alreadyDone) {
                    // Find that Last Name in the employee List
                    let isEmployed = false;
                    for (let a = 0; a < obj1.length; a++) {
                        if (!isEmployed) {
                            if (standardName(obj1[a].LastName) == tmpLast) {
                                isEmployed = true;
                                if (obj2[i].UltiProID == "\r" && obj1[a].LastName != "") {
                                    badPeople["notHaveUltipro"].Name.push(tmpFirst + " " + tmpLast);
                                    badPeople["notHaveUltipro"].UserName.push(tmpUser);
                                    badPeople["notHaveUltipro"].CorrectID.push(obj1[a].EmployeeNumber);
                                    badPeople["notHaveUltipro"].SiteNumber.push(tmpStore);
                                }
                                // else if(obj2[i].UltiProID == "\r" && obj1[a].LastName == "") {
                                //     badPeople["notHaveUltipro"].Name.push(tmpFirst + " " + tmpLast);
                                //     badPeople["notHaveUltipro"].UserName.push(tmpUser);
                                // }
                            } 
                        }
                    }
                    badPeople["Employees"].Name.push(tmpFirst + " " + tmpLast);
                    badPeople["Employees"].UserName.push(tmpUser);
                    badPeople["Employees"].SiteNumber.push(tmpStore);
                }
            }
            
            else if (tmpFirst != "") {
                if (!alreadyDone) {
                    // Find that Last Name in the employee List
                    let isEmployed = false;
                    for (let b = 0; b < obj1.length; b++) {
                        if (!isEmployed) {
                            if (standardName(obj1[b].LastName) == tmpLast && standardName(obj1[b].FirstName) == tmpFirst) {
                                isEmployed = true;
                                if (obj2[i].UltiProID == "\r" && obj1[b].LastName != "" && obj1[b].FirstName != "") {
                                    badPeople["notHaveUltipro"].Name.push(tmpFirst + " " + tmpLast);
                                    badPeople["notHaveUltipro"].UserName.push(tmpUser);
                                    badPeople["notHaveUltipro"].CorrectID.push(obj1[b].EmployeeNumber);
                                    badPeople["notHaveUltipro"].SiteNumber.push(tmpStore);
                                }
                                // else if(obj2[i].UltiProID == "\r" && obj1[b].LastName == "" && obj1[b].FirstName == "") {
                                //     badPeople["notHaveUltipro"].Name.push(tmpFirst + " " + tmpLast);
                                //     badPeople["notHaveUltipro"].UserName.push(tmpUser);
                                // }
                            }
                        }
                    }
                    if (!isEmployed && tmpFirst != "Service") {
                        badPeople["Employees"].Name.push(tmpFirst + " " + tmpLast);
                        badPeople["Employees"].UserName.push(tmpUser);
                        badPeople["Employees"].SiteNumber.push(tmpStore);
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
    //show the tables
    document.getElementById('lists').style.display = 'flex';
    document.getElementById('button').style.display = 'block';
    document.getElementById('button2').style.display = 'block';
    //delete any existing info in them
    let title = document.getElementById('titleOfTable');
    let table = document.getElementById('table1');
    title.innerHTML = "";
    table.innerHTML = "";
    let title2 = document.getElementById('titleOfUltiTable');
    let table2 = document.getElementById('table2');
    title2.innerHTML = "";
    table2.innerHTML = "";

    //exucute true up
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
//     listString(employeeObject["Employees"]);
//     listString2(employeeObject["notHaveUltipro"]);
    createTable(employeeObject["Employees"].Name,  employeeObject["Employees"].UserName, employeeObject["Employees"].SiteNumber);
    createTable2(employeeObject["notHaveUltipro"].Name, employeeObject["notHaveUltipro"].UserName, employeeObject["notHaveUltipro"].SiteNumber, employeeObject["notHaveUltipro"].CorrectID);
});
document.getElementById('button').addEventListener("click", function(obj) {
    let names = obj1ToCSV(employeeObject)
    let link = document.createElement('a');
    link.download = 'badAccounts_Retail.csv';
    let blob = new Blob([[names]], {type: "application/json"});
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
});
document.getElementById('button2').addEventListener("click", function(obj) {
    let names2 = obj2ToCSV(employeeObject)
    let link2 = document.createElement('a');
    link2.download = 'UltiproID_Retail.csv';
    let blob2 = new Blob([[names2]], {type: "application/json"});
    link2.href = URL.createObjectURL(blob2);
    link2.click();
    URL.revokeObjectURL(link.href);
});


