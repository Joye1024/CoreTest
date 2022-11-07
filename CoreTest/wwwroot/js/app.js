var model = (function () {

    var item = function (id, name, value) {
        this.id = id;
        this.name = name;
        this.value = value;
    }

    var data = {
        allItems: [],
        totals: 0,
    }

    var calculationTotal = function () {

        var sum = 0;
        data.allItems.forEach(function (currentValue) {
            sum += currentValue.value;
        });

        data.totals = sum;
    };

    return {
        addItem: function (name, value) {

            var ID;
            if (data.allItems.length > 0) {
                ID = data.allItems[data.allItems.length - 1].id + 1;
            }
            else {
                ID = 0;
            }

            var newItem = new item(ID, name, value);
            data.allItems.push(newItem);

            return newItem;
        },

        deleteItem: function (id) {
            //Array.prototype.map()
            //會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。
            var ids = data.allItems.map(function (currentVal) {
                return currentVal.id;
            });

            var index = ids.indexOf(parseInt(id));

            if (index >= 0) {
                //Array.prototype.splice 從Array中移除
                data.allItems.splice(index, 1);
            }

        },

        calculationSum: function () {
            calculationTotal();

            return {
                sum: data.totals,
            };
        },

        test: function () {
            console.log(data);
        }
    };

})();

var view = (function () {

    var DOMstrings = {
        name: '.name',
        value: '.value',
        btn: '.bought_btn',
        list: '.bought_list',
        sumLabel: '.total_value',
        container: '.container',
        month: '.month',
    }

    var formatting = function (number) {
        //Number.prototype.toFixed()
        //使用定點小數表示法（fixed-point notation）來格式化數字
        number = number.toFixed(2);

        number = number.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

        return number;
    };

    return {
        getInfo: function () {
            return {
                name: document.querySelector(DOMstrings.name).value,
                value: parseFloat(document.querySelector(DOMstrings.value).value),
            };
        },

        addListItem: function (object) {
            var newHTML;

            var html = '<div class="item clearfix" id="%id%">' +
                '<div class="item_name" >%name%</div>' +
                '<div class="right clearfix">' +
                '<div class="item_value">%value%</div>' +
                '<div class="delete">' +
                '<button class="delete_btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div>' +
                '</div>' +
                '</div >';

            newHTML = html.replace('%id%', object.id).replace('%name%', object.name).replace('%value%', formatting(object.value) + '元');
            //console.log(newHTML);
            document.querySelector(DOMstrings.list).insertAdjacentHTML('beforeend', newHTML);
            //console.log(document.querySelector(DOMstrings.list).outerHTML);
        },

        clearInput: function () {
            //List
            var inputs = document.querySelectorAll(DOMstrings.name + ',' + DOMstrings.value);

            //調用Array.prototype.slice將List轉換成Array
            //slice 截用
            var inputArray = Array.prototype.slice.call(inputs);

            inputArray.forEach(function (currentVal) {
                currentVal.value = '';
            });

            //將游標設定在第一個Array上
            inputArray[0].focus();
        },

        displaySum: function (object) {
            document.querySelector(DOMstrings.sumLabel).textContent = formatting(object.sum) + '元';
        },

        displayMonth: function () {
            var nowYear = new Date().getFullYear();
            var nowMonth = new Date().getMonth();
            
            document.querySelector(DOMstrings.month).textContent = nowYear + '年' + nowMonth + '月';
        },

        deleteListItem: function (id) {
            var element = document.getElementById(id);

            element.parentNode.removeChild(element);
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

    };

})();

var controller = (function (m, v) {

    var setupEventListener = function () {

        var DOMstrings = view.getDOMstrings();

        document.querySelector(DOMstrings.btn).addEventListener('click', addItem);
        document.addEventListener('keypress', function (event) {
            //https://www.toptal.com/developers/keycode/for/alt
            if (event.keyCode === 13 || event.which === 13) {
                addItem();
            }
        });

        document.querySelector(DOMstrings.container).addEventListener('click', deleteItem);
    };

    var deleteItem = function (event) {
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //console.log(itemID);

        model.deleteItem(itemID);

        view.deleteListItem(itemID);

        updateTotal();
    };

    var updateTotal = function () {
        var sum = model.calculationSum();

        view.displaySum(sum);
    };

    var addItem = function () {
        var Input = view.getInfo();
        //console.log(Input);

        if (Input.name !== '' && !isNaN(Input.value) && Input.value > 0) {
            var newItem = model.addItem(Input.name, Input.value);

            view.addListItem(newItem);

            view.clearInput();

            updateTotal();
        }

    };

    return {
        init: function () {
            console.log('App started.')
            view.displayMonth();
            view.displaySum({ sum: 0 });
            setupEventListener();
        }
    };

})(model, view);

controller.init();