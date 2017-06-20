$(function($) {
  var board = $("div.board"),
    info = $("div.info"),
    result = $("div.result"),
    new_game = $("button.new-game"),
    x_player = result.find("span.x-pl"),
    o_player = result.find("span.o-pl"),
    row = board.find("div.row"),
    i = 0,
    row_len = row.length,
    win,
    c,
    o_pl = o_pl || 0,
    x_pl = x_pl || 0;

  function winer(x, y, z) {
    if (x.text() == "X" && y.text() == "X" && z.text() == "X") {
      win = "X";
      x_pl++;
    } else if (x.text() == "O" && y.text() == "O" && z.text() == "O") {
      win = "O";
      o_pl++;
    }
    if (win) {
      new_game.removeAttr("disabled");
      info.text("The winer is: " + win);

      o_player.text("The X Player Score: " + x_pl);
      x_player.text("The O Player Score: " + o_pl + " / ");

      row.css({ background: "#FF4136" });

      row.unbind("click");
      i--;
      win = '';
    }
  }

  /* the callbakc function for the event */
  function myFunc(e) {
    var self = $(this),
      out,
      curr_el = self.index();
    /* STOP THE EVENT FROM  BUBLING */
    e.stopImmediatePropagation();
    /* Remove the event from the current element */
    self.off("click");
    self.css({ opacity: 0.8 });
    /* Check if it is odd or even */
    if (i = i % 2) {
      /* If is odd  */
      out = "O";
    } else {
      /* if is even */
      out = "X";
    }
    /* alert(i); */
    i++;
    self.text(out);
    winer(row.eq(0), row.eq(1), row.eq(2));
    winer(row.eq(3), row.eq(4), row.eq(5));
    winer(row.eq(6), row.eq(7), row.eq(8));
    winer(row.eq(0), row.eq(4), row.eq(8));
    winer(row.eq(2), row.eq(4), row.eq(6));
    winer(row.eq(0), row.eq(3), row.eq(6));
    winer(row.eq(1), row.eq(4), row.eq(7));
    winer(row.eq(2), row.eq(5), row.eq(8));
  }

  /* start the event on click */

  row.on("click", myFunc);

  new_game.on("click", function() {
    row.each(function() {
      $(this).text("");
    });
    row.on("click", myFunc);
    row.css({
      background: "#001f3f",
      opacity: 1
    });
    info.text("The winer is: " + win);
    i = 0;
  });
});
