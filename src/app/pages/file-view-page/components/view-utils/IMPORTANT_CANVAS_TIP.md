# Какую высоту и ширину задать `canvas`?

## Миниатюры

#### Вертикальный слайд
```css
.container {
  width: 100%;
}

canvas {
  width: 100%:
}
```

#### Горизонтальный слайд (1 ряд)
```css
.container {
  height: 100%;
}

canvas {
  height: 100%:
}
```

#### Горизонтальный слайд (несколько рядов)
```css
.container {
  height: 100%;
}

canvas {
  height: 100%:
}
```

## Основной слайд
Если `outer width / outer height >= page width / page height`,
```css
.container {
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  height: 100%:
}
```

Если `outer width / outer height < page width / page height`,
```css
.container {
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  width: 100%:
}
```
