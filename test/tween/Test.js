import {
    animation,
    requestAnimationFrame,
    cancelAnimationFrame,
    Easing
} from './../../external/lib/animation';

import Image from './Image';


let minion, control, from, to, path;


export default class Test
{
    constructor()
    {
        this.app = new PIXI.Application(800, 800, {forceCanvas: true, backgroundColor: 0xFFFFFF, antialias: true});
        document.body.appendChild(this.app.view);

        this.canvas = this.app.renderer.view;
        this.stage = this.app.stage;

        this.initialize();
        this.initializeGUI();
        this.render();
    }


    initialize()
    {
        this.render = this.render.bind(this);

        minion = new Image('../../asset/image/m7.png');
        minion.on('ready', () => {
            minion.width = 200;
            minion.scale.y = minion.scale.x;
        });

        to = new PIXI.Graphics();
        from = new PIXI.Graphics();
        path = new PIXI.Graphics();
        control = new PIXI.Graphics();

        this.stage.addChild(to);
        this.stage.addChild(from);
        this.stage.addChild(path);
        this.stage.addChild(control);

        this.stage.addChild(minion);
    }


    initializeGUI()
    {
        this.gui = new dat.GUI();

        this.config = {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            rotation: 0
        };

        // 기본 함수 테스트
        this.config.tween = this.tween.bind(this);
        this.config.to = this.to.bind(this);
        this.config.from = this.from.bind(this);
        this.config.apply = this.apply.bind(this);
        this.config.bezier = this.bezier.bind(this);
        this.config.bezierTo = this.bezierTo.bind(this);
        this.config.bezierFrom = this.bezierFrom.bind(this);
        this.config.physical = this.physical.bind(this);
        this.config.physicalTo = this.physicalTo.bind(this);
        this.config.physicalFrom = this.physicalFrom.bind(this);
        this.config.physicalApply = this.physicalApply.bind(this);
        this.config.parallel = this.parallel.bind(this);
        this.config.parallelTweens = this.parallelTweens.bind(this);
        this.config.serial = this.serial.bind(this);
        this.config.serialTweens = this.serialTweens.bind(this);
        this.config.reverse = this.reverse.bind(this);
        this.config.repeat = this.repeat.bind(this);
        this.config.scale = this.scale.bind(this);
        this.config.slice = this.slice.bind(this);
        this.config.delay = this.delay.bind(this);
        this.config.addChild = this.addChildAction.bind(this);
        this.config.removeFromParent = this.removeFromParent.bind(this);
        this.config.func = this.func.bind(this);

        this.gui.add(this.config, 'tween');
        this.gui.add(this.config, 'to');
        this.gui.add(this.config, 'from');
        this.gui.add(this.config, 'apply');
        this.gui.add(this.config, 'bezier');
        this.gui.add(this.config, 'bezierTo');
        this.gui.add(this.config, 'bezierFrom');
        this.gui.add(this.config, 'physical');
        this.gui.add(this.config, 'physicalTo');
        this.gui.add(this.config, 'physicalFrom');
        this.gui.add(this.config, 'physicalApply');
        this.gui.add(this.config, 'parallel');
        this.gui.add(this.config, 'parallelTweens');
        this.gui.add(this.config, 'serial');
        this.gui.add(this.config, 'serialTweens');
        this.gui.add(this.config, 'reverse');
        this.gui.add(this.config, 'repeat');
        this.gui.add(this.config, 'scale');
        this.gui.add(this.config, 'slice');
        this.gui.add(this.config, 'delay');
        this.gui.add(this.config, 'addChild');
        this.gui.add(this.config, 'removeFromParent');
        this.gui.add(this.config, 'func');
    }


    update(ms) {}


    render(ms)
    {
        this.update(ms);
        requestAnimationFrame(this.render);
    }


    tween()
    {
        path.clear();
        var tween = Be.tween(minion, {x: 250, y: 250}, {x: 0}, 2, Quad.easeInOut);
        tween.play();
    }


    to()
    {
        path.clear();
        var tween = Be.to(minion, {x: 300, y: 250}, 2, Elastic.easeInOut);
        tween.play();
    }


    from()
    {
        path.clear();
        var tween = Be.from(minion, {x: 800, y: 600}, 2, Bounce.easeOut);
        tween.play();
    }


    apply()
    {
        path.clear();
        Be.apply(minion, {x: 250, y: 250}, {x: 0}, 2, 0.5, Sine.easeOut);
    }


