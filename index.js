document.getElementById("inputfile").addEventListener("change", function () {
  var fr = new FileReader();

  fr.onload = function () {
    document.getElementById("output").textContent = "";
    let res = fr.result;
    let timesheet = res.split(/\r\n|\n/);
    for (let entry of timesheet) {
      if (!entry) return;
      buildOutput(entry);
    }
  };

  fr.readAsText(this.files[0]);
});

function buildOutput(entry) {
  employee = getPay(entry);
  if (!!employee) {
    line = document.createElement("p");
    txt = document.createTextNode(
      "The amount to pay " +
        employee[0] +
        " is " +
        employee[1].toString() +
        " USD \n"
    );
    line.append(txt);
    document.getElementById("output").append(line);
  } else {
    line = document.createElement("p");
    txt = document.createTextNode("Format error");
    line.append(txt);
    document.getElementById("output").append(line);
  }
}

function getPay(line) {
  const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR"];
  const WEEKEND = ["SA", "SU"];
  // get employee name
  try {
    let fs = line.split("=");
    let employeeName = fs[0];

    if (employeeName.search(/([A-Z])+/g) == -1) {
      return 0;
    }
    // get days worked
    let days = fs[1].split(",");
    let pay = 0;

    for (let element of days) {
      if (element !== "") {
        let day = element.charAt(0) + element.charAt(1);
        let times = element.replace(day, "").split("-");
        let t1 = times[0].split(":")[0];
        let t2 = times[1].split(":")[0];

        if (t2 == 0) {
          t2 = 24;
        }

        if (t2 <= t1) {
          return 0;
        }

        if (WEEKDAYS.includes(day)) {
          for (let i = t1; i < t2; i++) {
            if (i >= 0 && i < 9) {
              pay += 25;
            } else if (i >= 9 && i < 18) {
              pay += 15;
            } else if (i >= 18 && i < 24) {
              pay += 20;
            }
          }
        } else if (WEEKEND.includes(day)) {
          for (let i = t1; i < t2; i++) {
            if (i >= 0 && i < 9) {
              pay += 30;
            } else if (i >= 9 && i < 18) {
              pay += 20;
            } else if (i >= 18 && i < 24) {
              pay += 25;
            }
          }
        } else {
          return 0;
        }
      }
    }

    return [employeeName, pay];
  } catch (error) {
    return 0;
  }
}
