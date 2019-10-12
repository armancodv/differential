class Model {
    constructor() {
        this.version = '4.0.0';
        this.package = 'com.armanco.differential';
        this.homepage = 'http://arman.co.com/';
        this.api = 'http://arman.co.com/api/applist_formula.php';
        this.addId = 'ca-app-pub-4301546764905932/9802377798';
        this.title = 'Differential';
        this.subTitle = 'Differentiation Rules';
        this.description = 'This app is the rules for computing the derivative of a function in calculus.';
        this.page = 1;
        this.category = 0;

        this.categoriesTitles = ['Elementary Rules', 'Exponential and Logarithmic', 'Trigonometric', 'Hyperbolic', 'Special Functions', 'nth Order'];
        this.categoriesThumbs = ['f\'(x)', 'exp', 'sin', 'sinh', 'Γ(x)', 'f\'\'(x)'];

        this.categoryTitles = [
            ['h(x)=af(x)+bg(x)', 'af', 'f+g', 'f-g', 'h(x)=f(x)g(x)', 'h(x)=f(g(x))', 'g(f(x))=x and f(g(y))=y', 'f(x)=x^r', 'h(x)=1/f(x)', 'Quotient Rule', 'Power Rule'],
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
            ['sin(x)', 'cos(x)', 'tan(x)', 'sec(x)', 'csc(x)', 'cot(x)', 'arcsin(x)', 'arccos(x)', 'arctan(x)', 'arcsec(x)', 'arccsc(x)', 'arccot(x)'],
            ['sinh(x)', 'cosh(x)', 'tanh(x)', 'sech(x)', 'csch(x)', 'coth(x)', 'arcsinh(x)', 'arccosh(x)', 'arctanh(x)', 'arcsech(x)', 'arccsch(x)', 'arccoth(x)'],
            ['Gamma function', 'Riemann Zeta function', 'Derivatives of integrals'],
            ['Faà di Bruno\'s formula', 'General Leibniz rule']
        ];

        this.categoryImages = [
            [2, 1, 1, 1, 2, 3, 2, 1, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [4, 3, 4],
            [3, 1]
        ];
    }

    changeCategory(number) {
        this.category = number;
    }

    changePage(page) {
        this.page = page;
    }

    getApps() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.api + '?p=' + this.package);
        xhr.send();
        xhr.onload = () => {
            this.apps = JSON.parse(xhr.response);
        };

    }


};

class View {
    constructor() {
        this.menu = document.getElementById('menu');
        this.items = document.getElementById('items');
        this.apps = document.getElementById('apps');
        this.categoryTitle = document.getElementById('page2-h1');
        this.title = document.getElementById('title');
        this.subTitle = document.getElementById('subtitle');
        this.description = document.getElementById('description');
        this.armanco = document.getElementById('armanco');
        this.versions = Array.from(document.getElementsByClassName('version'));
        this.backs = Array.from(document.getElementsByClassName('back'));
    }

    openLink(link) {
        window.open(link, '_system');
    }

