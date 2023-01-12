(function () {
  "use strict";

  const itemsForFirst = [
    "0",
    "1",
    "2",
    "3",
    "4",
  ];


  const items = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
  document.querySelector(".info").textContent = items.join(" ");

  const doors = document.querySelectorAll(".door");
  document.querySelector("#spinner").addEventListener("click", spin);
  document.querySelector("#reseter").addEventListener("click", init);

  async function spin() {
    init(false, 1, 2);
    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = "translateY(0)";
      await new Promise((resolve) => setTimeout(resolve, duration * 1000));
    }
  }

  function init(firstInit = true, groups = 1, duration = 1) {
    const employees = []
    document.getElementById("namebox").textContent = "NINJA NÀO SẼ LÀ NGƯỜI MAY MẮN?";

    let e_no = employees.length;
    let emp= employees[Math.floor(Math.random() * e_no)];
    // console.log(emp);
    
    for (let d_no = 0; d_no <= doors.length - 1; d_no++) {
      const door = doors[d_no];
      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      
      const pool = ["🗡"];
      if (!firstInit) {
        const arr = [];
        if (d_no ===0) {
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...itemsForFirst);
          }
        } else {
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...items);
          }
        }
        pool.push(...shuffle(arr));


        boxesClone.addEventListener(
          "transitionstart",
          function () {
            door.dataset.spinned = "1";
            this.querySelectorAll(".box").forEach((box) => {
              box.style.filter = "blur(1px)";
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          "transitionend",
          async function () {
            this.querySelectorAll(".box").forEach((box, index) => {
              box.style.filter = "blur(0)";
              box.textContent = emp.arr[d_no];
              if (index > 0) this.removeChild(box);
            });
            await new Promise((resolve) => setTimeout(resolve, duration * 5000));
            document.getElementById("namebox").textContent = emp.name;
          },
          { once: true }
        );
      }

      console.log('pool', pool)
      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = door.clientWidth + "px";
        box.style.height = door.clientHeight + "px";
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }


      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${
        door.clientHeight * (pool.length - 1)
      }px)`;
      door.replaceChild(boxesClone, boxes);
      console.log('bõ clone', boxesClone);
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();
