"use strict";
(self["webpackChunkalgorithm_dashboard"] = self["webpackChunkalgorithm_dashboard"] || []).push([["main"],{

/***/ 32:
/*!****************************************************************!*\
  !*** ./libs/ui/src/lib/drawing-grid/drawing-grid.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawingGridComponent: () => (/* binding */ DrawingGridComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 3900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1817);
/* harmony import */ var _drawing_grid_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawing-grid.service */ 712);
/* harmony import */ var _interfaces___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interfaces/ */ 1732);










const _c0 = ["canvas"];
function DrawingGridComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("mousedown", function DrawingGridComponent_div_0_Template_div_mousedown_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.lockMouse($event));
    })("mouseup", function DrawingGridComponent_div_0_Template_div_mouseup_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.releaseMouse($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "canvas", 3, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("mousedown", function DrawingGridComponent_div_0_Template_canvas_mousedown_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onMouseDown($event));
    })("mousemove", function DrawingGridComponent_div_0_Template_canvas_mousemove_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onMouseMove($event));
    })("mouseup", function DrawingGridComponent_div_0_Template_canvas_mouseup_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onMouseUp($event));
    })("contextmenu", function DrawingGridComponent_div_0_Template_canvas_contextmenu_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onContextMenu($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("width", ctx_r1.width)("height", ctx_r1.height);
  }
}
class DrawingGridComponent {
  constructor(gridService) {
    this.gridService = gridService;
    this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    this.fillStyle = '#424242';
    this.disabled = false;
    this.mouseDown = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.mouseMove = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.mouseUp = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.contextMenu = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
  }
  ngOnInit() {
    this.gridService.isMouseLocked$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this.destroy$)).subscribe(isMouseLocked => this.isMouseLocked = isMouseLocked);
    this.gridService.pixels$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this.destroy$)).subscribe(pixels => {
      if (pixels && this.renderingContext) {
        this.render(pixels);
      }
    });
    this.calculateGridSizes();
    this.gridService.pixels = this.generatePixels();
  }
  ngAfterViewInit() {
    this.renderingContext = this.canvasRef.nativeElement.getContext('2d');
    this.clearCanvas();
    this.renderGrid();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onMouseDown(event) {
    if (!this.disabled) {
      const pixel = this.getPixelAt(event.offsetX, event.offsetY);
      if (pixel) {
        this.mouseDown.emit(pixel);
      }
    }
  }
  onMouseMove(event) {
    if (!this.disabled && this.isMouseLocked) {
      const pixel = this.getPixelAt(event.offsetX, event.offsetY);
      if (pixel) {
        if (this.cachedPixel && this.cachedPixel.x === pixel.x && this.cachedPixel.y === pixel.y) {
          return;
        }
        this.cachedPixel = pixel;
        this.mouseMove.emit(pixel);
      }
    }
  }
  onMouseUp(event) {
    if (!this.disabled && this.isMouseLocked) {
      this.gridService.setPaintingMode(_interfaces___WEBPACK_IMPORTED_MODULE_1__.PaintingMode.CREATE);
      const pixel = this.getPixelAt(event.offsetX, event.offsetY);
      if (pixel) {
        this.mouseUp.emit(pixel);
      }
    }
  }
  onContextMenu(event) {
    event.preventDefault();
    if (!this.disabled) {
      this.gridService.setPaintingMode(_interfaces___WEBPACK_IMPORTED_MODULE_1__.PaintingMode.ERASE);
      const pixel = this.getPixelAt(event.offsetX, event.offsetY);
      if (pixel) {
        this.contextMenu.emit(pixel);
      }
    }
  }
  lockMouse(event) {
    if (!this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      this.gridService.lockMouse();
    }
  }
  releaseMouse(event) {
    if (!this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      this.gridService.releaseMouse();
    }
  }
  render(pixels) {
    this.clearCanvas();
    [].concat(...pixels).forEach(pixel => {
      const {
        x,
        y
      } = pixel;
      if (pixel.fillStyle && this.renderingContext) {
        this.renderingContext.fillStyle = pixel.fillStyle;
        this.renderingContext.fillRect(x * this.pixelSize + this.paddingLeft, y * this.pixelSize + this.paddingTop, this.pixelSize, this.pixelSize);
      }
    });
    this.renderGrid();
  }
  renderGrid() {
    if (!this.renderingContext || !this.width || !this.height) {
      return;
    }
    this.renderingContext.strokeStyle = this.fillStyle;
    this.renderingContext.beginPath();
    for (let x = this.paddingLeft; x <= this.width - this.paddingRight; x += this.pixelSize) {
      this.renderingContext.moveTo(x, this.paddingTop);
      this.renderingContext.lineTo(x, this.height - this.paddingBottom);
    }
    for (let y = this.paddingTop; y <= this.height - this.paddingBottom; y += this.pixelSize) {
      this.renderingContext.moveTo(this.paddingLeft, y);
      this.renderingContext.lineTo(this.width - this.paddingRight, y);
    }
    this.renderingContext.stroke();
  }
  clearCanvas() {
    if (!this.renderingContext || !this.width || !this.height) {
      return;
    }
    this.renderingContext.clearRect(0, 0, this.width, this.height);
  }
  calculateGridSizes() {
    if (!this.width || !this.height) {
      return;
    }
    if (!this.xNodes) {
      this.xNodes = Math.floor(this.width / this.pixelSize);
    }
    if (!this.yNodes) {
      this.yNodes = Math.floor(this.height / this.pixelSize);
    }
    this.paddingX = this.width - this.xNodes * this.pixelSize;
    this.paddingY = this.height - this.yNodes * this.pixelSize;
    this.paddingLeft = Math.ceil(this.paddingX / 3) - 0.5;
    this.paddingTop = Math.ceil(this.paddingY / 3) - 0.5;
    this.paddingRight = this.width - this.xNodes * this.pixelSize - this.paddingLeft;
    this.paddingBottom = this.height - this.yNodes * this.pixelSize - this.paddingTop;
  }
  generatePixels() {
    const pixels = [];
    let index = 0;
    for (let y = 0; y < this.yNodes; y++) {
      for (let x = 0; x < this.xNodes; x++) {
        pixels[index] = {
          id: `${y}-${x}`,
          x,
          y
        };
        index++;
      }
    }
    return pixels;
  }
  getPixelAt(x, y) {
    return this.gridService.getPixel(Math.floor(x / this.pixelSize), Math.floor(y / this.pixelSize));
  }
  static {
    this.ɵfac = function DrawingGridComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || DrawingGridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_drawing_grid_service__WEBPACK_IMPORTED_MODULE_0__.DrawingGridService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: DrawingGridComponent,
      selectors: [["ui-drawing-grid"]],
      viewQuery: function DrawingGridComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.canvasRef = _t.first);
        }
      },
      inputs: {
        width: "width",
        height: "height",
        xNodes: "xNodes",
        yNodes: "yNodes",
        pixelSize: "pixelSize",
        fillStyle: "fillStyle",
        disabled: "disabled"
      },
      outputs: {
        mouseDown: "mouseDown",
        mouseMove: "mouseMove",
        mouseUp: "mouseUp",
        contextMenu: "contextMenu"
      },
      decls: 1,
      vars: 1,
      consts: [["canvas", ""], [3, "mousedown", "mouseup", 4, "ngIf"], [3, "mousedown", "mouseup"], [1, "pixels", 3, "mousedown", "mousemove", "mouseup", "contextmenu", "width", "height"]],
      template: function DrawingGridComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, DrawingGridComponent_div_0_Template, 3, 2, "div", 1);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.width && ctx.height);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule],
      encapsulation: 2,
      changeDetection: 0
    });
  }
}

