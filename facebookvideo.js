var fbVideo = {
    "Facebook Video": {
        "componentname": "Facebook Video",
        "category": "advance",
        "icon": "fa fa-film",
        "collection": false,
        "row": false,
        "defaultdata": EasyLibrary.ReadDOM("fbvideo/default"),
        "afterdrop": function ($appendedlayer, $appendlayer, dropped) {
            if (dropped) {
                component['Facebook Video'].video.data($appendlayer);
            }
        },
        "video": {
            "custom": true,
            "data": function ($parent, data) {
                let $attr = $parent.find('.fb-video');
                if (typeof (data) == "undefined") {
                    data = {
                        "href": $attr.attr('data-href')
                    }
                }
                var video = {
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
                             .attr('data-show-text', data.text)
                             .attr('data-allowfullscreen', data.fullscreen)
                             .attr('data-autoplay', data.autoplay)
                             .attr('data-show-captions', data.caption);
                        if (typeof (FB) !== "undefined") {
                            FB.XFBML.parse();
                        }
                    }
                }
                video.SDk();
                video.renderData();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    'DOM': EasyLibrary.ReadDOM("fbvideo/basic"),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let $video = $parent.find('.fb-video');
                        let data = {
                            "href": $video.attr('data-href'),
                            "width": $video.attr('data-width'),
                            "text": $video.attr('data-show-text'),
                            "fullscreen": $video.attr('data-allowfullscreen'),
                            "autoplay": $video.attr('data-autoplay'),
                            "caption": $video.attr('data-show-captions')
                        }
                        Width();
                        LoadEvents();
                        ChangeEvents();
                        function LoadEvents() {
                            $('#fbvideoURL').val($video.attr('data-href'));
                            if ($video.attr('data-show-text') === "true") {
                                $('#shotxt').prop('checked', true);
                            }
                            else {
                                $('#shotxt').prop('checked', false);

                                if ($video.attr('data-allowfullscreen') === "true") {
                                    $('#fullscrn').prop('checked', true);
                                }
                                else {
                                    $('#fullscrn').prop('checked', false);
                                }
                                if ($video.attr('data-autoplay') === "true") {
                                    $('#atoplay').prop('checked', true);
                                }
                                else {
                                    $('#atoplay').prop('checked', false);
                                }
                                if ($video.attr('data-show-captions') === "true") {
                                    $('#caption').prop('checked', true);
                                }
                                else {
                                    $('#caption').prop('checked', false);
                                }
                            }
                        }

                        function Width() {
                            let width = $video.attr('data-width');
                            function datawidth(space) {
                                $video.attr('data-width', space);
                            }
                            AdvanceSageSlider($('#videowidthSlider'), $('#videowidthHandle'), 350, 750, width, datawidth, $parent, 'px');
                        }

                        function ChangeEvents() {
                            $('#fbvideoURL').blur(function () {
                                data.href = $(this).val();
                                loadChanges();
                            });
                            $('#apply').off().on('click', function () {
                                data.width = $video.attr('data-width');
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
                            $('#fullscrn').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    data.fullscreen = "true";
                                } else {
                                    data.fullscreen = "false";
                                }
                                loadChanges();
                            });
                            $('#atoplay').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    data.autoplay = "true";
                                } else {
                                    data.autoplay = "false";
                                }
                                loadChanges();
                            });
                            $('#caption').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    data.caption = "true";
                                } else {
                                    data.caption = "false";
                                }
                                loadChanges();
                            });
                        }
                        function loadChanges() {
                            component['Facebook Video'].video.data($activeDOM, data);
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
                        component['Facebook Video'].common.Spacing();
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
                                targetElem: $parent.find('.fbvideo'),
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
                                targetElem: $parent.find('.fb-video'),
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
                                targetElem: $parent.find('.fb-video')
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
                        component['Facebook Video'].common.Spacing();
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
                    targetElem: $parent.find('.fb-video'),
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
                    targetElem: $parent.find('.fb-video'),
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
