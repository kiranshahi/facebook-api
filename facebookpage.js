var fpage = {
    "Facebook Page": {
        "componentname": "Facebook Page",
        "category": "advance",
        "icon": "fa fa-facebook-official",
        "collection": false,
        "row": false,
        "defaultdata": EasyLibrary.ReadDOM("FacebookPage/default"),
        "fbpage": {
            "custom": true,
            "data": function ($parent, data) {
                if (data == undefined) {
                    data = {
                        "href":$parent.find('.fb-page').attr('data-href')
                    }
                }
                var page = {
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
                    render: function () {
                        if (data !== undefined) {
                            $parent.find(".fb-page").attr("data-href", data.href)
                                         .attr("data-small-header", data.smallheader)
                                         .attr("data-hide-cover", data.hidecover)
                                         .attr("data-show-facepile", data.showfacepile)
                                         .attr("data-tabs", data.tabs)
                                         .attr("data-width", data.width)
                                         .attr("data-height", data.height)
                                         .attr("data-adapt-container-width", data.containerfit)
                                         .find('blockquote').attr('cite', data.href)
                                         .end()
                                         .find('a').attr('href', data.href);
                            if (typeof (FB) !== "undefined") {
                                FB.XFBML.parse();
                            }
                        }
                    }

                }
                page.SDk();
                page.render();
            }
        },
        "afterdrop": function ($appendedlayer, $appendlayer, dropped) {
            if (dropped)
                component['Facebook Page'].fbpage.data($appendlayer);
        },
        "loadsetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    'DOM': EasyLibrary.ReadDOM("FacebookPage/basic"),
                    "onload": function ($item) {
                        let $parent = $activeDOM.closest('.facebookpage');
                        $attributes = $parent.find('.fb-page');
                        let dtabs;
                        let tabsaary = [];
                        let tablist = $attributes.attr('data-tabs').split(',');
                        if (tablist.length >=0) {
                            for (let i = 0; i < tablist.length; i++) {
                                tabsaary.push(tablist[i]);
                            }
                        }
                        let data = {
                            "href": $attributes.attr('data-href'),
                            "tabs": $attributes.attr('data-tabs'),
                            "hidecover": $attributes.attr('data-hide-cover'),
                            "showfacepile": $attributes.attr('data-show-facepile'),
                            "smallheader": $attributes.attr('data-small-header'),
                            "containerfit": $attributes.attr('data-adapt-container-width'),
                        }
                        tabs();
                        function tabs() {
                            dtabs = '';
                            for (let i = 0; i < tabsaary.length; i++) {
                                dtabs += tabsaary[i] + ',';
                            }
                            data.tabs = dtabs.substring(0, dtabs.length - 1);
                        }
                        let basicsetting = {
                            init: function () {
                                loadsetting();
                                function loadsetting() {
                                    loadEvents();
                                    changeEvents();
                                    function loadEvents() {
                                        if (jQuery.inArray("events", tabsaary) >= 0) {
                                            $('#tabs-e').prop('checked', true);
                                        }
                                        else {
                                            $('#tabs-e').prop('checked', false);
                                        }
                                        if (jQuery.inArray("timeline", tabsaary) >= 0) {
                                            $('#tabs-t').prop('checked', true);
                                        }
                                        else {
                                            $('#tabs-t').prop('checked', false);
                                        }
                                        if (jQuery.inArray("messages", tabsaary) >= 0) {
                                            $('#tabs-m').prop('checked', true);
                                        }
                                        else {
                                            $('#tabs-m').prop('checked', false);
                                        }
                                        $('#fbpagelink').val($parent.find('.fb-page').attr('data-href'));
                                        if ($parent.find('.fb-page').attr('data-hide-cover') === "true") {
                                            $('#fbcvr').prop('checked', true);
                                        }
                                        else {
                                            $('#fbcvr').prop('checked', false);
                                        }
                                        if ($parent.find('.fb-page').attr('data-show-facepile') === "true") {
                                            $('#shofrnd').prop('checked', true);
                                        }
                                        else {
                                            $('#shofrnd').prop('checked', false);
                                        }
                                        if ($parent.find('.fb-page').attr('data-small-header') === "true") {
                                            $('#sHeader').prop('checked', true);
                                        }
                                        else {
                                            $('#sHeader').prop('checked', false);
                                        }
                                        if ($parent.find('.fb-page').attr('data-adapt-container-width') === "true") {
                                            $('#fitwidth').prop('checked', true);
                                        }
                                        else {
                                            $('#fitwidth').prop('checked', false);
                                        }
                                    }
                                    function changeEvents() {
                                        $('#fbpagelink').blur(function () {
                                            data.href = $('#fbpagelink').val();
                                            applyChanges();
                                        })
                                        $('#fbcvr').off().on('click', function () {
                                            if ($(this).is(':checked')) {
                                                data.hidecover = "true";
                                            } else {
                                                data.hidecover = "false";
                                            }
                                            applyChanges();
                                        });
                                        $('#tabs-t').off().on('click', function () {
                                            if ($(this).is(':checked')) {
                                                if (jQuery.inArray("timeline", tabsaary) < 0) {
                                                    tabsaary.push('timeline');
                                                }
                                            } else {
                                                tabsaary.splice($.inArray("timeline", tabsaary), 1);
                                           }
                                            tabs();
                                            applyChanges();
                                        });
                                        $('#tabs-e').off().on('click', function () {
                                            if ($(this).is(':checked')) {
                                                if (jQuery.inArray("events", tabsaary) < 0) {
                                                    tabsaary.push('events');
                                                }
                                            } else {
                                                tabsaary.splice($.inArray("events", tabsaary), 1);
                                            }
                                            tabs();
                                            applyChanges();
                                        });
                                        $('#tabs-m').off().on('click', function () {
                                            if ($(this).is(':checked')) {
                                                if (jQuery.inArray("messages", tabsaary) < 0) {
                                                    tabsaary.push("messages");
                                                }
                                            } else {
                                                tabsaary.splice($.inArray("messages", tabsaary), 1);
                                            }
                                            tabs();
                                            applyChanges();
                                        });
                                        $('#sHeader').off().on('click', function () {
                                            if ($(this).is(':checked')) {
                                                data.smallheader = "true";
                                            } else {
                                                data.smallheader = "false";
                                            }
                                            applyChanges();
                                        });
                                        $('#shofrnd').off().on('click', function () {
                                            if ($(this).is(':checked')) {
                                                data.showfacepile = "true";
                                            } else {
                                                data.showfacepile = "false";
                                            }
                                            applyChanges();
                                        });
                                        $('#fitwidth').off().on('click', function () {
                                            if ($(this).is(':checked')) {
                                                data.containerfit = "true";
                                            } else {
                                                data.containerfit = "false";
                                            }
                                            applyChanges();
                                        });
                                    }
                                    function applyChanges() {
                                        component['Facebook Page'].fbpage.data($activeDOM, data);
                                    }
                                }
                            }
                        }
                        basicsetting.init();
                    }
                },
                "Size": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('FacebookPage/size'),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let $attr = $parent.find('.fb-page');
                        ManualHeightEntryEvents();
                        Width();
                        $('#apply').off().on('click', function () {
                            let data = {
                                "width": $attr.attr('data-width'),
                                "height": $attr.attr('data-height'),
                            }
                            component['Facebook Page'].fbpage.data($activeDOM, data);
                        });

                        //$('#widthsize').off().on('change', function () {
                        //    if ($(this).val() == 'fb-page') {
                        //        $("#selwdthsize").hide();
                        //    }
                        //    else {
                        //        ComponentSize();
                        //    }
                        //});
                        function Width() {
                            let width = $attr.attr('data-width');
                            function datawidth(space) {
                                $attr.attr('data-width', space);
                            }
                            AdvanceSageSlider($('#imagesizeSlider'), $('#imagesizeHandle'), 180, 500, width, datawidth, $parent, 'px');
                        }
                        function ManualHeightEntryEvents() {
                            $('#refresImageWidth').on('click', function () {
                                $attr.attr('data-height',data.height);
                                setTimeout(function () {
                                    var holderheights = $attr.attr('data-height');
                                    ChangeSliderValue($('#imageHeightSlider'), holderheights);
                                }, 500);
                            });
                            var imgHeight = $attr.attr('data-height');

                            function ImageHeight(space) {
                                $attr.attr( 'data-height', space );
                            }
                            AdvanceSageSlider($('#imageHeightSlider'), $('#imageHeightHandle'), 70, 1200, imgHeight, ImageHeight, $parent,'px');
                        }
                    }

                },
                "Spacing": {
                    "custom": true,
                    "DOM": `<div class="field-row">
                             <div id="fbpagemargin"></div>
                              <div id="fbpagepadding"></div>
                               </div>`,
                    "onload": function ($item) {
                        component['Facebook Page'].common.Spacing();
                    }
                },
            },

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
                            <div id="selborder"></div>
                            </div>`,
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        function initBGClr() {
                            $("#selborder").html('');
                            $("#selborder").AdvanceBorder({
                                targetParent: $parent,
                                targetElem: $parent.find('.fb-page'),
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
                             <div id="selshdo"></div>
                               </div>`,
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        function shadow() {
                            $("#selshdo").html('');
                            $("#selshdo").AdvanceBoxShadow({
                                targetParent: $parent,
                                targetElem: $parent.find('.fb-page')
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
                             <div id="fbpagemargin"></div>
                              <div id="fbpagepadding"></div>
                               </div>`,
                    "onload": function () {
                        component['Facebook Page'].common.Spacing();
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
                $("#fbpagemargin,#fbpagepadding").html('');
                $("#fbpagemargin").AdvanceSpacing({
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
                $("#fbpagepadding").AdvanceSpacing({
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