/***/ }),

/***/ 86:
/*!******************************************************!*\
  !*** ./libs/ui/src/lib/tooltip/tooltip.directive.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipDirective: () => (/* binding */ TooltipDirective)
/* harmony export */ });
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tippy.js */ 4308);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);



class TooltipDirective {
  constructor(element) {
    this.element = element;
  }
  /**
   * Part of Anuglar lifecycle
   * @returns {void}
   */
  ngAfterViewInit() {
    this.instance = (0,tippy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.element.nativeElement, {
      theme: 'tomato',
      animateFill: true,
      plugins: [tippy_js__WEBPACK_IMPORTED_MODULE_0__.animateFill]
    });
    this.updateProps({
      ...(this.uiTooltipOptions || {}),
      allowHTML: true,
      content: this.uiTooltip || ''
    });
  }
  /**
   * Part of Anuglar lifecycle
   * @returns {void}
   */
  ngOnDestroy() {
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
  ngOnChanges(changes) {
    const props = {
      ...(changes['uiTooltipOptions']?.currentValue ? this.uiTooltipOptions : {}),
      content: changes['uiTooltip']?.currentValue || this.uiTooltip
    };
    this.updateProps(props);
  }
  /**
   * Update tooltip properties
   * @param {Partial<Props>} props
   * @returns {void}
   */
  updateProps(props) {
    if (this.instance && JSON.stringify(props) !== JSON.stringify(this.instance.props)) {
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
  normalizeOptions(props) {
    return {
      ...props,
      duration: props.duration || [50, 50]
    };
  }
  static {
    this.ɵfac = function TooltipDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TooltipDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef));
    };
  }
  static {
    this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: TooltipDirective,
      selectors: [["", "uiTooltip", ""], ["", "uiTooltipOptions", ""]],
      inputs: {
        uiTooltip: "uiTooltip",
        uiTooltipOptions: "uiTooltipOptions"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]]
    });
  }
}

