/*
 *@Description 通过HtmlWebpackPlugin自定义处理静态资源
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-05-05
 *@TODO:没看懂
 */
module.exports = function(templateParams, cssList) {
    // console.log('入口文件', templateParams.htmlWebpackPlugin.files);
    var _files = templateParams.htmlWebpackPlugin.files;
    //console.log('文件', _files);
    var _regChunk = templateParams.htmlWebpackPlugin.options.chunks;
    //console.log('Options',templateParams.htmlWebpackPlugin.options.chunks)
    var _regCss = cssList;
    var _scripts = "";
    var _styles = "";

    for (var k = 0; k < _regCss.length; k++) {
        var _cssitem = _regCss[k],
            _cssitems = new RegExp("^" + _cssitem),
            _cssiteme = new RegExp(".css$");
        (_files.css).map(function(filename) {
            var _filearr = filename.split('/'),
                filrdata = _filearr[_filearr.length - 1];
            if (_cssitems.test(filrdata) && _cssiteme.test(filrdata)) {
                _styles += '<link rel="stylesheet" type="text/css" href="' + filename + '"/>';
            }
        });
    };

    // console.log("_regChunk" + _regChunk[0]);
    // console.log("空脚本" + _files.chunks.length);
    for (var i = 0; i < _regChunk.length; i++) {
        if (_files.chunks[_regChunk[i]]) {
            _scripts += "<script type='text/javascript'  src='" + _files.chunks[_regChunk[i]]['entry'] + "'></script>";
            //console.log("_scripts"+ _scripts);
        }
    };
    // console.log("脚本" + _scripts);
    // console.log("样式" + _styles);
    return {
        scripts: _scripts,
        styles: _styles
    }
}