document.getElementById("inputfile").addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    //  document.getElementById("output").textContent = fr.result;
    let res = fr.result;
    let lines = res.split(/\r\n|\n/);
    lines.forEach((element) => {
      if (element !== "") {
        a = getPay(element);
        console.log(a);
      }
    });
  };

  fr.readAsText(this.files[0]);
});

function getPay(line) {
  // get employee name
  fs = line.split("=");
  employeeName = fs[0];
  days = fs[1].split(",");
  console.log(days);
  pay = 0;
  return [employeeName, pay];
}
