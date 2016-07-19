/*
* FeedEk jQuery RSS/ATOM Feed Plugin v3.0 with YQL API
* http://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL http://www.enginkizil.com
*/

(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = $.extend({
            FeedUrl: "http://jquery-plugins.net/rss",
            MaxCount: 5,
            ShowDesc: true,
            ShowPubDate: true,
            DescCharacterLimit: 0,
            TitleLinkTarget: "_blank",
            DateFormat: "",
            DateFormatLang:"en"
        }, opt);

        var id = $(this).attr("id"), i, s = "",dt;
        $("#" + id).empty().append('<div class="loader center"><img src="img/ajax-loader.gif" /></div>');

        var YQLstr = 'SELECT channel.item FROM feednormalizer WHERE output="rss_2.0" AND url ="' + def.FeedUrl + '" LIMIT ' + def.MaxCount;

        $.ajax({
            url: "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(YQLstr) + "&format=json&diagnostics=true&callback=?",
            dataType: "json",
            success: function (data) {
                $("#" + id).empty();
                $.each(data.query.results.rss, function (e, itm) {
                    s += '<li><div class="itemTitle"><a href="' + itm.channel.item.link + '" target="' + def.TitleLinkTarget + '" >' + itm.channel.item.title + '</a></div>';



                    if (def.ShowPubDate){
                        dt = new Date(itm.channel.item.pubDate);
                        s += '<div class="itemDate fa fa-calendar">';
                        if ($.trim(def.DateFormat).length > 0) {
                            try {
                                moment.lang(def.DateFormatLang);
                                s += moment(dt).format(def.DateFormat);
                            }
                            catch (e){s += dt.toLocaleDateString();}
                        }
                        else {
                            s += dt.toLocaleDateString();
                        }
                        s += '</div>';
                    }
                    if (def.ShowDesc) {
                        s += '<div class="itemContent">';
                         if (def.DescCharacterLimit > 0 && itm.channel.item.description.length > def.DescCharacterLimit) {
                            s += itm.channel.item.description.substring(0, def.DescCharacterLimit) + '...';
                        }
                        else {
                            s += itm.channel.item.description;
                         }
                         s += '</div>';
                    }


                    // console.log(itm.channel.item.link);

                    // $.ajax({

                    //     type: 'GET',
                    //     async: false,
                    //     url: "http://cors.io/?u=" + itm.channel.item.link,
                    //     success: function(data){
                    //         var _imgsrc = $(data).find(".field-item.even img").attr("src");
                    //         console.log("image here" +""+_imgsrc);


                    //     }

                    // })


                });
                $("#" + id).append('<ul class="feedEkList">' + s + '</ul>');
            },
            complete: function(){
                // setTimeout(function(){


                //         $('#divRss1 .feedEkList > li').each(function(){

                //             var _url = $(this).find('a').attr('href');


                //             $(this).parents('.feedEkList').find(' > li').append('<p>'+_url+'</p>');

                //         })


                // }, 3000)

            }
        });
    };
})(jQuery);