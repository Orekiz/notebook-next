import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Oreki\'s Notebook',
  description: 'this is a Notebook for @Oreki',
  lang: 'zh-CN',
  lastUpdated: true,

  themeConfig: {
    siteTitle: '📔 Oreki\'s Notebook',
    sidebar: [
        {
            text: 'JavaScript',
            link: '/js',
            collapsible: true,
            collapsed: true,
            items: [
                { text: 'let和const', link: '/notes/js/letconst' },
                { text: 'let和const', link: '/notes/js/letconst' },
                { text: 'let和const', link: '/notes/js/letconst' },
            ]
        }
    ],
    outlineTitle: '本页目录',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/Orekiz' }
    ]
  }
})
