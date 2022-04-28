document.getElementById("inputfile").addEventListener("change", function () {
  var fr = new FileReader();

  fr.onload = function () {
    document.getElementById("output").textContent = "";
    let res = fr.result;
    let lines = res.split(/\r\n|\n/);
    for (let line of lines) {
      if (line !== "") {
        a = getPay(line);
        if (a !== 0) {
          tag = document.createElement("p");
          txt = document.createTextNode(
            "The amount to pay " + a[0] + " is " + a[1].toString() + " USD \n"
          );
          tag.append(txt);
          document.getElementById("output").append(tag);
        } else {
          tag = document.createElement("p");
          txt = document.createTextNode("Format error");
          tag.append(txt);
          document.getElementById("output").append(tag);
          break;
        }
      }
    }
  };

  fr.readAsText(this.files[0]);
});

// how to set up the calculation rules?

function getPay(line) {
  let weekdays = ["MO", "TU", "WE", "TH", "FR"];
  // get employee name
  try {
    let fs = line.split("=");
    let employeeName = fs[0];
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

        if (weekdays.includes(day)) {
          for (let i = t1; i < t2; i++) {
            if (i >= 0 && i < 9) {
              pay += 25;
            } else if (i >= 9 && i < 18) {
              pay += 15;
            } else if (i >= 18 && i < 24) {
              pay += 20;
            }
          }
        } else {
          for (let i = t1; i < t2; i++) {
            if (i >= 0 && i < 9) {
              pay += 30;
            } else if (i >= 9 && i < 18) {
              pay += 20;
            } else if (i >= 18 && i < 24) {
              pay += 25;
            }
          }
        }
      }
    }

    return [employeeName, pay];
  } catch (error) {
    return 0;
  }
}
