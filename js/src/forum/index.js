/*
 * This file is part of malago/flarum-linkpreview
 *
 *  Copyright (c) 2021 Miguel A. Lago
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE file that was distributed with this source code.
 */

import { extend } from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';


app.initializers.add('malago-livepreview', app => {

  extend(CommentPost.prototype, 'oncreate', function (x, isInitialized, context) {
    $(".Post-body").find('a').not(".linkpreview").each((i, e) => {
      var href = e.getAttribute("href");

      e.classList.add("linkpreview");
      if (!e.text.startsWith("http")) return;
      var $s = $("<a>");
      $s.addClass("linkpreview");
      $s.attr("href", href);
      $s.attr("target", "_blank");
      $s.html('<div class="livepreview-container">\
      <div class="livepreview-box">\
        <img class="livepreview-myimage" src="">\
        <div class="livepreview-is-clipped">\
          <div class="livepreview-mytitle" ></div>\
          <div class="livepreview-mydescription" ></div>\
          <div class="livepreview-myurl" ></div>\
        </div>\
      </div>\
    </div>');
      
      fetch(`https://meta-grabber.herokuapp.com?url=`+encodeURIComponent(href), {
        method: "GET",
        mode: "cors",
        credentials: "omit"
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.error === undefined && response.title != "") {
            
            e.replaceWith($s[0]);
            $s.find(".livepreview-mytitle").html(response.title);
            $s.find(".livepreview-mydescription").html(response.description);
            $s.find(".livepreview-myimage").attr("src", response.image);
            $s.find(".livepreview-myurl").html(response.url);
          }
        });
    });
  });
});
