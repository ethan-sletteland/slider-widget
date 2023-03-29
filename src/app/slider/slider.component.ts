import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('position', [
      state(
        'left',
        style({
          left: '{{left}}',
        }),
        { params: { left: '250px' } }
      ),
      state(
        'right',
        style({
          left: '{{left}}',
        }),
        { params: { left: '250px' } }
      ),
      transition('left => right', [animate('{{time}}')]),
      transition('right => left', [animate('{{time}}')]),
    ]),
  ],
})
export class SliderComponent {
  @Input() nodes!: number;
  nodesArr!: any[];
  selected = 0;

  position: string = 'left';
  leftPosition: string = '0px';
  animationTime: string = '600ms';
  globalListenFunc!: Function;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.nodesArr = new Array(this.nodes);
  }

  // click on rail
  select(e: MouseEvent, index: number) {
    e.preventDefault();
    this.selected = index;
    this.leftPosition =
      (e.currentTarget as HTMLAnchorElement).offsetLeft + 'px';
    this.move();
  }

  // drag and drop
  grab(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.globalListenFunc = this.renderer.listen(
      'document',
      'mousemove',
      (e: MouseEvent) => {
        const slider = document.getElementsByClassName(
          'slider'
        )[0] as HTMLElement;
        const ball = document.getElementsByClassName('ball')[0] as HTMLElement;
        const sliderLeft = e.clientX - slider.offsetLeft - 15;
        ball.style.left = sliderLeft + 'px';
        this.selected = Math.floor(
          (sliderLeft / slider.clientWidth) * this.nodes
        );
      }
    );
  }
  release(event: MouseEvent) {
    if (this.globalListenFunc) this.globalListenFunc();
    // this.move();
  }

  // use keys for accessibility
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.selected += 1;
      this.leftPosition =
        document.getElementById('tick-' + this.selected)?.offsetLeft + 'px';
      this.move();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.selected -= 1;
      this.leftPosition =
        document.getElementById('tick-' + this.selected)?.offsetLeft + 'px';
      this.move();
    }
  }

  // trigger animation
  move() {
    this.animationTime.slice(-2) == 'ms'
      ? null
      : (this.animationTime = this.animationTime + 'ms');
    this.leftPosition.slice(-2) == 'px'
      ? null
      : (this.leftPosition = this.leftPosition + 'px');
    // toggle state to trigger animation, there's a better way with * state
    this.position == 'left'
      ? (this.position = 'right')
      : (this.position = 'left');
  }
}

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
}
