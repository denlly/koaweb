module.exports = function(templateParams) {
    let _cssList = ['common', 'index-index'];
    let webAssetsHelp = require('../../webAssetsHelp.js')(templateParams, _cssList);
    var _html = "{% extends '../../common/pages/mainlayout.html' %} " +
        "{% block title %}[[title]]{% endblock %}" +
        "{% block styles %} " +
        webAssetsHelp.styles +
        "{% endblock %}" +
        '{% block content %}' +
        '{% endblock %}' +
        '{% block script%}' +
        webAssetsHelp.scripts +
        '{% endblock%}';

    return _html;
}