/***/ }),

/***/ 712:
/*!**************************************************************!*\
  !*** ./libs/ui/src/lib/drawing-grid/drawing-grid.service.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawingGridService: () => (/* binding */ DrawingGridService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces */ 1732);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);



class DrawingGridService {
  constructor() {
    this._isMouseLocked = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
    this._paintingMode = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(_interfaces__WEBPACK_IMPORTED_MODULE_0__.PaintingMode.CREATE);
    this._pixels = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
    this.isMouseLocked$ = this._isMouseLocked.asObservable();
    this.paintingMode$ = this._paintingMode.asObservable();
    this.pixels$ = this._pixels.asObservable();
  }
  lockMouse() {
    this.isMouseLocked = true;
  }
  releaseMouse() {
    this.isMouseLocked = false;
  }
  setPaintingMode(mode) {
    this._paintingMode.next(mode);
  }
  fillPixel(x, y, color) {
    this.updatePixel(x, y, color.value);
  }
  clearPixel(x, y) {
    this.updatePixel(x, y, undefined);
  }
  getPixel(x, y) {
    return this.pixels.find(pixel => pixel.x === x && pixel.y === y);
  }
  getPixelById(id) {
    return this.pixels.find(pixel => pixel.id === id);
  }
  updatePixel(x, y, fillStyle) {
    const pixel = this.getPixelById(`${y}-${x}`);
    if (pixel) {
      if (pixel.fillStyle === fillStyle) {
        return;
      }
      const index = this.pixels.indexOf(pixel);
      this.pixels[index] = {
        ...pixel,
        fillStyle
      };
      this.pixels = [...this.pixels];
    }
  }
  get isMouseLocked() {
    return this._isMouseLocked.getValue();
  }
  set isMouseLocked(isMouseLocked) {
    this._isMouseLocked.next(isMouseLocked);
  }
  get pixels() {
    return this._pixels.getValue();
  }
  set pixels(pixels) {
    this._pixels.next(pixels);
  }
  static {
    this.ɵfac = function DrawingGridService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || DrawingGridService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: DrawingGridService,
      factory: DrawingGridService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 1154:
/*!*******************************************************!*\
  !*** ./apps/frontend/algorithm-dashboard/src/main.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 3572);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 1518:
/*!************************************************!*\
  !*** ./libs/ui/src/lib/card/card.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CardComponent: () => (/* binding */ CardComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);



const _c0 = ["*"];
class CardComponent {
  constructor() {
    this.styleModifiers = '';
  }
  static {
    this.ɵfac = function CardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CardComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: CardComponent,
      selectors: [["ui-card"]],
      inputs: {
        styleModifiers: "styleModifiers"
      },
      ngContentSelectors: _c0,
      decls: 2,
      vars: 3,
      template: function CardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("bg-white bg-clip-border text-white shadow-md ", ctx.styleModifiers, "");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 1732:
/*!**********************************************************!*\
  !*** ./libs/ui/src/lib/drawing-grid/interfaces/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaintingMode: () => (/* reexport safe */ _painting_mode__WEBPACK_IMPORTED_MODULE_0__.PaintingMode)
/* harmony export */ });
/* harmony import */ var _painting_mode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./painting-mode */ 6219);
/* harmony import */ var _pixel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pixel */ 3191);
/* harmony import */ var _pixel_coordinates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pixel-coordinates */ 8565);




