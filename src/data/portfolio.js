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
