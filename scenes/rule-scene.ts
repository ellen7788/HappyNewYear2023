export default class RuleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Rule',
    });
  }

  preload(): void {}

  create(): void {
    const { width, height } = this.sys.game.canvas;

    this.add
      .image(width / 2, height / 2, 'background')
      .setOrigin(0.5, 0.5)
      .setScale(1.07);

    const textBox = this.add
      .rectangle(8, 80, width - 16, height - 80 - 8, 0xffffff)
      .setOrigin(0, 0)
      .setStrokeStyle(2, 0x000000)
      .setAlpha(0.8);
    this.setDescription(
      width,
      80 + (height / 5) * 1,
      '現環境トップtireのポケモン10体のかるたです。',
    );
    this.setDescription(
      width,
      80 + (height / 5) * 2,
      '説明文が流れるので、その説明に沿ったポケモンを選んでください。',
    );
    this.setDescription(
      width,
      80 + (height / 5) * 3,
      'お手付きするとタイムに+5秒されます。',
    );
    this.setDescription(
      width,
      80 + (height / 5) * 4,
      'クリア後、タイムが表示されます。',
    );

    this.add
      .text(10, 10, '←戻る')
      .setFontFamily('HG行書体')
      .setBackgroundColor('green')
      .setStroke('gray', 1)
      .setFontSize(36)
      .setPadding(8)
      .setFill('white')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Title');
      });
  }

  setDescription(width: number, height: number, message: string): void {
    this.add
      .text(width / 2, height, message)
      .setOrigin(0.5, 1)
      .setFontFamily('HG行書体')
      .setStroke('gray', 1)
      .setFontSize(40)
      .setPadding(8)
      .setFill('black');
  }
}
