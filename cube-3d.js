/**
 * Cube 3D demo.
 * 
 */
(function () {
    'use strict';

    Wings.run(function () {
        var view = new Wings.View(document.getElementById('cube-3d'));

        view.backgroundColor('white');
        view.borderColor('black');

        /**
         * Cube3D
         * 
         * Component that renders a cube in 3D and rotates it.
         * 
         */
        var Cube3D = Wings.Panel.extend({
            init: function Cube3D() {

                this._super();

                var cube = this;

                cube._pts = [
                    [],
                    []
                ];

                var side = 100;

                var pts = cube._pts[0];

                pts.push(M.p(0, 0, 0));
                pts.push(M.p(0, side, 0));
                pts.push(M.p(side, side, 0));
                pts.push(M.p(side, 0, 0));

                pts = cube._pts[1];

                pts.push(M.p(0, 0, side));
                pts.push(M.p(0, side, side));
                pts.push(M.p(side, side, side));
                pts.push(M.p(side, 0, side));

                for (var i in cube._pts) {
                    pts = cube._pts[i];
                    M.t(pts, -side / 2, -side / 2, -side / 2);
                    M.rzd(pts, 55);
                    M.rxd(pts, 60);
                }

                view.refresh();

                setInterval(function() {
                    for (var i in cube._pts) {
                        pts = cube._pts[i];
                        M.rxd(pts, 1);
                        M.ryd(pts, -1);
                        M.rzd(pts, 1);
                    }
                    view.refresh();
                }, 10);

            },

            draw: function (ctx) {
                ctx.save();
                ctx.beginPath();
                for (var j in this._pts) {
                    var pts = this._pts[j];
                    var pti = pts[0],
                        pt;
                    ctx.moveTo(pti.x, pti.y);
                    for (var i in pts) {
                        pt = pts[i];
                        ctx.lineTo(pt.x, pt.y);
                    }
                    ctx.lineTo(pti.x, pti.y);
                }
                var pts0 = this._pts[0],
                    pts1 = this._pts[1];
                for (var k in pts0) {
                    var pt0 = pts0[k];
                    var pt1 = pts1[k];
                    ctx.moveTo(pt0.x, pt0.y);
                    ctx.lineTo(pt1.x, pt1.y);
                }
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                ctx.stroke();
                ctx.restore();
            }

        });

        var cube = new Cube3D();

        cube.location((view.width() - cube.width()) / 2, (view.height() - cube
            .height()) / 2);

        view.add(cube);

    });
})();