/***/ }),

/***/ 1834:
/*!**************************************!*\
  !*** ./libs/ui/src/lib/ui.module.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UiModule: () => (/* binding */ UiModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _button_button_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button/button.component */ 4466);
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card/card.component */ 1518);
/* harmony import */ var _color_picker_color_picker_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color-picker/color-picker.component */ 6862);
/* harmony import */ var _drawing_grid_drawing_grid_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawing-grid/drawing-grid.component */ 32);
/* harmony import */ var _playground_playground_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./playground/playground.component */ 9416);
/* harmony import */ var _select_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./select/select.component */ 2574);
/* harmony import */ var _tooltip_tooltip_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tooltip/tooltip.directive */ 86);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);









class UiModule {
  static {
    this.ɵfac = function UiModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || UiModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
      type: UiModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _color_picker_color_picker_component__WEBPACK_IMPORTED_MODULE_2__.ColorPickerComponent, _drawing_grid_drawing_grid_component__WEBPACK_IMPORTED_MODULE_3__.DrawingGridComponent, _card_card_component__WEBPACK_IMPORTED_MODULE_1__.CardComponent, _select_select_component__WEBPACK_IMPORTED_MODULE_5__.SelectComponent, _playground_playground_component__WEBPACK_IMPORTED_MODULE_4__.PlaygroundComponent]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](UiModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _color_picker_color_picker_component__WEBPACK_IMPORTED_MODULE_2__.ColorPickerComponent, _drawing_grid_drawing_grid_component__WEBPACK_IMPORTED_MODULE_3__.DrawingGridComponent, _card_card_component__WEBPACK_IMPORTED_MODULE_1__.CardComponent, _tooltip_tooltip_directive__WEBPACK_IMPORTED_MODULE_6__.TooltipDirective, _select_select_component__WEBPACK_IMPORTED_MODULE_5__.SelectComponent, _playground_playground_component__WEBPACK_IMPORTED_MODULE_4__.PlaygroundComponent, _button_button_component__WEBPACK_IMPORTED_MODULE_0__.ButtonComponent],
    exports: [_color_picker_color_picker_component__WEBPACK_IMPORTED_MODULE_2__.ColorPickerComponent, _drawing_grid_drawing_grid_component__WEBPACK_IMPORTED_MODULE_3__.DrawingGridComponent, _card_card_component__WEBPACK_IMPORTED_MODULE_1__.CardComponent, _tooltip_tooltip_directive__WEBPACK_IMPORTED_MODULE_6__.TooltipDirective, _select_select_component__WEBPACK_IMPORTED_MODULE_5__.SelectComponent, _playground_playground_component__WEBPACK_IMPORTED_MODULE_4__.PlaygroundComponent, _button_button_component__WEBPACK_IMPORTED_MODULE_0__.ButtonComponent]
  });
})();

/***/ }),

/***/ 2574:
/*!****************************************************!*\
  !*** ./libs/ui/src/lib/select/select.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectComponent: () => (/* binding */ SelectComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);





