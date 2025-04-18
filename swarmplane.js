import {
    EventDispatcher as Tt,
    Vector3 as j,
    MOUSE as J,
    TOUCH as ee,
    Quaternion as Xe,
    Spherical as Ze,
    Vector2 as _,
    WebGLRenderer as bt,
    PerspectiveCamera as Qe,
    Scene as $e,
    PointLight as zt,
    DirectionalLight as Pt,
    AmbientLight as Ct,
    Color as q,
    OrthographicCamera as ze,
    PlaneGeometry as ne,
    ShaderMaterial as Y,
    Mesh as fe,
    Camera as Et,
    WebGLRenderTarget as se,
    RGBAFormat as Ke,
    DataTexture as Dt,
    FloatType as Je,
    NearestFilter as ve,
    ClampToEdgeWrapping as et,
    HalfFloatType as he,
    BufferGeometry as pe,
    AdditiveBlending as tt,
    Points as _t,
    MathUtils as xe,
    InstancedBufferAttribute as le,
    DoubleSide as Ce,
    MeshBasicMaterial as Me,
    MeshStandardMaterial as Ee,
    InstancedMesh as De,
    Float32BufferAttribute as te,
    UniformsUtils as _e,
    Clock as At,
    SphereGeometry as Nt,
    OctahedronGeometry as It,
    ConeGeometry as kt,
    CapsuleGeometry as Ot,
    BoxGeometry as Ut,
} from "https://unpkg.com/three@0.140.0/build/three.module.js";
const at = { type: "change" },
    Re = { type: "start" },
    rt = { type: "end" };