    bezier()
    {
        path.clear();
        control.x = 0;
        control.y = 200;

        var tween = Be.bezier(minion, {x: 400, y: 400}, {x: minion.x, y: minion.y}, {
            x: control.x,
            y: control.y
        }, 2, Quad.easeOut);

        tween.onPlay = () => {
            console.log('onPlay');
        };
        tween.onUpdate = () => {
            console.log(`onUpdate (${minion.x}, ${minion.y} )`);
            path.beginFill(controlPointColor);
            path.drawRect(minion.x, minion.y, controlPointSize, controlPointSize);
            path.endFill();
        };
        tween.onComplete = () => {
            console.log('onComplete');
        };
        tween.play();
    }


    bezierTo()
    {
        path.clear();
        control.x = 0;
        control.y = 200;

        var tween = Be.bezierTo(minion, {x: 400, y: 0}, {x: control.x, y: control.y}, 2, Quadratic.easeIn);
        tween.onPlay = () => {
            console.log('onPlay');
        };
        tween.onUpdate = () => {
            console.log(`onUpdate (${minion.x}, ${minion.y} )`);
            path.beginFill(controlPointColor);
            path.drawRect(minion.x, minion.y, controlPointSize, controlPointSize);
            path.endFill();

        };
        tween.onComplete = () => {
            console.log('onComplete');
        };
        tween.play();
    }


    bezierFrom()
    {
        path.clear();
        control.x = 200;
        control.y = 0;

        var tween = Be.bezierTo(minion, {x: 0, y: 400}, {x: control.x, y: control.y}, 2, Quadratic.easeIn);
        tween.onPlay = () => {
            console.log('onPlay');
        };
        tween.onUpdate = () => {
            console.log(`onUpdate (${minion.x}, ${minion.y} )`);
            path.beginFill(controlPointColor);
            path.drawRect(minion.x, minion.y, controlPointSize, controlPointSize);
            path.endFill();

        };
        tween.onComplete = () => {
            console.log('onComplete');
        };
        tween.play();
    }


    physical()
    {
        path.clear();
        control.x = -10;
        control.y = -10;

        var uniform = Be.physical(minion, {x: 400, y: 100}, {x: 0, y: 0}, Physical.uniform(12));
        uniform.onPlay = () => {
            console.log('onPlay');
        };
        uniform.onUpdate = () => {
            console.log(`onUpdate (${minion.x}, ${minion.y} )`);
            path.beginFill(controlPointColor);
            path.drawRect(minion.x, minion.y, controlPointSize, controlPointSize);
            path.endFill();
        };
        uniform.onComplete = () => {
            console.log('onComplete');
        };
        uniform.play();

        var icon1 = new PIXI.Sprite.fromImage('../../asset/image/icon/github.png');
        var icon2 = new PIXI.Sprite.fromImage('../../asset/image/icon/github.png');
        this.stage.addChild(icon1);
        this.stage.addChild(icon2);

        var accelerate = Be.physical(icon1, {x: 400, y: 200}, {x: 0, y: 0}, Physical.accelerate(2.0, 4.0));
        accelerate.onComplete = () => {
            this.stage.removeChild(icon1);
            icon1.destroy();
        };
        accelerate.play();

        var exponential = Be.physical(icon2, {x: 400, y: 300}, {x: 0, y: 0}, Physical.exponential(0.2));
        exponential.onComplete = () => {
            this.stage.removeChild(icon2);
            icon2.destroy();
        };
        exponential.play();
    }


    physicalTo()
    {
        path.clear();
        control.x = -10;
        control.y = -10;
        minion.x = 0;
        minion.y = 0;

        var uniform = Be.physicalTo(minion, {x: 400, y: 100}, Physical.uniform(12));
        uniform.onPlay = () => {
            console.log('onPlay');
        };
        uniform.onUpdate = () => {
            console.log(`onUpdate (${minion.x}, ${minion.y} )`);
            path.beginFill(controlPointColor);
            path.drawRect(minion.x, minion.y, controlPointSize, controlPointSize);
            path.endFill();

        };
        uniform.onComplete = () => {
            console.log('onComplete');
        };
        uniform.play();

        var icon1 = new PIXI.Sprite.fromImage('../../asset/image/icon/github.png');
        var icon2 = new PIXI.Sprite.fromImage('../../asset/image/icon/github.png');
        this.stage.addChild(icon1);
        this.stage.addChild(icon2);

        var accelerate = Be.physicalTo(icon1, {x: 400, y: 200}, Physical.accelerate(2.0, 4.0));
        accelerate.onComplete = () => {
            this.stage.removeChild(icon1);
            icon1.destroy();
        };
        accelerate.play();

        var exponential = Be.physicalTo(icon2, {x: 400, y: 300}, Physical.exponential(0.2));
        exponential.onComplete = () => {
            this.stage.removeChild(icon2);
            icon2.destroy();
        };
        exponential.play();
    }


