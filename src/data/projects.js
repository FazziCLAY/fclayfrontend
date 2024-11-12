// TODO Add a couple lines about each project
const data = [
  {
    urlName: 'opentoday',
    title: 'OpenToday',
    subtitle: 'Многофункциональные заметки с возможностью псевдо-скриптинга',
    sourceCode: 'https://github.com/FazziCLAY/OpenToday',
    markdownUrl: '/project/opentoday.md',
    date: '2022-05-01',
  },

  {
    urlName: 'fclaybackend',
    title: 'FClayBackend',
    subtitle: 'Бэкенд сайта на Spring',
    sourceCode: 'https://github.com/FazziCLAY/fclaybackend',
    date: '2024-10-20',
    markdownUrl: '/project/fclaybackend.md',
  },

  {
    urlName: 'fclayspyandroid',
    title: 'FClaySpyAndroid',
    subtitle: 'Android приложение для FClayBackend',
    sourceCode: 'https://github.com/FazziCLAY/fclayspyandroid',
    date: '2024-10-20',
    markdownUrl: '/project/fclayspyandroid.md',
  },

  {
    urlName: 'openjavalauncher',
    title: 'OpenJavaLauncher',
    subtitle: 'Desktop Java приложение. Написанный с нуля майнкрафт лаунчер',
    sourceCode: 'https://github.com/FazziCLAY/OpenJavaLauncher',
    date: '2023-03-16',
    markdownUrl: '/project/openjavalauncher.md',
  },

  {
    urlName: 'dynamicpack',
    title: 'DynamicPack',
    subtitle: 'Minecraft мод, добавляющий поддержку авто-обновления пакетам ресурсов',
    sourceCode: 'https://github.com/AdamCalculator/DynamicPack',
    date: '2024-03-15',
    markdownUrl: '/project/dynamicpack.md',
  },

  {
    urlName: 'self:adamcalculator',
    title: 'AdamCalculator',
    subtitle: 'Моя вторая личность для Minecraft-dev\'a',
    sourceCode: 'https://github.com/AdamCalculator',
    date: '2024-01-01',
  },

  {
    urlName: 'dartanyan',
    title: 'Dartanyan',
    subtitle: 'Моё Flutter приложение, клиент для fclaybackend',
    sourceCode: 'https://github.com/FazziCLAY/Dartanyan',
    date: '2024-11-12',
    markdownUrl: '/project/dartanyan.md',
  },
].sort((a, b) => a.date < b.date);

export default data;
