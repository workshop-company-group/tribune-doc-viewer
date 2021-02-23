# Какую высоту и ширину задать `canvas`?

## Миниатюры

#### Вертикальный слайд
```css
canvas {
  width: 100%:
}
```

#### Горизонтальный слайд (1 ряд)
```css
canvas {
  height: 100%:
}
```

#### Горизонтальный слайд (несколько рядов)
```css
canvas {
  height: 100%:
}
```

## Основной слайд
Если `outer width / outer height >= page width / page height`,
```css
canvas {
  height: 100%:
}
```

Если `outer width / outer height < page width / page height`,
```css
canvas {
  width: 100%:
}
```
