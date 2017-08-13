var Model = function() {
  this._selectedCat = null;
  this._cats = [
    {
      name: "Faísca",
      img: "img/faisca.jpg",
      clickCount: 0
    },
    {
      name: "Galileu",
      img: "img/galileu.jpg",
      clickCount: 0
    },
    {
      name: "Hunter",
      img: "img/hunter.jpg",
      clickCount: 0
    },
    {
      name: "Maggie",
      img: "img/maggie.jpg",
      clickCount: 0
    },
    {
      name: "Pancho e Missy",
      img: "img/pancho-missy.jpg",
      clickCount: 0
    }
  ];
};

Model.prototype.getAllCats = function() {
  return this._cats;
};

Model.prototype.getCat = function(index) {
  return this._cats[index];
};

Model.prototype.setSelectedCat = function(index) {
  this._selectedCat = this._cats[index];
};

Model.prototype.getSelectedCat = function() {
  return this._selectedCat;
};

Model.prototype.incrementSelectedCatClick = function() {
  this._selectedCat.clickCount++;
}

Model.prototype.updateSelectedCat = function(cat) {
  this._selectedCat.name = cat.name;
  this._selectedCat.img = cat.img;
  this._selectedCat.clickCount = cat.clickCount;
}


var View = function() {
};

View.prototype.init = function() {};
View.prototype.render = function() {};

var CatListView = function(catsList) {
  this._catsList = catsList;
};

CatListView.prototype = Object.create(View.prototype);

CatListView.prototype.constructor = CatListView;

CatListView.prototype.init = function() {
  this.catListElem = document.getElementsByClassName("cat-list")[0];
  this.render();
};

CatListView.prototype.render = function() {
  this.catListElem.innerHTML = '';
  
  this._catsList.forEach(function(cat, index) {
    var elem = document.createElement("li");
    elem.textContent = cat.name;
    
    elem.addEventListener("click", (function (indexCopy){
      return function () {
        octopus.setSelectedCat(indexCopy);
        octopus.renderCatView();
      }
    })(index));
    
    this.catListElem.appendChild(elem);
  }, this);
};

var CatView = function() {
};

CatView.prototype = Object.create(View.prototype);

CatView.prototype.constructor = CatView;

CatView.prototype.init = function () {
  this.catNameElem = document.getElementsByClassName("cat-name")[0];
  this.catImgElem = document.getElementsByClassName("cat-img")[0];
  this.catClickCountElem = document.getElementsByClassName("cat-click-count")[0];
  
  this.catImgElem.addEventListener("click", function() {
    octopus.incrementCurrentCatClick();
  });
  
  this.render();
};

CatView.prototype.render = function() {
  var cat = octopus.getSelectedCat();
  this.catNameElem.textContent = cat.name;
  this.catImgElem.src = cat.img;
  this.catClickCountElem.textContent = cat.clickCount;
};

var CatAdminView = function() {

}

CatAdminView.prototype = Object.create(View.prototype);

CatAdminView.prototype.constructor = CatAdminView;

CatAdminView.prototype.init = function() {
  var self = this;
  this.adminButtonElem = document.getElementsByClassName("admin-show")[0];
  
  this.adinFormElem = document.getElementsByClassName("cat-form")[0];
  this.formInputNameElem = document.getElementById("input-name");
  this.formInputImgElem = document.getElementById("input-img");
  this.formInputClickCountElem = document.getElementById("input-click-count");
  this.formCancelButtonElem = document.getElementsByClassName("form-cancel")[0];
  this.formSaveButtonElem = document.getElementsByClassName("form-save")[0];
  
  this.adminButtonElem.addEventListener("click", function() {
    self.fillForm();
    self.adinFormElem.style.display = "block";
  });

  this.formCancelButtonElem.addEventListener("click", function() {
    self.adinFormElem.style.display = "none";
  });

  this.formSaveButtonElem.addEventListener("click", function() {
    self.submitForm();
    self.adinFormElem.style.display = "none";
    octopus.renderCats();
  });
};

CatAdminView.prototype.fillForm = function() {
  var selectedCat = octopus.getSelectedCat();

  this.formInputNameElem.value = selectedCat.name;
  this.formInputImgElem.value = selectedCat.img;
  this.formInputClickCountElem.value = selectedCat.clickCount;
};

CatAdminView.prototype.submitForm = function() {
  var catEdited = {
    name: this.formInputNameElem.value,
    img: this.formInputImgElem.value,
    clickCount: this.formInputClickCountElem.value
  }

  octopus.editSelectedCat(catEdited);
};

var Octopus = function() {
  this._model = new Model();
  
  var cats = this._model.getAllCats();
  
  this._catListView = new CatListView(cats);
  this._catView = new CatView();
  this._catAdminView = new CatAdminView();
};

Octopus.prototype.init = function() {
  this._model.setSelectedCat(0);
  this._catListView.init();
  this._catView.init();
  this._catAdminView.init();
};

Octopus.prototype.getCats = function() {
  return this._model.getAllCats();
};

Octopus.prototype.getSelectedCat = function() {
  return this._model.getSelectedCat();
};

Octopus.prototype.setSelectedCat = function(index) {
  this._model.setSelectedCat(index);
};

Octopus.prototype.incrementCurrentCatClick = function() {
  this._model.incrementSelectedCatClick();
  this._catView.render();
};

Octopus.prototype.renderCatView = function() {
  this._catView.render();
};

Octopus.prototype.editSelectedCat = function(cat) {
  this._model.updateSelectedCat(cat);
}

Octopus.prototype.renderCats = function() {
  this._catListView.render();
  this._catView.render();
}

var octopus = new Octopus();
octopus.init();