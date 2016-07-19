
// $(function(){

//    $(".row.blog").find(".post-content").each(function(){

//     var created = $(this).find('time').attr('date');
//     var date = created.split(' ', 4).join(' ');

//     var datetobe = moment(date, 'llll');
//     var datemust = datetobe.format('LL');

//     $(this).find('time').attr('date', datemust).text(datemust);

//   })

// });

$(window).bind('load', function(){





// $('#divRss1').find('.feedEkList > li').each(function(){

//  var _url = $(this).find('a').attr('href');

//  $(this).append(_url)

//  $.ajax({
//    async: true,
//    type: 'GET',
//    url: 'http://cors.io/?u='+ _url,
//    beforeSend: function(data){

//       $('#divRss1').find('.feedEkList > li').each(function(){

//         var imgsrc = $(data).find('.field-item.even img').attr('src');

//         $('.had-thumb').find('img').attr('src', imgsrc);

//       })

//       // $(imgsrc).insertBefore('.itemTitle');
//       // $('.feedEkList li').append(imgsrc);



//    }

//  })

// });



})

$(document).ready(function(){

  // $('body').find('a').each(function(){
  //       var href = $(this).attr('href'),
  //           regEx = slug(href);
  //       if( !href.match(regEx) ) {
  //           var index = href.split("/")[1],
  //               path  = slug(href.substr(href.lastIndexOf("/") + 1));
  //           $(this).attr('href', "/" + index +"/"+ path );
  //       }
  //     });
  // function slug(Text) {
  //     return Text
  //         .toLowerCase()
  //         .replace(/[^\w] +/g, '')
  //         .replace(/[{()}]/g, '')
  //         .replace(/ +/g, '-');
  // }

  // $.getJSON('../data/events.json', function (json) {
  //   var array = [];
  //   for (var key in json) {
  //       if (json.hasOwnProperty(key)) {
  //           var item = json[key];
  //           array.push({
  //               month: item.month,
  //               day: item.day,
  //               year: item.year,
  //               title: item.title,
  //               description: item.description
  //           });

  //       }
  //       console.log(item)
  //   }
  //   });


  $('#divRss1').FeedEk({
    FeedUrl: 'http://www.philstar.com/rss/breakingnews',
    MaxCount: 6,
    ShowDesc: false,
    ShowPubDate: true,
    DateFormat: 'LL',
    TitleLinkTarget:'_blank'
  });

  $('#divRss2').FeedEk({
    FeedUrl: 'http://www.philstar.com/rss/business',
    MaxCount: 6,
    ShowDesc: false,
    ShowPubDate: true,
    DateFormat: 'LL',
    TitleLinkTarget:'_blank'
  });

  $('ul.tabs').tabs();

  var submitIcon = $('.searchbox-icon');
  var inputBox = $('.searchbox-input');
  var searchBox = $('.searchbox');
  var isOpen = false;
  submitIcon.click(function() {
      if(isOpen == false){
          searchBox.addClass('searchbox-open');
          inputBox.focus();
          isOpen = true;
      } else {
          searchBox.removeClass('searchbox-open');
          inputBox.focusout();
          isOpen = false;
      }
  });
   submitIcon.mouseup(function(){
          return false;
      });
  searchBox.mouseup(function(){
          return false;
      });
  $(document).mouseup(function(){
          if(isOpen == true){
              $('.searchbox-icon').css('display','block');
              submitIcon.click();
          }
      });



    $('#tipue_search_input').tipuesearch({
          'mode': 'json',
          'contentLocation': 'js/blog.json'
     });

   $(".button-collapse").sideNav();

   $('.dropdown-button').dropdown();

   $('.owl-carousel').owlCarousel({
      loop:false,
      margin:0,
      nav:false,
      items: 1,
      lazyLoad: true,
      center: true,
      mergeFit:true
   })



});

function buttonUp(){
  var inputVal = $('.searchbox-input').val();
  inputVal = $.trim(inputVal).length;
  if( inputVal !== 0){
      $('.searchbox-icon').css('display','none');
  } else {
      $('.searchbox-input').val('');
      $('.searchbox-icon').css('display','block');
  }
}


// $(function() {

//   var transEndEventNames = {
//       'WebkitTransition' : 'webkitTransitionEnd',
//       'MozTransition' : 'transitionend',
//       'OTransition' : 'oTransitionEnd',
//       'msTransition' : 'MSTransitionEnd',
//       'transition' : 'transitionend'
//     },
//     transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
//     $wrapper = $( '#custom-inner' ),
//     $calendar = $( '#calendar' ),
//     cal = $calendar.calendario( {
//       onDayClick : function( $el, $contentEl, dateProperties ) {

//         if( $contentEl.length > 0 ) {
//           showEvents( $contentEl, dateProperties );
//         }

//       },
//       caldata : codropsEvents,
//       displayWeekAbbr : true
//     } ),
//     $month = $( '#custom-month' ).html( cal.getMonthName() ),
//     $year = $( '#custom-year' ).html( cal.getYear() );

//   $( '#custom-next' ).on( 'click', function() {
//     cal.gotoNextMonth( updateMonthYear );
//   } );
//   $( '#custom-prev' ).on( 'click', function() {
//     cal.gotoPreviousMonth( updateMonthYear );
//   } );

//   function updateMonthYear() {
//     $month.html( cal.getMonthName() );
//     $year.html( cal.getYear() );
//   }

//   // just an example..
//   function showEvents( $contentEl, dateProperties ) {

//     hideEvents();

//     var $events = $( '<div id="custom-content-reveal" class="custom-content-reveal"><h4>Events for ' + dateProperties.monthname + ' ' + dateProperties.day + ', ' + dateProperties.year + '</h4></div>' ),
//       $close = $( '<span class="custom-content-close"></span>' ).on( 'click', hideEvents );

//     $events.append( $contentEl.html() , $close ).insertAfter( $wrapper );

//     setTimeout( function() {
//       $events.css( 'top', '0%' );
//     }, 25 );

//   }
//   function hideEvents() {

//     var $events = $( '#custom-content-reveal' );
//     if( $events.length > 0 ) {

//       $events.css( 'top', '100%' );
//       Modernizr.csstransitions ? $events.on( transEndEventName, function() { $( this ).remove(); } ) : $events.remove();

//     }

//   }

// });





