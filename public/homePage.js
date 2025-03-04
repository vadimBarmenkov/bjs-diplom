let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();
let moneyManager = new MoneyManager();
let favoritesWidget = new FavoritesWidget();

logoutButton.action = () => ApiConnector.logout(object => {
    if(object.success){
        clearInterval(timerOneMinute);
        location.reload();
        return;
    }
    console.error(object.error);
});

ApiConnector.current(obj => {
    if(obj.success){
        ProfileWidget.showProfile(obj.data);
    }});
ApiConnector.getFavorites(obj => {
    if(obj.success){
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(obj.data);
    moneyManager.updateUsersList(obj.data);
}});

let getStocks = () => ApiConnector.getStocks(obj => {
    if(obj.success){
        ratesBoard.clearTable();
        ratesBoard.fillTable(obj.data);
    }});
getStocks();
let timerOneMinute = setInterval(() => getStocks, 60000);

moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, obj => {
    if(obj.success){
        ProfileWidget.showProfile(obj.data);
        moneyManager.setMessage(true, "баланс успешно пополнен.");
        return;
    }
    moneyManager.setMessage(false, obj.error);
});

moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, obj => {
    if(obj.success){
        ProfileWidget.showProfile(obj.data);
        moneyManager.setMessage(true, "конвертирование прошло успешно.");
        return;
    }
    moneyManager.setMessage(false, obj.error);
});

moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, obj => {
    if(obj.success){
        ProfileWidget.showProfile(obj.data);
        moneyManager.setMessage(true, "перевод прошел успешно.");
        return;
    }
    moneyManager.setMessage(false, obj.error);
});

favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, obj => {
    if(obj.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(obj.data);
        moneyManager.updateUsersList(obj.data);
        moneyManager.setMessage(true, "пользователь успешно добавлен.");
        return;
    }
    moneyManager.setMessage(false, obj.error);
});

favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, obj => {
    if(obj.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(obj.data);
        moneyManager.updateUsersList(obj.data);
        moneyManager.setMessage(true, "пользователь успешно удален.");
        return;
    }
    moneyManager.setMessage(false, obj.error);
});