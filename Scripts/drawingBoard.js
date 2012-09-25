/*! rf.drawingBoard() DrawingBoard builder using Raphael in JS. Authors & copyright (c) 2012: Ryan Fiorini. Dual MIT/BSD license */
window.rf = window.rf || {};

window.rf.drawingBoard = (function () {
    "use strict";

    var paper = null;

    return {
        options: {
            MAX_ROWS: 70,
            MAX_COLS: 40,
            mouseDown: 0
        },
        setCanvas: function (canvas) {
            var that = this;
            paper = Raphael(document.getElementById(canvas), 700, 800);

            document.body.onmousedown = function () {
                ++that.options.mouseDown;
            }
            document.body.onmouseup = function () {
                --that.options.mouseDown;
            }
        },
        buioldBoard: function () {
            var that = this;
            for (var i = 0; i < this.options.MAX_ROWS; i++) {
                //circles[i] = new Array(MAX_COLS);
                for (var j = 0; j < this.options.MAX_COLS; j++) {
                    //circles[i][j] = new Circle(i, j, false);
                    (function (dx, dy, R, value) {
                        // initial color of the circle
                        var color = Raphael.rgb2hsb("#eee");

                        var circleSize = 3;

                        var anim = Raphael.animation({ cx: (circleSize * 2.5) * (i + 1), cy: (circleSize * 2.5) * (j + 1) }, 2e3);
                        var circle = paper.circle((circleSize * 2), (circleSize * 2), circleSize).attr({ stroke: "none", fill: color, id: "circle_" + i + "_" + j }).animate(anim);
                        circle[0].onmouseover = function () {
                            circle.attr("fill", currentColor);
                            if (that.options.mouseDown)
                                color = currentColor;
                        };
                        circle[0].onmouseout = function () {
                            circle.attr("fill", color);
                        };
                        circle[0].onclick = function () {
                            circle.attr("fill", currentColor);
                            color = currentColor;
                        };
                    })()
                }
            }
        }
    };
})();