    changePage(page_number) {
        window.location.hash = '#page' + page_number;
        for (let i = 1; i <= 4; i++) {
            if (i === page_number) {
                document.getElementById('page' + i).style.display = 'block';
            } else {
                document.getElementById('page' + i).style.display = 'none';
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    addMenuItem(id, thumb, title) {
        let element = `<table id="${id}" class="property" cellpadding="0" cellspacing="0"><tr><td class="property-thumb">${thumb}</td><td class="property-name">${title}</td></tr></table>`;
        this.menu.insertAdjacentHTML("beforeend", element);
    }

    addMenuItemMute(id, thumb, title) {
        let element = `<table id="${id}" class="about" cellpadding="0" cellspacing="0"><tr><td class="about-thumb">${thumb}</td><td class="about-name">${title}</td></tr></table>`;
        this.menu.insertAdjacentHTML("beforeend", element);
    }

    addMenuItemApp(item) {
        let element = `<table class="app" cellpadding="0" cellspacing="0" id="app${item.name}"><tr><td class="app-thumb" style="background-image: url('${item.image}')"></td><td class="app-detail"><span class="app-name">${item.name}</span><br><span class="app-price">${item.price}</span><br><span class="app-description">${item.description}</span></td></tr></table>`;
        this.apps.insertAdjacentHTML("beforeend", element);
    }

    addFormula(id, src) {
        let element = `<img src="${src}" style="max-width:100%"><br>`;
        let place = Array.from(document.getElementById(id).getElementsByClassName('identity-formula'));
        place[0].insertAdjacentHTML("beforeend", element);
    }

    addItem(id, title) {
        let element = `<table id="${id}" class="identity" cellpadding="0" cellspacing="0"><tr><td class="identity-title">${title}</td></tr><tr><td class="identity-formula"></td></tr></table>`;
        this.items.insertAdjacentHTML("beforeend", element);
    }

    changeTitle(title) {
        this.title.innerHTML = title;
    }

    changeSubTitle(subTitle) {
        this.subTitle.innerHTML = subTitle;
    }

    changeCategoryTitle(categoryTitle) {
        this.categoryTitle.innerHTML = categoryTitle;
    }

    changeDescription(description) {
        this.description.innerHTML = description;
    }

    changeVersion(version) {
        this.versions.forEach(element => {
            element.innerHTML = version;
        });
    }

    deleteChild(id) {
        let place = document.getElementById(id);
        place.innerHTML = "";
    }

};

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
        this.ready();
    }

    init() {
        window.addEventListener("load", () => {
            this.view.changeTitle(this.model.title);
            this.view.changeSubTitle(this.model.subTitle);
            this.view.changeVersion(this.model.version);
            this.view.changeDescription(this.model.description);
            this.model.getApps();
            for (let i = 0; i < this.model.categoriesTitles.length; i++) {
                let thumb = this.model.categoriesThumbs[i];
                let title = this.model.categoriesTitles[i];
                this.addMenuItem(i, thumb, title);
            }
            this.addMenuItemMute('menua', 'apps', 'Similar Apps', 3);
            this.addMenuItemMute('menui', 'info', 'About', 4);
            document.addEventListener("backbutton", e => {
                if (this.model.page !== 1) {
                    e.preventDefault();
                    this.changePage(1);
                } else {
                    navigator.app.exitApp();
                }
            }, false);
            this.view.backs.forEach(element => {
                element.addEventListener("click", () => {
                    this.changePage(1);
                });
            });
            this.view.armanco.addEventListener("click", () => {
                this.view.openLink(this.model.homepage);
            });

        }, false);

    }

    ready() {
        document.addEventListener("deviceready", () => {
            admob.banner.config({
                id: this.model.addId,
                isTesting: false,
                autoShow: true
            });
            admob.banner.prepare();
        }, false);
    }

    changePage(page) {
        this.model.changePage(page);
        this.view.changePage(page);
    }

    async addMenuItem(i, thumb, title) {
        let id = `menu${i}`;
        await this.view.addMenuItem(id, thumb, title);
        document.getElementById(id).addEventListener("click", async () => {
            this.model.changeCategory(i);
            this.view.changeCategoryTitle(title);
            await this.view.deleteChild('items');
            for (let j = 0; j < this.model.categoryTitles[i].length; j++) {
                await this.view.addItem(`item${j}`, this.model.categoryTitles[i][j]);
                this.view.addFormula(`item${j}`, `images\\${i + 1}\\${j + 1}.svg`);
                if (this.model.categoryImages[i][j] >= 2) this.view.addFormula(`item${j}`, `images\\${i + 1}\\${j + 1}b.svg`)
                if (this.model.categoryImages[i][j] >= 3) this.view.addFormula(`item${j}`, `images\\${i + 1}\\${j + 1}c.svg`)
                if (this.model.categoryImages[i][j] >= 4) this.view.addFormula(`item${j}`, `images\\${i + 1}\\${j + 1}d.svg`)
            }
            this.changePage(2);
        });
    }

    async addMenuItemMute(id, thumb, title, page) {
        await this.view.addMenuItemMute(id, thumb, title);
        document.getElementById(id).addEventListener("click", async () => {
            if (page === 3) {
                await this.view.deleteChild('apps');
                this.model.apps.forEach(async element => {
                    await this.view.addMenuItemApp(element);
                    document.getElementById(`app${element.name}`).addEventListener("click", () => {
                        this.view.openLink(element.url);
                    });
                });
            }
            this.changePage(page);
        });
    }
};

const app = new Controller(new Model(), new View());