function SelectComponent_ul_11_li_1__svg_path_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "path", 16);
  }
}
function SelectComponent_ul_11_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SelectComponent_ul_11_li_1_Template_li_click_0_listener() {
      const item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.select(item_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3)(2, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "svg", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, SelectComponent_ul_11_li_1__svg_path_6_Template, 1, 0, "path", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r2 === ctx_r2.selectedItem);
  }
}
function SelectComponent_ul_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SelectComponent_ul_11_li_1_Template, 7, 2, "li", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.items);
  }
}
class SelectComponent {
  constructor() {
    this.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    this.selectedItem = 'Choose an algoritm';
    this.OnChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.show = false;
  }
  toggle() {
    this.show = !this.show;
  }
  select(item) {
    this.selectedItem = item;
    this.OnChange.emit(this.selectedItem);
    this.toggle();
  }
  static {
    this.ɵfac = function SelectComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SelectComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: SelectComponent,
      selectors: [["ui-select"]],
      inputs: {
        items: "items",
        selectedItem: "selectedItem"
      },
      outputs: {
        OnChange: "OnChange"
      },
      decls: 12,
      vars: 2,
      consts: [["id", "listbox-label", 1, "block", "text-sm", "font-medium", "leading-6", "text-gray-900"], [1, "relative", "mt-2"], ["type", "button", "aria-haspopup", "listbox", "aria-expanded", "true", "aria-labelledby", "listbox-label", 1, "relative", "w-full", "cursor-default", "rounded-md", "bg-white", "py-1.5", "pl-3", "pr-10", "text-left", "text-gray-900", "shadow-sm", "ring-1", "ring-inset", "ring-gray-300", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", "sm:text-sm", "sm:leading-6", 3, "click"], [1, "flex", "items-center"], [1, "ml-3", "block", "truncate"], [1, "pointer-events-none", "absolute", "inset-y-0", "right-0", "ml-3", "flex", "items-center", "pr-2"], ["viewBox", "0 0 20 20", "fill", "currentColor", "aria-hidden", "true", 1, "h-5", "w-5", "text-gray-400"], ["fill-rule", "evenodd", "d", "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z", "clip-rule", "evenodd"], ["class", "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm", "tabindex", "-1", "role", "listbox", "aria-labelledby", "listbox-label", "aria-activedescendant", "listbox-option-3", 4, "ngIf"], ["tabindex", "-1", "role", "listbox", "aria-labelledby", "listbox-label", "aria-activedescendant", "listbox-option-3", 1, "absolute", "z-10", "mt-1", "max-h-56", "w-full", "overflow-auto", "rounded-md", "bg-white", "py-1", "text-base", "shadow-lg", "ring-1", "ring-black", "ring-opacity-5", "focus:outline-none", "sm:text-sm"], ["class", "text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-neutral-100", "id", "listbox-option-0", "role", "option", 3, "click", 4, "ngFor", "ngForOf"], ["id", "listbox-option-0", "role", "option", 1, "text-gray-900", "relative", "cursor-default", "select-none", "py-2", "pl-3", "pr-9", "hover:bg-neutral-100", 3, "click"], [1, "font-normal", "ml-3", "block", "truncate"], [1, "text-indigo-600", "absolute", "inset-y-0", "right-0", "flex", "items-center", "pr-4"], ["viewBox", "0 0 20 20", "fill", "currentColor", "aria-hidden", "true", 1, "h-5", "w-5"], ["fill-rule", "evenodd", "d", "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z", "clip-rule", "evenodd", 4, "ngIf"], ["fill-rule", "evenodd", "d", "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z", "clip-rule", "evenodd"]],
      template: function SelectComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div")(1, "label", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Algorithm");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1)(4, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SelectComponent_Template_button_click_4_listener() {
            return ctx.toggle();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 3)(6, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "svg", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, SelectComponent_ul_11_Template, 2, 1, "ul", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.selectedItem);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 3191:
/*!**********************************************************!*\
  !*** ./libs/ui/src/lib/drawing-grid/interfaces/pixel.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ 3486:
/*!*****************************************************************!*\
  !*** ./apps/frontend/algorithm-dashboard/src/app/app.routes.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appRoutes: () => (/* binding */ appRoutes)
/* harmony export */ });
const appRoutes = [];

/***/ }),

