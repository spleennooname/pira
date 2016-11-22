define([

    "domready",

    "fire",

    "tweenmax",

    "feature",

    "hammer",

    "classie"
    /*"require"*/

], function (domReady,

	fire,

	TweenMax,

	feature,

	Hammer,

	classie
	/*, require*/
) {

	"use strict";

	function Pira() {


	}

	var is_touch,

		tm_intro,

		li_w, li_b,

		/* helpers */

		attr = function (el, attr) {
			if (typeof el.attributes[attr] === 'undefined') {
				return el.getAttribute(attr);
			} else {
				return el.attributes[attr].nodeValue;
			}
		},

		set_attr = function (ele, attr, value) {
			if (typeof ele.attributes[attr] === 'undefined') {

				ele.attributes[attr] = value;

			} else {

				ele.attributes[attr].nodeValue = value
			}

		},

		addEvent = function (el, type, listener, useCapture) {
			if (el.addEventListener) {
				el.addEventListener(type, listener, useCapture);
				return {
					destroy: function () { el.removeEventListener(type, listener, useCapture); }
				};
			} else {
				// see: http://stackoverflow.com/questions/5198845/javascript-this-losing-context-in-ie
				var handler = function (e) { listener.handleEvent(window.event, listener); }
				el.attachEvent('on' + type, handler);
				return {
					destroy: function () { el.detachEvent('on' + type, handler); }
				}
			}
		},

		_get_el = function (e) {

			var target = typeof e.srcEvent === "undefined" ? e.target : e.srcEvent;

			if (target.nodeName.toLowerCase() === "li") {
				return target.childNodes[1]
			} else
			if (target.nodeName.toLowerCase() === "span") {
				return target.parentNode;
			} else
			if (target.nodeName.toLowerCase() === "a") {
				return target
			}
		},

		/* over */

		over_1liv = function (el, cb_fn) {

			var a = el;

			a.textContent = attr(a, "data-hover");

			TweenMax.fromTo(a, .7, {
				rotationX: 0,
				opacity: 0
			}, {
				rotationX: 360,
				opacity: .5,
				ease: Quint.easeInOut,
				onComplete: cb_fn
			});
		},

		out_1liv = function (el, cb_fn) {

			var a = el;

			a.textContent = attr(a, "data-title");

			TweenMax.fromTo(a, .5, {
				rotationX: 90,
				opacity: .5,
				scaleY: .8,
				scaleX: .8
			}, {
				rotationX: 0,
				opacity: 1,
				scaleY: 1,
				scaleX: 1,
				ease: Quint.easeInOut,
				onCompleteParams: [a],
				onComplete: cb_fn
			});
		},

		over_exp = function (el, cb_fn) {

			var a = el;

			a.innerHTML = attr(a, "data-hover").replace(/./g, "<span>$&</span>").replace(/\s/g, "/");

			TweenMax.fromTo(a, .7, {
				perspective: 800,
				transformOrigin: "50% 25%",
				rotationX: -90,
				height: 22 * 2
			}, {
				height: (22 + 3) * 4,
				rotationX: 0,
				backgroundColor: "rgba(0,0,0,1)",
				color: "#fff",
				padding: ".5em 0",
				ease: Quint.easeOut
			});

			TweenMax.staggerFromTo(a.querySelectorAll("span"), 0.25, {
				delay: .35,
				opacity: 0,
				transformOrigin: "left top",
				rotation: 90
			}, {
				opacity: 1,
				rotation: 0,
				ease: Quad.easeInOut,
				onComplete: cb_fn
			}, 0.1);
		},

		out_exp = function (el, cb_fn) {

			var a = el;

			a.innerHTML = attr(a, "data-title");

			TweenMax.to(a, .7, {
				transformOrigin: "50% top",
				rotationX: 0,
				height: 22,
				padding: 0,
				color: "#111",
				backgroundColor: "rgba(0,0,0,0)",
				ease: Quint.easeOut,
				onCompleteParams: [a],
				onComplete: cb_fn
			});
		},

		intro = function (cb_fn) {

			tm_intro = new TimelineMax({ onComplete: cb_fn });

			tm_intro

				.set([".caption", ".where>li", ".links>h3", ".boudoir>li"], {
				autoAlpha: 0
			})

			.fromTo(".caption", .75, {
				delay: 3,
				autoAlpha: 0,
				rotationX: -20,
				transformOrigin: "50% 20%",
				marginTop: -10
			}, {
				rotationX: 0,
				marginTop: 0,
				autoAlpha: 1,
				ease: Quint.easeInOut
			})

			.staggerFromTo(li_w, .5, {
				autoAlpha: 0,
				scaleX: .8,
				scaleY: .8,
				rotationY: 20,
				transformOrigin: "50% 20%",
				rotationX: -10
			}, {
				scaleX: 1,
				scaleY: 1,
				autoAlpha: 1,
				transformOrigin: "50% 20%",
				rotationY: 0,
				ease: Quint.easeOut
			}, .25, "+=.25")

			.fromTo(".links>h3.a", .5, {
				autoAlpha: 0
			}, {
				autoAlpha: 1,
				ease: Quint.easeOut
			})

			.staggerFromTo(li_b, .65, {
				autoAlpha: 0,
				marginLeft: -10,
				scaleX: .85,
				scaleY: .85
			}, {
				scaleX: 1,
				scaleY: 1,
				marginLeft: 0,
				autoAlpha: 1,
				ease: Quint.easeOut
			}, .25)

			.fromTo(".links > h3.b", 1, {
				autoAlpha: 0
			}, {
				autoAlpha: 1,
				ease: Quint.easeOut
			})

			.play();

		},

		ready = function () {

			CSSPlugin.defaultTransformPerspective = 800;

			is_touch = feature.touch;

			TweenMax.set([".caption", ".where>li", ".links>h3", ".boudoir>li"], {
				autoAlpha: 0
			})

			li_b = document.querySelectorAll(".boudoir>li");
			li_w = document.querySelectorAll(".where>li");

			if (is_touch) {

				li_w.forEach(function (el, i) {
					var hm;

					var url = attr(el, "href");
					set_attr(el, "href", "javascript:void(0);");
					el.setAttribute("data-href", url);

					var hm = new Hammer(el, { domEvents: true })

					hm.on("tap press", function (e) {
						var el = _get_el(e);
						if (!classie.has(el, "active")) {
							classie.add(el, "active");
							over_1liv(el, function () {

							}.bind(this));
						} else {
							out_1liv(el, function () {

								classie.remove(el, "active");

							}.bind(this));
						}
					});
					hm.on("doubletap", function (e) {
						window.location.href = url
					}.bind(this));
				})



				li_b.forEach(function (el, i) {

					var a = el.childNodes[1];
					//console.log(a)
					var url = attr(a, "href");
					set_attr(a, "href", "javascript:void(0);");
					a.setAttribute("data-href", url);

					var hm = new Hammer(el, { domEvents: true })

					hm.on("tap press", function (e) {
						var el = _get_el(e);
						if (!classie.has(el, "active")) {
							classie.add(el, "active");
							over_exp(el, function () {}.bind(this));
						} else {
							out_exp(el, function () {
								classie.remove(el, "active");
							}.bind(this));
						}
					});
					hm.on("doubletap", function (e) {
						window.location.href = url
					}.bind(this));
				});

			} else {

				li_w.forEach(function (el, i) {
					addEvent(el, "mouseenter", function (e) {
						over_1liv(_get_el(e))
					}, false);
					addEvent(el, "mouseleave", function (e) {
						out_1liv(_get_el(e))
					}, false);
				})

				li_b.forEach(function (el, i) {
					addEvent(el, "mouseenter", function (e) {
						over_exp(_get_el(e))
					}, false);
					addEvent(el, "mouseleave", function (e) {
						out_exp(_get_el(e))
					}, false);
				})
			}

			intro(init);

		},

		init = function () {





		},

		onload = function (results) {


		}

	domReady(ready);

	return Pira;

});
