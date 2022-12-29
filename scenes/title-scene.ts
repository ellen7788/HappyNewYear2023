export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Title',
    });
  }

  preload(): void {
    this.load.image(
      'background',
      'https://raw.githubusercontent.com/ellen7788/HappyNewYear2023/main/assets/background.jpg',
    );
  }

  /**ロードが終わったあとのライフサイクルで呼ばれるメソッド */
  create(): void {
    const { width, height } = this.sys.game.canvas;

    this.add
      .image(width / 2, height / 2, 'background')
      .setOrigin(0.5, 0.5)
      .setScale(1.07);

    const titleText = this.add
      .text(width / 2, height / 2, '環境ポケモンかるた')
      .setOrigin(0.5, 0.5)
      .setStroke('red', 8)
      .setFontSize(88)
      .setPadding(12)
      .setFill('white');
    const startText = this.add
      .text(width / 2, height / 2 + 120, 'スタート')
      .setBackgroundColor('green')
      .setOrigin(0.5, 0.5)
      .setStroke('gray', 1)
      .setFontSize(40)
      .setPadding(8)
      .setFill('white');
    //setInteractiveを呼ぶと動的なオブジェクトになる
    //入力系のイベントなどが有効化される
    startText.setInteractive();

    startText.on('pointerdown', () => {
      this.scene.start('Main');
    });
  }
}
