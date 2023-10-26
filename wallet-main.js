var walletCount = localStorage.getItem('walletCount');

function convertRub(number) {
    var formattedString = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
    formattedString = formattedString.replace('.', ',');
    formattedString = formattedString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedString;
}

function customCovert(string) {
    var tempElement = document.createElement('div');
    tempElement.innerHTML = string;
    var innerText = tempElement.textContent;
    var cleanString = innerText.replace(/\s/g, '');
    var parts = cleanString.split(',');
    var number = parseFloat(parts[0]);
    if (parts.length > 1) {
      number += parseFloat('0.' + parts[1]);
    }    
    return number;
}

function addPlugin() {
    var styles = `
        .plugin {
            display: flex;
            justify-content: space-between;
            max-width: 250px;
        }

        .rating {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 60px;
            height: 56px;
            margin: 0px 20px 0px 0px;
        }
        
        .rating .icon {
            width: 24px;
        }

        .wallet {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 150px;
            height: 56px;
        }
        
        .wallet .box-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            background: #00A1FF;
            border-radius: 10px;
            margin: 0px 10px 0px 0px;
        }
        
        .wallet .icon {
            width: 18px;
        }
    `;
    var styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const div = document.createElement('div');
    div.className = 'plugin';
    div.innerHTML = `
        <div class="rating">
            <img class="icon" src="https://i.postimg.cc/HLvM8cMY/icons8-rating-24-1.png" alt="">
            <span>4,95</span>
        </div>
        <div class="wallet">
            <div class="box-icon">
                <img class="icon" src="https://i.postimg.cc/MKMpWRcz/icons8-wallet-24.png" alt="">
            </div>
            <span class="money">`+ convertRub(walletCount) + ` ₽</span>
        </div>
    `;
    setTimeout(() => { 
        document.getElementsByClassName("user_S-Unf")[0].before(div);
    }, 1200);
}

function getWallet() {
    var table = document.getElementsByClassName("table_pW-qz")[0];
    walletCount = 0.0;
    for(var i = 1; i < table.rows.length; i++) {
        walletCount = walletCount + customCovert(table.rows[i].cells[5].innerHTML);
    }
    localStorage.setItem('walletCount', walletCount);
}

addPlugin();
window.setInterval(getWallet, 3000);