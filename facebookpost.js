var fbPost = {
    "Facebook Post": {
        "componentname": "Facebook Post",
        "category": "advance",
        "icon": "fa fa-sticky-note-o",
        "collection": false,
        "row": false,
        "defaultdata": EasyLibrary.ReadDOM("fbpost/default"),
        "afterdrop": function ($appendedlayer, $appendlayer, dropped) {
            if (dropped) {
                component['Facebook Post'].post.data($appendlayer);
            }
        },
        "post": {
            "custom": true,
            "data": function ($parent, data) {
                let $attr = $parent.find('.fb-post');
                if (typeof (data) == "undefined") {
                    data = {
                        "href": $attr.attr('data-href')
                    }
                }
                var post = {
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
                    renderData: function () {
                        $attr.attr('data-href', data.href)
                             .attr('data-width', data.width)
                             .attr('data-show-text', data.text);
                        if (typeof (FB) !== "undefined") {
                            FB.XFBML.parse();
                        }
                    }
                }
                post.SDk();
                post.renderData();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    'DOM': EasyLibrary.ReadDOM("fbpost/basic"),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let $post = $parent.find('.fb-post');
                        let data = {
                            "href": $post.attr('data-href'),
                            "width": $post.attr('data-width'),
                            "text": $post.attr('data-show-text')
                        }
                        Width();
                        LoadEvents();
                        ChangeEvents();
                        function LoadEvents() {
                            $('#fbpostURL').val($post.attr('data-href'));
                            if ($post.attr('data-show-text') === "true") {
                                $('#shotxt').prop('checked', true);
                            }
                            else {
                                $('#shotxt').prop('checked', false);
                            }
                        }
                        function Width() {
                            let width = $post.attr('data-width');
                            function datawidth(space) {
                                $post.attr('data-width', space);
                            }
                            AdvanceSageSlider($('#postwidthSlider'), $('#postwidthHandle'), 350, 750, width, datawidth, $parent, 'px');
                        }
                        
                        function ChangeEvents() {
                            $('#fbpostURL').blur(function () {
                                data.href = $(this).val();
                                loadChanges();
                            });
                            $('#apply').off().on('click', function () {
                                data.width = $post.attr('data-width');
                                loadChanges();
                            });
                            $('#shotxt').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    data.text = "true";
                                } else {
                                    data.text = "false";
                                }
                                loadChanges();
                            });
                        }
                        function loadChanges() {
                            component['Facebook Post'].post.data($activeDOM, data);
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
                        component['Facebook Post'].common.Spacing();
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
                                targetElem: $parent.find('.fbpost'),
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
                                targetElem: $parent.find('.fb-post'),
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
                                targetElem: $parent.find('.fb-post')
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
                        component['Facebook Post'].common.Spacing();
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
                    targetElem: $parent.find('.fb-post'),
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
                    targetElem: $parent.find('.fb-post'),
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