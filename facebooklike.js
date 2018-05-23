var fblike = {
    "Facebook Like": {
        "componentname": "Facebook Like",
        "category": "advance",
        "icon": "fa fa-thumbs-up",
        "collection": false,
        "row": false,
        "defaultdata": EasyLibrary.ReadDOM("fblike/default"),
        "afterdrop": function ($appendedlayer, $appendlayer, dropped) {
            if (dropped) {
                component['Facebook Like'].like.data($appendlayer);
            }
        },
        "like": {
            "custom": true,
            "data": function ($parent, data) {
                let $attr=$parent.find('.fb-like');
                if (typeof (data) == "undefined") {
                    data = {
                        "href":$attr.attr('data-href')
                    }
                }
                var like = {
                    SDk: function () {
                        window.fbAsyncInit = function () {
                            FB.init({
                                /* appId: '{your-app-id}',*/
                                autoLogAppEvents: true,
                                xfbml: true,
                                version: 'v3.0'
                            });
                        };
                        (function (d, s, id) {
                            var js, fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id)) return;
                            js = d.createElement(s); js.id = id;
                            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
                            fjs.parentNode.insertBefore(js, fjs);
                        }(document, 'script', 'facebook-jssdk'));
                    },
                    renderData:function(){
                        $attr.attr('data-href', data.href)
                             .attr('data-action', data.action)
                             .attr('data-layout', data.layout)
                             .attr('data-size', data.size)
                             .attr('data-show-faces', data.showfaces)
                             .attr('data-share', data.share)
                             .attr('data-colorscheme', data.color);
                        if (typeof (FB) !== "undefined") {
                            FB.XFBML.parse();
                        }
                    }
                }
                like.SDk();
                like.renderData();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    'DOM': EasyLibrary.ReadDOM("fblike/basic"),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let $fblike = $parent.find('.fb-like');
                       /* let data = {
                            "href": $fblike.attr('data-href'),
                            "action": $fblike.attr('data-action'),
                            "layout": $fblike.attr('data-layout'),
                            "size": $fblike.attr('data-size'),
                            "showfaces": $fblike.attr('data-show-faces'),
                            "share":$fblike.attr('share')
                            "color":$fblike.attr('data-colorscheme')

                        }*/
                        LoadEvents();
                        ChangeEvents();
                        function LoadEvents() {
                            $('#likelayout').val($fblike.attr('data-layout'));
                            $('#likeaction').val($fblike.attr('data-action'));
                            $('#clrschme').val($fblike.attr('data-colorscheme'));
                            $('#btnsize').val($fblike.attr('data-size'));
                            $('#fblikeURL').val($parent.find('.fb-like').attr('data-href'));
                            if ($parent.find('.fb-like').attr('data-show-faces') === "true") {
                                $('#shoface').prop('checked', true);
                            }
                            else {
                                $('#shoface').prop('checked', false);
                            }
                            if ($parent.find('.fb-like').attr('data-share') === "true") {
                                $('#btnshare').prop('checked', true);
                            }
                            else {
                                $('#btnshare').prop('checked', false);
                            }
                        }
                        function ChangeEvents() {
                            $('#fblikeURL').blur(function () {
                                let href = {
                                    "href": $(this).val()
                                }
                                loadChanges(href);
                            });
                            $('#likelayout').off().on('change', function () {
                                let layout = {
                                    "layout": $(this).val()
                                }
                                loadChanges(layout);
                            });
                            $('#likeaction').off().on('change', function () {
                               let action = {
                                    "action": $(this).val()
                                }
                                loadChanges(action);
                            });
                            $('#btnsize').off().on('change', function () {
                              let  size = {
                                    "size": $(this).val()
                                }
                                loadChanges(size);
                            });
                            $('#clrschme').off().on('change', function () {
                                let color = {
                                    "color": $(this).val()
                                }
                                loadChanges(color);
                            });
                            $('#shoface').off().on('click', function () {
                                let face = {
                                    "showfaces":''
                                }
                                if ($(this).is(':checked')) {
                                    face.showfaces = "true";
                                } else {
                                    face.showfaces = "false";
                                }
                                loadChanges(face);
                            });
                            $('#btnshare').off().on('click', function () {
                                let share = {
                                    "share": ''
                                }
                                if ($(this).is(':checked')) {
                                    share.share = "true";
                                } else {
                                    share.share = "false";
                                }
                                loadChanges(share);
                            });
                        }
                        function loadChanges(change) {
                            component['Facebook Like'].like.data($activeDOM, change);
                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": `<div class="field-row">
                             <div id="fblikemargin"></div>
                              <div id="fblikepadding"></div>
                               </div>`,
                    "onload": function ($item) {
                        component['Facebook Like'].common.Spacing();
                    }
                },
            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "custom": true,
                    "DOM": `<div class="field-row">
                           <div id="fbpagebg"></div>
                           </div>`,
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        function initBGClr() {
                            $("#fbpagebg").html('');
                            $("#fbpagebg").AdvanceBackground({
                                targetParent: $parent,
                                targetElem: $parent.find('.fbpage'),
                                options: ["color"]
                            });
                        }
                        initBGClr();
                    },
                    "active": function () {
                        $('#slcBGClr').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcBGClr').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Border": {
                    "custom": true,
                    "DOM": `<div class="field-row">
                            <div id="likeborder"></div>
                            </div>`,
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        function initBGClr() {
                            $("#likeborder").html('');
                            $("#likeborder").AdvanceBorder({
                                targetParent: $parent,
                                targetElem: $parent.find('.fb-like'),
                                options: {
                                    "max": 20,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "right", "bottom", "left"],
                                }
                            });
                        }
                        initBGClr();
                    },
                    "active": function () {
                        $('#slcbdr').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcbdr').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": `<div class="field-row">
                             <div id="likeshadow"></div>
                               </div>`,
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        function shadow() {
                            $("#likeshadow").html('');
                            $("#likeshadow").AdvanceBoxShadow({
                                targetParent: $parent,
                                targetElem: $parent.find('.fb-like')
                            });
                        }
                        shadow();
                    },
                    "active": function () {
                        $('#tstshdo').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#tstshdo').trigger('change').addClass('slcActiveEleSetting');
                    }
                }
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    custom: true,
                    "DOM": '<div id="tstvisibility"></div><div class="field-row stElWrap col80-20" data-opt="visibility"><span class="fCol toggle_btn"></span></div>',
                    "onload": function () {
                        $('#tstvisibility').AdvanceVisibility({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM,
                            label: 'Visibility',
                            showCls: "Db",
                        });
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": `<div class="field-row">
                             <div id="fblikemargin"></div>
                              <div id="fblikepadding"></div>
                               </div>`,
                    "onload": function () {
                        component['Facebook Like'].common.Spacing();
                    }
                }
            },
            "selectLayer": function ($elem) {
                let $parent = $elem.parent().parent($parent);
            }
        },
        "common": {
            "Spacing": function () {
                let $parent = $activeDOM;
                $("#fblikemargin,#fblikepadding").html('');
                $("#fblikemargin").AdvanceSpacing({
                    targetParent: $parent,
                    targetElem: $parent.find('.fbpage'),
                    options: {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "bottom", "left", "right"]
                        },
                    },
                });
                $("#fblikepadding").AdvanceSpacing({
                    targetParent: $parent,
                    targetElem: $parent.find('.fbpage'),
                    options: {
                        "padding": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "bottom", "left", "right"]
                        }
                    },
                });
            }
        }
    }
}