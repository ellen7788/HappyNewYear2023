export default class ResultScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Result',
    });
  }

  private resTime: number;

  init(resTime: { resTime: number }): void {
    this.resTime = resTime.resTime;
  }

  preload(): void {
    this.load.image('background', '../assets/background.jpg');
  }

  /**ロードが終わったあとのライフサイクルで呼ばれるメソッド */
  create(): void {
    const { width, height } = this.sys.game.canvas;

    this.add
      .image(width / 2, height / 2, 'background')
      .setOrigin(0.5, 0.5)
      .setScale(0.54);

    const titleText = this.add
      .text(
        width / 2,
        height / 2,
        'あなたの結果は' + (this.resTime / 1000).toString() + '秒です！',
      )
      .setOrigin(0.5, 0.5)
      .setStroke('red', 4)
      .setFontSize(36)
      .setPadding(8)
      .setFill('white');

    const startText = this.add
      .text(width / 2, height / 2 + 60, '結果をツイート')
      .setBackgroundColor('#1da1f2')
      .setOrigin(0.5, 0.5)
      .setFontSize(24)
      .setPadding(8)
      .setFill('white')
      .setInteractive()
      .on('pointerdown', () => {
        window.open(
          'https://twitter.com/intent/tweet?text=環境ポケモンかるたを' +
            (this.resTime / 1000).toString() +
            '秒でクリアしました！&url=',
        );
      });

    this.add
      .text(width / 2, height / 2 + 120, 'タイトルに戻る')
      .setBackgroundColor('green')
      .setOrigin(0.5, 0.5)
      .setStroke('gray', 1)
      .setFontSize(20)
      .setPadding(4)
      .setFill('white')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Title');
      });
  }
}
