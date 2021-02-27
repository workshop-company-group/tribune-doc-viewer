# Внешний видео-выход

##### [К содержанию](contents.md)

Работу с внешним видео-выходом осуществляет сервис `WindowStateService`.

## API `WindowStateService`

#### `isExternalConnected(): Promise<boolean>` 

Проверяет, подключен или нет внешний видео-выход.

#### `createExternalWindow(): void`

Создаeт окно на внешнем видео-выходе.

#### `closeExternalWindow(): void`

Закрывает окно на внешнем видео-выходе.
