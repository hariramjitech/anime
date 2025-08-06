import { useEffect, useRef } from "react";

export default function HeartBlastAnimation({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const settings = {
      particles: {
        length: 10000,
        duration: 4,
        velocity: 80,
        effect: -1.3,
        size: 8,
      },
    };

    let b = 0;
    const c = ["ms", "moz", "webkit", "o"];
    for (let a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
      window.requestAnimationFrame =
        window[c[a] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[c[a] + "CancelAnimationFrame"] ||
        window[c[a] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (h) {
        const d = new Date().getTime();
        const f = Math.max(0, 16 - (d - b));
        const g = window.setTimeout(function () {
          h(d + f);
        }, f);
        b = d + f;
        return g;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (d) {
        clearTimeout(d);
      };
    }

    function Point(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }
    Point.prototype.clone = function () {
      return new Point(this.x, this.y);
    };
    Point.prototype.length = function (length) {
      if (length === undefined) {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
      this.normalize();
      this.x *= length;
      this.y *= length;
      return this;
    };
    Point.prototype.normalize = function () {
      const length = this.length();
      this.x /= length;
      this.y /= length;
      return this;
    };

    function Particle() {
      this.position = new Point();
      this.velocity = new Point();
      this.acceleration = new Point();
      this.age = 0;
    }
    Particle.prototype.initialize = function (x, y, dx, dy) {
      this.position.x = x;
      this.position.y = y;
      this.velocity.x = dx;
      this.velocity.y = dy;
      this.acceleration.x = dx * settings.particles.effect;
      this.acceleration.y = dy * settings.particles.effect;
      this.age = 0;
    };
    Particle.prototype.update = function (deltaTime) {
      this.position.x += this.velocity.x * deltaTime;
      this.position.y += this.velocity.y * deltaTime;
      this.velocity.x += this.acceleration.x * deltaTime;
      this.velocity.y += this.acceleration.y * deltaTime;
      this.age += deltaTime;
    };
    Particle.prototype.draw = function (context, image) {
      function ease(t) {
        return --t * t * t + 1;
      }
      const size = image.width * ease(this.age / settings.particles.duration);
      context.globalAlpha = 1 - this.age / settings.particles.duration;
      context.drawImage(
        image,
        this.position.x - size / 2,
        this.position.y - size / 2,
        size,
        size
      );
    };

    function ParticlePool(length) {
      const particles = new Array(length);
      let firstActive = 0;
      let firstFree = 0;
      const duration = settings.particles.duration;

      for (let i = 0; i < particles.length; i++) {
        particles[i] = new Particle();
      }

      this.add = function (x, y, dx, dy) {
        particles[firstFree].initialize(x, y, dx, dy);
        firstFree++;
        if (firstFree === particles.length) firstFree = 0;
        if (firstActive === firstFree) {
          firstActive++;
        }
        if (firstActive === particles.length) firstActive = 0;
      };

      this.update = function (deltaTime) {
        let i;
        if (firstActive < firstFree) {
          for (i = firstActive; i < firstFree; i++) {
            particles[i].update(deltaTime);
          }
        }
        if (firstFree < firstActive) {
          for (i = firstActive; i < particles.length; i++) {
            particles[i].update(deltaTime);
          }
          for (i = 0; i < firstFree; i++) {
            particles[i].update(deltaTime);
          }
        }
        while (
          particles[firstActive].age >= duration &&
          firstActive !== firstFree
        ) {
          firstActive++;
          if (firstActive === particles.length) firstActive = 0;
        }
      };

      this.draw = function (context, image) {
        let i;
        if (firstActive < firstFree) {
          for (i = firstActive; i < firstFree; i++) {
            particles[i].draw(context, image);
          }
        }
        if (firstFree < firstActive) {
          for (i = firstActive; i < particles.length; i++) {
            particles[i].draw(context, image);
          }
          for (i = 0; i < firstFree; i++) {
            particles[i].draw(context, image);
          }
        }
      };
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const particles = new ParticlePool(settings.particles.length);
    const particleRate = settings.particles.length / settings.particles.duration;
    let time;

    function pointOnHeart(t) {
      return new Point(
        160 * Math.pow(Math.sin(t), 3),
        130 * Math.cos(t) -
          50 * Math.cos(2 * t) -
          20 * Math.cos(3 * t) -
          10 * Math.cos(4 * t) +
          25
      );
    }

    const image = (() => {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      c.width = settings.particles.size;
      c.height = settings.particles.size;

      function to(t) {
        const point = pointOnHeart(t);
        point.x =
          settings.particles.size / 2 +
          (point.x * settings.particles.size) / 350;
        point.y =
          settings.particles.size / 2 -
          (point.y * settings.particles.size) / 350;
        return point;
      }

      ctx.beginPath();
      let t = -Math.PI;
      let point = to(t);
      ctx.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01;
        point = to(t);
        ctx.lineTo(point.x, point.y);
      }
      ctx.closePath();
      ctx.fillStyle = "#f50b02";
      ctx.fill();

      const img = new Image();
      img.src = c.toDataURL();
      return img;
    })();

    function render() {
      requestAnimationFrame(render);
      const newTime = Date.now() / 1000;
      const deltaTime = newTime - (time || newTime);
      time = newTime;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const dir = pos.clone().length(settings.particles.velocity);
        particles.add(
          canvas.width / 2 + pos.x,
          canvas.height / 2 - pos.y,
          dir.x,
          -dir.y
        );
      }

      particles.update(deltaTime);
      particles.draw(context, image);
    }

    function onResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);
    onResize();
    render();

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 7000); // 7 seconds

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [onComplete]);

  return (
    <div className="bg-black w-screen h-screen">
      <canvas ref={canvasRef} id="pinkboard" className="w-full h-full" />
    </div>
  );
}