class Ft extends Tt {
    constructor(e, t) {
        super(),
            void 0 === t && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),
            t === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),
            (this.object = e),
            (this.domElement = t),
            (this.domElement.style.touchAction = "none"),
            (this.enabled = !0),
            (this.target = new j()),
            (this.minDistance = 0),
            (this.maxDistance = 1 / 0),
            (this.minZoom = 0),
            (this.maxZoom = 1 / 0),
            (this.minPolarAngle = 0),
            (this.maxPolarAngle = Math.PI),
            (this.minAzimuthAngle = -1 / 0),
            (this.maxAzimuthAngle = 1 / 0),
            (this.enableDamping = !1),
            (this.dampingFactor = 0.05),
            (this.enableZoom = !0),
            (this.zoomSpeed = 1),
            (this.enableRotate = !0),
            (this.rotateSpeed = 1),
            (this.enablePan = !0),
            (this.panSpeed = 1),
            (this.screenSpacePanning = !0),
            (this.keyPanSpeed = 7),
            (this.autoRotate = !1),
            (this.autoRotateSpeed = 2),
            (this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }),
            (this.mouseButtons = { LEFT: J.ROTATE, MIDDLE: J.DOLLY, RIGHT: J.PAN }),
            (this.touches = { ONE: ee.ROTATE, TWO: ee.DOLLY_PAN }),
            (this.target0 = this.target.clone()),
            (this.position0 = this.object.position.clone()),
            (this.zoom0 = this.object.zoom),
            (this._domElementKeyEvents = null),
            (this.getPolarAngle = function () {
                return a.phi;
            }),
            (this.getAzimuthalAngle = function () {
                return a.theta;
            }),
            (this.getDistance = function () {
                return this.object.position.distanceTo(this.target);
            }),
            (this.listenToKeyEvents = function (e) {
                e.addEventListener("keydown", q), (this._domElementKeyEvents = e);
            }),
            (this.saveState = function () {
                r.target0.copy(r.target), r.position0.copy(r.object.position), (r.zoom0 = r.object.zoom);
            }),
            (this.reset = function () {
                r.target.copy(r.target0), r.object.position.copy(r.position0), (r.object.zoom = r.zoom0), r.object.updateProjectionMatrix(), r.dispatchEvent(at), r.update(), (i = n.NONE);
            }),
            (this.update = (function () {
                const t = new j(),
                    h = new Xe().setFromUnitVectors(e.up, new j(0, 1, 0)),
                    d = h.clone().invert(),
                    m = new j(),
                    p = new Xe(),
                    v = 2 * Math.PI;
                return function () {
                    const e = r.object.position;
                    t.copy(e).sub(r.target),
                        t.applyQuaternion(h),
                        a.setFromVector3(t),
                        r.autoRotate && i === n.NONE && S(((2 * Math.PI) / 60 / 60) * r.autoRotateSpeed),
                        r.enableDamping ? ((a.theta += s.theta * r.dampingFactor), (a.phi += s.phi * r.dampingFactor)) : ((a.theta += s.theta), (a.phi += s.phi));
                    let f = r.minAzimuthAngle,
                        g = r.maxAzimuthAngle;
                    return (
                        isFinite(f) &&
                            isFinite(g) &&
                            (f < -Math.PI ? (f += v) : f > Math.PI && (f -= v),
                            g < -Math.PI ? (g += v) : g > Math.PI && (g -= v),
                            (a.theta = f <= g ? Math.max(f, Math.min(g, a.theta)) : a.theta > (f + g) / 2 ? Math.max(f, a.theta) : Math.min(g, a.theta))),
                        (a.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, a.phi))),
                        a.makeSafe(),
                        (a.radius *= l),
                        (a.radius = Math.max(r.minDistance, Math.min(r.maxDistance, a.radius))),
                        !0 === r.enableDamping ? r.target.addScaledVector(c, r.dampingFactor) : r.target.add(c),
                        t.setFromSpherical(a),
                        t.applyQuaternion(d),
                        e.copy(r.target).add(t),
                        r.object.lookAt(r.target),
                        !0 === r.enableDamping ? ((s.theta *= 1 - r.dampingFactor), (s.phi *= 1 - r.dampingFactor), c.multiplyScalar(1 - r.dampingFactor)) : (s.set(0, 0, 0), c.set(0, 0, 0)),
                        (l = 1),
                        !!(u || m.distanceToSquared(r.object.position) > o || 8 * (1 - p.dot(r.object.quaternion)) > o) && (r.dispatchEvent(at), m.copy(r.object.position), p.copy(r.object.quaternion), (u = !1), !0)
                    );
                };
            })()),
            (this.dispose = function () {
                r.domElement.removeEventListener("contextmenu", X),
                    r.domElement.removeEventListener("pointerdown", U),
                    r.domElement.removeEventListener("pointercancel", H),
                    r.domElement.removeEventListener("wheel", Y),
                    r.domElement.removeEventListener("pointermove", B),
                    r.domElement.removeEventListener("pointerup", V),
                    null !== r._domElementKeyEvents && r._domElementKeyEvents.removeEventListener("keydown", q);
            });
        const r = this,
            n = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 };
        let i = n.NONE;
        const o = 1e-6,
            a = new Ze(),
            s = new Ze();
        let l = 1;
        const c = new j();
        let u = !1;
        const h = new _(),
            d = new _(),
            m = new _(),
            p = new _(),
            v = new _(),
            f = new _(),
            g = new _(),
            x = new _(),
            b = new _(),
            T = [],
            w = {};
        function y() {
            return Math.pow(0.95, r.zoomSpeed);
        }
        function S(e) {
            s.theta -= e;
        }
        function z(e) {
            s.phi -= e;
        }
        const C = (function () {
                const e = new j();
                return function (t, r) {
                    e.setFromMatrixColumn(r, 0), e.multiplyScalar(-t), c.add(e);
                };
            })(),
            E = (function () {
                const e = new j();
                return function (t, n) {
                    !0 === r.screenSpacePanning ? e.setFromMatrixColumn(n, 1) : (e.setFromMatrixColumn(n, 0), e.crossVectors(r.object.up, e)), e.multiplyScalar(t), c.add(e);
                };
            })(),
            M = (function () {
                const e = new j();
                return function (t, n) {
                    const i = r.domElement;
                    if (r.object.isPerspectiveCamera) {
                        const o = r.object.position;
                        e.copy(o).sub(r.target);
                        let a = e.length();
                        (a *= Math.tan(((r.object.fov / 2) * Math.PI) / 180)), C((2 * t * a) / i.clientHeight, r.object.matrix), E((2 * n * a) / i.clientHeight, r.object.matrix);
                    } else
                        r.object.isOrthographicCamera
                            ? (C((t * (r.object.right - r.object.left)) / r.object.zoom / i.clientWidth, r.object.matrix), E((n * (r.object.top - r.object.bottom)) / r.object.zoom / i.clientHeight, r.object.matrix))
                            : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), (r.enablePan = !1));
                };
            })();
        function P(e) {
            r.object.isPerspectiveCamera
                ? (l /= e)
                : r.object.isOrthographicCamera
                ? ((r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom * e))), r.object.updateProjectionMatrix(), (u = !0))
                : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (r.enableZoom = !1));
        }
        function R(e) {
            r.object.isPerspectiveCamera
                ? (l *= e)
                : r.object.isOrthographicCamera
                ? ((r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / e))), r.object.updateProjectionMatrix(), (u = !0))
                : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (r.enableZoom = !1));
        }
        function A(e) {
            h.set(e.clientX, e.clientY);
        }
        function D(e) {
            p.set(e.clientX, e.clientY);
        }
        function L() {
            if (1 === T.length) h.set(T[0].pageX, T[0].pageY);
            else {
                const e = 0.5 * (T[0].pageX + T[1].pageX),
                    t = 0.5 * (T[0].pageY + T[1].pageY);
                h.set(e, t);
            }
        }
        function O() {
            if (1 === T.length) p.set(T[0].pageX, T[0].pageY);
            else {
                const e = 0.5 * (T[0].pageX + T[1].pageX),
                    t = 0.5 * (T[0].pageY + T[1].pageY);
                p.set(e, t);
            }
        }
        function F() {
            const e = T[0].pageX - T[1].pageX,
                t = T[0].pageY - T[1].pageY,
                r = Math.sqrt(e * e + t * t);
            g.set(0, r);
        }
        function k(e) {
            if (1 == T.length) d.set(e.pageX, e.pageY);
            else {
                const t = Z(e),
                    r = 0.5 * (e.pageX + t.x),
                    n = 0.5 * (e.pageY + t.y);
                d.set(r, n);
            }
            m.subVectors(d, h).multiplyScalar(r.rotateSpeed);
            const t = r.domElement;
            S((2 * Math.PI * m.x) / t.clientHeight), z((2 * Math.PI * m.y) / t.clientHeight), h.copy(d);
        }
        function N(e) {
            if (1 === T.length) v.set(e.pageX, e.pageY);
            else {
                const t = Z(e),
                    r = 0.5 * (e.pageX + t.x),
                    n = 0.5 * (e.pageY + t.y);
                v.set(r, n);
            }
            f.subVectors(v, p).multiplyScalar(r.panSpeed), M(f.x, f.y), p.copy(v);
        }
        function I(e) {
            const t = Z(e),
                n = e.pageX - t.x,
                i = e.pageY - t.y,
                o = Math.sqrt(n * n + i * i);
            x.set(0, o), b.set(0, Math.pow(x.y / g.y, r.zoomSpeed)), P(b.y), g.copy(x);
        }
        function U(e) {
            !1 !== r.enabled &&
                (0 === T.length && (r.domElement.setPointerCapture(e.pointerId), r.domElement.addEventListener("pointermove", B), r.domElement.addEventListener("pointerup", V)),
                (function (e) {
                    T.push(e);
                })(e),
                "touch" === e.pointerType
                    ? (function (e) {
                          switch ((G(e), T.length)) {
                              case 1:
                                  switch (r.touches.ONE) {
                                      case ee.ROTATE:
                                          if (!1 === r.enableRotate) return;
                                          L(), (i = n.TOUCH_ROTATE);
                                          break;
                                      case ee.PAN:
                                          if (!1 === r.enablePan) return;
                                          O(), (i = n.TOUCH_PAN);
                                          break;
                                      default:
                                          i = n.NONE;
                                  }
                                  break;
                              case 2:
                                  switch (r.touches.TWO) {
                                      case ee.DOLLY_PAN:
                                          if (!1 === r.enableZoom && !1 === r.enablePan) return;
                                          r.enableZoom && F(), r.enablePan && O(), (i = n.TOUCH_DOLLY_PAN);
                                          break;
                                      case ee.DOLLY_ROTATE:
                                          if (!1 === r.enableZoom && !1 === r.enableRotate) return;
                                          r.enableZoom && F(), r.enableRotate && L(), (i = n.TOUCH_DOLLY_ROTATE);
                                          break;
                                      default:
                                          i = n.NONE;
                                  }
                                  break;
                              default:
                                  i = n.NONE;
                          }
                          i !== n.NONE && r.dispatchEvent(Re);
                      })(e)
                    : (function (e) {
                          let t;
                          switch (e.button) {
                              case 0:
                                  t = r.mouseButtons.LEFT;
                                  break;
                              case 1:
                                  t = r.mouseButtons.MIDDLE;
                                  break;
                              case 2:
                                  t = r.mouseButtons.RIGHT;
                                  break;
                              default:
                                  t = -1;
                          }
                          switch (t) {
                              case J.DOLLY:
                                  if (!1 === r.enableZoom) return;
                                  (function (e) {
                                      g.set(e.clientX, e.clientY);
                                  })(e),
                                      (i = n.DOLLY);
                                  break;
                              case J.ROTATE:
                                  if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                      if (!1 === r.enablePan) return;
                                      D(e), (i = n.PAN);
                                  } else {
                                      if (!1 === r.enableRotate) return;
                                      A(e), (i = n.ROTATE);
                                  }
                                  break;
                              case J.PAN:
                                  if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                      if (!1 === r.enableRotate) return;
                                      A(e), (i = n.ROTATE);
                                  } else {
                                      if (!1 === r.enablePan) return;
                                      D(e), (i = n.PAN);
                                  }
                                  break;
                              default:
                                  i = n.NONE;
                          }
                          i !== n.NONE && r.dispatchEvent(Re);
                      })(e));
        }
        function B(e) {
            !1 !== r.enabled &&
                ("touch" === e.pointerType
                    ? (function (e) {
                          switch ((G(e), i)) {
                              case n.TOUCH_ROTATE:
                                  if (!1 === r.enableRotate) return;
                                  k(e), r.update();
                                  break;
                              case n.TOUCH_PAN:
                                  if (!1 === r.enablePan) return;
                                  N(e), r.update();
                                  break;
                              case n.TOUCH_DOLLY_PAN:
                                  if (!1 === r.enableZoom && !1 === r.enablePan) return;
                                  (function (e) {
                                      r.enableZoom && I(e), r.enablePan && N(e);
                                  })(e),
                                      r.update();
                                  break;
                              case n.TOUCH_DOLLY_ROTATE:
                                  if (!1 === r.enableZoom && !1 === r.enableRotate) return;
                                  (function (e) {
                                      r.enableZoom && I(e), r.enableRotate && k(e);
                                  })(e),
                                      r.update();
                                  break;
                              default:
                                  i = n.NONE;
                          }
                      })(e)
                    : (function (e) {
                          if (!1 !== r.enabled)
                              switch (i) {
                                  case n.ROTATE:
                                      if (!1 === r.enableRotate) return;
                                      !(function (e) {
                                          d.set(e.clientX, e.clientY), m.subVectors(d, h).multiplyScalar(r.rotateSpeed);
                                          const t = r.domElement;
                                          S((2 * Math.PI * m.x) / t.clientHeight), z((2 * Math.PI * m.y) / t.clientHeight), h.copy(d), r.update();
                                      })(e);
                                      break;
                                  case n.DOLLY:
                                      if (!1 === r.enableZoom) return;
                                      !(function (e) {
                                          x.set(e.clientX, e.clientY), b.subVectors(x, g), b.y > 0 ? P(y()) : b.y < 0 && R(y()), g.copy(x), r.update();
                                      })(e);
                                      break;
                                  case n.PAN:
                                      if (!1 === r.enablePan) return;
                                      !(function (e) {
                                          v.set(e.clientX, e.clientY), f.subVectors(v, p).multiplyScalar(r.panSpeed), M(f.x, f.y), p.copy(v), r.update();
                                      })(e);
                              }
                      })(e));
        }
        function V(e) {
            Q(e), 0 === T.length && (r.domElement.releasePointerCapture(e.pointerId), r.domElement.removeEventListener("pointermove", B), r.domElement.removeEventListener("pointerup", V)), r.dispatchEvent(rt), (i = n.NONE);
        }
        function H(e) {
            Q(e);
        }
        function Y(e) {
            !1 === r.enabled ||
                !1 === r.enableZoom ||
                i !== n.NONE ||
                (e.preventDefault(),
                r.dispatchEvent(Re),
                (function (e) {
                    e.deltaY < 0 ? R(y()) : e.deltaY > 0 && P(y()), r.update();
                })(e),
                r.dispatchEvent(rt));
        }
        function q(e) {
            !1 === r.enabled ||
                !1 === r.enablePan ||
                (function (e) {
                    let t = !1;
                    switch (e.code) {
                        case r.keys.UP:
                            M(0, r.keyPanSpeed), (t = !0);
                            break;
                        case r.keys.BOTTOM:
                            M(0, -r.keyPanSpeed), (t = !0);
                            break;
                        case r.keys.LEFT:
                            M(r.keyPanSpeed, 0), (t = !0);
                            break;
                        case r.keys.RIGHT:
                            M(-r.keyPanSpeed, 0), (t = !0);
                    }
                    t && (e.preventDefault(), r.update());
                })(e);
        }
        function X(e) {
            !1 !== r.enabled && e.preventDefault();
        }
        function Q(e) {
            delete w[e.pointerId];
            for (let t = 0; t < T.length; t++) if (T[t].pointerId == e.pointerId) return void T.splice(t, 1);
        }
        function G(e) {
            let t = w[e.pointerId];
            void 0 === t && ((t = new _()), (w[e.pointerId] = t)), t.set(e.pageX, e.pageY);
        }
        function Z(e) {
            const t = e.pointerId === T[0].pointerId ? T[1] : T[0];
            return w[t.pointerId];
        }
        r.domElement.addEventListener("contextmenu", X), r.domElement.addEventListener("pointerdown", U), r.domElement.addEventListener("pointercancel", H), r.domElement.addEventListener("wheel", Y, { passive: !1 }), this.update();
    }
}
function Vt(e) {
    const { domElement: t, onClick: r = () => {}, onEnter: n = () => {}, onMove: i = () => {}, onLeave: o = () => {}, onDragStart: a = () => {}, onDragMove: s = () => {}, onDragStop: l = () => {} } = e,
        c = new _(),
        u = new _(),
        h = new _(),
        d = new _(),
        m = new _(),
        p = {
            position: c,
            nPosition: u,
            hover: !1,
            down: !1,
            removeListeners: function () {
                t.removeEventListener("click", v),
                    t.removeEventListener("pointerenter", f),
                    t.removeEventListener("pointerdown", g),
                    t.removeEventListener("pointermove", x),
                    t.removeEventListener("pointerup", b),
                    t.removeEventListener("pointerleave", T);
            },
        };
    return t.addEventListener("click", v), t.addEventListener("pointerenter", f), t.addEventListener("pointerdown", g), t.addEventListener("pointermove", x), t.addEventListener("pointerup", b), t.addEventListener("pointerleave", T), p;
    function v(e) {
        h.distanceTo(c) < 20 && (w(e), r({ position: c, nPosition: u }));
    }
    function f(e) {
        (p.hover = "mouse" === e.pointerType), w(e), n({ position: c, nPosition: u });
    }
    function g(e) {
        (p.down = !0), w(e), h.copy(c), d.copy(c), a({ position: c, nPosition: u });
    }
    function x(e) {
        w(e), m.copy(c).sub(d), p.down ? s({ position: c, nPosition: u, startPosition: h, lastPosition: d, delta: m }) : p.hover || (p.hover = !0), i({ position: c, nPosition: u, startPosition: h, lastPosition: d, delta: m }), d.copy(c);
    }
    function b(e) {
        (p.down = !1), l();
    }
    function T(e) {
        p.down && ((p.down = !1), l()), (p.hover = !1), o();
    }
    function w(e) {
        const r = t.getBoundingClientRect();
        (c.x = e.clientX - r.left), (c.y = e.clientY - r.top), (u.x = (c.x / r.width) * 2 - 1), (u.y = (-c.y / r.height) * 2 + 1);
    }
}
function oe(e) {
    const t = { el: null, canvas: null, eventsEl: null, width: null, height: null, resize: !0, alpha: !1, antialias: !0, orbitControls: !0, init() {}, initCamera() {}, initScene() {}, afterResize() {}, beforeRender() {}, ...e },
        r = { renderer: null, camera: null, scene: null, pointer: null, width: 0, height: 0, wWidth: 0, wHeight: 0, clock: { startTime: 0, time: 0, elapsed: 0 }, options: t };
    let n, i;
    return (
        (function () {
            var e, s, l, c, u;
            let h;
            if (t.el) (h = document.createElement("canvas")), t.el.appendChild(h);
            else {
                if (!t.canvas) throw new Error("Missing parameter : el or canvas is required");
                h = t.canvas;
            }
            null == (e = t.init) || e.call(t, r),
                (r.renderer = new bt({ canvas: h, alpha: t.alpha, antialias: t.antialias })),
                null == (s = t.initRenderer) || s.call(t, r),
                (r.camera = new Qe()),
                (r.camera.position.z = 50),
                null == (l = t.initCamera) || l.call(t, r),
                t.orbitControls &&
                    ((i = new Ft(r.camera, null != (c = t.eventsEl) ? c : r.renderer.domElement)),
                    (i.enableDamping = !0),
                    (i.dampingFactor = 0.1),
                    "object" == typeof t.orbitControls &&
                        Object.keys(t.orbitControls).forEach((e) => {
                            i[e] = t.orbitControls[e];
                        })),
                a(),
                t.resize && !t.width && !t.height && window.addEventListener("resize", a),
                (r.scene = new $e()),
                null == (u = t.initScene) || u.call(t, r),
                (function () {
                    var e, n;
                    const i = {};
                    t.onPointerEnter && (i.onEnter = t.onPointerEnter),
                        t.onPointerMove && (i.onMove = t.onPointerMove),
                        t.onPointerMove && (i.onLeave = t.onPointerLeave),
                        Object.keys(i).length > 0 && (r.pointer = Vt({ domElement: null != (n = t.eventsEl) ? n : null != (e = t.el) ? e : t.canvas, ...i }));
                })(),
                (n = t.render
                    ? t.render
                    : () => {
                          r.renderer.render(r.scene, r.camera);
                      }),
                requestAnimationFrame((e) => {
                    (r.clock.startTime = r.clock.time = e), requestAnimationFrame(o);
                });
        })(),
        r
    );
    function o(e) {
        const { clock: a } = r;
        (a.elapsed = e - a.time), (a.time = e), t.beforeRender(r), i && i.update(), n(r), requestAnimationFrame(o);
    }
    function a() {
        var e;
        if (t.width && t.height) (r.width = t.width), (r.height = t.height);
        else if ("window" === t.resize) (r.width = window.innerWidth), (r.height = window.innerHeight);
        else {
            const e = r.renderer.domElement.parentElement;
            (r.width = e.clientWidth), (r.height = e.clientHeight);
        }
        if ((r.renderer.setSize(r.width, r.height), (r.camera.aspect = r.width / r.height), r.camera.updateProjectionMatrix(), r.camera instanceof Qe)) {
            const e = (function () {
                const e = (r.camera.fov * Math.PI) / 180,
                    t = 2 * Math.tan(e / 2) * Math.abs(r.camera.position.z);
                return [t * r.camera.aspect, t];
            })();
            (r.wWidth = e[0]), (r.wHeight = e[1]);
        } else (r.wWidth = r.camera.top - r.camera.bottom), (r.wHeight = r.camera.right - r.camera.left);
        null == (e = t.afterResize) || e.call(t, r);
    }
}
function Ae(e) {
    const t = {};
    return (
        ["el", "canvas", "eventsEl", "width", "height", "resize", "orbitControls"].forEach((r) => {
            void 0 !== e[r] && (t[r] = e[r]);
        }),
        t
    );
}
function Ne(e, t) {
    const r = [];
    if (Array.isArray(t) && t.length > 0) {
        let n;
        t.forEach((t) => {
            switch (t.type) {
                case "ambient":
                    n = new Ct(...t.params);
                    break;
                case "directional":
                    n = new Pt(...t.params);
                    break;
                case "point":
                    n = new zt(...t.params);
                    break;
                default:
                    console.error(`Unknown light type ${t.type}`);
            }
            n &&
                ("object" == typeof t.props &&
                    Object.keys(t.props).forEach((e) => {
                        "position" === e ? n.position.set(...t.props[e]) : (n[e] = t.props[e]);
                    }),
                e.add(n),
                r.push(n));
        });
    }
    return r;
}
class ge {
    constructor(e, t, r) {
        (this.variables = []), (this.currentTextureIndex = 0);
        let n = Je;
        const i = new $e(),
            o = new Et();
        o.position.z = 1;
        const a = { passThruTexture: { value: null } },
            s = u("uniform sampler2D passThruTexture;\n\nvoid main() {\n\n\tvec2 uv = gl_FragCoord.xy / resolution.xy;\n\n\tgl_FragColor = texture2D( passThruTexture, uv );\n\n}\n", a),
            l = new fe(new ne(2, 2), s);
        function c(r) {
            r.defines.resolution = "vec2( " + e.toFixed(1) + ", " + t.toFixed(1) + " )";
        }
        function u(e, t) {
            const r = new Y({ uniforms: (t = t || {}), vertexShader: "void main()\t{\n\n\tgl_Position = vec4( position, 1.0 );\n\n}\n", fragmentShader: e });
            return c(r), r;
        }
        i.add(l),
            (this.setDataType = function (e) {
                return (n = e), this;
            }),
            (this.addVariable = function (e, t, r) {
                const n = { name: e, initialValueTexture: r, material: this.createShaderMaterial(t), dependencies: null, renderTargets: [], wrapS: null, wrapT: null, minFilter: ve, magFilter: ve };
                return this.variables.push(n), n;
            }),
            (this.setVariableDependencies = function (e, t) {
                e.dependencies = t;
            }),
            (this.init = function () {
                if (!1 === r.capabilities.isWebGL2 && !1 === r.extensions.has("OES_texture_float")) return "No OES_texture_float support for float textures.";
                if (0 === r.capabilities.maxVertexTextures) return "No support for vertex shader textures.";
                for (let r = 0; r < this.variables.length; r++) {
                    const n = this.variables[r];
                    (n.renderTargets[0] = this.createRenderTarget(e, t, n.wrapS, n.wrapT, n.minFilter, n.magFilter)),
                        (n.renderTargets[1] = this.createRenderTarget(e, t, n.wrapS, n.wrapT, n.minFilter, n.magFilter)),
                        this.renderTexture(n.initialValueTexture, n.renderTargets[0]),
                        this.renderTexture(n.initialValueTexture, n.renderTargets[1]);
                    const i = n.material,
                        o = i.uniforms;
                    if (null !== n.dependencies)
                        for (let e = 0; e < n.dependencies.length; e++) {
                            const t = n.dependencies[e];
                            if (t.name !== n.name) {
                                let e = !1;
                                for (let r = 0; r < this.variables.length; r++)
                                    if (t.name === this.variables[r].name) {
                                        e = !0;
                                        break;
                                    }
                                if (!e) return "Variable dependency not found. Variable=" + n.name + ", dependency=" + t.name;
                            }
                            (o[t.name] = { value: null }), (i.fragmentShader = "\nuniform sampler2D " + t.name + ";\n" + i.fragmentShader);
                        }
                }
                return (this.currentTextureIndex = 0), null;
            }),
            (this.compute = function () {
                const e = this.currentTextureIndex,
                    t = 0 === this.currentTextureIndex ? 1 : 0;
                for (let r = 0, n = this.variables.length; r < n; r++) {
                    const n = this.variables[r];
                    if (null !== n.dependencies) {
                        const t = n.material.uniforms;
                        for (let r = 0, i = n.dependencies.length; r < i; r++) {
                            const i = n.dependencies[r];
                            t[i.name].value = i.renderTargets[e].texture;
                        }
                    }
                    this.doRenderTarget(n.material, n.renderTargets[t]);
                }
                this.currentTextureIndex = t;
            }),
            (this.getCurrentRenderTarget = function (e) {
                return e.renderTargets[this.currentTextureIndex];
            }),
            (this.getAlternateRenderTarget = function (e) {
                return e.renderTargets[0 === this.currentTextureIndex ? 1 : 0];
            }),
            (this.addResolutionDefine = c),
            (this.createShaderMaterial = u),
            (this.createRenderTarget = function (r, i, o, a, s, l) {
                return new se((r = r || e), (i = i || t), { wrapS: (o = o || et), wrapT: (a = a || et), minFilter: (s = s || ve), magFilter: (l = l || ve), format: Ke, type: n, depthBuffer: !1 });
            }),
            (this.createTexture = function () {
                const r = new Float32Array(e * t * 4),
                    n = new Dt(r, e, t, Ke, Je);
                return (n.needsUpdate = !0), n;
            }),
            (this.renderTexture = function (e, t) {
                (a.passThruTexture.value = e), this.doRenderTarget(s, t), (a.passThruTexture.value = null);
            }),
            (this.doRenderTarget = function (e, t) {
                const n = r.getRenderTarget();
                (l.material = e), r.setRenderTarget(t), r.render(i, o), (l.material = s), r.setRenderTarget(n);
            });
    }
}
function ce(e) {
    let t = [];
    n(e);
    const r = new q();
    return {
        setColors: n,
        getColorAt: function (n) {
            const i = Math.max(0, Math.min(1, n)) * (e.length - 1),
                o = Math.floor(i),
                a = t[o];
            if (o === e.length - 1) return a.getHex();
            const s = i - o,
                l = t[o + 1];
            return (r.r = a.r + s * (l.r - a.r)), (r.g = a.g + s * (l.g - a.g)), (r.b = a.b + s * (l.b - a.b)), r.clone();
        },
    };
    function n(e) {
        (t = []),
            e.forEach((e) => {
                t.push(new q(e));
            });
    }
}
var $ =
    "vec4 permute(vec4 x){vec4 xm=mod(x,289.0);return mod(((xm*34.0)+10.0)*xm,289.0);}float psrdnoise(vec3 x,vec3 period,float alpha,out vec3 gradient){\n#ifndef PERLINGRID\nconst mat3 M=mat3(0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0);const mat3 Mi=mat3(-0.5,0.5,0.5,0.5,-0.5,0.5,0.5,0.5,-0.5);\n#endif\nvec3 uvw;\n#ifndef PERLINGRID\nuvw=M*x;\n#else\nuvw=x+dot(x,vec3(1.0/3.0));\n#endif\nvec3 i0=floor(uvw);vec3 f0=fract(uvw);vec3 g_=step(f0.xyx,f0.yzz);vec3 l_=1.0-g_;vec3 g=vec3(l_.z,g_.xy);vec3 l=vec3(l_.xy,g_.z);vec3 o1=min(g,l);vec3 o2=max(g,l);vec3 i1=i0+o1;vec3 i2=i0+o2;vec3 i3=i0+vec3(1.0);vec3 v0,v1,v2,v3;\n#ifndef PERLINGRID\nv0=Mi*i0;v1=Mi*i1;v2=Mi*i2;v3=Mi*i3;\n#else\nv0=i0-dot(i0,vec3(1.0/6.0));v1=i1-dot(i1,vec3(1.0/6.0));v2=i2-dot(i2,vec3(1.0/6.0));v3=i3-dot(i3,vec3(1.0/6.0));\n#endif\nvec3 x0=x-v0;vec3 x1=x-v1;vec3 x2=x-v2;vec3 x3=x-v3;if(any(greaterThan(period,vec3(0.0)))){vec4 vx=vec4(v0.x,v1.x,v2.x,v3.x);vec4 vy=vec4(v0.y,v1.y,v2.y,v3.y);vec4 vz=vec4(v0.z,v1.z,v2.z,v3.z);if(period.x>0.0)vx=mod(vx,period.x);if(period.y>0.0)vy=mod(vy,period.y);if(period.z>0.0)vz=mod(vz,period.z);\n#ifndef PERLINGRID\ni0=M*vec3(vx.x,vy.x,vz.x);i1=M*vec3(vx.y,vy.y,vz.y);i2=M*vec3(vx.z,vy.z,vz.z);i3=M*vec3(vx.w,vy.w,vz.w);\n#else\nv0=vec3(vx.x,vy.x,vz.x);v1=vec3(vx.y,vy.y,vz.y);v2=vec3(vx.z,vy.z,vz.z);v3=vec3(vx.w,vy.w,vz.w);i0=v0+dot(v0,vec3(1.0/3.0));i1=v1+dot(v1,vec3(1.0/3.0));i2=v2+dot(v2,vec3(1.0/3.0));i3=v3+dot(v3,vec3(1.0/3.0));\n#endif\ni0=floor(i0+0.5);i1=floor(i1+0.5);i2=floor(i2+0.5);i3=floor(i3+0.5);}vec4 hash=permute(permute(permute(vec4(i0.z,i1.z,i2.z,i3.z))+vec4(i0.y,i1.y,i2.y,i3.y))+vec4(i0.x,i1.x,i2.x,i3.x));vec4 theta=hash*3.883222077;vec4 sz=hash*-0.006920415+0.996539792;vec4 psi=hash*0.108705628;vec4 Ct=cos(theta);vec4 St=sin(theta);vec4 sz_prime=sqrt(1.0-sz*sz);vec4 gx,gy,gz;\n#ifdef FASTROTATION\nvec4 qx=St;vec4 qy=-Ct;vec4 qz=vec4(0.0);vec4 px=sz*qy;vec4 py=-sz*qx;vec4 pz=sz_prime;psi+=alpha;vec4 Sa=sin(psi);vec4 Ca=cos(psi);gx=Ca*px+Sa*qx;gy=Ca*py+Sa*qy;gz=Ca*pz+Sa*qz;\n#else\nif(alpha!=0.0){vec4 Sp=sin(psi);vec4 Cp=cos(psi);vec4 px=Ct*sz_prime;vec4 py=St*sz_prime;vec4 pz=sz;vec4 Ctp=St*Sp-Ct*Cp;vec4 qx=mix(Ctp*St,Sp,sz);vec4 qy=mix(-Ctp*Ct,Cp,sz);vec4 qz=-(py*Cp+px*Sp);vec4 Sa=vec4(sin(alpha));vec4 Ca=vec4(cos(alpha));gx=Ca*px+Sa*qx;gy=Ca*py+Sa*qy;gz=Ca*pz+Sa*qz;}else{gx=Ct*sz_prime;gy=St*sz_prime;gz=sz;}\n#endif\nvec3 g0=vec3(gx.x,gy.x,gz.x);vec3 g1=vec3(gx.y,gy.y,gz.y);vec3 g2=vec3(gx.z,gy.z,gz.z);vec3 g3=vec3(gx.w,gy.w,gz.w);vec4 w=0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3));w=max(w,0.0);vec4 w2=w*w;vec4 w3=w2*w;vec4 gdotx=vec4(dot(g0,x0),dot(g1,x1),dot(g2,x2),dot(g3,x3));float n=dot(w3,gdotx);vec4 dw=-6.0*w2*gdotx;vec3 dn0=w3.x*g0+dw.x*x0;vec3 dn1=w3.y*g1+dw.y*x1;vec3 dn2=w3.z*g2+dw.z*x2;vec3 dn3=w3.w*g3+dw.w*x3;gradient=39.5*(dn0+dn1+dn2+dn3);return 39.5*n;}";
