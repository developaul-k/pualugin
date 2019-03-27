# Pualugin.js
Pualugin.js 는 boilerplate code로 작성한 jQuery UI 플러그인 모음입니다.

## Getting started
시작하려면 [jQuery](http://code.jquery.com)를 다운받고 아래와 같이 작성합니다.
```html
<link rel="stylesheet" href="/path/to/css/pualugin.css">
<script src="/path/to/js/jQuery.js"></script> <!-- 다운로드 또는 CDN 이용 -->
<script src="/path/to/js/pualugin.js"></script>
```

## Toggle

Toggle Plugin은 toggle__anchor를 클릭 시 toggle__panel이 나타났다 사라졌다를 반복합니다.
* toggle__anchor는 모든 태그로 사용가능합니다. ( ex: button, div, span ..... )
* 초기값은 toggle_panel이 숨겨진 상태입니다.

### Basic Code

``` html
<div class="your-element" data-element="toggle">
    <a href="#" data-element="toggle__anchor">toggle__anchor</a>
    <div data-element="toggle__panel">toggle__panel</div>
</div>
```

### Basic Code + Options

``` html
<div class="your-element" data-element="toggle" data-options='{ "isOpened": true }'>
    <a href="#" data-element="toggle__anchor">toggle__anchor</a>
    <div data-element="toggle__panel">toggle__panel</div>
</div>
```

* * *
모든 플러그인은 기본적으로 **페이지 렌더링시 Initialized** 됩니다.<br>
**개별적(비동기 마크업 구현) Initialized** 필요한 경우 아래와 같이 진행합니다.
* * *

``` javascript
$('.your-element').toggle(); // Initialized
```

### Options

* **mode**
    * **type**: String
    * **default**: static
    * **description**: **static**, **slide**, **fade** 중 선택
* **isOpened**
    * **type**: Boolean
    * **default**: false
    * **description**: 초기에 toggle__panel 노출 여부를 설정
* **event**
    * **type**: String
    * **default**: click
    * **description**: **click**, **focusin** 중 선택
* **easing**
    * **type**: String
    * **default**: swing
* **activeClassName**
    * **type**: String
    * **default**: is-active
    * **description**: 원하는 클래스명으로 변경 가능
* **onChangeBeforeText**
    * **type**: String
    * **default**: null
    * **description**: panel 오픈 전 노출될 anchor 텍스트
* **onChangeAfterText**
    * **type**: String
    * **default**: null
    * **description**: panel 오픈 후 노출될 anchor 텍스트

### Events

``` javascript
var yourVariable = $('.your-element');

yourVariable.on('beforeChange', function( event, plugin, anchor, panel ){
    /* your code ... */
})

yourVariable.on('afterChange', function( event, plugin, anchor, panel ){
    /* your code ... */
})
```

* **beforeChange**
    * **Arguments**: event, plugin, anchor, panel
    * **description**: 패널 오픈 전 실행될 함수
* **afterChange**
    * **Arguments**: event, plugin, anchor, panel
    * **description**: 패널 오픈 후 실행될 함수

### Method

``` javascript
var yourVariable = $('.your-element').data('plugin_toggle');

yourVariable.show();

yourVariable.hide();

yourVariable.destroy();

yourVariable.reInit();
```

* **show**
    * **Arguments**: none
    * **description**: 패널 열기
* **hide**
    * **Arguments**: none
    * **description**: 패널 닫기
* **destroy**
    * **Arguments**: none
    * **description**: 플러그인 초기화
* **reInit**
    * **Arguments**: none
    * **description**: 플러그인 초기화 후 재생성


## Tab

Tab Plugin은 tab__anchor 클릭 시 해당하는 tab__panel 노출됨.

### Basic Code

``` html
<div class="your-element" data-element="tab">
    <ul>
        <li data-element="tab__list">
            <a href="#" data-element="tab__anchor">tab-anchor1</a>
        </li>
        <li data-element="tab__list">
            <a href="#" data-element="tab__anchor">tab-anchor2</a>
        </li>
        <li data-element="tab__list">
            <a href="#" data-element="tab__anchor">tab-anchor3</a>
        </li>
    </ul>

    <div data-element="tab__panel"> tab-panel1 </div>
    <div data-element="tab__panel"> tab-panel2 </div>
    <div data-element="tab__panel"> tab-panel3 </div>
</div>
```

### Basic Code + Options

``` html
<div class="your-element" data-element="tab" data-options='{ "mode": "slide" }'>
    <ul>
        <li data-element="tab__list">
            <a href="#" data-element="tab__anchor">tab-anchor1</a>
        </li>
        <li data-element="tab__list">
            <a href="#" data-element="tab__anchor">tab-anchor2</a>
        </li>
        <li data-element="tab__list">
            <a href="#" data-element="tab__anchor">tab-anchor3</a>
        </li>
    </ul>

    <div data-element="tab__panel"> tab-panel1 </div>
    <div data-element="tab__panel"> tab-panel2 </div>
    <div data-element="tab__panel"> tab-panel3 </div>
</div>
```

* * *
모든 플러그인은 기본적으로 **페이지 렌더링시 Initialized** 됩니다.<br>
**개별적(비동기 마크업 구현) Initialized** 필요한 경우 아래와 같이 진행합니다.
* * *

``` javascript
$('.your-element').tab(); // Initialized
```

### Options

* **mode**
    * **type**: String
    * **default**: static
    * **description**: **static**, **slide**, **fade** 중 선택
* **speed**
    * **type**: Number
    * **default**: 300
* **event**
    * **type**: String
    * **default**: click
    * **description**: **click**, **focusin** 중 선택
* **initIndex**
    * **type**: Number
    * **default**: 0
    * **description**: 원하는 탭 순서로 초기화
* **easing**
    * **type**: String
    * **default**: swing
* **activeClassName**
    * **type**: String
    * **default**: is-active
    * **description**: 원하는 클래스명으로 변경 가능
* **diabledClassName**
    * **type**: String
    * **default**: is-disabled
    * **description**: 원하는 클래스명으로 변경 가능
* **selectedText**
    * **type**: String
    * **default**: Selected
    * **description**: 원하는 명칭으로 변경 가능 (title 속성으로 들어갑니다.)

### Events

``` javascript
var yourVariable = $('.your-element');

yourVariable.on('beforeChange', function( event, plugin, anchor, panel ){
    /* your code ... */
})

yourVariable.on('afterChange', function( event, plugin, anchor, panel ){
    /* your code ... */
})
```

* **beforeChange**
    * **Arguments**: event, plugin, anchor, panel
    * **description**: Tab 오픈 전 실행될 함수
* **afterChange**
    * **Arguments**: event, plugin, anchor, panel
    * **description**: Tab 오픈 후 실행될 함수 함수

### Method

``` javascript
var yourVariable = $('.your-element').data('plugin_tab');

yourVariable.go(1); //OR
yourVariable.go(2, true); //OR
yourVariable.go(0, false); //OR

yourVariable.destroy();

yourVariable.reInit();
```

* **go**
    * **Arguments**: index, withScroll(Boolean): 선택된 탭의 상단으로 스크롤 이동 여부
    * **description**: 원하는 탭 오픈
* **destroy**
    * **Arguments**: none
    * **description**: 플러그인 초기화
* **reInit**
    * **Arguments**: none
    * **description**: 플러그인 초기화 후 재생성 **ex) 비동기로 탭이 추가 된 경우 사용**

