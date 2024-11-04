[![img](https://img.shields.io/endpoint?style=for-the-badge&url=https://apt.izzysoft.de/fdroid/api/v1/shield/com.fazziclay.opentoday)](https://apt.izzysoft.de/fdroid/index/apk/com.fazziclay.opentoday)
![GPLv3](https://img.shields.io/github/license/fazziclay/opentoday?color=%2300bb00&style=for-the-badge)

Страница приложения тут: https://fazziclay.github.io/opentoday/

# Структура
Приложение содержит вкладки(tabs), каждая вкладка содержит массив айтемов

**Айтем** (англ. Item) - самостоятельная заметка, содержит текст, цвета фона и текста, и много полей зависящих
от типа айтема

Айтемов существует много типов, они могут наследоваться друг от друга. Базовый Item содержит цвет фона

**Типы:**
- Текст
- Группа
- Группа с фильтром
- Циклический спислк
- Счётчик
- Математическая головоломка
- Галочка
- Ежедневная галочка
