$(function () {

    $(".nav li.dropdown").hover(function () {
        $(this).addClass("open");
        $(this).find(".dropdown-menu").show();
    }, function () {
        var _this = this;
        $(_this).removeClass("open");
        $(_this).find(".dropdown-menu").hide();
        
    });
    $('#courseCarousel').carousel();
    //.carousel(number);
    $('#myCarousel .carousel-indicators li').on("mouseover", function (e) {

        var idx = parseInt(!this.dataset?$(this).attr("data-slide-to"):this.dataset.slideTo);
        var _this = $("#myCarousel")[0];
        for (var i = 0; i < _this.children[0].children.length; i++) {
            $(_this.children[0].children[i]).removeClass("active");
            $(_this.children[1].children[i]).removeClass("active");
        }
        $(_this.children[0].children[idx]).addClass("active");
        $(_this.children[1].children[idx]).addClass("active");

    })

    $('#myCarousel').on('slide.bs.carousel', function (e) {
        var _this = this;
        var idx = 0;
        for (var i = 0; i < _this.children[0].children.length; i++) {
            $(_this.children[0].children[i]).removeClass("active");
            $(_this.children[1].children[i]).removeClass("active");
            if (_this.children[1].children[i] == e.relatedTarget) {
                idx = i;
            }
        }

        $(_this.children[0].children[idx]).addClass("active");
        $(_this.children[1].children[idx]).addClass("active");

        return false;
    });
    $('#courseCarousel').on('slide.bs.carousel', function (e) {
        var _this = this;
        var idx = 0;
        for (var i = 0; i < _this.children[0].children.length; i++) {
            $(_this.children[0].children[i]).removeClass("active");
            $(_this.children[1].children[i]).removeClass("active");
            if (_this.children[1].children[i] == e.relatedTarget) {
                idx = i;
            }
        }
        //$(_this.relatedTarget).fadeIn(300);
        $(_this.children[0].children[idx]).addClass("active");
        $(_this.children[1].children[idx]).addClass("active");

        return false;
    })
    $('#courseCarousel .carousel-indicators li').on("mouseover", function (e) {
        var idx = parseInt(this.dataset.slideTo);
        var _this = $("#courseCarousel")[0];
        for (var i = 0; i < _this.children[0].children.length; i++) {
            $(_this.children[0].children[i]).removeClass("active");
            $(_this.children[1].children[i]).removeClass("active");
        }
        $(_this.children[0].children[idx]).addClass("active");
        $(_this.children[1].children[idx]).addClass("active");

    })

    $("#expertTeamSolid").on("slide.bs.carousel", function (e) {
        var idx = 0;
        var _this = this;
        $(_this).find(".item").each(function (i, ele) {
            if (ele == e.relatedTarget) {
                idx = i;
            }
        })

        if (e.direction == "left" && idx == 0) {

            return false;
        }
        if (e.direction == "right" && idx == _this.getElementsByClassName("item").length - 1) {
            return false;
        }
    });
    $("#expertTeamSolid").on("slid.bs.carousel", function (e) {
        var idx = 0;
        var _this = this;
        $(_this).find(".item").each(function (i,ele) {
            if (ele == e.relatedTarget) {
                idx = i;
            }
        })
        console.log(idx);
        if (e.direction == "left" && idx == $(_this).find(".item").length - 1) {
            $(_this).find(".right").addClass("m_nextdisable");
            $(_this).find(".right").removeClass("m_next");
        } else {
            $(_this).find(".right").removeClass("m_nextdisable");
            $(_this).find(".right").addClass("m_next");
        }

        if (e.direction == "right" && idx == 0) {
            $(_this).find(".left").addClass("m_prevdisable");
            $(_this).find(".left").removeClass("m_prev");

        } else {
            $(_this).find(".left").removeClass("m_prevdisable");
            $(_this).find(".left").addClass("m_prev");
            console.log("rightend");
        }
    });
    /*课程体验*/
    $(".m_imgblock_default").hover(
        function () {
            $(this).addClass("m_imgblock_hover");
        }, function () {
            $(this).removeClass("m_imgblock_hover");
    });

    

    var adaObj = new AdapterObject();

    $(window).load(function () {
        adaObj.init();
        var PullControl = new window.PullControl();

        var NiceControl = new window.NiceControl();

        var ScrollStateControl = new window.ScrollStateControl($(".Scroll_State_Control")[0]);

        new window.ClickControl();

        var commoncontrol = new window.CommonControl();
        window.alert = commoncontrol.alert;
        window.confirm = commoncontrol.confirm;
    })

    $(window).resize(function () {
        adaObj.init();
    })

    function AdapterObject(){
        var _this = this;
        //火狐浏览器适配图片大
        //适配幻灯片高度

        _this.adapterCarouselFF = function (objid) {
            if (!objid) return;
            if (window.navigator.userAgent.toLowerCase().indexOf("firefox") < 0) return;

            //console.dir(window);
            var clientWidth = $(window).width();
            objid.find(".img-responsive").each(function (idx, ele) {
                //console.dir(ele);
                var _width = clientWidth;
                var _height = parseInt(ele.naturalHeight) / parseInt(ele.naturalWidth) * _width;
                //console.log(_width);
                //console.log(_height);   
                $(ele).css("width", _width);
                $(ele).css("height", _height);
                $(ele.parentNode.parentNode).css("width", _width);
                $(ele.parentNode.parentNode).css("height", _height);
                
                //修正高度
                $(objid).css("height", _height);
            })
        }
        _this.adapterCarousel = function (objid) {
            if (window.navigator.userAgent.toLowerCase().indexOf("firefox") >= 0) return;

            var curHeight = 0;
            for (var i = 0; i < objid.find("img").length; i++) {
                if (curHeight < objid.find("img")[i].offsetHeight) {
                    curHeight = objid.find("img")[i].offsetHeight;
                }
            }
            objid.css("height", curHeight);
        };
        _this.adapterImgblock = function (obj) {
            var imgs = obj.find(".courseExpe_item .img");
            var masks = obj.find(".courseExpe_item .m_fullmsak_play");
            var plays = obj.find(".m_mask_play");
            var height = 0;
            for (var i = 0; i < imgs.length; i++) {
                height = parseInt(imgs[i].offsetHeight * 1.05)
                masks.css("height", height);
                plays.css("margin-top", parseInt(height - 68) / 2);
            }
        };
        
        _this.adapterSolidBar = function (obj) {
            var carouselcontrol = obj.find(".carousel-control");
            var item = obj.find(".item");
            if (!!item[0] && !!item[0].offsetHeight && item[0].offsetHeight > 10) {
                carouselcontrol.css("height", item[0].offsetHeight);
            }
        };
        _this.adapterImagecontrols = function () {
            var img_responsive_controls = $(".img_responsive_control");
            var clientWidth = $(window).width();
            img_responsive_controls.each(function (idx, ele) {
                var _width = clientWidth;
                var _height = parseInt(ele.naturalHeight) / parseInt(ele.naturalWidth) * _width;
                $(ele).css("width", _width);
                $(ele).css("height", _height);
            })
        };
        _this.init = function () {
            _this.adapterCarousel($("#myCarousel"));
            _this.adapterImgblock($(".m_courseExpe"));
            _this.adapterSolidBar($("#expertTeamSolid"))
            _this.adapterCarouselFF($("#myCarousel"));//火狐适配
            _this.adapterImagecontrols();
        };

    }


    window.MenuControl = function(controlor,defaltActive,callback) {
        var _this = this;
        _this.init = function () {
            $(controlor).find(".menu_control_item").each(function (i, e) {
                e.idx = i;
                $(e).on("click", function(e) {
                    $(controlor).find(".menu_control_item").each(function (index, el) {
                        $(el).removeClass("active");
                    });
                    $(this).addClass("active");
                    $.isFunction(callback) && callback(this.idx);
                    return defaltActive;
                });
            });
        }
        _this.init();
    }

    window.MenuBControl = function (controlor, defaltActive, callback) {
        var _this = this;
        _this.init = function () {
            //初始化加载状态
            $(controlor).find(".menu_control_item").each(function (i, e) {
                if ($(e).hasClass("active")) {
                    $(e).siblings("ul").css("display", "block");
                } else {
                    $(e).siblings("ul").css("display", "none");
                }
            })
            //初始化加载状态end

            $(controlor).find(".menu_control_item").each(function (i, e) {
                e.idx = i;
                //$(e).on("mouseover", function (e) {
                //});
                $(e).on("click", function (e) {
                    $(controlor).find(".menu_control_item").each(function (index, el) {
                        $(el).removeClass("active");
                        $(el).find("em").removeClass("arrow_down").addClass("menu_list_icon");
                        $(controlor).find("ul").slideUp("slow");
                    });
                    $(this).addClass("active");
                    $(this).find("em").removeClass("menu_list_icon").addClass("arrow_down");
                    $(this).siblings("ul").slideDown("slow");
                    $.isFunction(callback) && callback(this.idx);
                    return defaltActive;
                });
            });
            
        }
        _this.init();
    }
    window.PullControl = function () {
        //obj.
        var default_height;
        var duration = 1000;
        $(".pull_control").on("click", function (e) {
            var _this = this;
            if (!default_height) {
                default_height = $(_this.attributes["aria-controls"].value).outerHeight();
            }
            if (_this.down) {
                $(_this.attributes["aria-controls"].value).animate({ height: default_height + "px" });
                setTimeout(function () {
                    $(_this).removeClass("pull_up").addClass("pull_down");
                    _this.down = false;
                },duration);

            } else {
                $(_this.attributes["aria-controls"].value).css("height", $(_this.attributes["aria-controls"].value).offsetHeight);
                var targetHeight = $(_this.attributes["aria-flowto"].value).height() + $(_this).parent().height();
                $(_this.attributes["aria-controls"].value).animate({ height: targetHeight + "px" })
                setTimeout(function () {
                    $(_this).removeClass("pull_down").addClass("pull_up");
                    _this.down = true;
                },duration);
            }
        });

    }
    window.NiceControl = function () {
        $(".nice_control").one("click", function () {
            $(this).removeClass("nd_nice").addClass("nd_nice_clicked");
            var count = parseInt($(this).find(".number").text());
            $(this).find(".number").text(++count);
        });
    }
    window.ScrollStateControl = function (obj) {
        if (!obj) return;
        var _this = this;
        var top = $(obj).offset().top - 50;
        $(window).scroll(function (ev) {
            if (this.scrollY > top) {
                $(obj).addClass("navbar-fixed-top").css("margin-top",50);
            } else {
                $(obj).removeClass("navbar-fixed-top").css("margin-top", 0);;
            }
            //$("span").text(x += 1);
        });
    }

    window.ClickControl = function (obj) {
        $(".click_control").each(function (idx,ele) {
            $(ele).on("click", function (e) {
                //$("img").attr("width", "180");
                var target = $(this).attr("data-target") ? $(this).attr("data-target") : "_blank";
                var url = this.dataset["url"];
                if (!url) { url = $(this).attr("data-url");}
                if (url) {
                    window.open(url, target);
                }
                return false;
            });
        });
    }

    window.CommonControl = function () {
        var _this = this;
        _this.alert = function (string) {
            var html = '<div class="modal fade m_modal" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
  <div class="modal-dialog">\
    <div class="modal-content">\
      <div class="modal-header">\
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\
        <h4 class="modal-title" id="myModalLabel">操作提示</h4>\
      </div>\
      <div class="modal-body">\
        <div class="text-center">\
             <h3><img src="image/warning.png" /> &nbsp;&nbsp;' + string + '</h3>\
        </div>\
      </div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-default btn-lg" data-dismiss="modal">确 定</button>\
<!--        <button type="button" class="btn btn-primary">Save changes</button>-->\
      </div>\
    </div>\
  </div>\
</div>'
            $(document.body).append(html);
        }

        _this.confirm = function (string) {
            var html = '<div class="modal fade m_modal" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
  <div class="modal-dialog">\
    <div class="modal-content">\
      <div class="modal-header">\
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\
        <h4 class="modal-title" id="myModalLabel">操作提示</h4>\
      </div>\
      <div class="modal-body">\
        <div class="text-center">\
             <h3><img src="image/warning.png" /> &nbsp;&nbsp;' + string + '</h3>\
        </div>\
      </div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-default btn-lg" data-dismiss="modal">确 定</button>\
            <button type="button" class="btn btn-default btn-lg  btn-primary btn_cancle" data-dismiss="modal">取消</button>\
      </div>\
    </div>\
  </div>\
</div>'
            $(document.body).append(html);


        }


    }
    window.GotoTop = function (min_height) {
        //预定义返回顶部的html代码，它的css样式默认为不显示 
        var gotoTop_html = '<div id="gotoTop"><img src="image/totop.png"></div>';
        //将返回顶部的html代码插入页面上id为page的元素的末尾 
        $("body").append(gotoTop_html);
        $("#gotoTop").click(//定义返回顶部点击向上滚动的动画 
            function () {
                $('html,body').animate({ scrollTop: 0 }, 700);
            }).hover(//为返回顶部增加鼠标进入的反馈效果，用添加删除css类实现 
            function () { $(this).addClass("hover"); },
            function () {
                $(this).removeClass("hover");
            });
        //获取页面的最小高度，无传入值则默认为600像素 
        min_height ? min_height = min_height : min_height = 600;
        //为窗口的scroll事件绑定处理函数 
        $(window).scroll(function () {
            //获取窗口的滚动条的垂直位置 
            var s = $(window).scrollTop();
            //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐 
            if (s > min_height) {
                $("#gotoTop").fadeIn(100);
            } else {
                $("#gotoTop").fadeOut(200);
            };
        });
    };

    window.Theatre = function(screenObj,fn){
        if (!screenObj) return;
        var _this = this;
        _this.end = false;
        var top = $(screenObj).offset().top - 300;
        //console.log(top);
        $(window).scroll(function (ev) {
            //console.log(this.scrollY);
            if (this.scrollY > top) {
                $.isFunction(fn) && !_this.end && fn();
                _this.end = true;
            } 
            //$("span").text(x += 1);
        });
    }
});