## Accordion

Accordion은 tab__anchor 클릭 시 해당하는 tab__panel 노출됨.

### Basic Code

``` html
<ul data-element="accordion">
    <li data-element="accordion__item">
        <a href="#" data-element="accordion__anchor">accordion__anchor1</a>
        <div data-element="accordion__panel">accordion__panel1</div>
    </li>
    <li data-element="accordion__item">
        <a href="#" data-element="accordion__anchor">accordion__anchor2</a>
        <div data-element="accordion__panel">accordion__panel2</div>
    </li>
    <li data-element="accordion__item">
        <a href="#" data-element="accordion__anchor">accordion__anchor3</a>
        <div data-element="accordion__panel">accordion__panel3</div>
    </li>
</ul>
```

### Basic Code + Options

``` html
<ul data-element="accordion" data-options='{"autoFold":false}'>
    <li data-element="accordion__item">
        <a href="#" data-element="accordion__anchor">accordion__anchor1</a>
        <div data-element="accordion__panel">accordion__panel1</div>
    </li>
    <li data-element="accordion__item">
        <a href="#" data-element="accordion__anchor">accordion__anchor2</a>
        <div data-element="accordion__panel">accordion__panel2</div>
    </li>
    <li data-element="accordion__item">
        <a href="#" data-element="accordion__anchor">accordion__anchor3</a>
        <div data-element="accordion__panel">accordion__panel3</div>
    </li>
</ul>
```

* * *
모든 플러그인은 기본적으로 **페이지 렌더링시 Initialized** 됩니다.<br>
**개별적(비동기 마크업 구현) Initialized** 필요한 경우 아래와 같이 진행합니다.
* * *

``` javascript
$('.your-element').accordion(); // Initialized
```

### Options

* **mode**
    * **type**: String
    * **default**: static
    * **description**: **static**, **slide**, 중 선택
