export const siteMeta = {
  name: 'Michael Chen',
  subtitle: 'Data Engineering, Analytics, and Projects',
  role: 'DATA ENGINEER WITH 2+ YEARS IN PRODUCT & E-COMMERCE ANALYTICS',
  heroEyebrow: 'Actively Seeking New Grad / Entry Level Opportunities',
  heroText:
    'I build data platforms that turn data into reliable, analytics and ML-ready datasets.',
  heroSupport:
    'My work focuses on data modeling, transformations, and data quality, with hands-on experience in AWS and Google Cloud.',
};

const withBase = (path) => `${import.meta.env.BASE_URL}${path}`;

export const skillSet = [
  'Python',
  'SQL',
  'Data Modeling',
  'Spark',
  'dbt',
  'Kafka',
  'Airflow',
  'Google Cloud',
  'AWS',
];

export const articleCollections = [
  {
    title: 'Short Video Hybrid Analytics Lakehouse',
    items: [
      {
        label: 'Series 0',
        title: 'Where real-time signals meet analytical truth',
        href: 'https://medium.com/p/2d11005344b6',
      },
      {
        label: 'Series 1',
        title:
          'Designing a Reliable Daily Batch Publish Flow with Airflow, Iceberg WAP, and dbt',
        href: 'https://medium.com/p/63b2dc246ff7',
      },
      {
        label: 'Series 2',
        title:
          'Turning Short-Video Events into Session-Level Truth for Product Analytics',
        href: 'https://medium.com/p/46ca463aa2d0',
      },
    ],
  },
  {
    title: 'Coding Preparation',
    items: [
      {
        label: 'Essay',
        title: 'My mindset to Get Well Prepared for Coding Interview',
        href: 'https://medium.com/@0429shen/my-mindset-to-get-well-prepared-for-coding-interview-2eec06d5c495',
      },
      {
        label: 'Note',
        title: 'Leveraging the Class Variable to Simplify most DFS questions 🧠',
        href: 'https://medium.com/@0429shen/leveraging-the-self-method-to-simplify-most-dfs-questions-on-leetcode-8be6e7e247bd',
      },
    ],
  },
];

export const contactLinks = [
  {
    label: 'GitHub',
    sublabel: 'Code and repositories',
    href: 'https://github.com/MichaelChenGithub',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    sublabel: 'Experience and profile',
    href: 'https://www.linkedin.com/in/yongshenchen/',
    icon: 'linkedin',
  },
  {
    label: 'Resume',
    sublabel: 'Download PDF',
    href: withBase('Michael_DE.pdf'),
    icon: 'resume',
  },
  {
    label: 'Medium',
    sublabel: 'Writing and notes',
    href: 'https://medium.com/@0429shen',
    icon: 'medium',
  },
];
