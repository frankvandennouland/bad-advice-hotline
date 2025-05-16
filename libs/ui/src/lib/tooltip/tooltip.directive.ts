import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import tippy, { Instance, Props, animateFill } from 'tippy.js';

@Directive({
  selector: '[uiTooltip],[uiTooltipOptions]',
})
export class TooltipDirective implements AfterViewInit, OnDestroy, OnChanges {
  /**
   * Tooltip text (with same name as the selector)
   */
  @Input() uiTooltip: string | undefined | null;
  /**
   * Tooltip options (with same name as the selector)
   */
  @Input() uiTooltipOptions: Partial<Props> | undefined;

  /**
   * Tippy instance
   */
  private instance: Instance | undefined | null;

  constructor(private readonly element: ElementRef) {}

  /**
   * Part of Anuglar lifecycle
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.instance = tippy(this.element.nativeElement as HTMLElement, {
      theme: 'tomato',
      animateFill: true,
      plugins: [animateFill],
    });

    this.updateProps({
      ...(this.uiTooltipOptions || {}),
      allowHTML: true,
      content: this.uiTooltip || '',
    });
  }

  /**
   * Part of Anuglar lifecycle
   * @returns {void}
   */
  ngOnDestroy(): void {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  }

  /**
   * Part of Anuglar lifecycle
   * @param {SimpleChanges} changes
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    const props = {
      ...(changes['uiTooltipOptions']?.currentValue
        ? this.uiTooltipOptions
        : {}),
      content: changes['uiTooltip']?.currentValue || this.uiTooltip,
    };

    this.updateProps(props);
  }

  /**
   * Update tooltip properties
   * @param {Partial<Props>} props
   * @returns {void}
   */
  private updateProps(props: Partial<Props>): void {
    if (
      this.instance &&
      JSON.stringify(props) !== JSON.stringify(this.instance.props)
    ) {
      this.instance.setProps(this.normalizeOptions(props));

      if (!props.content) {
        this.instance.disable();
      } else {
        this.instance.enable();
      }
    }
  }

  /**
   * Normalize tooltip options with sane defaults
   * @param {Partial<Props>} props
   * @returns {Partial<Props>}
   */
  private normalizeOptions(props: Partial<Props>): Partial<Props> {
    return {
      ...props,
      duration: props.duration || [50, 50],
    };
  }
}
