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

  preload(): void {}

  /**ロードが終わったあとのライフサイクルで呼ばれるメソッド */
  create(): void {
    const { width, height } = this.sys.game.canvas;

    this.add
      .image(width / 2, height / 2, 'background')
      .setOrigin(0.5, 0.5)
      .setScale(1.07);

    const titleText = this.add
      .text(
        width / 2,
        height / 2,
        'あなたの結果は' + (this.resTime / 1000).toString() + '秒です！',
      )
      .setOrigin(0.5, 0.5)
      .setStroke('red', 8)
      .setFontSize(80)
      .setPadding(16)
      .setFill('white');

    const startText = this.add
      .text(width / 2, height / 2 + 120, '結果をツイート')
      .setBackgroundColor('#1da1f2')
      .setOrigin(0.5, 0.5)
      .setFontSize(48)
      .setPadding(16)
      .setFill('white')
      .setInteractive()
      .on('pointerdown', () => {
        window.open(
          'https://twitter.com/intent/tweet?text=環境ポケモンかるたを' +
            (this.resTime / 1000).toString() +
            '秒でクリアしました！&url=https://ellen7788.github.io/HappyNewYear2023/',
        );
      });

    this.add
      .text(width / 2, height / 2 + 240, 'タイトルに戻る')
      .setBackgroundColor('green')
      .setOrigin(0.5, 0.5)
      .setStroke('gray', 2)
      .setFontSize(40)
      .setPadding(8)
      .setFill('white')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Title');
      });
  }
}