/***/ 3572:
/*!*****************************************************************!*\
  !*** ./apps/frontend/algorithm-dashboard/src/app/app.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _algorithm_dashboard_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algorithm-dashboard/ui */ 9478);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 8001);
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.routes */ 3486);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);







class AppModule {
  static {
    this.ɵfac = function AppModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(_app_routes__WEBPACK_IMPORTED_MODULE_2__.appRoutes, {
        initialNavigation: 'enabledBlocking'
      }), _algorithm_dashboard_ui__WEBPACK_IMPORTED_MODULE_0__.UiModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _algorithm_dashboard_ui__WEBPACK_IMPORTED_MODULE_0__.UiModule]
  });
})();

/***/ }),

/***/ 4466:
/*!****************************************************!*\
  !*** ./libs/ui/src/lib/button/button.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ButtonComponent: () => (/* binding */ ButtonComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class ButtonComponent {
  constructor() {
    this.styleModifiers = '';
    this.label = 'Submit';
  }
  static {
    this.ɵfac = function ButtonComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ButtonComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ButtonComponent,
      selectors: [["ui-button"]],
      inputs: {
        styleModifiers: "styleModifiers",
        label: "label"
      },
      decls: 2,
      vars: 4,
      template: function ButtonComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ", ctx.styleModifiers, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.label, "\n");
        }
      },
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 6219:
/*!******************************************************************!*\
  !*** ./libs/ui/src/lib/drawing-grid/interfaces/painting-mode.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaintingMode: () => (/* binding */ PaintingMode)
/* harmony export */ });
var PaintingMode;
(function (PaintingMode) {
  PaintingMode["CREATE"] = "create";
  PaintingMode["ERASE"] = "erase";
})(PaintingMode || (PaintingMode = {}));

/***/ }),

/***/ 6833:
/*!**************************************************************!*\
  !*** ./libs/ui/src/lib/global-interfaces/color.interface.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ 6862:
/*!****************************************************************!*\
  !*** ./libs/ui/src/lib/color-picker/color-picker.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorPickerComponent: () => (/* binding */ ColorPickerComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/card.component */ 1518);
/* harmony import */ var _tooltip_tooltip_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tooltip/tooltip.directive */ 86);








