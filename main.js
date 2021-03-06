const CARD = 'card',
    FRONT_OF_CARD = 'front',
    BACK_OF_CARD = 'back',
    SELECTED_CARD = 'selected';

class Game {
    constructor(targetElement, cardsArray) {
        this.targetEl = targetElement;
        this.cardsArray = cardsArray;
        this.gameGrid = this.cardsArray.concat(this.cardsArray);
        this.firstName = '';
        this.secondName = '';
        this.count = 0;
        this.delay = 700;
        this.array = 0;

        this.renderList();
        this.showAll();
        this.isClick();
        this.isRestart();
        this.isHelp();
    }

    render(item) {
        const {name, img} = item;
        this.card = document.createElement('div');
        this.front = document.createElement('div');
        this.back = document.createElement('div');

        this.card.classList.add(CARD);
        this.card.classList.add('unpair');
        this.front.classList.add(FRONT_OF_CARD);
        this.back.classList.add(BACK_OF_CARD);

        this.card.dataset.name = name;
        this.back.style.backgroundImage = `url(${img})`;

        this.card.appendChild(this.front);
        this.card.appendChild(this.back);
        this.targetEl.appendChild(this.card);
    }

    renderList() {
        this.gameGrid.sort(() => 0.5 - Math.random());
        this.gameGrid.forEach(item => {
            this.render(item)
        });
    }

    showAll() {
        setTimeout(() => {
            document.querySelectorAll('.unpair').forEach(card => {
                card.classList.add('selected');
            });
        }, this.delay);
        setTimeout(() => {
            document.querySelectorAll('.unpair').forEach(card => {
                card.classList.remove('selected');
                this.firstName = '';
                this.secondName = '';
                this.count = 0;
            });
        }, 2000);
    }

    isRestart() {
        document.querySelector('.btn-restart').addEventListener('click', () => {
            document.querySelector('.game').innerHTML = "";
            this.renderList();
            this.isClick();
            this.showAll()
        });
    }

    isHelp() {
        document.querySelector('.btn').addEventListener('click', () => {
            this.showAll();
        });
    }


    isClick() {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                if (
                    card.classList.contains(SELECTED_CARD) ||
                    card.classList.contains('pair')
                ) {
                    return
                }

                if (this.count < 2) {
                    this.count++;
                    if (this.count === 1) {
                        this.firstName = card.dataset.name;
                        card.classList.add(SELECTED_CARD);
                    } else {
                        this.secondName = card.dataset.name;
                        card.classList.add(SELECTED_CARD);
                    }

                    if (this.firstName && this.secondName) {
                        if (this.firstName === this.secondName) {
                            this.array++;
                            setTimeout(() => {
                                document.querySelectorAll('.selected').forEach(card => {
                                    card.classList.add('pair');
                                    card.classList.remove('unpair');
                                    console.log(this.array)
                                });
                            }, this.delay);
                        }
                        setTimeout(() => {
                            this.firstName = '';
                            this.secondName = '';
                            this.count = 0;

                            document.querySelectorAll('.selected').forEach(card => {
                                card.classList.remove(SELECTED_CARD);
                            });
                        }, this.delay);
                    }
                }
            });
        });
    }
}


const game = new Game(document.querySelector('.game'), [
    {
        'name': 'monster',
        'img': 'images/monster.png',
    },
    {
        'name': 'eve',
        'img': 'images/eve.png',
    },
    {
        'name': 'walle',
        'img': 'images/walle.png',
    },
    {
        'name': 'bart',
        'img': 'images/bart.png',
    },
    {
        'name': 'mike',
        'img': 'images/mike.png',
    },
    {
        'name': 'alex',
        'img': 'images/alex.png',
    },
    {
        'name': 'alexMorty',
        'img': 'images/minion.png',
    },
    {
        'name': 'julian',
        'img': 'images/julian.png',
    }
]);

