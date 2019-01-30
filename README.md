# youngstrap ( jQuery UI Library )

## 1. Toggle Plugin

* Toggle Plugin은 toggle__anchor를 클릭 시 toggle__panel이 나타났다 사라졌다를 반복합니다.
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