    physicalFrom()
    {
        path.clear();
        control.x = -10;
        control.y = -10;

        var uniform = Be.physicalFrom(minion, {x: 0, y: 0}, Physical.uniform(12));
        uniform.onPlay = () => {
            console.log('onPlay');
        };
        uniform.onUpdate = () => {
            console.log(`onUpdate (${minion.x}, ${minion.y} )`);
            path.beginFill(controlPointColor);
            path.drawRect(minion.x, minion.y, controlPointSize, controlPointSize);
            path.endFill();

        };
        uniform.onComplete = () => {
            console.log('onComplete');
        };
        uniform.play();

        var icon1 = new PIXI.Sprite.fromImage('../../asset/image/icon/github.png');
        var icon2 = new PIXI.Sprite.fromImage('../../asset/image/icon/github.png');
        this.stage.addChild(icon1);
        this.stage.addChild(icon2);

        minion.x = 400;
        minion.y = 100;
        icon1.x = 400;
        icon1.y = 200;
        icon2.x = 400;
        icon2.y = 300;

        var accelerate = Be.physicalFrom(icon1, {x: 0, y: 0}, Physical.accelerate(2.0, 4.0));
        accelerate.onComplete = () => {
            this.stage.removeChild(icon1);
            icon1.destroy();
        };
        accelerate.play();

        var exponential = Be.physicalFrom(icon2, {x: 0, y: 0}, Physical.exponential(0.2));
        exponential.onComplete = () => {
            this.stage.removeChild(icon2);
            icon2.destroy();
        };
        exponential.play();
    }


    physicalApply()
    {
        control.x = -10;
        control.y = -10;
        Be.physicalApply(minion, {x: 400, y: 100}, {x: 0, y: 0}, 0.5, Physical.uniform(12));
    }


    parallel()
    {
        path.clear();
        control.x = -10;
        control.y = -10;

        // 5개 이상일 경우 테스트
        var move = Be.tween(minion, {x: 400}, {x: 100}, 2, Expo.easeOut);
        var scale1 = Be.tween(minion, {scaleX: 1, scaleY: 1}, {scaleX: 0.2, scaleY: 0.2}, 2, Elastic.easeOut);
        var scale2 = Be.tween(minion, {scaleX: 1, scaleY: 1}, {scaleX: 0.2, scaleY: 0.2}, 2, Elastic.easeOut);
        var scale3 = Be.tween(minion, {scaleX: 1, scaleY: 1}, {scaleX: 0.2, scaleY: 0.2}, 2, Elastic.easeOut);
        var scale4 = Be.tween(minion, {scaleX: 1, scaleY: 1}, {scaleX: 0.2, scaleY: 0.2}, 2, Elastic.easeOut);
        var group = Be.parallel(move, scale1, scale2, scale3, scale4);
        group.play();
    }


    parallelTweens()
    {
        path.clear();
        control.x = -10;
        control.y = -10;

        // 5개 이상일 경우 테스트
        var move = Be.tween(minion, {x: 400}, {x: 100}, 2, Expo.easeOut);
        var scale1 = Be.tween(minion, {scaleX: 1, scaleY: 1}, {scaleX: 0.2, scaleY: 0.2}, 2, Elastic.easeOut);
        var scale2 = Be.tween(minion, {scaleX: 1, scaleY: 1}, {scaleX: 0.2, scaleY: 0.2}, 2, Elastic.easeOut);
        var scale3 = Be.tween(minion, {scaleX: 1, scaleY: 1}, {scaleX: 0.2, scaleY: 0.2}, 2, Elastic.easeOut);
        var scale4 = Be.tween(minion, {scaleX: 1, scaleY: 1}, {scaleX: 0.2, scaleY: 0.2}, 2, Elastic.easeOut);
        var tweens = [move, scale1, scale2, scale3, scale4];
        var group = Be.parallelTweens(tweens);
        group.play();
    }


    serial()
    {
        path.clear();
        control.x = -10;
        control.y = -10;

        // 5개 이상일 경우 테스트
        var time = 0.2;
        var move1 = Be.to(minion, {x: 400, y: 400}, time, Back.easeOut);
        var move2 = Be.to(minion, {x: 0, y: 0}, time, Exponential.easeOut);
        var move3 = Be.to(minion, {x: 300, y: 300}, time, Quartic.easeOut);
        var move4 = Be.to(minion, {x: 100, y: 100}, time, Quart.easeOut);
        var move5 = Be.to(minion, {x: 200, y: 200}, time, Quad.easeOut);
        var group = Be.serial(move1, move2, move3, move4, move5);
        group.play();
    }