const _c0 = a0 => ({
  "border-solid border-2 border-sky-500": a0
});
const _c1 = a0 => ({
  "background-color": a0
});
function ColorPickerComponent_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ColorPickerComponent_button_1_Template_button_click_0_listener() {
      const item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.setColor(item_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("uiTooltip", item_r2.name)("uiTooltipOptions", ctx_r2.uiTooltipOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c0, ctx_r2.color === item_r2.value))("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c1, item_r2.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r2.maxAmount);
  }
}
class ColorPickerComponent {
  constructor() {
    this._color = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject('');
    this.uiTooltipOptions = {
      placement: 'right',
      offset: [0, 20]
    };
    this.selectColor = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.colors = [{
      name: 'Black',
      value: '#000000'
    }, {
      name: 'Red',
      value: '#C62828'
    }, {
      name: 'Pink',
      value: '#AD1457'
    }, {
      name: 'Purple',
      value: '#6A1B9A'
    }, {
      name: 'Blue',
      value: '#1565C0'
    }, {
      name: 'Cyan',
      value: '#00838F'
    }, {
      name: 'Green',
      value: '#2E7D32'
    }, {
      name: 'Yellow',
      value: '#F9A825'
    }, {
      name: 'Orange',
      value: '#EF6C00'
    }, {
      name: 'Brown',
      value: '#4E342E'
    }, {
      name: 'Gray',
      value: '#424242'
    }];
  }
  set color(color) {
    this._color.next(color);
  }
  get color() {
    return this._color.getValue();
  }
  setColor(color) {
    this.color = color.value;
    this.selectColor.emit(color);
  }
  static {
    this.ɵfac = function ColorPickerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ColorPickerComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: ColorPickerComponent,
      selectors: [["ui-color-picker"]],
      inputs: {
        uiTooltipOptions: "uiTooltipOptions",
        colors: "colors"
      },
      outputs: {
        selectColor: "selectColor"
      },
      decls: 2,
      vars: 1,
      consts: [["styleModifiers", "p-4 bg-zinc-800 w-14 grid grid-row rounded-full"], ["class", "h-10", 3, "uiTooltip", "uiTooltipOptions", "click", 4, "ngFor", "ngForOf"], [1, "h-10", 3, "click", "uiTooltip", "uiTooltipOptions"], [1, "relative"], [1, "h-6", "w-6", "rounded-full", "inline-block", "box-border", 3, "ngClass", "ngStyle"], [1, "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "-mt-0.5", "text-center"]],
      template: function ColorPickerComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ui-card", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ColorPickerComponent_button_1_Template, 5, 9, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.colors);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgStyle, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _card_card_component__WEBPACK_IMPORTED_MODULE_0__.CardComponent, _tooltip_tooltip_directive__WEBPACK_IMPORTED_MODULE_1__.TooltipDirective],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 8001:
/*!********************************************************************!*\
  !*** ./apps/frontend/algorithm-dashboard/src/app/app.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _libs_ui_src_lib_select_select_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../libs/ui/src/lib/select/select.component */ 2574);
/* harmony import */ var _libs_ui_src_lib_playground_playground_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../libs/ui/src/lib/playground/playground.component */ 9416);
/* harmony import */ var _libs_ui_src_lib_button_button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../libs/ui/src/lib/button/button.component */ 4466);




class AppComponent {
  constructor() {
    this.title = 'algorithm-dashboard';
    this.algorithms = ['A*', 'Algorithm 2', 'Algorithm 3'];
    this.colors = [{
      name: 'Blue',
      value: '#4287f5',
      maxAmount: 1
    }, {
      name: 'Pink',
      value: '#f542e0',
      maxAmount: 5
    }, {
      name: 'Green',
      value: '#42f595',
      maxAmount: 3
    }, {
      name: 'Purple',
      value: '#9542f5',
      maxAmount: 10
    }, {
      name: 'Orange',
      value: '#f58742',
      maxAmount: 2
    }];
  }
  pixels(value) {
    return;
  }
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["algorithm-dashboard-root"]],
      standalone: false,
      decls: 6,
      vars: 2,
      consts: [[1, "p-8", "grid", "gap-8"], [1, "grid", "grid-cols-2"], [1, "w-1/4", 3, "items"], [1, "flex", "items-center", "justify-end"], [1, "mt-auto"], [3, "pixels", "colors"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "ui-select", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "ui-button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ui-playground", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("pixels", function AppComponent_Template_ui_playground_pixels_5_listener($event) {
            return ctx.pixels($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("items", ctx.algorithms);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("colors", ctx.colors);
        }
      },
      dependencies: [_libs_ui_src_lib_select_select_component__WEBPACK_IMPORTED_MODULE_0__.SelectComponent, _libs_ui_src_lib_playground_playground_component__WEBPACK_IMPORTED_MODULE_1__.PlaygroundComponent, _libs_ui_src_lib_button_button_component__WEBPACK_IMPORTED_MODULE_2__.ButtonComponent],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 8565:
/*!**********************************************************************!*\
  !*** ./libs/ui/src/lib/drawing-grid/interfaces/pixel-coordinates.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ 9416:
/*!************************************************************!*\
  !*** ./libs/ui/src/lib/playground/playground.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlaygroundComponent: () => (/* binding */ PlaygroundComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 3900);
/* harmony import */ var _color_picker_color_picker_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../color-picker/color-picker.component */ 6862);
/* harmony import */ var _drawing_grid_drawing_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../drawing-grid/drawing-grid.component */ 32);
/* harmony import */ var _drawing_grid_drawing_grid_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../drawing-grid/drawing-grid.service */ 712);
/* harmony import */ var _drawing_grid_interfaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../drawing-grid/interfaces */ 1732);