* **speed**
    * **type**: Number
    * **default**: 300
* **easing**
    * **type**: String
    * **default**: swing
* **initIndex**
    * **type**: Number
    * **default**: 0
    * **description**: 원하는 탭 순서로 초기화
* **isInitActive**
    * **type**: Boolean
    * **default**: flase
    * **description**: 초기화 단계에서 initIndex에 입력한 탭 열기
* **autoFold**
    * **type**: Boolean
    * **default**: true
    * **description**: 다른 탭 클릭 시 기존에 열려있던 탭은 닫힘
* **autoScroll**
    * **type**: Boolean
    * **default**: false
    * **description**: 선택한 탭의 위치로 스크롤 이동
* **activeClassName**
    * **type**: String
    * **default**: is-active
    * **description**: 원하는 클래스명으로 변경 가능

### Events

``` javascript
var yourVariable = $('.your-element');

yourVariable.on('beforeChange', function( event, plugin, anchor, panel ){
    /* your code ... */
})

yourVariable.on('afterChange', function( event, plugin, anchor, panel ){
    /* your code ... */
})
```

* **beforeChange**
    * **Arguments**: event, plugin, anchor
    * **description**: Accordion 오픈 전 실행될 함수
* **afterChange**
    * **Arguments**: event, plugin, anchor
    * **description**: Accordion 오픈 후 실행될 함수

### Method

``` javascript
var yourVariable = $('.your-element').data('plugin_accordion');

yourVariable.go(1); //OR
yourVariable.go(2, true); //OR
yourVariable.go(0, false); //OR

yourVariable.destroy();

yourVariable.reInit();
```

* **go**
    * **Arguments**: index, withScroll(Boolean): 선택된 탭의 상단으로 스크롤 이동 여부
    * **description**: 입력한 index 패널 오픈
* **destroy**
    * **Arguments**: none
    * **description**: 플러그인 초기화
* **reInit**
    * **Arguments**: none
    * **description**: 플러그인 초기화 후 재생성 **ex) 비동기로 아코디언이 추가 된 경우 사용**


## Sticky

Sticky는 지정한 target에 스크롤 시 브라우저 상단에 고정된 상태로 따라다니는 플러그인 입니다.

### Basic Code

``` html
<section class="pualugin-sticky__section" data-element="sticky">
    <div class="pualugin-sticky__header" data-element="sticky__target-parent">
        <h1 class="pualugin-sticky__target" data-element="sticky__target">Section1</h1>
    </div>
</section>
```

### Basic Code + Options

``` html
<section class="pualugin-sticky__section" data-element="sticky" data-options='{ "position": "bottom" }'>
    <div class="pualugin-sticky__header" data-element="sticky__target-parent">
        <h1 class="pualugin-sticky__target" data-element="sticky__target">Section1</h1>
    </div>
</section>
```

* * *
모든 플러그인은 기본적으로 **페이지 렌더링시 Initialized** 됩니다.<br>
**개별적(비동기 마크업 구현) Initialized** 필요한 경우 아래와 같이 진행합니다.
* * *

``` javascript
$('.your-element').sticky(); // Initialized
```

### Options

* **position**
    * **type**: String
    * **default**: top
    * **description**: **middle**, **bottom**, 중 선택
* **top**
    * **type**: Number
    * **default**: 0
* **activeClassName**
    * **type**: String
    * **default**: is-active
    * **description**: 원하는 클래스명으로 변경 가능

### Events

``` javascript
var yourVariable = $('.your-element');

yourVariable.on('beforeChange', function( event, plugin, target ){
    /* your code ... */
})

yourVariable.on('afterChange', function( event, plugin, target ){
    /* your code ... */
})
```

* **beforeChange**
    * **Arguments**: event, plugin, target
    * **description**: Fixed 전 실행될 함수
* **afterChange**
    * **Arguments**: event, plugin, target
    * **description**: Fixed 후 실행될 함수

### Method

``` javascript
var yourVariable = $('.your-element').data('plugin_accordion');

yourVariable.go(1); //OR
yourVariable.go(2, true); //OR
yourVariable.go(0, false); //OR

yourVariable.destroy();

yourVariable.reInit();
```

* **go**
    * **Arguments**: index, withScroll(Boolean): 선택된 탭의 상단으로 스크롤 이동 여부
    * **description**: 입력한 index 패널 오픈
* **destroy**
    * **Arguments**: none
    * **description**: 플러그인 초기화
* **reInit**
    * **Arguments**: none
    * **description**: 플러그인 초기화 후 재생성 **ex) 비동기로 아코디언이 추가 된 경우 사용**