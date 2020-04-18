
(function() {

    const dataObject = {
        userDetails: {}
    },

    set = (data, key) => {
        dataObject[key] = data;
    },

    get = (key) => {
        return dataObject[key];
    }

    module.exports = {
        set,
        get,
    };

}());
