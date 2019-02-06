# Pualugin ( jQuery UI Library )


## Getting started
CLI를 이용한 jQuery 설치
```html
<!-- npm -->
npm install jquery
<!-- yarn -->
yarn add jquery
<!-- bower -->
bower install jquery
```
jQuery파일 다운로드
* https://code.jquery.com/jquery/

플러그인을 사용할 **your.html**을 만듭니다.
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>UI Component</title>
</head>
<body>
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="./src/js/pualugin.js"></script> <!-- pualugin 플러그인 추가 -->
</body>
</html>
```

## Toggle

Toggle Plugin은 toggle__anchor를 클릭 시 toggle__panel이 나타났다 사라졌다를 반복합니다.
* toggle__anchor는 모든 태그로 사용가능합니다. ( ex: button, div, span ..... )
* 초기값은 toggle_panel이 숨겨진 상태입니다.

* * *
모든 플러그인은 기본적으로 **페이지 렌더링시 Initialized** 됩니다.<br>
**개별적(비동기 마크업 구현) Initialized** 필요한 경우 아래와 같이 진행합니다.
* * *

``` javascript
$('.your-element').toggle();
```

### Basic Code

``` html
<div class="your-element" data-js="toggle">
    <a href="#" data-js="toggle__anchor">toggle__anchor</a>
    <div data-js="toggle__panel">toggle__panel</div>
</div>
```

### Basic Code + Options

``` html
<div class="your-element" data-js="toggle" data-options='{ "isOpened": true }'>
    <a href="#" data-js="toggle__anchor">toggle__anchor</a>
    <div data-js="toggle__panel">toggle__panel</div>
</div>
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

* * *
모든 플러그인은 기본적으로 **페이지 렌더링시 Initialized** 됩니다.<br>
**개별적(비동기 마크업 구현) Initialized** 필요한 경우 아래와 같이 진행합니다.
* * *

``` javascript
$('.your-element').tab();
```

### Basic Code

``` html
<div class="your-element" data-js="tab">
    <ul>
        <li data-js="tab__list">
            <a href="#" data-js="tab__anchor">tab-anchor1</a>
        </li>
        <li data-js="tab__list">
            <a href="#" data-js="tab__anchor">tab-anchor2</a>
        </li>
        <li data-js="tab__list">
            <a href="#" data-js="tab__anchor">tab-anchor3</a>
        </li>
    </ul>

    <div data-js="tab__panel"> tab-panel1 </div>
    <div data-js="tab__panel"> tab-panel2 </div>
    <div data-js="tab__panel"> tab-panel3 </div>
</div>
```

### Basic Code + Options

``` html
<div class="your-element" data-js="tab" data-options='{ "mode": "slide" }'>
    <ul>
        <li data-js="tab__list">
            <a href="#" data-js="tab__anchor">tab-anchor1</a>
        </li>
        <li data-js="tab__list">
            <a href="#" data-js="tab__anchor">tab-anchor2</a>
        </li>
        <li data-js="tab__list">
            <a href="#" data-js="tab__anchor">tab-anchor3</a>
        </li>
    </ul>

    <div data-js="tab__panel"> tab-panel1 </div>
    <div data-js="tab__panel"> tab-panel2 </div>
    <div data-js="tab__panel"> tab-panel3 </div>
</div>
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

### Callback Options

``` javascript
var yourVariable = $('.your-element').data('plugin_tab');

yourVariable.options.onChangeBefore = function( tab, anchor, panel ) {
    /* ... your code */
}

yourVariable.options.onChangeAfter = function( tab, anchor, panel ) {
    /* ... your code */
}
```

* **onChangeBefore**
    * **Arguments**: toggle, anchor, panel
    * **description**: 패널 오픈 전 실행될 함수
* **onChangeAfter**
    * **Arguments**: toggle, anchor, panel
    * **description**: 패널 오픈 후 실행될 함수

### Method

``` javascript
var yourVariable = $('.your-element').data('plugin_tab');

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
    * **description**: 플러그인 초기화 후 재생성 **ex) 비동기로 탭이 추가 된 경우 사용**

## Accordion

Accordion은 tab__anchor 클릭 시 해당하는 tab__panel 노출됨.

### Basic Code

``` html
<ul data-js="accordion">
    <li data-js="accordion__item">
        <a href="#" data-js="accordion__anchor">accordion__anchor1</a>
        <div data-js="accordion__panel">accordion__panel1</div>
    </li>
    <li data-js="accordion__item">
        <a href="#" data-js="accordion__anchor">accordion__anchor2</a>
        <div data-js="accordion__panel">accordion__panel2</div>
    </li>
    <li data-js="accordion__item">
        <a href="#" data-js="accordion__anchor">accordion__anchor3</a>
        <div data-js="accordion__panel">accordion__panel3</div>
    </li>
</ul>
```

### Basic Code + Options

``` html
<ul data-js="accordion" data-options='{"autoFold":false}'>
    <li data-js="accordion__item">
        <a href="#" data-js="accordion__anchor">accordion__anchor1</a>
        <div data-js="accordion__panel">accordion__panel1</div>
    </li>
    <li data-js="accordion__item">
        <a href="#" data-js="accordion__anchor">accordion__anchor2</a>
        <div data-js="accordion__panel">accordion__panel2</div>
    </li>
    <li data-js="accordion__item">
        <a href="#" data-js="accordion__anchor">accordion__anchor3</a>
        <div data-js="accordion__panel">accordion__panel3</div>
    </li>
</ul>
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