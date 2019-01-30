# youngstrap ( jQuery UI Library )


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
    <script src="./src/js/youngstrap.js"></script> <!-- youngstrap 플러그인 추가 -->
</body>
</html>
```

## Toggle

Toggle Plugin은 toggle__anchor를 클릭 시 toggle__panel이 나타났다 사라졌다를 반복합니다.
* toggle__anchor는 모든 태그로 사용가능합니다. ( ex: button, div, span ..... )
* 초기값은 toggle_panel이 숨겨진 상태입니다.

### Basic Code

``` html
<div data-js="toggle">
    <a href="#" data-js="toggle__anchor">toggle__anchor</a>
    <div data-js="toggle__panel">toggle__panel</div>
</div>
```

### Basic Code + Options

``` html
<div data-js="toggle" data-options='{ "isOpened": true }'>
    <a href="#" data-js="toggle__anchor">toggle__anchor</a>
    <div data-js="toggle__panel">toggle__panel</div>
</div>
```

### OPTIONS

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

----------------

## Tab

Tab Plugin은 tab__anchor 클릭 시 해당하는 tab__panel 노출됨.

### Basic Code

``` html
<div data-js="tab">
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
<div data-js="tab" data-options='{ "mode": "slide" }'>
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

### OPTIONS

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