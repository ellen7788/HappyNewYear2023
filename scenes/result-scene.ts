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

  create(): void {
    const { width, height } = this.sys.game.canvas;

    this.add
      .image(width / 2, height / 2, 'background')
      .setOrigin(0.5, 0.5)
      .setScale(1.07);

    const akeomeText = this.add
      .text(
        width / 2,
        height / 2 - 160,
        'あけましておめでとうございます\n　今年もよろしくお願いします',
      )
      .setFontFamily('游明朝')
      .setOrigin(0.5, 0.5)
      .setStroke('white', 4)
      .setFontSize(40)
      .setPadding(16)
      .setFill('black');

    const titleText = this.add
      .text(
        width / 2,
        height / 2,
        'あなたの結果は' + (this.resTime / 1000).toString() + '秒です！',
      )
      .setFontFamily('HG行書体')
      .setOrigin(0.5, 0.5)
      .setStroke('red', 8)
      .setFontSize(80)
      .setPadding(16)
      .setFill('white');

    const startText = this.add
      .text(width / 2, height / 2 + 120, '結果をツイート')
      .setFontFamily('HG行書体')
      .setBackgroundColor('#1da1f2')
      .setOrigin(0.5, 0.5)
      .setFontSize(48)
      .setPadding(16)
      .setFill('white')
      .setInteractive()
      .on('pointerdown', () => {
        const baseUrl = 'https://twitter.com/intent/tweet?';
        const message = [
          'text',
          '環境ポケモンかるたを' +
            (this.resTime / 1000).toString() +
            '秒でクリアしました！',
        ];
        const url = ['url', location.href];
        const query = new URLSearchParams([message, url]).toString();
        const shareUrl = `${baseUrl}${query}`;
        const res = window.open(shareUrl, '_blank');

        if (res && res.focus) res.focus();
        else if (!res) window.location.href = shareUrl;
      });

    this.add
      .text(width / 2, height / 2 + 240, 'タイトルに戻る')
      .setFontFamily('HG行書体')
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
