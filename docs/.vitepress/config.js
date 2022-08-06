import { defineConfig } from 'vitepress'

const sidebar = [
  {
    text: 'JavaScript',
    collapsible: true,
    // collapsed: true,
    items: [
        { text: '介绍', link: '/notes/js/' },
        { text: 'let和const', link: '/notes/js/letconst' },
    ]
  },
  {
    text: 'TypeScript',
    collapsible: true,
    collapsed: true,
    items: [
      { text: '介绍', link: '/notes/ts/'}
    ]
  }
]

export default defineConfig({
  title: 'Oreki\'s Notebook',
  description: 'this is a Notebook for @Oreki',
  lang: 'zh-CN',
  lastUpdated: true,

  themeConfig: {
    siteTitle: '📔 Oreki\'s Notebook',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/Orekiz' }
    ],
    sidebar: {
      '/notes/': sidebar
    },
    outlineTitle: '大纲',
    editLink: {
      text: '在Github上编辑此页',
      pattern: 'https://github.com/Orekiz/notebook-next/edit/main/docs/:path'
    },
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Oreki'
    }
  }
})
