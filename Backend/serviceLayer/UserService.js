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

    function _register(username, password, firstName, lastName, email, sucess, error){
        database.register(username, password, firstName, lastName, email, sucess, error);
    }

    function _login (username, password, success, error){
        database.login(username, password, success, error);
    }

    function _insertScore (username, score, success, error){
        database.insertScore(username, score, success, error);
    }
}();