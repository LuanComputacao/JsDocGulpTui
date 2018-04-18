/**
 * Get all inputs of an form and interpret a group of item as below;
 *
 * @example
 * //returns {0 : {name : 'Name0'surname: 'Surname0'}, 1 : {name : 'Name1'surname: 'Surname1'}, 2 : {name : 'Name2'surname: 'Surname2'}, }
 * getFields('#js-new-members-form')
 *
 * @memberOf Assessment
 * 
 * @param {string} formSelector - The target form selector
 * @param {string} fieldName - The target field Name
 * @returns {{}}
 */
function getFields(formSelector, fieldName) {
    var temp, collection = {};
    var position, field = null;
    var formSerializedArray = $(formSelector).serializeArray();
    var fieldRegex = new RegExp(fieldName);

    $.each(formSerializedArray, function (i, v) {
        if (v.name.match(fieldRegex)) {
            temp = {};
            position = v.name.split('[')[1][0];
            field = v.name.split('[')[2].slice(0, -1);
            temp[field] = v.value;

            if (collection[position]) {
                collection[position][field] = v.value;
            } else {
                collection[position] = temp;
            }
        }
    });

    return collection;
}

/**
 * Add or remove the class 'has-error' to the form-group
 * and add or remove the class hidden to the
 * specific warning error element
 *
 * @memberOf Assessment
 * 
 * @param valid
 * @param element
 * @param errorElement
 */
function styleError(valid, element, errorElement) {
    if (errorElement === undefined) {
        errorElement = "small";
    }

    if (valid) {
        $(element).removeClass('has-error');
        $(element).find(errorElement).addClass("hidden");
    } else {
        $(element).addClass('has-error');
        $(element).find(errorElement).removeClass("hidden");
    }
}

/**
 * Format a string using the following patterns:
 *
 * @example
 * //Out: Some string Another string
 * "Some string {0}".format('Another string')
 *
 * @memberOf Assessment
 * @function String.format
 */
String.prototype.format = function() {
    var args = arguments
    return this.replace(/\{(\d+)\}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

/**
 * Get the cookie value for the param informed
 * 
 * @memberOf Assessment
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * This function checks if touch events are available.
 *
 * @memberOf Assessment
 *
 * @return boolean
 */
function touchEventsAvailable() {
    try {
        return document.createEvent("TouchEvent") && true;
    } catch(e) {
        return false;
    }
}
