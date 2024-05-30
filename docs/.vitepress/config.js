// 总的(home页)sidebar
const homeSidebar = [
  {
    text: 'JavaScript',
    collapsible: true,
    items: [
      { text: '介绍', link: '/frontEnd/js/' },
      { text: 'let和const', link: '/frontEnd/js/letconst' },
      { text: 'Array原型方法', link: '/frontEnd/js/array-prototype' },
      { text: 'Proxy', link: '/frontEnd/js/proxy' },
    ]
  },
  {
    text: 'TypeScript',
    collapsible: true,
    // collapsed: true,
    items: [
      { text: '介绍', link: '/frontEnd/ts/' },
      { text: '泛型', link: '/frontEnd/ts/泛型.md' },
    ]
  },
  {
    items: [
      { text: 'Tauri', link: '/frontEnd/tauri/' },
      { text: '学习制作博客', link: '/frontEnd/develop-blog.md' },
    ]
  },
  {
    text: 'Utils',
    collapsible: true,
    // collapsed: true,
    items: [
      { text: 'UnoCSS', link: '/frontEnd/utils/UnoCSS' },
    ]
  },
  {
    text: 'Server服务器',
    collapsible: true,
    // collapsed: true,
    items: [
      { text: 'Docker 思源笔记', link: '/server/Docker/siyuanNote' },
      { text: '雷池网站防火墙WAF', link: '/server/safeline' },
    ]
  }
]
// 前端笔记侧边栏
const frontEndSidebar = [
  {
    text: 'JavaScript',
    collapsible: true,
    items: [
      { text: '介绍', link: '/frontEnd/js/' },
      { text: 'let和const', link: '/frontEnd/js/letconst' },
      { text: 'Array原型方法', link: '/frontEnd/js/array-prototype' },
      { text: 'Proxy', link: '/frontEnd/js/proxy' }
    ]
  },
  {
    text: 'TypeScript',
    collapsible: true,
    // collapsed: true,
    items: [
      { text: '介绍', link: '/frontEnd/ts/' },
      { text: '泛型', link: '/frontEnd/ts/泛型.md' }
    ]
  },
  {
    items: [
      { text: 'Tauri', link: '/frontEnd/tauri/' },
      { text: '学习制作博客', link: '/frontEnd/develop-blog.md' },
    ]
  },
  {
    text: 'Utils',
    collapsible: true,
    // collapsed: true,
    items: [
      { text: 'UnoCSS', link: '/frontEnd/utils/UnoCSS' }
    ]
  },
]
// 服务器笔记侧边栏
const serverSidebar = [
  {
    text: 'Docker',
    collapsible: true,
    items: [
      { text: '服务器Docker配置思源笔记', link: '/server/Docker/siyuanNote' },
    ]
  },
  {
    items: [
      { text: '雷池网站防火墙WAF', link: '/server/safeline' }
    ]
  }
]

export default {
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  title: 'Welcome',
  titleTemplate: 'Oreki\'s Notebook',
  description: 'this is a Notebook for @Oreki',
  lang: 'zh-CN',
  lastUpdated: true,

  themeConfig: {
    // logo: '/favicon.ico',
    siteTitle: '📔 Oreki\'s Notebook',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Orekiz' }
    ],
    nav: [
      { text: '全部', link: '/notes', activeMatch: '/notes/' },
      { text: 'frontEnd-前端', link: '/frontEnd/js/', activeMatch: '/frontEnd/' },
      { text: 'sever-服务器', link: '/server/Docker/siyuanNote', activeMatch: '/server/' }
    ],
    sidebar: {
      '/notes/': homeSidebar,
      '/frontEnd/': frontEndSidebar,
      '/server/': serverSidebar
    },
    outlineTitle: '大纲',
    outline: [1, 4],
    editLink: {
      text: '在Github上编辑此页',
      pattern: 'https://github.com/Orekiz/notebook-next/edit/main/docs/:path'
    },
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present <a href="https://oreki.love" target="_blank">Oreki</a>'
    }
  }
}