    serialTweens()
    {
        path.clear();
        control.x = -10;
        control.y = -10;

        // 5개 이상일 경우 테스트
        var time = 0.2;
        var move1 = Be.to(minion, {x: 400, y: 400, scaleX: 2, scaleY: 2}, time, Back.easeOut);
        var move2 = Be.to(minion, {x: 0, y: 0}, time, Exponential.easeOut);
        var move3 = Be.to(minion, {x: 300, y: 300}, time, Quartic.easeOut);
        var move4 = Be.to(minion, {x: 100, y: 100}, time, Quart.easeOut);
        var move5 = Be.to(minion, {x: 200, y: 200}, time, Quad.easeOut);
        var tweens = [move1, move2, move3, move4, move5];
        var group = Be.serialTweens(tweens);
        group.play();
    }


    reverse()
    {
        path.clear();
        var tween = Be.tween(minion, {x: 500}, {x: 100}, 1, Quad.easeOut);
        var reverse = Be.reverse(tween, true);
        reverse.play();
    }


    repeat()
    {
        path.clear();
        var tween = Be.tween(minion, {x: 500}, {x: 100}, 1, Quad.easeOut);
        var repeat = Be.repeat(tween, 3);
        repeat.play();
    }


    scale()
    {
        path.clear();
        var tween = Be.tween(minion, {x: 500}, {x: 100}, 1, Quad.easeOut);
        var scale = Be.scale(tween, 3);
        scale.play();
    }


    slice()
    {
        path.clear();
        var tween = Be.tween(minion, {x: 500}, {x: 100}, 1, Quad.easeOut);
        var slice = Be.slice(tween, 0.1, 0.6);
        slice.play();
    }


    delay()
    {
        path.clear();
        var tween = Be.tween(minion, {x: 500}, {x: 100}, 1, Quad.easeOut);
        var delay = Be.delay(tween, 2, 1);
        delay.play();
    }


    addChildAction()
    {
        path.clear();
        var panda = new PIXI.Sprite.fromImage('../../asset/image/icon/panda.png');
        var addChildAction = Be.addChild(panda, this.stage);
        var to = Be.to(panda, {x: 400, y: 400, scaleX: 2, scaleY: 2, skewX: 2, skewY: 2}, 2, Bounce.easeOut);
        var removeFromParent = Be.removeFromParent(panda);
        var serial = Be.serial(addChildAction, to, removeFromParent);
        serial.play();
    }


    removeFromParent()
    {
        var p, w = this.canvas.width, h = this.canvas.height;

        for (var i = 0; i < 200; i++) {
            p = new PIXI.Graphics();
            p.beginFill(0xFFFFFF * Math.random());
            p.drawCircle(0, 0, Math.random() * 5 + 1);
            p.endFill();
            p.x = Math.random() * w;
            p.y = Math.random() * h;

            var t = Be.serial(
                Be.addChild(p, this.stage),
                Be.tween(p,
                    {
                        alpha: 0.8,
                        _blurFilter: {blurX: 0, blurY: 0}
                    },
                    {
                        _blurFilter: {blurX: 16, blurY: 16},
                        alpha: 0
                    },
                    3, null, Math.random() * 5),
                Be.tween(p, {alpha: 1}, {alpha: 0.8}, 2),
                Be.removeFromParent(p)
            );

            //t.stopOnComplete = false;
            t.play();
        }
    }


    func()
    {
        path.clear();

        var stage = this.stage,
            canvas = this.canvas,
            points = getPoint(100);

        var to = Be.func(toPoint, [points]);
        var scale = Be.func(scalePoint, [points]);
        var skew = Be.func(skewPoint, [points]);
        var serial = Be.serialTweens([to, scale, skew]);
        serial.play();

        function toPoint(list) {
            var l = list.length;
            for (var i = 0; i < l; i++) {
                Be.to(list[i], {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                }, 0.5 + Math.random() * 1, Bounce.easeOut).play();
            }
        }

        function scalePoint(list) {
            var l = list.length;
            for (var i = 0; i < l; i++) {
                Be.to(list[i], {
                    scaleX: Math.random() * 3,
                    scaleY: Math.random() * 3,
                }, 0.5 + Math.random() * 1, Elastic.easeOut).play();
            }
        }

        function skewPoint(list) {
            var l = list.length;
            for (var i = 0; i < l; i++) {
                Be.to(list[i], {
                    skewX: Math.random() * 10,
                    skewY: Math.random() * 10,
                }, 0.5 + Math.random() * 1, Back.easeOut).play();
            }
        }

        function getPoint(num) {
            var list = [];
            for (var i = 0; i < num; i++) {
                var point = new PIXI.Graphics();
                point.beginFill(0xFFFFFF * Math.random());
                point.drawRect(0, 0, 5, 5);
                point.endFill();
                stage.addChild(point);
                list.push(point);
            }
            return list;
        }
    }
}