const { randFloat: nt, randFloatSpread: st } = xe,
    { randFloat: $t, randFloatSpread: ie } = xe,
    ye = {
        uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
        vertexShader: "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
        fragmentShader: "\n\n\t\tuniform float opacity;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = texture2D( tDiffuse, vUv );\n\t\t\tgl_FragColor.a *= opacity;\n\n\n\t\t}",
    };
class ue {
    constructor() {
        (this.enabled = !0), (this.needsSwap = !0), (this.clear = !1), (this.renderToScreen = !1);
    }
    setSize() {}
    render() {
        console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
}
const eo = new ze(-1, 1, 1, -1, 0, 1),
    Ie = new pe();
Ie.setAttribute("position", new te([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), Ie.setAttribute("uv", new te([0, 2, 0, 0, 2, 0], 2));
class lt {
    constructor(e) {
        this._mesh = new fe(Ie, e);
    }
    dispose() {
        this._mesh.geometry.dispose();
    }
    render(e) {
        e.render(this._mesh, eo);
    }
    get material() {
        return this._mesh.material;
    }
    set material(e) {
        this._mesh.material = e;
    }
}
class ct extends ue {
    constructor(e, t) {
        super(),
            (this.textureID = void 0 !== t ? t : "tDiffuse"),
            e instanceof Y
                ? ((this.uniforms = e.uniforms), (this.material = e))
                : e && ((this.uniforms = _e.clone(e.uniforms)), (this.material = new Y({ defines: Object.assign({}, e.defines), uniforms: this.uniforms, vertexShader: e.vertexShader, fragmentShader: e.fragmentShader }))),
            (this.fsQuad = new lt(this.material));
    }
    render(e, t, r) {
        this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = r.texture),
            (this.fsQuad.material = this.material),
            this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
    }
}
class ut extends ue {
    constructor(e, t) {
        super(), (this.scene = e), (this.camera = t), (this.clear = !0), (this.needsSwap = !1), (this.inverse = !1);
    }
    render(e, t, r) {
        const n = e.getContext(),
            i = e.state;
        let o, a;
        i.buffers.color.setMask(!1),
            i.buffers.depth.setMask(!1),
            i.buffers.color.setLocked(!0),
            i.buffers.depth.setLocked(!0),
            this.inverse ? ((o = 0), (a = 1)) : ((o = 1), (a = 0)),
            i.buffers.stencil.setTest(!0),
            i.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE),
            i.buffers.stencil.setFunc(n.ALWAYS, o, 4294967295),
            i.buffers.stencil.setClear(a),
            i.buffers.stencil.setLocked(!0),
            e.setRenderTarget(r),
            this.clear && e.clear(),
            e.render(this.scene, this.camera),
            e.setRenderTarget(t),
            this.clear && e.clear(),
            e.render(this.scene, this.camera),
            i.buffers.color.setLocked(!1),
            i.buffers.depth.setLocked(!1),
            i.buffers.stencil.setLocked(!1),
            i.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295),
            i.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP),
            i.buffers.stencil.setLocked(!0);
    }
}
class to extends ue {
    constructor() {
        super(), (this.needsSwap = !1);
    }
    render(e) {
        e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
    }
}
class oo {
    constructor(e, t) {
        if (((this.renderer = e), void 0 === t)) {
            const r = e.getSize(new _());
            (this._pixelRatio = e.getPixelRatio()), (this._width = r.width), (this._height = r.height), ((t = new se(this._width * this._pixelRatio, this._height * this._pixelRatio)).texture.name = "EffectComposer.rt1");
        } else (this._pixelRatio = 1), (this._width = t.width), (this._height = t.height);
        (this.renderTarget1 = t),
            (this.renderTarget2 = t.clone()),
            (this.renderTarget2.texture.name = "EffectComposer.rt2"),
            (this.writeBuffer = this.renderTarget1),
            (this.readBuffer = this.renderTarget2),
            (this.renderToScreen = !0),
            (this.passes = []),
            void 0 === ye && console.error("THREE.EffectComposer relies on CopyShader"),
            void 0 === ct && console.error("THREE.EffectComposer relies on ShaderPass"),
            (this.copyPass = new ct(ye)),
            (this.clock = new At());
    }
    swapBuffers() {
        const e = this.readBuffer;
        (this.readBuffer = this.writeBuffer), (this.writeBuffer = e);
    }
    addPass(e) {
        this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    insertPass(e, t) {
        this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    removePass(e) {
        const t = this.passes.indexOf(e);
        -1 !== t && this.passes.splice(t, 1);
    }
    isLastEnabledPass(e) {
        for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
        return !0;
    }
    render(e) {
        void 0 === e && (e = this.clock.getDelta());
        const t = this.renderer.getRenderTarget();
        let r = !1;
        for (let t = 0, n = this.passes.length; t < n; t++) {
            const n = this.passes[t];
            if (!1 !== n.enabled) {
                if (((n.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t)), n.render(this.renderer, this.writeBuffer, this.readBuffer, e, r), n.needsSwap)) {
                    if (r) {
                        const t = this.renderer.getContext(),
                            r = this.renderer.state.buffers.stencil;
                        r.setFunc(t.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), r.setFunc(t.EQUAL, 1, 4294967295);
                    }
                    this.swapBuffers();
                }
                void 0 !== ut && (n instanceof ut ? (r = !0) : n instanceof to && (r = !1));
            }
        }
        this.renderer.setRenderTarget(t);
    }
    reset(e) {
        if (void 0 === e) {
            const t = this.renderer.getSize(new _());
            (this._pixelRatio = this.renderer.getPixelRatio()), (this._width = t.width), (this._height = t.height), (e = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
        }
        this.renderTarget1.dispose(), this.renderTarget2.dispose(), (this.renderTarget1 = e), (this.renderTarget2 = e.clone()), (this.writeBuffer = this.renderTarget1), (this.readBuffer = this.renderTarget2);
    }
    setSize(e, t) {
        (this._width = e), (this._height = t);
        const r = this._width * this._pixelRatio,
            n = this._height * this._pixelRatio;
        this.renderTarget1.setSize(r, n), this.renderTarget2.setSize(r, n);
        for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(r, n);
    }
    setPixelRatio(e) {
        (this._pixelRatio = e), this.setSize(this._width, this._height);
    }
}
new ze(-1, 1, 1, -1, 0, 1);
const dt = new pe();
dt.setAttribute("position", new te([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), dt.setAttribute("uv", new te([0, 2, 0, 0, 2, 0], 2));
class io extends ue {
    constructor(e, t, r, n, i) {
        super(),
            (this.scene = e),
            (this.camera = t),
            (this.overrideMaterial = r),
            (this.clearColor = n),
            (this.clearAlpha = void 0 !== i ? i : 0),
            (this.clear = !0),
            (this.clearDepth = !1),
            (this.needsSwap = !1),
            (this._oldClearColor = new q());
    }
    render(e, t, r) {
        const n = e.autoClear;
        let i, o;
        (e.autoClear = !1),
            void 0 !== this.overrideMaterial && ((o = this.scene.overrideMaterial), (this.scene.overrideMaterial = this.overrideMaterial)),
            this.clearColor && (e.getClearColor(this._oldClearColor), (i = e.getClearAlpha()), e.setClearColor(this.clearColor, this.clearAlpha)),
            this.clearDepth && e.clearDepth(),
            e.setRenderTarget(this.renderToScreen ? null : r),
            this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
            e.render(this.scene, this.camera),
            this.clearColor && e.setClearColor(this._oldClearColor, i),
            void 0 !== this.overrideMaterial && (this.scene.overrideMaterial = o),
            (e.autoClear = n);
    }
}
const mt = {
    shaderID: "luminosityHighPass",
    uniforms: { tDiffuse: { value: null }, luminosityThreshold: { value: 1 }, smoothWidth: { value: 1 }, defaultColor: { value: new q(0) }, defaultOpacity: { value: 0 } },
    vertexShader: "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
    fragmentShader:
        "\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform vec3 defaultColor;\n\t\tuniform float defaultOpacity;\n\t\tuniform float luminosityThreshold;\n\t\tuniform float smoothWidth;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\n\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\n\n\t\t\tfloat v = dot( texel.xyz, luma );\n\n\t\t\tvec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n\t\t\tfloat alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n\t\t\tgl_FragColor = mix( outputColor, texel, alpha );\n\n\t\t}",
};
class re extends ue {
    constructor(e, t, r, n) {
        super(),
            (this.strength = void 0 !== t ? t : 1),
            (this.radius = r),
            (this.threshold = n),
            (this.resolution = void 0 !== e ? new _(e.x, e.y) : new _(256, 256)),
            (this.clearColor = new q(0, 0, 0)),
            (this.renderTargetsHorizontal = []),
            (this.renderTargetsVertical = []),
            (this.nMips = 5);
        let i = Math.round(this.resolution.x / 2),
            o = Math.round(this.resolution.y / 2);
        (this.renderTargetBright = new se(i, o)), (this.renderTargetBright.texture.name = "UnrealBloomPass.bright"), (this.renderTargetBright.texture.generateMipmaps = !1);
        for (let e = 0; e < this.nMips; e++) {
            const t = new se(i, o);
            (t.texture.name = "UnrealBloomPass.h" + e), (t.texture.generateMipmaps = !1), this.renderTargetsHorizontal.push(t);
            const r = new se(i, o);
            (r.texture.name = "UnrealBloomPass.v" + e), (r.texture.generateMipmaps = !1), this.renderTargetsVertical.push(r), (i = Math.round(i / 2)), (o = Math.round(o / 2));
        }
        void 0 === mt && console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");
        const a = mt;
        (this.highPassUniforms = _e.clone(a.uniforms)),
            (this.highPassUniforms.luminosityThreshold.value = n),
            (this.highPassUniforms.smoothWidth.value = 0.01),
            (this.materialHighPassFilter = new Y({ uniforms: this.highPassUniforms, vertexShader: a.vertexShader, fragmentShader: a.fragmentShader, defines: {} })),
            (this.separableBlurMaterials = []);
        const s = [3, 5, 7, 9, 11];
        (i = Math.round(this.resolution.x / 2)), (o = Math.round(this.resolution.y / 2));
        for (let e = 0; e < this.nMips; e++) this.separableBlurMaterials.push(this.getSeperableBlurMaterial(s[e])), (this.separableBlurMaterials[e].uniforms.texSize.value = new _(i, o)), (i = Math.round(i / 2)), (o = Math.round(o / 2));
        (this.compositeMaterial = this.getCompositeMaterial(this.nMips)),
            (this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture),
            (this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture),
            (this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture),
            (this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture),
            (this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture),
            (this.compositeMaterial.uniforms.bloomStrength.value = t),
            (this.compositeMaterial.uniforms.bloomRadius.value = 0.1),
            (this.compositeMaterial.needsUpdate = !0);
        (this.compositeMaterial.uniforms.bloomFactors.value = [1, 0.8, 0.6, 0.4, 0.2]),
            (this.bloomTintColors = [new j(1, 1, 1), new j(1, 1, 1), new j(1, 1, 1), new j(1, 1, 1), new j(1, 1, 1)]),
            (this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors),
            void 0 === ye && console.error("THREE.UnrealBloomPass relies on CopyShader");
        const l = ye;
        (this.copyUniforms = _e.clone(l.uniforms)),
            (this.copyUniforms.opacity.value = 1),
            (this.materialCopy = new Y({ uniforms: this.copyUniforms, vertexShader: l.vertexShader, fragmentShader: l.fragmentShader, blending: tt, depthTest: !1, depthWrite: !1, transparent: !0 })),
            (this.enabled = !0),
            (this.needsSwap = !1),
            (this._oldClearColor = new q()),
            (this.oldClearAlpha = 1),
            (this.basic = new Me()),
            (this.fsQuad = new lt(null));
    }
    dispose() {
        for (let e = 0; e < this.renderTargetsHorizontal.length; e++) this.renderTargetsHorizontal[e].dispose();
        for (let e = 0; e < this.renderTargetsVertical.length; e++) this.renderTargetsVertical[e].dispose();
        this.renderTargetBright.dispose();
    }
    setSize(e, t) {
        let r = Math.round(e / 2),
            n = Math.round(t / 2);
        this.renderTargetBright.setSize(r, n);
        for (let e = 0; e < this.nMips; e++)
            this.renderTargetsHorizontal[e].setSize(r, n), this.renderTargetsVertical[e].setSize(r, n), (this.separableBlurMaterials[e].uniforms.texSize.value = new _(r, n)), (r = Math.round(r / 2)), (n = Math.round(n / 2));
    }
    render(e, t, r, n) {
        e.getClearColor(this._oldClearColor), (this.oldClearAlpha = e.getClearAlpha());
        const i = e.autoClear;
        (e.autoClear = !1),
            e.setClearColor(this.clearColor, 0),
            n && e.state.buffers.stencil.setTest(!1),
            this.renderToScreen && ((this.fsQuad.material = this.basic), (this.basic.map = r.texture), e.setRenderTarget(null), e.clear(), this.fsQuad.render(e)),
            (this.highPassUniforms.tDiffuse.value = r.texture),
            (this.highPassUniforms.luminosityThreshold.value = this.threshold),
            (this.fsQuad.material = this.materialHighPassFilter),
            e.setRenderTarget(this.renderTargetBright),
            e.clear(),
            this.fsQuad.render(e);
        let o = this.renderTargetBright;
        for (let t = 0; t < this.nMips; t++)
            (this.fsQuad.material = this.separableBlurMaterials[t]),
                (this.separableBlurMaterials[t].uniforms.colorTexture.value = o.texture),
                (this.separableBlurMaterials[t].uniforms.direction.value = re.BlurDirectionX),
                e.setRenderTarget(this.renderTargetsHorizontal[t]),
                e.clear(),
                this.fsQuad.render(e),
                (this.separableBlurMaterials[t].uniforms.colorTexture.value = this.renderTargetsHorizontal[t].texture),
                (this.separableBlurMaterials[t].uniforms.direction.value = re.BlurDirectionY),
                e.setRenderTarget(this.renderTargetsVertical[t]),
                e.clear(),
                this.fsQuad.render(e),
                (o = this.renderTargetsVertical[t]);
        (this.fsQuad.material = this.compositeMaterial),
            (this.compositeMaterial.uniforms.bloomStrength.value = this.strength),
            (this.compositeMaterial.uniforms.bloomRadius.value = this.radius),
            (this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors),
            e.setRenderTarget(this.renderTargetsHorizontal[0]),
            e.clear(),
            this.fsQuad.render(e),
            (this.fsQuad.material = this.materialCopy),
            (this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture),
            n && e.state.buffers.stencil.setTest(!0),
            this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(r), this.fsQuad.render(e)),
            e.setClearColor(this._oldClearColor, this.oldClearAlpha),
            (e.autoClear = i);
    }
    getSeperableBlurMaterial(e) {
        return new Y({
            defines: { KERNEL_RADIUS: e, SIGMA: e },
            uniforms: { colorTexture: { value: null }, texSize: { value: new _(0.5, 0.5) }, direction: { value: new _(0.5, 0.5) } },
            vertexShader: "varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
            fragmentShader:
                "#include <common>\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 texSize;\n\t\t\t\tuniform vec2 direction;\n\n\t\t\t\tfloat gaussianPdf(in float x, in float sigma) {\n\t\t\t\t\treturn 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\n\t\t\t\t}\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec2 invSize = 1.0 / texSize;\n\t\t\t\t\tfloat fSigma = float(SIGMA);\n\t\t\t\t\tfloat weightSum = gaussianPdf(0.0, fSigma);\n\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\n\t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {\n\t\t\t\t\t\tfloat x = float(i);\n\t\t\t\t\t\tfloat w = gaussianPdf(x, fSigma);\n\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\n\t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\n\t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\n\t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;\n\t\t\t\t\t\tweightSum += 2.0 * w;\n\t\t\t\t\t}\n\t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\t\t\t\t}",
        });
    }
    getCompositeMaterial(e) {
        return new Y({
            defines: { NUM_MIPS: e },
            uniforms: {
                blurTexture1: { value: null },
                blurTexture2: { value: null },
                blurTexture3: { value: null },
                blurTexture4: { value: null },
                blurTexture5: { value: null },
                bloomStrength: { value: 1 },
                bloomFactors: { value: null },
                bloomTintColors: { value: null },
                bloomRadius: { value: 0 },
            },
            vertexShader: "varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
            fragmentShader:
                "varying vec2 vUv;\n\t\t\t\tuniform sampler2D blurTexture1;\n\t\t\t\tuniform sampler2D blurTexture2;\n\t\t\t\tuniform sampler2D blurTexture3;\n\t\t\t\tuniform sampler2D blurTexture4;\n\t\t\t\tuniform sampler2D blurTexture5;\n\t\t\t\tuniform float bloomStrength;\n\t\t\t\tuniform float bloomRadius;\n\t\t\t\tuniform float bloomFactors[NUM_MIPS];\n\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\n\n\t\t\t\tfloat lerpBloomFactor(const in float factor) {\n\t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\n\t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\n\t\t\t\t}",
        });
    }
}
(re.BlurDirectionX = new _(1, 0)), (re.BlurDirectionY = new _(0, 1));
const { randFloat: ao, randFloatSpread: we } = xe,
    ro = {
        gpgpuSize: 256,
        bloomStrength: 1.5,
        bloomRadius: 0.5,
        bloomThreshold: 0.25,
        colors: [16777215 * Math.random(), 16777215 * Math.random(), 16777215 * Math.random()],
        geometry: "custom",
        geometryScale: [1, 1, 1],
        lights: [
            { type: "ambient", params: [16777215, 0.5] },
            { type: "point", params: [16777215, 1], props: { position: [0, 0, 0] } },
            { type: "point", params: [16748640, 0.75], props: { position: [0, -100, -100] } },
            { type: "point", params: [6328575, 0.75], props: { position: [0, 100, 100] } },
        ],
        materialParams: {},
        noiseCoordScale: 0.01,
        noiseIntensity: 0.0025,
        noiseTimeCoef: 4e-4,
        attractionRadius1: 150,
        attractionRadius2: 250,
        maxVelocity: 0.25,
    };
function no(e) {
    const t = { ...ro, ...e },
        r = t.gpgpuSize,
        n = r * r;
    let i, o, a, s, l;
    const c = { value: null },
        u = { value: null },
        h = { value: null },
        d = { value: new j(...t.geometryScale) },
        m = { value: 0 },
        p = { value: t.noiseCoordScale },
        v = { value: t.noiseIntensity },
        f = { value: t.maxVelocity },
        g = { value: t.attractionRadius1 },
        x = { value: t.attractionRadius2 },
        b = { value: new j() },
        T = { uScale: d, uTime: m, uNoiseCoordScale: p, uNoiseIntensity: v, uMaxVelocity: f, uAttractionRadius1: g, uAttractionRadius2: x, uMouse: b },
        w = { ...{ uTexturePosition: c, uOldTexturePosition: u, uTextureVelocity: h }, ...T };
    let y, S, z, C, E, M, P;
    return {
        three: oe({
            ...Ae(e),
            antialias: !1,
            orbitControls: !0,
            initRenderer({ renderer: e }) {
                !(function (e) {
                    (i = new ge(r, r, e)),
                        e.capabilities.isWebGL2 || i.setDataType(he),
                        (o = i.createTexture()),
                        (a = i.createTexture()),
                        (function (e, r) {
                            const n = new j(),
                                i = e.image.data,
                                o = r.image.data;
                                for (let e = 0, r = i.length; e < r; e += 4) {
                                    n.set(
                                        ae(t.attractionRadius1),  // Random X coordinate within the range
                                        ae(t.attractionRadius1),  // Random Y coordinate within the range
                                        0                         // Fixed Z coordinate to place particles on a plane
                                    );
                                    n.toArray(i, e);
                                    (i[e + 3] = ao(0.1, 1));
                                    n.set(0, 0, 0);
                                    n.toArray(o, e);
                                    (o[e + 3] = 0);
                                }
                        })(o, a),
                        (s = i.addVariable(
                            "textureVelocity",
                            `\n      ${$}\n      uniform float uTime;\n      uniform vec3 uMouse;\n      uniform float uNoiseCoordScale;\n      uniform float uNoiseIntensity;\n      uniform float uMaxVelocity;\n      uniform float uAttractionRadius1;\n      uniform float uAttractionRadius2;\n\n      void main() {\n        vec2 uv = gl_FragCoord.xy / resolution.xy;\n        vec4 pos = texture2D(texturePosition, uv);\n        vec4 vel = texture2D(textureVelocity, uv);\n\n        vec3 grad;\n        float n = psrdnoise(pos.xyz * uNoiseCoordScale, vec3(0), uTime, grad);\n        vel.xyz += (pos.w * 0.75) * grad * uNoiseIntensity;\n\n        vec3 dv = -pos.xyz;\n        float coef = smoothstep(uAttractionRadius1, uAttractionRadius2, length(dv));\n        vel.xyz = vel.xyz + pos.w * coef * normalize(dv);\n        vel.xyz = clamp(vel.xyz, -uMaxVelocity, uMaxVelocity);\n\n        gl_FragColor = vel;\n      }\n    `,
                            a
                        )),
                        (l = i.addVariable(
                            "texturePosition",
                            `\n      ${$}\n      uniform float uTime;\n      uniform vec3 uMouse;\n      void main() {\n        vec2 uv = gl_FragCoord.xy / resolution.xy;\n        vec4 pos = texture2D(texturePosition, uv);\n        vec4 vel = texture2D(textureVelocity, uv);\n        pos.xyz += vel.xyz;\n        gl_FragColor = pos;\n      }\n    `,
                            o
                        )),
                        i.setVariableDependencies(s, [l, s]),
                        i.setVariableDependencies(l, [l, s]),
                        Object.keys(T).forEach((e) => {
                            (s.material.uniforms[e] = w[e]), (l.material.uniforms[e] = w[e]);
                        });
                    const n = i.init();
                    if (null !== n) throw new Error(n);
                })(e);
            },
            initCamera(e) {
                (C = e.camera), (C.position.z = 70);
            },
            initScene({ renderer: e, width: i, height: o, camera: a, scene: s }) {
                (function (e) {
                    switch ((void 0 !== t.background && (e.background = new q(t.background)), Ne(e, t.lights), t.geometry)) {
                        case "box":
                            E = new Ut();
                            break;
                        case "capsule":
                            E = new Ot(0.2, 1, 4, 8).rotateX(Math.PI / 2);
                            break;
                        case "cone":
                            E = new kt(0.4, 2, 6).rotateX(Math.PI / 2);
                            break;
                        case "octahedron":
                            E = new It(1, 0).rotateX(Math.PI / 2);
                            break;
                        case "sphere":
                            E = new Nt(0.5, 8, 8);
                            break;
                        default:
                            E = so(1);
                    }
                    const i = new Float32Array(2 * n);
                    let o = 0;
                    for (let e = 0; e < r; e++) for (let t = 0; t < r; t++) (i[o++] = t / (r - 1)), (i[o++] = e / (r - 1));
                    E.setAttribute("gpuUv", new le(i, 2)),
                        (M = new Ee({
                            metalness: 0.75,
                            roughness: 0.25,
                            side: Ce,
                            ...t.materialParams,
                            onBeforeCompile: (e) => {
                                Object.keys(w).forEach((t) => {
                                    e.uniforms[t] = w[t];
                                }),
                                    (e.vertexShader =
                                        "\n          uniform sampler2D uTexturePosition;\n          uniform sampler2D uOldTexturePosition;\n          uniform sampler2D uTextureVelocity;\n          uniform vec3 uScale;\n          attribute vec2 gpuUv;\n          varying vec4 vPos;\n          varying vec4 vVel;\n\n          mat3 lookAt(vec3 origin, vec3 target, vec3 up) {\n            vec3 z = target - origin;\n            if (z.x * z.x + z.y * z.y + z.z * z.z == 0.0) { z.z = 1.0; }\n            z = normalize(z);\n            vec3 x = cross(up, z);\n            if (x.x * x.x + x.y * x.y + x.z * x.z == 0.0) {\n              if (abs(up.z) == 1.0) { z.x += 0.0001; }\n              else { z.z += 0.0001; }\n              x = cross(up, z);\n            }\n            x = normalize(x);\n            vec3 y = cross(z, x);\n            return mat3(x, y, z);\n          }\n\n          mat4 iMatrix(vec3 pos, mat3 rmat, vec3 scale) {\n            return mat4(\n              rmat[0][0] * scale.x, rmat[0][1] * scale.x, rmat[0][2] * scale.x, 0.0,\n              rmat[1][0] * scale.y, rmat[1][1] * scale.y, rmat[1][2] * scale.y, 0.0,\n              rmat[2][0] * scale.z, rmat[2][1] * scale.z, rmat[2][2] * scale.z, 0.0,\n              pos.x, pos.y, pos.z, 1.0\n            );\n          }\n        " +
                                        e.vertexShader),
                                    (e.vertexShader = e.vertexShader.replace(
                                        "#include <defaultnormal_vertex>",
                                        "\n          vPos = texture2D(uTexturePosition, gpuUv);\n          vec4 oldPos = texture2D(uOldTexturePosition, gpuUv);\n          vVel = texture2D(uTextureVelocity, gpuUv);\n\n          mat3 rmat = lookAt(oldPos.xyz, vPos.xyz, vec3(0, 1, 0));\n          mat4 im = iMatrix(vPos.xyz, rmat, (0.5 + vPos.w) * uScale);\n\n          vec3 transformedNormal = objectNormal;\n          mat3 m = mat3(im);\n          transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n          transformedNormal = m * transformedNormal;\n          transformedNormal = normalMatrix * transformedNormal;\n        "
                                    )),
                                    (e.vertexShader = e.vertexShader.replace(
                                        "#include <project_vertex>",
                                        "\n          vec4 mvPosition = modelViewMatrix * im * vec4(transformed, 1.0);\n          gl_Position = projectionMatrix * mvPosition;\n        "
                                    ));
                            },
                        })),
                        (P = new De(E, M, n)),
                        R(t.colors),
                        e.add(P);
                })(s),
                    (S = new io(s, a)),
                    (z = new re(new _(i, o), t.bloomStrength, t.bloomRadius, t.bloomThreshold)),
                    (y = new oo(e)),
                    y.addPass(S),
                    y.addPass(z);
            },
            afterResize({ width: e, height: t }) {
                y && y.setSize(e, t);
            },
            beforeRender({ clock: e }) {
                (m.value = e.time * t.noiseTimeCoef),
                    i.compute(),
                    (c.value = l.renderTargets[i.currentTextureIndex].texture),
                    (u.value = l.renderTargets[0 === i.currentTextureIndex ? 1 : 0].texture),
                    (h.value = s.renderTargets[i.currentTextureIndex].texture);
            },
            render() {
                y.render();
            },
        }),
        config: t,
        uniforms: w,
        setColors: R,
    };
    function R(e) {
        if (Array.isArray(e) && e.length > 1) {
            const t = ce(e);
            for (let e = 0; e < n; e++) P.setColorAt(e, t.getColorAt(e / n));
            P.instanceColor.needsUpdate = !0;
        }
    }
}
function so(e) {
    const t = [
            { p: [0.5 * e, 0, -e], n: [0, 1, 0] },
            { p: [0.5 * -e, 0, -e], n: [0, 1, 0] },
            { p: [0, 0, e], n: [0, 1, 0] },
            { p: [0, 0.5 * -e, -e], n: [1, 0, 0] },
            { p: [0, 0.5 * e, -e], n: [1, 0, 0] },
            { p: [0, 0, e], n: [1, 0, 0] },
        ],
        r = [],
        n = [];
    for (const e of t) r.push(...e.p), n.push(...e.n);
    const i = new pe();
    return i.setAttribute("position", new te(r, 3)), i.setAttribute("normal", new te(n, 3)), i.setIndex([0, 1, 2, 3, 4, 5]), i;
}
const { randFloat: lo, randFloatSpread: ae } = xe;
export { no as swarmBackground };