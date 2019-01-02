var companyName;
var executiveName;
var address;
var cityState;
var zip;
var phone;
var theTable;
var rowLength;
var theCells;
var cellLength;
var webappUrl;
var output;

document.body.style = "background: #f00";
webappUrl = "https://script.google.com/macros/s/AKfycbz8gWmXVQjcCeo2IJFEDnN-MlYcxHgPnVYZF-TpIo7qSA5_-x8T/exec";
theTable = document.getElementsByTagName("table")[0];


rowLength = theTable.rows.length;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrape_table() {
    for (let i = 2; i < rowLength; i++) {
        let tempCompanyName = theTable.rows[i].cells[1].innerText;
        companyName = "&co=" + tempCompanyName.replace(/&/g, "and");
        executiveName = "&ceo=" + theTable.rows[i].cells[2].innerText;
        let tempAddress = theTable.rows[i].cells[3].innerText;
        address = "&addr=" + tempAddress.replace(/#/g, "number "); 
        cityState = "&cs=" + theTable.rows[i].cells[4].innerText;
        zip = "&zip=" + theTable.rows[i].cells[5].innerText;
        phone = "&phone=" + theTable.rows[i].cells[6].innerText;
        output = webappUrl+"?"+companyName+executiveName+address+cityState+zip+phone;
        await sleep(1000);

    try {
        chrome.runtime.sendMessage({ message: output });
        } catch(err) {
        console.log(err);
        }
    }
}

scrape_table();







setTimeout(function(){document.body.style = "background: #fff";}, 500);
