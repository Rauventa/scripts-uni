let DATA = [
  { id: 12, name: "Патентный отдел", parent_id: 2 },
  { id: 13, name: "Лётная служба", parent_id: 2 },
  { id: 18, name: "1-ая авиационная эксадрилия Боинг 737", parent_id: 14 },
  { id: 19, name: "2-ая авиационная эскадрилия Боинг 737", parent_id: 14 },
  { id: 21, name: "Лётно-методический отдел", parent_id: 13 },
  { id: 7, name: "Караульная служба", parent_id: 6 },
  { id: 2, name: "Организация", parent_id: null },
  { id: 14, name: "Лётный отряд Боинг 737", parent_id: 13 },
  { id: 17, name: "Лётный отряд Боинг 747", parent_id: 13 },
  { id: 3, name: "Бухгалтерия", parent_id: 2 },
  { id: 6, name: "Отдел охраны", parent_id: 2 },
  { id: 8, name: "Бюро пропусков", parent_id: 6 }
];

function renderList(list) {
  let $root = document.getElementById("root");
  list.forEach((item, idx) => {
    if (item.parent_id) {
      let $parent = document.getElementById(item.parent_id);
      if ($parent) {
        if (list.find(el => el.parent_id === item.id)) {
          $parent.insertAdjacentHTML("afterbegin", `<li>${item.name}<ul id="${item.id}"></ul></li>`);
        } else {
          $parent.insertAdjacentHTML("afterbegin", `<li>${item.name}</li>`);
        }
      } else {
        list.push(item);
        list.splice(idx, 1);
        renderList(list);
      }
    } else {
      $root.insertAdjacentHTML("afterbegin", `<li class="root">${item.name}<ul id="${item.id}"></ul></li>`);
    }
    list.splice(idx, 1);
  });
}

window.onload = function() {
  renderList(DATA);
};