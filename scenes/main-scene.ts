type Karuta = {
  id: string;
  description: string;
};

function shuffle<T>(array: T[]) {
  const out = Array.from(array);
  for (let i = out.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[r];
    out[r] = tmp;
  }
  return out;
}

export default class MainScene extends Phaser.Scene {
  private startTime: Date;
  private timer: Phaser.GameObjects.Text;
  private descriptionText: Phaser.GameObjects.Text;
  private penalty: number;
  private penaltyCount: number;
  private descriptionEvent: Phaser.Time.TimerEvent;

  private karutas: Array<Karuta> = [
    {
      id: '149',
      description:
        '特性でなんでも耐える　テラノーマルしんそくが強力\nそのポケモンの名前は　カイリュー',
    },
    {
      id: '445',
      description:
        'ポケモン界の主人公　今ルール貴重な地面枠\nそのポケモンの名前は　ガブリアス',
    },
    {
      id: '450',
      description:
        'やること大体ステロあくび　すなおこしで定数ダメージ\nそのポケモンの名前は　カバルドン',
    },
    {
      id: '635',
      description:
        '今ルール貴重な高火力特殊　テラスタルでフェアリー克服\nそのポケモンの名前は　サザンドラ',
    },
    {
      id: '887',
      description:
        '環境にいるポケモンの中で最速　SV発売前から最強と話題\nそのポケモンの名前は　ドラパルト',
    },
    {
      id: '911',
      description:
        '特性で積み技無視　専用技で火力アップ\nそのポケモンの名前は　ラウドボーン',
    },
    {
      id: '951',
      description:
        'パルデア地方の600属　火力はトップクラス\nそのポケモンの名前は　セグレイブ',
    },
    {
      id: '965',
      description:
        '状態異常無効でゴースト技半減　専用技がぶっ壊れ\nそのポケモンの名前は　キョジオーン',
    },
    {
      id: '977',
      description:
        '優秀な耐性に特性で変化技無効　進化方法が面倒\nそのポケモンの名前は　サーフゴー',
    },
    {
      id: '1008',
      description:
        'まさかの追加進化　ランクマ開始から評価爆上げ\nそのポケモンの名前は　ドドゲザン',
    },
  ];
  private questionShuffleKarutas: Array<Karuta>;
  private cardShuffleKarutas: Array<Karuta>;

  constructor() {
    super({
      key: 'Main',
      physics: { arcade: { debug: true } },
    });
  }

  preload(): void {
    this.karutas.map((karuta) => {
      this.load.image(karuta.id, '../assets/Karutas/' + karuta.id + '.jpg');
    });
  }

  create(): void {
    const { width, height } = this.sys.game.canvas;

    let nowQuestionIndex = 0;
    this.questionShuffleKarutas = shuffle(this.karutas);
    this.cardShuffleKarutas = shuffle(this.karutas);
    this.penalty = 5000;
    this.penaltyCount = 0;

    this.add
      .image(width / 2, height / 2, 'background')
      .setOrigin(0.5, 0.5)
      .setScale(0.54);

    const correctText = this.add
      .text(width / 2, height / 2, '正解！')
      .setFontSize(24)
      .setOrigin(0.5, 0.5)
      .setFill('red')
      .setStroke('white', 4)
      .setPadding(8)
      .setVisible(false)
      .setDepth(1);
    // const correctTextFade = this.tweens.create({
    //   targets: correctText,
    //   delay: 500,
    //   duration: 1000,
    //   props: {
    //     alpha: 0,
    //   },
    //   onComplete: () => {
    //     console.log('fin!!');
    //   },
    // });

    const textBox = this.add
      .rectangle(4, height - 56 - 4, width - 8, 56, 0xffffff)
      .setOrigin(0, 0)
      .setStrokeStyle(1, 0x000000)
      .setDepth(1);
    this.descriptionText = this.add
      .text(4, height - 56 - 4, '')
      .setFill('black')
      .setFontSize(24)
      .setPadding(4)
      .setDepth(1);
    this.setDescription(
      this.questionShuffleKarutas[nowQuestionIndex].description,
    );

    this.cardShuffleKarutas.map((karuta, index) => {
      const x = 80 + (index % 5) * 120;
      const y = 100 + Math.floor(index / 5) * 140;
      const karutaImage = this.add
        .image(x, y, karuta.id)
        .setOrigin(0.5, 0.5)
        .setAngle(Math.random() * 360)
        .setInteractive()
        .on('pointerdown', () => {
          if (this.questionShuffleKarutas[nowQuestionIndex].id == karuta.id) {
            correctText
              .setPosition(x, y)
              .setVisible(true)
              .setText('正解!')
              .setFill('red');
            // correctTextFade.play();
            karutaImage.setVisible(false);
            nowQuestionIndex++;
            if (nowQuestionIndex < this.questionShuffleKarutas.length) {
              this.setDescription(
                this.questionShuffleKarutas[nowQuestionIndex].description,
              );
            } else {
              const endTime = new Date();
              const resTime =
                endTime.getTime() -
                this.startTime.getTime() +
                this.penalty * this.penaltyCount;
              this.scene.start('Result', { resTime: resTime });
            }
          } else {
            correctText
              .setPosition(x, y)
              .setVisible(true)
              .setText('不正解…')
              .setFill('blue');
            const penaltyText = this.add
              .text(width, 24, '+5.000')
              .setOrigin(1, 0)
              .setStroke('blue', 3)
              .setFontSize(24)
              .setPadding(4)
              .setFill('skyblue');
            const penaltyTweens = this.tweens.add({
              targets: penaltyText,
              duration: 1000,
              props: {
                alpha: 0,
              },
              onComplete: () => {
                penaltyText.destroy();
              },
            });
            this.penaltyCount++;
          }
        });
    });

    this.add
      .text(10, 10, '←タイトルに戻る')
      .setBackgroundColor('green')
      .setStroke('gray', 1)
      .setFontSize(12)
      .setPadding(4)
      .setFill('white')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Title');
      });

    this.timer = this.add
      .text(width, 0, '000.000')
      .setBackgroundColor('pink')
      .setOrigin(1, 0)
      .setStroke('gray', 1)
      .setFontSize(24)
      .setPadding(4)
      .setFill('gray');

    this.startTime = new Date();
  }

  update(): void {
    const nowTime = new Date();
    const time =
      nowTime.getTime() -
      this.startTime.getTime() +
      this.penalty * this.penaltyCount;

    const decimal = time % 1000;
    const sec = (time - decimal) / 1000;

    const timerText =
      ('000' + sec).slice(-3) + '.' + ('000' + decimal).slice(-3);

    this.timer.setText(timerText);
  }

  setDescription(description: string): void {
    if (this.descriptionEvent) this.descriptionEvent.destroy();
    let displayCharIndex = 0;
    this.descriptionEvent = this.time.addEvent({
      delay: 100,
      repeat: description.length - 1,
      callback: () => {
        displayCharIndex++;
        this.descriptionText.setText(description.slice(0, displayCharIndex));
      },
    });
  }
}
