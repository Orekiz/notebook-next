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
      { text: 'WSL', link: '/frontEnd/wsl'},
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
    text: 'Server与后端服务',
    collapsible: true,
    // collapsed: true,
    items: [
      { text: 'Docker', link: '/server/Docker/' },
      { text: 'Docker部署思源笔记', link: '/server/Docker/siyuanNote' },
      { text: 'Docker部署Redis', link: '/server/Docker/redis' },
      { text: 'Docker部署RabbitMQ', link: '/server/Docker/rabbitMQ' },
      { text: '雷池网站防火墙WAF', link: '/server/safeline' },
      { text: 'RabbitMQ', link: '/server/backend/rabbitMQ' },
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
    text: 'Other',
    items: [
      { text: 'Tauri', link: '/frontEnd/tauri/' },
      { text: '学习制作博客', link: '/frontEnd/develop-blog.md' },
      { text: 'WSL', link: '/frontEnd/wsl'}
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
    text: 'Docker相关',
    collapsible: true,
    items: [
      { text: 'Docker', link: '/server/Docker/' },
      { text: 'Docker部署思源笔记', link: '/server/Docker/siyuanNote' },
      { text: 'Docker部署Redis', link: '/server/Docker/redis' },
      { text: 'Docker部署RabbitMQ', link: '/server/Docker/rabbitMQ' }
    ]
  },
  {
    text: '后端服务',
    items: [
      { text: 'RabbitMQ', link: '/server/backend/rabbitMQ' },
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
  description: 'this is @Oreki\'s notebook',
  lang: 'zh-CN',
  lastUpdated: true,

  themeConfig: {
    // logo: '/favicon.ico',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
    siteTitle: '📔 Oreki\'s Notebook',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Orekiz' }
    ],
    nav: [
      { text: '全部', link: '/notes', activeMatch: '/notes/' },
      { text: 'frontEnd 前端', link: '/frontEnd/js/', activeMatch: '/frontEnd/' },
      { text: 'sever 服务', link: '/server/Docker/siyuanNote', activeMatch: '/server/' }
    ],
    sidebar: {
      '/notes/': homeSidebar,
      '/frontEnd/': frontEndSidebar,
      '/server/': serverSidebar
    },
    outlineTitle: '大纲',
    outline: [1, 3],
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
