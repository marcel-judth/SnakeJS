const database = require('../DataAccess/DataAccess');

module.exports = function () {
    return {
        getAllUserSortedByScore: _getAllUserSortedByScore,
        register : _register,
        login : _login,
        insertScore: _insertScore
    }

    function _getAllUserSortedByScore(sucess, error) {
        database.getAllUsersSortedByScore(sucess, error);
    }

    function _register(name, email, password, success, error){
        database.register(name, email, password, success, error);
    }

    function _login (username, password, success, error){
        try {
            database.login(username, password, success, error);
        } catch (error) {
            console.log("hallo1");
        }
    }

    function _insertScore (username, score, success, error){
        database.insertScore(username, score, success, error);
    }
}();