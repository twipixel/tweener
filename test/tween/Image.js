

export default class Image extends PIXI.Container
{
    constructor(url)
    {
        super();
        this.image = new PIXI.Sprite.fromImage(url);
        this.image.texture.baseTexture.on('loaded', this.ready.bind(this));
        this.addChild(this.image);
    }


    ready()
    {
        this.image.x = -this.image.width / 2;
        this.image.y = -this.image.height / 2;
        this.emit('ready');
    }
}