class PlaygroundComponent {
  constructor(gridService) {
    this.gridService = gridService;
    this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.colors = [];
    this.pixels = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.pixelSize = 28;
    this.paintingMode = _drawing_grid_interfaces__WEBPACK_IMPORTED_MODULE_3__.PaintingMode.CREATE;
  }
  ngOnInit() {
    this.gridService.paintingMode$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this.destroy$)).subscribe(paintingMode => {
      this.paintingMode = paintingMode;
    });
    this.width = document.documentElement.clientWidth - 120;
    this.height = document.documentElement.clientHeight - 200;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onMouseDown(pixel) {
    this.fillPixel(pixel.x, pixel.y);
  }
  onMouseMove(pixel) {
    this.fillPixel(pixel.x, pixel.y);
  }
  onMouseUp() {
    this.pixels.emit(this.gridService.pixels);
  }
  onContextMenu(pixel) {
    this.gridService.clearPixel(pixel.x, pixel.y);
  }
  fillPixel(x, y) {
    if (this.paintingMode === _drawing_grid_interfaces__WEBPACK_IMPORTED_MODULE_3__.PaintingMode.ERASE) {
      this.updateMaxAmountValues(x, y);
      this.gridService.clearPixel(x, y);
      return;
    }
    if (this.color && this.isAllowed(this.color)) {
      this.updateMaxAmountValues(x, y);
      this.gridService.fillPixel(x, y, this.color);
    }
  }
  updateMaxAmountValues(x, y) {
    const pixel = this.gridService.getPixel(x, y);
    if (pixel) {
      this.colors.forEach(item => {
        if (item.maxAmount === undefined) {
          return;
        }
        if (pixel.fillStyle === item.value) {
          item.maxAmount++;
        }
      });
    }
  }
  isAllowed(color) {
    if (color.maxAmount !== undefined) {
      if (color.maxAmount <= 0) {
        return false;
      } else {
        color.maxAmount--;
      }
    }
    return true;
  }
  selectColor(value) {
    this.color = value;
  }
  static {
    this.ɵfac = function PlaygroundComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PlaygroundComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_drawing_grid_drawing_grid_service__WEBPACK_IMPORTED_MODULE_2__.DrawingGridService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: PlaygroundComponent,
      selectors: [["ui-playground"]],
      inputs: {
        colors: "colors"
      },
      outputs: {
        pixels: "pixels"
      },
      decls: 3,
      vars: 4,
      consts: [[3, "mouseDown", "mouseMove", "mouseUp", "contextMenu", "width", "height", "pixelSize"], [1, "fixed", "top-1/2", "right-5", "-translate-y-1/2", 3, "selectColor", "colors"]],
      template: function PlaygroundComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ui-drawing-grid", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("mouseDown", function PlaygroundComponent_Template_ui_drawing_grid_mouseDown_1_listener($event) {
            return ctx.onMouseDown($event);
          })("mouseMove", function PlaygroundComponent_Template_ui_drawing_grid_mouseMove_1_listener($event) {
            return ctx.onMouseMove($event);
          })("mouseUp", function PlaygroundComponent_Template_ui_drawing_grid_mouseUp_1_listener() {
            return ctx.onMouseUp();
          })("contextMenu", function PlaygroundComponent_Template_ui_drawing_grid_contextMenu_1_listener($event) {
            return ctx.onContextMenu($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ui-color-picker", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectColor", function PlaygroundComponent_Template_ui_color_picker_selectColor_2_listener($event) {
            return ctx.selectColor($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("width", ctx.width)("height", ctx.height)("pixelSize", ctx.pixelSize);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("colors", ctx.colors);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _color_picker_color_picker_component__WEBPACK_IMPORTED_MODULE_0__.ColorPickerComponent, _drawing_grid_drawing_grid_component__WEBPACK_IMPORTED_MODULE_1__.DrawingGridComponent],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 9478:
/*!******************************!*\
  !*** ./libs/ui/src/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UiModule: () => (/* reexport safe */ _lib_ui_module__WEBPACK_IMPORTED_MODULE_1__.UiModule)
/* harmony export */ });
/* harmony import */ var _lib_global_interfaces_color_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/global-interfaces/color.interface */ 6833);
/* harmony import */ var _lib_ui_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/ui.module */ 1834);



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(1154)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map