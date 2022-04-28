document.getElementById("inputfile").addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    //  document.getElementById("output").textContent = fr.result;
    let res = fr.result;
    let lines = res.split(/\r\n|\n/);
    lines.forEach((element) => {
      if (element !== "") {
        a = getPay(element);
        tag = document.createElement("p");
        txt = document.createTextNode(
          "The amount to pay " + a[0] + " is " + a[1].toString() + "\n"
        );
        tag.append(txt);
        document.getElementById("output").append(tag);
      }
    });
  };

  fr.readAsText(this.files[0]);
});

// how to set up the calculation rules?

function getPay(line) {
  weekdays = ["MO", "TU", "WE", "TH", "FR"];
  // get employee name
  fs = line.split("=");
  employeeName = fs[0];
  // get days worked
  days = fs[1].split(",");
  pay = 0;

  days.forEach((element) => {
    if (element !== "") {
      day = element.charAt(0) + element.charAt(1);
      times = element.replace(day, "").split("-");
      t1 = times[0].split(":")[0];
      m1 = times[0].split(":")[1];
      t2 = times[1].split(":")[0];
      m2 = times[1].split(":")[1];

      if (t2 == 0) {
        t2 = 24;
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
  });

  return [employeeName, pay];
}
