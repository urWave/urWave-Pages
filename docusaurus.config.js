// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'urWave Platform Documentation',
    tagline: 'Crafting Solutions for the Digital World',
    favicon: 'img/Urwavelogo.png',
    url: 'https://docs.urhub.net/',
    baseUrl: '/',
    organizationName: 'urWave',
    projectName: 'urHubDocs',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
    
    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.js',
                    editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            },
        ],
    ],
    
    themeConfig: {
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'urWave',
            logo: {
                alt: 'urWave',
                src: 'img/UrwaveLogo.png',
            },
            items: [
                { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Documentation' },
                { href: 'https://github.com/UrWave', label: 'GitHub', position: 'right' },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [{ label: 'Tutorial', to: '/docs/get-started' }],
                },
                {
                    title: 'Contact Us',
                    items: [{ label: 'Facebook', href: '#' }],
                },
                {
                    title: 'More',
                    items: [{ label: 'GitHub', href: '#' }],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} UrWave.`,
        },
        prism: {
          languageThemes: {
            bash: prismThemes.vsLight,  
            csharp: prismThemes.vsDark,  
        },
            theme: prismThemes.vsLight,
            darkTheme: prismThemes.vsDark,
            additionalLanguages: ['csharp', 'powershell', 'bash'],
        },
    },
    
    themes: [
       '@docusaurus/theme-live-codeblock',
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                hashed: true,
            },
           
        ],
    ],
};

export default config;
