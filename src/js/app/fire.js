define(["feature"], function (feature) {

	'use strict';

	function Fire() {

	}

	var w = 100,
		h = 100,
		fps = 60,
		now = 0,
		last = 0,
		elapsed = 0,
		a_stop_colors = ['rgba(0, 0, 0, 0.6)', 'rgba(50, 0, 0, 0.6)', 'rgba(100, 0, 0, 0.6)', 'rgba(200, 0, 0, 0.6)', 'rgba(255, 255, 255, 0.8)'];

	var v, b, r, t, m, s, q, m, x, z, y, p, c, d, g, l, u, e, n, o, a, i,

		render = function () {
			requestAnimationFrame(render);
			last = now;
			now = Date.now();
			elapsed += now - last;
			if (elapsed > (1000 / fps)) {
				elapsed = 0;
				fire();
			}
		},

		burning = function (a_colors) {

			var a = [0.6, 0.6, 0.6, 0.6, 0.8];

			for (v = [
                     b = [
                        r = [
                             t = [
                                m = [
                                     s = [x = document],
                                    [q = Math],
                                    [x.body.appendChild(z = x.createElement('div'))]
                                ]
                            ]
                        ]
                    ],
                    [
                        [0, y = i = 999, p = 0],
                        [0, h, i],
                        [0, 0, h * 2]
                    ],
                    [
                        [24, w, y],
                        [32, w, y],
                        [24, w, y]
                    ]
                ]; i--;) b[i] = q.random();

			var att = x.createAttribute("class");
			att.value = "fire";
			x.getElementsByTagName("div")[0].setAttributeNode(att);

			var cl = x.createAttribute("class");
			cl.value = "bg";
			z.setAttributeNode(cl);

			for (i = 3; i--;)
				c = t[i] = x.createElement('canvas'),
				d = c.style,
				c.width = w,
				d.width = w * 2,
				c.height = h,
				d.height = h * 2,
				d = r[i] = c.getContext('2d'),
				d.fillStyle = "#000000",
				d.fillRect(0, 0, w, h),
				s[i] = d.getImageData(0, 0, w, 1);
			g = [z.appendChild(c), d.globalCompositeOperation, 'lighter'];

			z = d.createLinearGradient(0, 0, 0, h);
			z.addColorStop(0.00, r[2].fillStyle = a_colors[0]);
			z.addColorStop(0.25, r[1].fillStyle = a_colors[1]);
			z.addColorStop(0.50, r[0].fillStyle = a_colors[2]);
			z.addColorStop(0.75, r[2].fillStyle = a_colors[3]);
			z.addColorStop(1.00, r[0].fillStyle = a_colors[4]);
			d.fillStyle = z;

			var id = x.createAttribute("id");
			id.value = "flame";
			x.getElementsByTagName("canvas")[0].setAttributeNode(id);

			render();

		},

		fire = function () {

			for (i = 3; --i;)
				for (x = z = w + i * h - h; x--;)
					for (m[i][x] = 0, l = 2, u = 5; u--; l *= 2) e = 1 << (u + 6 - i * 2),
						n = p / i / e,
						o = x / e,
						m[i][x] += ((e = (a = b[((e = z * (n >> 0) + o) >> 0) % y]) + (b[(e + .999 >> 0) % y] - a) * (-q.cos(o % 1 * q.PI) / 2 + 1 / 2)) + (-e + (a = b[((e = z * (n + .999 >> 0) + o) >> 0) % y]) + (b[(e + .999 >> 0) % y] - a) * (-q.cos(o % 1 * q.PI) / 2 + 1 / 2)) * (-q.cos(n % 1 * q.PI) / 2 + 1 / 2)) / l;
			for (i = 3; --i;)
				for (x = w; x--;)
					for (e = m[2][x + m[1][x] * h >> 0] - .2, u = 3; u--;) n = v[i][u],
						s[i].data[x * 4 + u] = q.max(0, q.min(255, e * n[1] + e * e * n[2] - n[0]));
			for (i = 3; --i;) r[i].drawImage(t[i], 0, 0, w, h, 0, -4, w, h + 2),
				r[i].putImageData(s[i], 0, h - 1),
				r[i].putImageData(s[i], 0, h - 2);
			r[i].clearRect(0, 0, w, h);
			for (i = 3; --i;) {
				d.drawImage(t[i], 0, 0),
					d.globalCompositeOperation = g[i];
			}
			d.fillRect(0, 0, w, h);
			p++;
		}

	Fire.prototype = {

		constructor: Fire,

		start: function () {
			burning(a_stop_colors);

		}

	}

	new Fire().start();


	return Fire;

});
